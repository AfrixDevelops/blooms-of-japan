// Cards render ~350px wide and the detail hero ~380px, so source images an order of
// magnitude larger than that are pure download weight. Cap the long edge at 1000px.
const fs = require('fs');
const { Jimp } = require('jimp');

const MAX = 1000, QUALITY = 78;

(async () => {
  const files = fs.readdirSync('img').filter(f => /\.jpg$/i.test(f));
  let before = 0, after = 0, touched = 0;

  for (const f of files) {
    const p = 'img/' + f;
    const sizeBefore = fs.statSync(p).size;
    before += sizeBefore;

    const im = await Jimp.read(p);
    const long = Math.max(im.bitmap.width, im.bitmap.height);
    const needsResize = long > MAX;
    const needsRecompress = sizeBefore > 300 * 1024;

    if (!needsResize && !needsRecompress) { after += sizeBefore; continue; }

    if (needsResize) {
      if (im.bitmap.width >= im.bitmap.height) im.resize({ w: MAX });
      else im.resize({ h: MAX });
    }
    const buf = await im.getBuffer('image/jpeg', { quality: QUALITY });

    if (buf.length < sizeBefore) { fs.writeFileSync(p, buf); after += buf.length; touched++; }
    else after += sizeBefore;
  }

  console.log('images:', files.length, '| rewritten:', touched);
  console.log('before:', (before / 1048576).toFixed(1) + 'MB', '-> after:', (after / 1048576).toFixed(1) + 'MB');
  const biggest = files.map(f => [f, fs.statSync('img/' + f).size]).sort((a, b) => b[1] - a[1])[0];
  console.log('largest now:', biggest[0], (biggest[1] / 1024).toFixed(0) + 'KB');
})();
