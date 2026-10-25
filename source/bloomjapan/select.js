// Dedupe, classify and pick a balanced set of new spots.
const fs = require('fs');
const cand = require('./candidates3.json');
const have = require('./rows.json');

const km = (a, b, c, d) => {
  const R = 6371, r = x => x * Math.PI / 180;
  const h = Math.sin(r(c-a)/2)**2 + Math.cos(r(a))*Math.cos(r(c))*Math.sin(r(d-b)/2)**2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

// Japanese name -> flower (same keywords that found them)
const FLOWER = [
  [/曼珠沙華|彼岸花/, 'Red Spider Lily (Higanbana)'],
  [/芝桜/,            'Shibazakura (Moss Phlox)'],
  [/桜並木|千本桜|桜堤|さくら並木/, 'Cherry Blossom (Sakura)'],
  [/梅林|梅園|観梅/,   'Plum Blossom (Ume)'],
  [/藤園|藤棚/,        'Wisteria'],
  [/あじさい|紫陽花/,  'Hydrangea (Ajisai)'],
  [/ばら園|バラ園|薔薇園/, 'Rose'],
  [/菖蒲園|花菖蒲|あやめ園/, 'Iris (Hanashobu)'],
  [/ひまわり/,         'Sunflower (Himawari)'],
  [/コスモス/,         'Cosmos'],
  [/つつじ園|躑躅園/,  'Azalea (Tsutsuji)'],
  [/牡丹園|ぼたん園/,  'Peony (Botan)'],
  [/水仙/,             'Narcissus'],
  [/菜の花/,           'Rapeseed (Nanohana)'],
  [/蓮池|はす池/,      'Lotus (Hasu)'],
  [/チューリップ/,     'Tulip'],
  [/ラベンダー/,       'Lavender'],
  [/紅葉谷|もみじ谷/,  'Autumn Foliage (Momiji)'],
  [/百合園|ゆり園/,    'Lily'],
  [/椿園|つばき園/,    'Camellia (Tsubaki)'],
  [/コキア/,           'Kochia'],
  [/ネモフィラ/,       'Nemophila'],
  [/花の丘|花畑|花の道|花回廊|フラワーパーク/, 'Seasonal Flowers'],
];
const flowerOf = jp => (FLOWER.find(([re]) => re.test(jp)) || [, null])[1];

// validated at 95% within +/-1 month against the curated 90
const BASE = [
  [/winter peony/i, 1], [/kawazu/i, 2],
  [/spider lily|higanbana/i, 9], [/plum|ume/i, 2], [/cherry|sakura/i, 4],
  [/nemophila/i, 4], [/tulip/i, 4], [/azalea|tsutsuji/i, 4], [/rapeseed|nanohana/i, 3],
  [/shibazakura|moss phlox/i, 4], [/wisteria/i, 5], [/peony|botan/i, 5], [/rose/i, 5],
  [/iris|hanashobu/i, 6], [/hydrangea|ajisai/i, 6], [/lily/i, 6], [/lavender/i, 7],
  [/lotus|hasu/i, 7], [/sunflower|himawari/i, 8], [/cosmos/i, 10], [/kochia/i, 10],
  [/chrysanthemum/i, 11], [/autumn|momiji/i, 11], [/camellia|tsubaki/i, 12],
  [/narcissus/i, 1], [/seasonal/i, 5],
];
const AUTUMN = /autumn|momiji|kochia|cosmos|chrysanthemum/i;
function monthOf(flower, lat) {
  const hit = BASE.find(([re]) => re.test(flower));
  if (!hit) return null;
  const shift = (lat - 35) * (AUTUMN.test(flower) ? -0.10 : 0.13);
  return ((Math.round(hit[1] + shift) - 1 + 24) % 12) + 1;
}

/* ---- 1. classify ---- */
let rows = cand.map(c => {
  const flower = flowerOf(c.jp);
  return flower ? { ...c, flower, month: monthOf(flower, c.lat) } : null;
}).filter(r => r && r.month);

/* ---- 2. collapse OSM street segments: same name within 3km is one place ---- */
const score = r => (r.en ? 4 : 0) + (r.wikidata ? 3 : 0) + (r.wikipedia ? 3 : 0)
  + ({ Castle: 3, Temple: 3, Shrine: 3, Mountain: 2, River: 2, Garden: 2, Viewpoint: 1, Park: 1, Countryside: 1, Street: 0 })[r.venue];
rows.sort((a, b) => score(b) - score(a));
const merged = [];
for (const r of rows) {
  if (merged.some(m => m.jp === r.jp && km(m.lat, m.lon, r.lat, r.lon) < 3)) continue;
  if (merged.some(m => km(m.lat, m.lon, r.lat, r.lon) < 0.4)) continue;   // same site, different name
  merged.push(r);
}

/* ---- 3. drop anything we already have ---- */
const fresh = merged.filter(r => !have.some(h => km(r.lat, r.lon, h.lat, h.lon) < 0.8));

/* ---- 4. balanced pick: ~10 per month, spread across region and venue ---- */
const PER_MONTH = 10;
const picked = [];
for (let m = 1; m <= 12; m++) {
  const pool = fresh.filter(r => r.month === m).sort((a, b) => score(b) - score(a));
  const take = [];
  const regionCount = {}, venueCount = {};
  for (const r of pool) {
    if (take.length >= PER_MONTH) break;
    // keep variety: at most 3 per region and 4 per venue type within a month
    if ((regionCount[r.region] || 0) >= 3) continue;
    if ((venueCount[r.venue] || 0) >= 4) continue;
    regionCount[r.region] = (regionCount[r.region] || 0) + 1;
    venueCount[r.venue] = (venueCount[r.venue] || 0) + 1;
    take.push(r);
  }
  // top up if variety caps left us short
  for (const r of pool) { if (take.length >= PER_MONTH) break; if (!take.includes(r)) take.push(r); }
  picked.push(...take);
}

fs.writeFileSync('selected.json', JSON.stringify(picked, null, 1));
console.log('classified      :', rows.length);
console.log('after merging   :', merged.length);
console.log('not already held:', fresh.length);
console.log('selected        :', picked.length);
console.log('\nper month:');
for (let m = 1; m <= 12; m++) {
  const g = picked.filter(p => p.month === m);
  const named = g.filter(p => p.en).length;
  console.log('  ' + String(m).padStart(2) + ': ' + String(g.length).padStart(2) + '  ' +
    [...new Set(g.map(p => p.flower.replace(/\s*\(.*?\)/, '')))].slice(0, 4).join(', ').slice(0, 52) +
    `   (${named} with english name)`);
}
const v = {}; picked.forEach(p => v[p.venue] = (v[p.venue]||0)+1);
console.log('\nvenues:', Object.entries(v).sort((a,b)=>b[1]-a[1]).map(([k,n])=>`${k} ${n}`).join(', '));
console.log('with english name:', picked.filter(p=>p.en).length, '| wikidata:', picked.filter(p=>p.wikidata).length);
