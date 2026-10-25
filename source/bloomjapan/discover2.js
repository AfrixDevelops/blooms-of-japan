// Wider sweep: shrines, temples, castles, rivers, peaks, streets and countryside,
// not just gardens. Japanese place names still carry the flower, so the keyword
// filter doubles as the flower classifier.
const fs = require('fs');

const FLOWER_RE = [
  '桜並木', '桜の?名所', '千本桜', '桜堤', '桜山', '桜公園', '夜桜',
  'ばら園|バラ園|薔薇園|ローズガーデン',
  'あじさい|紫陽花',
  '藤園|ふじ園|藤棚|藤の?里',
  '花菖蒲|しょうぶ園|あやめ園|菖蒲園',
  'ラベンダー', 'ひまわり|向日葵', 'コスモス', '芝桜',
  '牡丹|ぼたん園', 'つつじ|躑躅', '梅園|梅林|観梅',
  'チューリップ', '彼岸花|曼珠沙華', 'ゆり園|百合園',
  '水仙', '菜の花', '蓮池|はす池', 'コキア', 'ネモフィラ',
  '椿園|つばき園', '菊花|菊人形', '紅葉|もみじ',
  'フラワーパーク|花公園|花の丘|花畑|花の里|花の道|花回廊',
].join('|');

// venue types the user asked for
const KINDS = [
  'nwr["amenity"="place_of_worship"]',       // shrines & temples
  'nwr["historic"="castle"]',
  'nwr["historic"="castle_wall"]',
  'nwr["waterway"="river"]',
  'nwr["natural"="peak"]',
  'nwr["leisure"~"garden|park|nature_reserve"]',
  'nwr["tourism"~"attraction|viewpoint"]',
  'nwr["highway"~"residential|tertiary|secondary|path|footway"]',
  'nwr["landuse"~"farmland|orchard|meadow"]',
];

const REGIONS = {
  'Kyushu & West':  [30.5, 129.0, 35.2, 135.2],
  'Kansai & Chubu': [33.4, 135.0, 37.2, 139.2],
  'Kanto':          [34.8, 138.4, 38.6, 141.6],
  'Tohoku':         [38.4, 139.0, 41.8, 142.4],
  'Hokkaido':       [41.2, 139.4, 45.8, 146.2],
};
const HOSTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run(bbox) {
  const body = KINDS.map(k => `${k}["name"~"${FLOWER_RE}"];`).join('\n');
  const q = `[out:json][timeout:170][bbox:${bbox.join(',')}];\n(\n${body}\n);\nout tags center;`;
  for (let a = 0; a < HOSTS.length * 3; a++) {
    const host = HOSTS[a % HOSTS.length];
    try {
      const res = await fetch(host, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'BloomJapan-discovery/2.0' },
        body: 'data=' + encodeURIComponent(q),
        signal: AbortSignal.timeout(200000),
      });
      const t = await res.text();
      if (!t.trim().startsWith('{')) throw new Error(t.slice(0, 60).replace(/\s+/g, ' '));
      const j = JSON.parse(t);
      if (j.remark && /timed out|too busy/i.test(j.remark)) throw new Error('busy');
      return j.elements || [];
    } catch (e) {
      process.stdout.write(`    retry (${String(e.message).slice(0, 40)})\n`);
      await sleep(5000);
    }
  }
  return null;
}

const VENUE = t =>
  t.amenity === 'place_of_worship' ? (t.religion === 'buddhist' ? 'Temple' : 'Shrine')
  : t.historic ? 'Castle'
  : t.waterway === 'river' ? 'River'
  : t.natural === 'peak' ? 'Mountain'
  : t.highway ? 'Street'
  : t.landuse ? 'Countryside'
  : t.leisure === 'nature_reserve' ? 'Countryside'
  : t.leisure === 'garden' ? 'Garden'
  : t.tourism === 'viewpoint' ? 'Viewpoint'
  : 'Park';

(async () => {
  const all = new Map();
  for (const [name, bbox] of Object.entries(REGIONS)) {
    process.stdout.write(`${name} ... `);
    const els = await run(bbox);
    if (els === null) { console.log('FAILED'); continue; }
    els.forEach(e => all.set(e.type + e.id, e));
    console.log(`${els.length}`);
    await sleep(3000);
  }

  const rows = [...all.values()].map(e => {
    const t = e.tags || {};
    const lat = e.lat ?? (e.center && e.center.lat);
    const lon = e.lon ?? (e.center && e.center.lon);
    return {
      osm: e.type + '/' + e.id, jp: t.name || '', en: t['name:en'] || '',
      venue: VENUE(t), lat, lon,
      wikidata: t.wikidata || '', wikipedia: t.wikipedia || '',
      religion: t.religion || '',
    };
  }).filter(r => r.lat && r.lon && r.jp);

  fs.writeFileSync('candidates2-raw.json', JSON.stringify(rows, null, 1));
  console.log('\nfeatures:', rows.length);
  const byVenue = {};
  rows.forEach(r => byVenue[r.venue] = (byVenue[r.venue] || 0) + 1);
  Object.entries(byVenue).sort((a, b) => b[1] - a[1]).forEach(([v, n]) => console.log('  ' + String(n).padStart(4), v));
  console.log('with wikidata:', rows.filter(r => r.wikidata).length);
})();
