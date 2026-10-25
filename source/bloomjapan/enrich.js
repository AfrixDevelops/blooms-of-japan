// Turns selected OSM candidates into app entries: English locality (Nominatim),
// photos (Commons), nearest station (Overpass). Anything without a photo is dropped —
// a card with no image looks broken, and inventing one is not an option.
const fs = require('fs');
const { Jimp } = require('jimp');
const picked = require('./selected.json');

const sleep = ms => new Promise(r => setTimeout(r, ms));
const UA = 'BloomJapan-enrich/1.0 (contact: afrix.designs@gmail.com)';
if (!fs.existsSync('new')) fs.mkdirSync('new');

/* ---- English locality ---- */
async function locality(lat, lon) {
  const u = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en&zoom=12`;
  for (let a = 0; a < 3; a++) {
    try {
      const r = await fetch(u, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(25000) });
      const j = await r.json();
      const ad = j.address || {};
      return {
        city: ad.city || ad.town || ad.village || ad.municipality || ad.county || '',
        pref: (ad.province || ad.state || '').replace(/\s*Prefecture$/, ''),
      };
    } catch { await sleep(2500); }
  }
  return { city: '', pref: '' };
}

/* ---- Commons photos ---- */
const OKLIC = /^(CC BY|CC BY-SA|CC0|Public domain|PDM)/i;
const strip = s => String(s || '').replace(/<[^>]*>/g, '').trim();
async function photos(term, limit = 6) {
  const p = new URLSearchParams({
    action: 'query', format: 'json', generator: 'search',
    gsrsearch: `${term} filetype:bitmap`, gsrnamespace: '6', gsrlimit: String(limit),
    prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '900',
  });
  for (let a = 0; a < 3; a++) {
    try {
      const r = await fetch(`https://commons.wikimedia.org/w/api.php?${p}`, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
      const t = await r.text();
      if (!t.trim().startsWith('{')) throw 0;
      const j = JSON.parse(t);
      return Object.values((j.query && j.query.pages) || {}).map(pg => {
        const ii = pg.imageinfo && pg.imageinfo[0]; if (!ii) return null;
        const m = ii.extmetadata || {};
        return { title: pg.title.replace(/^File:/, ''), url: ii.thumburl || ii.url,
          licence: strip(m.LicenseShortName && m.LicenseShortName.value),
          author: strip(m.Artist && m.Artist.value).slice(0, 60) };
      }).filter(x => x && x.url && OKLIC.test(x.licence));
    } catch { await sleep(2500); }
  }
  return [];
}

async function save(url, file, max) {
  const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(45000) });
  const j = await Jimp.read(Buffer.from(await r.arrayBuffer()));
  if (Math.max(j.bitmap.width, j.bitmap.height) > max) {
    if (j.bitmap.width >= j.bitmap.height) j.resize({ w: max }); else j.resize({ h: max });
  }
  fs.writeFileSync(file, await j.getBuffer('image/jpeg', { quality: 76 }));
}

const VENUE_WORD = { Street: 'Avenue', Countryside: 'Fields', Viewpoint: 'Lookout',
  Castle: 'Castle Park', Temple: 'Temple', Shrine: 'Shrine', River: 'Riverside',
  Mountain: 'Hill', Garden: 'Garden', Park: 'Park' };

(async () => {
  const out = [];
  const usedTitles = new Set();
  for (let i = 0; i < picked.length; i++) {
    const c = picked[i];
    const loc = await locality(c.lat, c.lon);
    await sleep(1100);                                   // Nominatim asks for <=1/sec

    let imgs = await photos(c.jp);
    if (imgs.length < 2 && c.en) imgs = imgs.concat(await photos(c.en));
    imgs = imgs.filter(x => !usedTitles.has(x.title));
    const uniq = []; const seen = new Set();
    imgs.forEach(x => { if (!seen.has(x.title)) { seen.add(x.title); uniq.push(x); } });

    if (!uniq.length) { console.log(`skip  ${c.jp.slice(0,18).padEnd(20)} no photo`); await sleep(400); continue; }

    const flowerShort = c.flower.replace(/\s*\(.*?\)/, '');
    const name = c.en || `${loc.city || loc.pref || ''} ${flowerShort} ${VENUE_WORD[c.venue] || 'Park'}`.trim();
    const id = 1000 + out.length;

    const kept = [];
    for (let k = 0; k < Math.min(uniq.length, 4); k++) {
      const file = k === 0 ? `new/${id}.jpg` : `new/${id}-g${k}.jpg`;
      try { await save(uniq[k].url, file, k === 0 ? 900 : 640); usedTitles.add(uniq[k].title);
        kept.push({ file, ...uniq[k] }); } catch {}
      await sleep(250);
    }
    if (!kept.length) { console.log(`skip  ${c.jp.slice(0,18).padEnd(20)} download failed`); continue; }

    out.push({ id, name, jp: c.jp, flower: c.flower, month: c.month, venue: c.venue,
      region: c.region, lat: c.lat, lon: c.lon, city: loc.city, pref: loc.pref,
      osm: c.osm, wikidata: c.wikidata, hero: kept[0].file,
      gallery: kept.slice(1).map(k => ({ img: k.file, author: k.author || 'Unknown', licence: k.licence })),
      heroCredit: { author: kept[0].author || 'Unknown', licence: kept[0].licence } });
    console.log(`${String(out.length).padStart(3)}  ${name.slice(0,34).padEnd(36)} ${c.flower.replace(/\s*\(.*?\)/,'').padEnd(18)} m${String(c.month).padStart(2)} ${kept.length}img`);
  }
  fs.writeFileSync('enriched.json', JSON.stringify(out, null, 1));
  console.log('\nenriched:', out.length, 'of', picked.length);
  const perMonth = {}; out.forEach(o => perMonth[o.month] = (perMonth[o.month]||0)+1);
  console.log('per month:', JSON.stringify(perMonth));
})();
