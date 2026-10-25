// Name-indexed sweep across Japan. Compound Japanese names (桜並木, 梅林, あじさい園)
// denote an actual bloom site rather than a generic place name, so they filter noise
// and classify the flower at the same time.
const fs = require('fs');

const NAME_RE = '桜並木|千本桜|桜堤|さくら並木|梅林|梅園|観梅|藤園|藤棚|あじさい|紫陽花'
  + '|ばら園|バラ園|薔薇園|菖蒲園|花菖蒲|あやめ園|ひまわり畑|ひまわりの里|コスモス園|コスモス畑'
  + '|芝桜|つつじ園|躑躅園|牡丹園|ぼたん園|水仙郷|水仙の?丘|菜の花畑|蓮池|はす池'
  + '|チューリップ|ラベンダー|曼珠沙華|彼岸花|紅葉谷|もみじ谷|花の丘|花畑|花の道|百合園|ゆり園'
  + '|椿園|つばき園|コキア|ネモフィラ|花回廊|フラワーパーク';

const REGIONS = {
  'Kyushu & Okinawa': [30.5, 129.0, 34.0, 132.2],
  'Western Japan':    [32.6, 131.8, 35.6, 135.2],
  'Kyoto & Kansai':   [33.4, 135.0, 36.0, 136.9],
  'Mt. Fuji & Central':[34.6, 136.6, 37.6, 139.2],
  'Kanto':            [34.8, 138.4, 37.2, 141.0],
  'Northern Japan':   [36.8, 139.0, 41.8, 142.4],
  'Hokkaido':         [41.2, 139.4, 45.8, 146.2],
};
const HOSTS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
const sleep = ms => new Promise(r => setTimeout(r, ms));

const VENUE = t =>
  t.amenity === 'place_of_worship' ? (t.religion === 'buddhist' ? 'Temple' : 'Shrine')
  : t.historic ? 'Castle'
  : t.waterway ? 'River'
  : t.natural === 'peak' ? 'Mountain'
  : t.landuse || t.leisure === 'nature_reserve' ? 'Countryside'
  : t.highway ? 'Street'
  : t.leisure === 'garden' ? 'Garden'
  : t.leisure === 'park' ? 'Park'
  : t.tourism === 'viewpoint' ? 'Viewpoint'
  : t.tourism || t.leisure ? 'Park'
  : null;                                        // anything else is noise

async function run(bbox) {
  const q = `[out:json][timeout:150][bbox:${bbox.join(',')}];\nnwr["name"~"${NAME_RE}"];\nout tags center;`;
  for (let a = 0; a < 6; a++) {
    const host = HOSTS[a % HOSTS.length];
    try {
      const r = await fetch(host, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'BloomJapan-discovery/3.0' },
        body: 'data=' + encodeURIComponent(q), signal: AbortSignal.timeout(190000),
      });
      const t = await r.text();
      if (!t.trim().startsWith('{')) throw new Error('html');
      const j = JSON.parse(t);
      if (j.remark && /timed out|busy/i.test(j.remark)) throw new Error('busy');
      return j.elements || [];
    } catch (e) { process.stdout.write(`  retry(${e.message.slice(0,18)}) `); await sleep(6000); }
  }
  return null;
}

(async () => {
  const all = new Map();
  for (const [region, bbox] of Object.entries(REGIONS)) {
    process.stdout.write(region.padEnd(20));
    const els = await run(bbox);
    if (!els) { console.log('FAILED'); continue; }
    let kept = 0;
    els.forEach(e => {
      const t = e.tags || {};
      const venue = VENUE(t);
      const lat = e.lat ?? (e.center && e.center.lat);
      const lon = e.lon ?? (e.center && e.center.lon);
      if (!venue || !lat || !t.name) return;
      all.set(e.type + e.id, {
        osm: e.type + '/' + e.id, jp: t.name, en: t['name:en'] || '',
        venue, region, lat, lon, wikidata: t.wikidata || '', wikipedia: t.wikipedia || '',
      });
      kept++;
    });
    console.log(`${els.length} raw -> ${kept} usable`);
    await sleep(3000);
  }
  const rows = [...all.values()];
  fs.writeFileSync('candidates3.json', JSON.stringify(rows, null, 1));
  console.log('\ntotal usable candidates:', rows.length);
  const v = {}, rg = {};
  rows.forEach(r => { v[r.venue] = (v[r.venue]||0)+1; rg[r.region] = (rg[r.region]||0)+1; });
  console.log('by venue  :', Object.entries(v).sort((a,b)=>b[1]-a[1]).map(([k,n])=>`${k} ${n}`).join(', '));
  console.log('by region :', Object.entries(rg).sort((a,b)=>b[1]-a[1]).map(([k,n])=>`${k} ${n}`).join(', '));
})();
