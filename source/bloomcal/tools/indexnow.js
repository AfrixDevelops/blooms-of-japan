// Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver) which pages changed, so they recrawl
// them within hours instead of waiting for the sitemap. ChatGPT search and Copilot answer from Bing's index.
// build-dist.js publishes the key at /<KEY>.txt, which is how the engines know the ping is ours,
// so run this only after the deploy is live:
//   node tools/indexnow.js                     every URL in public/sitemap.xml
//   node tools/indexnow.js /guides/x /spots/y  just those pages
const fs = require('fs'), path = require('path');
const KEY = '523a9f80e8333caf00d57617045317e8', HOST = 'bloomsofjapan.com';
module.exports = { KEY };

if (require.main === module) (async () => {
  let urls = process.argv.slice(2).map(p => 'https://' + HOST + (p.startsWith('/') ? p : '/' + p));
  if (!urls.length) {
    const sitemap = fs.readFileSync(path.join(__dirname, '../../../public/sitemap.xml'), 'utf8');
    urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: 'https://' + HOST + '/' + KEY + '.txt', urlList: urls }),
  });
  // 200 or 202 means accepted; 403 means the key file isn't live yet
  console.log('IndexNow', res.status, res.statusText, '-', urls.length, 'URLs');
  if (res.status >= 300) { console.log(await res.text()); process.exit(1); }
})();
