// Finds candidate bloom spots across Japan from OpenStreetMap (ODbL).
// Japanese garden names usually name the flower, so the keyword filter doubles as
// a quality filter and a flower-type classifier. Bloom timing is NOT sourced here.
const fs = require('fs');

// keyword -> flower category used by the app
const KEY = [
  ['ばら園|バラ園|薔薇園|ローズガーデン|ばら公園', 'Rose'],
  ['あじさい|紫陽花', 'Hydrangea'],
  ['藤園|ふじ園|藤棚', 'Wisteria'],
  ['花菖蒲|しょうぶ園|ショウブ園|あやめ園|アヤメ園', 'Iris'],
  ['ラベンダー', 'Lavender'],
  ['ひまわり|向日葵|ヒマワリ', 'Sunflower'],
  ['コスモス', 'Cosmos'],
  ['芝桜|シバザクラ', 'Moss Phlox'],
  ['牡丹|ぼたん園|ボタン園', 'Peony'],
  ['つつじ|ツツジ|躑躅', 'Azalea'],
  ['梅園|ばい園|観梅', 'Plum Blossom'],
  ['チューリップ', 'Tulip'],
  ['彼岸花|曼珠沙華', 'Red Spider Lily'],
  ['ゆり園|ユリ園|百合園', 'Lily'],
  ['水仙|すいせん郷', 'Narcissus'],
  ['菜の花', 'Rapeseed'],
  ['はす池|ハス池|蓮池', 'Lotus'],
  ['コキア', 'Kochia'],
  ['ネモフィラ', 'Nemophila'],
  ['椿園|つばき園', 'Camellia'],
  ['ダリア園', 'Dahlia'],
  ['もみじ|紅葉谷', 'Autumn Leaves'],
  ['フラワーパーク|花公園|花の丘|花畑|花の里|花の杜', 'Mixed Gardens'],
  ['植物園|植物公園', 'Mixed Gardens'],
];
const RE = KEY.map(k => k[0]).join('|');

const REGIONS = {
  'Kyushu & West':   [30.5, 129.0, 35.2, 135.2],
  'Kansai & Chubu':  [33.4, 135.0, 37.2, 139.2],
  'Kanto':           [34.8, 138.4, 38.6, 141.6],
  'Tohoku':          [38.4, 139.0, 41.8, 142.4],
  'Hokkaido':        [41.2, 139.4, 45.8, 146.2],
};
const HOSTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.osm.jp/api/interpreter',
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run(bbox) {
  const q = `[out:json][timeout:170][bbox:${bbox.join(',')}];
nwr["name"~"${RE}"]["leisure"~"garden|park|nature_reserve"];
out tags center;`;
  for (let attempt = 0; attempt < HOSTS.length * 2; attempt++) {
    const host = HOSTS[attempt % HOSTS.length];
    try {
      const res = await fetch(host, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'BloomJapan-discovery/1.0' },
        body: 'data=' + encodeURIComponent(q),
        signal: AbortSignal.timeout(200000),
      });
      const text = await res.text();
      if (!text.trim().startsWith('{')) throw new Error(text.slice(0, 80).replace(/\s+/g, ' '));
      const json = JSON.parse(text);
      if (json.remark && /timed out|too busy/i.test(json.remark)) throw new Error(json.remark.slice(0, 60));
      return json.elements || [];
    } catch (e) {
      process.stdout.write(`    retry (${host.split('/')[2]}: ${String(e.message).slice(0, 50)})\n`);
      await sleep(4000);
    }
  }
  return null;
}

(async () => {
  const all = new Map();
  for (const [name, bbox] of Object.entries(REGIONS)) {
    process.stdout.write(`${name} ... `);
    const els = await run(bbox);
    if (els === null) { console.log('FAILED'); continue; }
    els.forEach(e => all.set(e.type + e.id, e));
    console.log(`${els.length} features`);
    await sleep(2500);
  }

  const rows = [...all.values()].map(e => {
    const t = e.tags || {};
    const lat = e.lat ?? (e.center && e.center.lat);
    const lon = e.lon ?? (e.center && e.center.lon);
    const nm = t.name || '';
    const flower = (KEY.find(([re]) => new RegExp(re).test(nm)) || [, 'Mixed Gardens'])[1];
    return {
      osm: e.type + '/' + e.id,
      jp: nm,
      en: t['name:en'] || '',
      flower, lat, lon,
      wikidata: t.wikidata || '',
      wikipedia: t.wikipedia || '',
      kind: t.leisure || '',
    };
  }).filter(r => r.lat && r.lon);

  fs.writeFileSync('candidates-raw.json', JSON.stringify(rows, null, 1));
  console.log('\nraw candidates:', rows.length);
  const byFlower = {};
  rows.forEach(r => byFlower[r.flower] = (byFlower[r.flower] || 0) + 1);
  Object.entries(byFlower).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log('  ' + String(n).padStart(4), f));
  console.log('with wikidata link:', rows.filter(r => r.wikidata).length);
  console.log('with english name:', rows.filter(r => r.en).length);
})();
