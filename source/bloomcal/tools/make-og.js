// Builds the social sharing card, og-card.jpg, at the 1200x630 that Facebook, X, LinkedIn, Slack and
// iMessage all crop to. The old card was a raw 1400x933 photo, so every platform cut it differently and
// none of them showed the site's name.
// The spot and flower counts are read from data.js, so the card cannot drift out of date the way the
// hand-written "160+ spots" description did.
// Run from source/bloomcal:  node tools/make-og.js
const fs = require('fs'), http = require('http'), path = require('path'), { spawn } = require('child_process');

const ROOT = process.cwd();                       // source/bloomcal
global.window = {}; eval(fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8'));
const D = global.window.D;
const spots = D.feat.length, flowers = D.flowerGroups.length;
console.log('card will read:', spots, 'spots /', flowers, 'flowers');

const TYPES = { '.css': 'text/css', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  '.jpg': 'image/jpeg', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript' };
const card = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="/fonts/fonts.css">
<style>
  :root{ --navy:#1E2A47; --gold:#B08A4F; --gold-2:#CDAE74; --acc:#A8442A; --washi:#F6F0E3;
    --serif:"Cormorant Garamond","Shippori Mincho",Georgia,serif; --jp:"Shippori Mincho",serif; }
  *{ box-sizing:border-box; margin:0; }
  body{ width:1200px; height:630px; overflow:hidden; position:relative;
    background:var(--washi) url(/art/washi.svg); background-size:480px 480px;
    font-family:var(--serif); color:var(--navy); }
  .art{ position:absolute; right:-130px; top:-70px; width:760px; opacity:.92; }
  .art2{ position:absolute; right:-60px; bottom:-150px; width:430px; opacity:.6; }
  .scrim{ position:absolute; inset:0;
    background:linear-gradient(100deg, var(--washi) 40%, rgba(246,240,227,.86) 56%, rgba(246,240,227,0) 78%); }
  .frame{ position:absolute; inset:26px; border:1px solid rgba(176,138,79,.45); }
  .in{ position:absolute; left:84px; top:50%; transform:translateY(-50%); width:660px; }
  .eyebrow{ display:flex; align-items:center; gap:13px; font-size:17px; font-weight:600;
    letter-spacing:.3em; text-transform:uppercase; color:#8A6639; margin-bottom:26px; }
  .eyebrow i{ width:7px; height:7px; background:var(--gold); transform:rotate(45deg); }
  .eyebrow span{ font-family:var(--jp); letter-spacing:.2em; color:var(--gold); }
  h1{ font-size:74px; line-height:1.0; letter-spacing:-.015em; font-weight:600; }
  h1 em{ display:block; font-style:italic; color:var(--acc); margin-top:4px; }
  .rule{ display:flex; align-items:center; gap:12px; margin:30px 0 22px; }
  .rule b{ height:1px; width:150px; background:var(--gold); display:block; }
  .rule i{ width:7px; height:7px; background:var(--gold); transform:rotate(45deg); }
  .stats{ font-size:27px; color:#3A4766; letter-spacing:.005em; }
  .dom{ position:absolute; left:84px; bottom:62px; font-size:19px; font-weight:600;
    letter-spacing:.22em; text-transform:uppercase; color:#8A6639; }
</style></head><body>
  <img class="art" src="/art/sakura.webp" alt="">
  <img class="art2" src="/art/momiji.webp" alt="">
  <div class="scrim"></div><div class="frame"></div>
  <div class="in">
    <div class="eyebrow"><i></i>Blooms of Japan<span>花暦</span></div>
    <h1>The flower year in Japan,<em>one scroll at a time</em></h1>
    <div class="rule"><b></b><i></i></div>
    <div class="stats">${spots} spots &middot; ${flowers} flowers &middot; every month of the year</div>
  </div>
  <div class="dom">bloomsofjapan.com</div>
</body></html>`;

const srv = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/card.html') { res.writeHead(200, { 'Content-Type': TYPES['.html'] }); return res.end(card); }
  const file = path.join(ROOT, url.replace(/^\/+/, ''));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  res.end(fs.readFileSync(file));
});

const sleep = ms => new Promise(r => setTimeout(r, ms));
srv.listen(8799, '127.0.0.1', async () => {
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',
    ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=9392',
     '--window-size=1200,630', '--user-data-dir=' + process.env.TEMP + '/cdp-og', 'about:blank']);
  let ws;
  for (let i = 0; i < 40 && !ws; i++) { await sleep(250);
    try { const l = await (await fetch('http://127.0.0.1:9392/json')).json(); const p = l.find(x => x.type === 'page'); if (p) ws = p.webSocketDebuggerUrl; } catch {} }
  const s = new WebSocket(ws); await new Promise(r => s.onopen = r);
  let id = 0; const pend = {};
  s.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
  const send = (m, p = {}) => new Promise(r => { const i = ++id; pend[i] = r; s.send(JSON.stringify({ id: i, method: m, params: p })); });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: 'http://127.0.0.1:8799/card.html' });
  await sleep(2500);
  await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true });
  await sleep(600);
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
  fs.writeFileSync(path.join(ROOT, 'og-card.jpg'), Buffer.from(shot.result.data, 'base64'));
  const kb = (fs.statSync(path.join(ROOT, 'og-card.jpg')).size / 1024).toFixed(0);
  console.log('wrote og-card.jpg  2400x1260 (2x of 1200x630), ' + kb + ' KB');
  s.close(); chrome.kill(); srv.close(); process.exit(0);
});
