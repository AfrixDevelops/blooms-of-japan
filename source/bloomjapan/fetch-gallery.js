// Downloads the Commons photos and writes gal/<id>-<n>.jpg, resized for phone display.
const fs = require('fs');
const { Jimp } = require('jimp');
const commons = require('./commons.json');

const MAX = 640, Q = 76;
if (!fs.existsSync('gal')) fs.mkdirSync('gal');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const manifest = {};
  let ok = 0, fail = 0, bytes = 0;

  for (const [id, imgs] of Object.entries(commons)) {
    const kept = [];
    for (let i = 0; i < imgs.length; i++) {
      const im = imgs[i];
      const file = `gal/${id}-${i + 1}.jpg`;
      try {
        const res = await fetch(im.url, {
          headers: { 'User-Agent': 'BloomJapan-gallery/1.0 (contact: afrix.designs@gmail.com)' },
          signal: AbortSignal.timeout(45000),
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const buf = Buffer.from(await res.arrayBuffer());
        const j = await Jimp.read(buf);
        if (Math.max(j.bitmap.width, j.bitmap.height) > MAX) {
          if (j.bitmap.width >= j.bitmap.height) j.resize({ w: MAX }); else j.resize({ h: MAX });
        }
        const out = await j.getBuffer('image/jpeg', { quality: Q });
        fs.writeFileSync(file, out);
        bytes += out.length;
        kept.push({ img: file, author: im.author || 'Unknown', licence: im.licence, title: im.title.replace(/^File:/, '') });
        ok++;
      } catch (e) {
        fail++;
      }
      await sleep(180);
    }
    if (kept.length) manifest[id] = kept;
  }

  fs.writeFileSync('gallery-manifest.json', JSON.stringify(manifest, null, 1));
  console.log('downloaded:', ok, '| failed:', fail);
  console.log('total MB:', (bytes / 1048576).toFixed(1));
  console.log('spots with a gallery:', Object.keys(manifest).length);
  const counts = {};
  Object.values(manifest).forEach(a => counts[a.length] = (counts[a.length] || 0) + 1);
  console.log('photos per spot:', JSON.stringify(counts));
})();
