// Same-place/different-season entries returned identical Commons photos, because the
// search used only the place name. Re-search with the flower so each entry shows its
// own bloom, and never let one Commons file appear under two spots.
const fs = require('fs');
const { Jimp } = require('jimp');

const h = fs.readFileSync('index.html', 'utf8');
const js = h.slice(h.lastIndexOf('<script>') + 8, h.lastIndexOf('</script>'));
(0, eval)(js.match(/const DATA = \[[\s\S]*?\n\];/)[0].replace('const DATA', 'globalThis.DATA'));
const man = require('./gallery-manifest.json');

const JPTERM = [
  [/cherry|sakura/i, '桜'], [/chrysanthemum/i, '菊'], [/nemophila/i, 'ネモフィラ'],
  [/kochia/i, 'コキア'], [/rose/i, 'バラ'], [/begonia/i, 'ベゴニア'],
  [/peony|botan/i, '牡丹'], [/plum|ume/i, '梅'], [/tulip/i, 'チューリップ'],
  [/wisteria/i, '藤'], [/lavender/i, 'ラベンダー'], [/hydrangea|ajisai/i, '紫陽花'],
  [/sunflower/i, 'ひまわり'], [/cosmos/i, 'コスモス'], [/iris/i, '花菖蒲'],
  [/azalea/i, 'つつじ'], [/lotus/i, '蓮'], [/camellia/i, '椿'],
  [/narcissus/i, '水仙'], [/spider lily/i, '彼岸花'], [/shibazakura|moss phlox/i, '芝桜'],
];
const termFor = f => (JPTERM.find(([re]) => re.test(f)) || [, ''])[1];

const API = 'https://commons.wikimedia.org/w/api.php';
const UA = 'BloomJapan-gallery/1.0 (contact: afrix.designs@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OK = /^(CC BY|CC BY-SA|CC0|Public domain|PDM)/i;
const strip = s => String(s || '').replace(/<[^>]*>/g, '').trim();

async function search(q, limit = 12) {
  const p = new URLSearchParams({
    action: 'query', format: 'json', generator: 'search',
    gsrsearch: `${q} filetype:bitmap`, gsrnamespace: '6', gsrlimit: String(limit),
    prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '900',
  });
  for (let a = 0; a < 4; a++) {
    try {
      const r = await fetch(`${API}?${p}`, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
      const t = await r.text();
      if (!t.trim().startsWith('{')) throw 0;
      const j = JSON.parse(t);
      return Object.values((j.query && j.query.pages) || {}).map(pg => {
        const ii = pg.imageinfo && pg.imageinfo[0]; if (!ii) return null;
        const m = ii.extmetadata || {};
        return { title: pg.title, url: ii.thumburl || ii.url,
          licence: strip(m.LicenseShortName && m.LicenseShortName.value),
          author: strip(m.Artist && m.Artist.value).slice(0, 60) };
      }).filter(x => x && x.url && OK.test(x.licence));
    } catch { await sleep(2500 * (a + 1)); }
  }
  return [];
}

// every Commons title currently in use, so replacements stay globally unique.
// the manifest stores titles bare while the API returns them "File:"-prefixed —
// normalise both sides or the exclusion silently never matches.
const norm = t => String(t || '').replace(/^File:/, '');
const claimed = new Map();                       // title -> spot id
Object.entries(man)
  .sort((a, b) => +a[0] - +b[0])                 // lower id keeps the photo it already has
  .forEach(([id, arr]) => arr.forEach(a => {
    if (!claimed.has(norm(a.title))) claimed.set(norm(a.title), id);
  }));

// the second entry of each same-place pair is the one that gets fresh photos
const REDO = [62, 85, 81, 66, 51, 55];

(async () => {
  for (const id of REDO) {
    const d = DATA.find(x => x.id === id);
    const term = termFor(d.flower);
    const queries = [
      `${d.jp} ${term}`.trim(),
      `${d.name.replace(/\s*\(.*?\)/, '')} ${d.flower.replace(/\s*\(.*?\)/, '')}`.trim(),
      `${d.jp}`,
    ].filter(Boolean);

    let picked = [];
    for (const q of queries) {
      if (picked.length >= 3) break;
      const res = await search(q);
      for (const r of res) {
        if (picked.length >= 3) break;
        const owner = claimed.get(norm(r.title));
        if (owner && owner !== String(id)) continue;          // used by another spot
        if (picked.some(p => norm(p.title) === norm(r.title))) continue;
        picked.push(r);
      }
      await sleep(700);
    }

    console.log(`#${id} ${d.name} [${d.flower}] via "${queries[0]}" -> ${picked.length} photo(s)`);
    if (!picked.length) { console.log('    no replacement found, leaving as is'); continue; }

    const kept = [];
    for (let i = 0; i < picked.length; i++) {
      const file = `gal/${id}-${i + 1}.jpg`;
      try {
        const res = await fetch(picked[i].url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(45000) });
        const j = await Jimp.read(Buffer.from(await res.arrayBuffer()));
        if (Math.max(j.bitmap.width, j.bitmap.height) > 640) {
          if (j.bitmap.width >= j.bitmap.height) j.resize({ w: 640 }); else j.resize({ h: 640 });
        }
        fs.writeFileSync(file, await j.getBuffer('image/jpeg', { quality: 76 }));
        kept.push({ img: file, author: picked[i].author || 'Unknown', licence: picked[i].licence, title: picked[i].title.replace(/^File:/, '') });
        claimed.set(norm(picked[i].title), String(id));
        console.log('     +', picked[i].title.slice(0, 60));
      } catch (e) { console.log('     ! download failed'); }
      await sleep(250);
    }
    // drop any stale 3rd file if we found fewer
    for (let i = kept.length; i < 3; i++) {
      const f = `gal/${id}-${i + 1}.jpg`;
      if (fs.existsSync(f)) fs.unlinkSync(f);
    }
    if (kept.length) man[id] = kept;
  }

  fs.writeFileSync('gallery-manifest.json', JSON.stringify(man, null, 1));
  console.log('\nmanifest updated');
})();
