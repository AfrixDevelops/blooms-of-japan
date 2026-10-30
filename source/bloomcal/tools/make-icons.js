// Draws the fallback icons from favicon.svg, for the places that don't take an SVG icon:
//   favicon.ico          48x48, what Google and older browsers fetch when nothing else works
//   icon-192.png         192x192, Android and the PNG link in the page head
//   apple-touch-icon.png 180x180 on a solid square, because iOS turns transparent corners black
// Rendered in headless Chrome the same way as tools/make-og.js. The .ico just wraps the 48px PNG,
// which every browser since Windows Vista reads.
// Run from source/bloomcal:  node tools/make-icons.js
const fs = require('fs'), path = require('path'), { spawn } = require('child_process');
const ROOT = process.cwd();                       // source/bloomcal
const svg = fs.readFileSync(path.join(ROOT, 'favicon.svg'), 'utf8');
const page = (size, bg) => 'data:text/html;charset=utf-8,' + encodeURIComponent(
  `<!doctype html><style>*{margin:0}html,body{width:${size}px;height:${size}px;background:${bg};overflow:hidden}` +
  `svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);

const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',
    ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=9393',
     '--user-data-dir=' + process.env.TEMP + '/cdp-icons', 'about:blank']);
  let ws;
  for (let i = 0; i < 40 && !ws; i++) { await sleep(250);
    try { const l = await (await fetch('http://127.0.0.1:9393/json')).json(); const p = l.find(x => x.type === 'page'); if (p) ws = p.webSocketDebuggerUrl; } catch {} }
  const s = new WebSocket(ws); await new Promise(r => s.onopen = r);
  let id = 0; const pend = {};
  s.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
  const send = (m, p = {}) => new Promise(r => { const i = ++id; pend[i] = r; s.send(JSON.stringify({ id: i, method: m, params: p })); });
  await send('Page.enable');
  // transparent page background, so the round icon keeps clear corners
  await send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });

  const shoot = async (size, bg) => {
    await send('Emulation.setDeviceMetricsOverride', { width: size, height: size, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: page(size, bg) });
    await sleep(500);
    const r = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: size, height: size, scale: 1 } });
    return Buffer.from(r.result.data, 'base64');
  };

  const png48 = await shoot(48, 'transparent');
  // ICO header + one directory entry pointing at the PNG that follows
  const ico = Buffer.alloc(22);
  ico.writeUInt16LE(0, 0); ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
  ico.writeUInt8(48, 6); ico.writeUInt8(48, 7); ico.writeUInt8(0, 8); ico.writeUInt8(0, 9);
  ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12); ico.writeUInt32LE(png48.length, 14); ico.writeUInt32LE(22, 18);
  fs.writeFileSync(path.join(ROOT, 'favicon.ico'), Buffer.concat([ico, png48]));
  fs.writeFileSync(path.join(ROOT, 'icon-192.png'), await shoot(192, 'transparent'));
  fs.writeFileSync(path.join(ROOT, 'apple-touch-icon.png'), await shoot(180, '#F6F0E3'));
  for (const f of ['favicon.ico', 'icon-192.png', 'apple-touch-icon.png'])
    console.log('wrote', f.padEnd(22), (fs.statSync(path.join(ROOT, f)).size / 1024).toFixed(1) + ' KB');
  s.close(); chrome.kill(); process.exit(0);
})();
