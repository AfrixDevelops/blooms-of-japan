// Looks up freely-licensed photos on Wikimedia Commons for the spots we already have,
// keeping author + licence for attribution. Japanese name is the better search key.
const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
const js = h.slice(h.lastIndexOf('<script>') + 8, h.lastIndexOf('</script>'));
(0, eval)(js.match(/const DATA = \[[\s\S]*?\n\];/)[0].replace('const DATA', 'globalThis.DATA'));

const API = 'https://commons.wikimedia.org/w/api.php';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OK_LICENCE = /^(CC BY|CC BY-SA|CC0|Public domain|PDM)/i;

async function search(term, limit = 8) {
  const p = new URLSearchParams({
    action: 'query', format: 'json', origin: '*',
    generator: 'search', gsrsearch: `${term} filetype:bitmap`, gsrnamespace: '6', gsrlimit: String(limit),
    prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '900',
  });
  let j = null;
  for (let a = 0; a < 4 && !j; a++) {
    try {
      const res = await fetch(`${API}?${p}`, { headers: { 'User-Agent': 'BloomJapan-gallery/1.0 (contact: afrix.designs@gmail.com)' }, signal: AbortSignal.timeout(30000) });
      const txt = await res.text();
      if (!txt.trim().startsWith('{')) throw new Error('rate limited');
      j = JSON.parse(txt);
    } catch (e) { await sleep(3000 * (a + 1)); }
  }
  if (!j) return [];
  const pages = (j.query && j.query.pages) || {};
  return Object.values(pages).map(pg => {
    const ii = pg.imageinfo && pg.imageinfo[0];
    if (!ii) return null;
    const m = ii.extmetadata || {};
    const strip = s => String(s || '').replace(/<[^>]*>/g, '').trim();
    return {
      title: pg.title,
      url: ii.thumburl || ii.url,
      width: ii.thumbwidth,
      licence: strip(m.LicenseShortName && m.LicenseShortName.value),
      author: strip(m.Artist && m.Artist.value).slice(0, 80),
      credit: strip(m.Credit && m.Credit.value).slice(0, 60),
    };
  }).filter(x => x && x.url && OK_LICENCE.test(x.licence));
}

(async () => {
  const sample = process.argv[2] ? DATA.slice(0, +process.argv[2]) : DATA;
  const out = {};
  let hits = 0;
  for (const d of sample) {
    const term = d.jp || d.name;
    let imgs = [];
    try { imgs = await search(term); } catch (e) { process.stdout.write(`  ! ${d.name}: ${e.message}\n`); }
    if (imgs.length < 3 && d.jp) {
      try { imgs = imgs.concat(await search(d.name)); } catch {}
    }
    // de-dup by title, keep 3
    const seen = new Set();
    const keep = imgs.filter(i => !seen.has(i.title) && seen.add(i.title)).slice(0, 3);
    if (keep.length) { out[d.id] = keep; hits++; }
    console.log(String(d.id).padStart(3), (d.name || '').slice(0, 30).padEnd(32), term.padEnd(16), keep.length + ' img');
    await sleep(900);
  }
  fs.writeFileSync('commons.json', JSON.stringify(out, null, 1));
  console.log(`\nspots with >=1 licensed photo: ${hits}/${sample.length}`);
  const total = Object.values(out).reduce((s, a) => s + a.length, 0);
  console.log('photos found:', total);
  const lic = {};
  Object.values(out).flat().forEach(i => lic[i.licence] = (lic[i.licence] || 0) + 1);
  console.log('licences:', JSON.stringify(lic));
})();
