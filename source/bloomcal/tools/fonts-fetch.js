// Self-host the three Google fonts so no visitor request reaches Google.
// Asks Google for the modern (woff2) stylesheet, downloads every subset file it names, and writes a
// local stylesheet whose src: urls point at /fonts/. Unicode-range subsetting is preserved, so a
// Latin-only reader still downloads only the Latin slices of the Japanese faces.
const fs = require('fs'), path = require('path');
const OUT = 'C:/Users/geral/blooms-of-japan/source/bloomcal/fonts';
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500'
  + '&family=Shippori+Mincho:wght@500&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap';
// a current Chrome UA is what makes Google serve woff2 rather than ttf
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const css = await (await fetch(CSS_URL, { headers: { 'User-Agent': UA } })).text();
  const urls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(m => m[1]))];
  console.log('font files referenced:', urls.length);
  const map = {};
  let done = 0, bytes = 0;
  for (const u of urls) {
    // fonts.gstatic.com/s/cormorantgaramond/v21/<hash>.woff2  ->  cormorantgaramond-<hash>.woff2
    const parts = u.split('/');
    const family = parts[4] || 'font';
    const file = family + '-' + parts[parts.length - 1];
    const dest = path.join(OUT, file);
    if (!fs.existsSync(dest)) {
      let buf;
      for (let a = 0; a < 4 && !buf; a++) {
        try { const r = await fetch(u, { headers: { 'User-Agent': UA } }); if (!r.ok) throw 0; buf = Buffer.from(await r.arrayBuffer()); }
        catch { await sleep(1200 * (a + 1)); }
      }
      if (!buf) throw new Error('download failed: ' + u);
      fs.writeFileSync(dest, buf);
    }
    bytes += fs.statSync(dest).size;
    map[u] = '/fonts/' + file;
    if (++done % 50 === 0) console.log('  ', done, '/', urls.length);
  }
  let local = css;
  for (const [u, p] of Object.entries(map)) local = local.split(u).join(p);
  fs.writeFileSync(path.join(OUT, 'fonts.css'), '/* Google Fonts, self-hosted so no visitor request reaches Google.\n'
    + '   Regenerate with tools/fonts-fetch.js if the font list changes. */\n' + local);
  console.log('wrote', done, 'files,', (bytes / 1048576).toFixed(1), 'MB, plus fonts.css');
})().catch(e => { console.error(e); process.exit(1); });
