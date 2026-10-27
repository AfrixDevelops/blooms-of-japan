// Pre-renders every page of the site into its own HTML file, so search engines (and anyone without
// JavaScript) get the full content at a real address: /spots/mother-farm, /flowers/kochia, /when/april…
//
// It loads each address in headless Chrome from a throwaway local server, waits for the page's own
// router to draw it, saves the result, then adds that page's title, description, canonical URL,
// social-card tags and structured data. The page's scripts still run on top for visitors as before.
const http = require('http'), fs = require('fs'), path = require('path'), { spawn } = require('child_process');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const clip = (s, n = 158) => { s = String(s).replace(/\s+/g, ' ').trim(); return s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[,;:—-]$/, '') + '…'; };
const firstSentence = s => (String(s).match(/^.*?[.!?](\s|$)/) || [s])[0].trim();

module.exports = async function prerender(OUT, { SITE, D, HOME_DESC }) {
  const shell = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8');
  const label = k => (D.flowerGroups.find(g => g.k === k) || {}).label;
  const flowerOf = f => label((f.fl || [])[0]) || f.flower.replace(/\s*\(.*?\)/, '');
  const MonCap = m => MONTHS[m - 1][0].toUpperCase() + MONTHS[m - 1].slice(1);
  const abs = p => p ? SITE + (p.startsWith('/') ? p : '/' + p) : SITE + '/og.jpg';
  const crumbs = list => ({ '@type': 'BreadcrumbList', itemListElement: list.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + url })) });
  const itemList = (name, spots) => ({ '@type': 'ItemList', name, numberOfItems: spots.length,
    itemListElement: spots.map((f, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/spots/${f.slug}`, name: f.name })) });

  /* ---- every page, with what goes in its <head> ---- */
  const pages = [];
  // who publishes the site, so the Instagram account is tied to it rather than left unconnected
  const ORG_ID = SITE + '/#org';
  pages.push({ url: '/', file: 'index.html', desc: HOME_DESC, img: null,
    ld: [{ '@type': 'Organization', '@id': ORG_ID, name: 'Blooms of Japan', url: SITE + '/',
      sameAs: ['https://www.instagram.com/bloomsofjapan/'] },
      { '@type': 'WebSite', name: 'Blooms of Japan', url: SITE + '/', publisher: { '@id': ORG_ID },
      potentialAction: { '@type': 'SearchAction', target: `${SITE}/spots?q={search_term_string}`, 'query-input': 'required name=search_term_string' } }] });
  pages.push({ url: '/calendar', file: 'calendar.html', img: null,
    desc: `Japan's flower calendar, month by month: what blooms where across ${D.feat.length} spots, from plum blossom in February to autumn leaves in November.`,
    ld: [crumbs([['Home', '/'], ['Flower calendar', '/calendar']])] });
  pages.push({ url: '/spots', file: 'spots.html', img: null,
    desc: `Every flower spot in Japan we track, ${D.feat.length} in all: search by flower, place or month, with peak times, photos and how to get there.`,
    ld: [crumbs([['Home', '/'], ['All spots', '/spots']])] });
  pages.push({ url: '/flowers', file: 'flowers.html', img: null,
    desc: `Browse Japan's flowers one at a time: ${D.flowerGroups.slice(0, 8).map(g => g.label.toLowerCase()).join(', ')} and more, with where and when to see each.`,
    ld: [crumbs([['Home', '/'], ['Flowers', '/flowers']])] });
  pages.push({ url: '/seasons', file: 'seasons.html', img: null,
    desc: "Japan's flowers through the four seasons: plum and cherry in spring, hydrangea and morning glory in summer, maple and chrysanthemum in autumn, camellia in winter.",
    ld: [crumbs([['Home', '/'], ['Seasons', '/seasons']])] });

  // the standalone information pages; AdSense and most readers expect these to be real, indexable pages
  [['privacy', 'Privacy policy', 'How this site handles your data: no cookies, no analytics, no trackers, and exactly which third parties can see a visit.'],
   ['terms', 'Terms of use', 'Terms for using Blooms of Japan, how photographs are licensed and credited, and how to ask for a correction or a takedown.'],
   ['about', 'About', 'Why this site covers the other forty-nine flowers rather than only cherry blossom, and where its bloom windows and prices come from.'],
   ['contact', 'Contact', 'How to report a wrong price, a changed bloom window, a miscredited photograph, or a spot that is missing.']
  ].forEach(([slug, title, desc]) => {
    pages.push({ url: `/${slug}`, file: `${slug}.html`, img: null, desc,
      ld: [crumbs([['Home', '/'], [title, `/${slug}`]])] });
  });

  D.flowerGroups.forEach(g => {
    const spots = D.feat.filter(f => f.fl.includes(g.k));
    const months = [...new Set(spots.map(f => f.m))].sort((a, b) => a - b).map(MonCap);
    pages.push({ url: `/flowers/${g.k}`, file: `flowers/${g.k}.html`, img: spots[0] && spots[0].img,
      desc: clip(`Where and when to see ${g.label.toLowerCase()} in Japan: ${spots.length} spot${spots.length === 1 ? '' : 's'}${months.length ? ', mostly ' + (months.length > 2 ? months[0] + ' to ' + months[months.length - 1] : months.join(' and ')) : ''}, including ${spots.slice(0, 3).map(f => f.name.replace(/\s*\(.*?\)/, '')).join(', ')}. Peak times and directions.`),
      ld: [{ '@type': 'CollectionPage', name: `${g.label} in Japan`, url: `${SITE}/flowers/${g.k}` }, itemList(`${g.label} spots in Japan`, spots),
           crumbs([['Home', '/'], ['Flowers', '/flowers'], [g.label, `/flowers/${g.k}`]])] });
  });

  for (let m = 1; m <= 12; m++) {
    const spots = D.feat.filter(f => f.m === m), fl = (D.flowers[m] || []).slice(0, 4).map(([n]) => n.toLowerCase());
    pages.push({ url: `/when/${MONTHS[m - 1]}`, file: `when/${MONTHS[m - 1]}.html`, img: spots[0] && spots[0].img,
      desc: clip(`What's in bloom in Japan in ${MonCap(m)}: ${spots.length} spots${fl.length ? ' — ' + fl.join(', ') : ''}. Peak times, photos and how to get to each one.`),
      ld: [{ '@type': 'CollectionPage', name: `Flowers in Japan in ${MonCap(m)}`, url: `${SITE}/when/${MONTHS[m - 1]}` }, itemList(`Spots in bloom in ${MonCap(m)}`, spots),
           crumbs([['Home', '/'], [MonCap(m), `/when/${MONTHS[m - 1]}`]])] });
  }

  D.feat.forEach(f => {
    const fl = flowerOf(f), k = (f.fl || [])[0];
    pages.push({ url: `/spots/${f.slug}`, file: `spots/${f.slug}.html`, img: f.img,
      desc: clip(`${f.name}${f.jp ? ' (' + f.jp + ')' : ''}: ${fl.toLowerCase()} in ${f.region}, best ${f.peak}. ${firstSentence(f.desc)}`),
      ld: [{ '@type': 'TouristAttraction', name: f.name, ...(f.jp ? { alternateName: f.jp } : {}), description: f.desc,
             url: `${SITE}/spots/${f.slug}`, image: [abs(f.img)].concat((f.gal || []).map(g => abs(g.i))),
             address: { '@type': 'PostalAddress', streetAddress: f.address, addressCountry: 'JP' },
             // the same coordinates the weather box uses: state where the spot is rather than leaving
             // it to be guessed from a Japanese street address
             ...(Array.isArray(f.ll) ? { geo: { '@type': 'GeoCoordinates', latitude: f.ll[0], longitude: f.ll[1] } } : {}),
             ...((f.tags || []).includes('free') ? { isAccessibleForFree: true } : {}),
             touristType: `${fl} viewing` },
           crumbs([['Home', '/'], [MonCap(f.m), `/when/${MONTHS[f.m - 1]}`], ...(k ? [[fl, `/flowers/${k}`]] : []), [f.name, `/spots/${f.slug}`]])] });
  });

  /* ---- a throwaway server: every address gets the app shell, files are served as files ---- */
  const TYPES = { '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json' };
  const srv = http.createServer((q, r) => {
    const p = decodeURIComponent(q.url.split('?')[0]);
    const ext = path.extname(p);
    if (!ext) { r.writeHead(200, { 'Content-Type': 'text/html' }); return r.end(shell); }
    if (/\.(webp|jpe?g|png)$/.test(p)) { r.writeHead(204); return r.end(); }   // images aren't needed to draw the page
    fs.readFile(path.join(OUT, p), (e, b) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream' }); r.end(b); });
  }).listen(0);
  const port = srv.address().port;

  const chrome = spawn(CHROME, ['--headless=new', '--hide-scrollbars', '--remote-debugging-port=9459', '--window-size=1440,900',
    '--user-data-dir=' + path.join(process.env.TEMP || '/tmp', 'cdp-prerender-' + Date.now()), 'about:blank']);
  let ws;
  for (let i = 0; i < 60 && !ws; i++) { await sleep(250); try { const l = await (await fetch('http://127.0.0.1:9459/json')).json(); const p = l.find(x => x.type === 'page'); if (p) ws = p.webSocketDebuggerUrl; } catch {} }
  if (!ws) throw new Error('Chrome did not start');
  const s = new WebSocket(ws); await new Promise(r => s.onopen = r);
  let id = 0; const pend = {}, errors = [];
  s.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; }
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception.description.split('\n')[0]); };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; s.send(JSON.stringify({ id: i, method, params })); });
  const ev = async x => (await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true })).result.result.value;
  await send('Runtime.enable');

  // what gets saved: the drawn page, minus the bits the scripts add again on load
  const SNAP = `(() => {
    const d = document.documentElement.cloneNode(true);
    d.classList.remove('rv-on');                                    // reveal-on-scroll: show everything in the saved copy
    d.querySelectorAll('.rv').forEach(e => e.classList.add('in'));
    d.querySelectorAll('link[rel="preload"][as="image"]').forEach(e => e.remove());
    d.querySelectorAll('.heroin').forEach(e => e.removeAttribute('style'));
    const sc = d.querySelector('#scrub'); if (sc) sc.className = 'scrub';
    // One H1 per page, and it should say what the page is about: on anything but the homepage the hero's
    // "The flower year in Japan" stays on screen as a styled line, not a heading (the scripts never redraw it).
    if (location.pathname !== '/') d.querySelectorAll('h1.hero-title').forEach(h => {
      const p = document.createElement('div'); p.className = 'hero-title'; p.innerHTML = h.innerHTML; h.replaceWith(p); });
    // On spot and seasons pages the homepage is hidden; its spot lists are drawn again on load, so the
    // saved copy leaves them out rather than repeating other spots' names on every page.
    const home = d.querySelector('#view-home');
    if (home && home.hidden) ['#feats', '#grid', '#gridhead', '#regions', '#flowers', '#flnote', '#mcount'].forEach(q => { const e = d.querySelector(q); if (e) e.innerHTML = ''; });
    // decoration the scripts redraw on load anyway (map outline, pins, painted flowers): no text in it, ~60 KB a page
    ['#land', '#halo'].forEach(q => { const e = d.querySelector(q); if (e) e.removeAttribute('d'); });
    // live weather is fetched fresh on every visit, never saved into the page
    d.querySelectorAll('.wxb').forEach(e => e.innerHTML = '');
    d.querySelectorAll('#wx').forEach(e => e.hidden = false);
    ['#pins', '#heroart', '#stageart', '#toolbloom'].forEach(q => { const e = d.querySelector(q); if (e) e.innerHTML = ''; });
    return { title: document.title, html: '<!doctype html>\\n' + d.outerHTML };
  })()`;

  let done = 0;
  for (const pg of pages) {
    const before = errors.length;
    await send('Page.navigate', { url: `http://127.0.0.1:${port}${pg.url}` });
    let snap = null;
    for (let t = 0; t < 40; t++) {
      await sleep(100);
      try { if (await ev(`document.readyState === 'complete' && !!document.getElementById('view-home') && document.title !== ''`)) break; } catch {}
    }
    await sleep(150);
    snap = await ev(SNAP);
    if (errors.length > before) throw new Error(`script error on ${pg.url}: ${errors.slice(before).join(' | ')}`);
    pg.title = snap.title;
    fs.mkdirSync(path.dirname(path.join(OUT, pg.file)), { recursive: true });
    fs.writeFileSync(path.join(OUT, pg.file), withHead(snap.html, pg));
    if (++done % 40 === 0) console.log('  pre-rendered', done, '/', pages.length);
  }
  s.close(); chrome.kill(); srv.close();

  // The 404 page is its own small document, with no router script: the app shell would treat an unknown
  // address as the homepage and swap the URL back to "/", so visitors would never see an error.
  const grab = (re, what) => { const m = shell.match(re); if (!m) throw new Error('404 page: ' + what + ' not found in shell'); return m[0]; };
  const fonts = grab(/<link rel="stylesheet" href="\/fonts\.css[^"]*">[\s\S]*?<link rel="stylesheet" href="\/styles\.css[^"]*">/, 'fonts and stylesheet');
  const mark = grab(/<svg width="28" height="28"[\s\S]*?<\/svg>/, 'brand mark');
  const foot = grab(/<footer class="foot">[\s\S]*?<\/footer>/, 'footer')
    .replace('<div id="fflowers"></div>', '<div id="fflowers">' + D.flowerGroups.slice(0, 6)
      .map(g => `<a href="/flowers/${g.k}">${g.label} <span>${g.n}</span></a>`).join('') + '</div>')
    .replace('<span id="fyear">2026</span>', '<span id="fyear">' + new Date().getFullYear() + '</span>');
  fs.writeFileSync(path.join(OUT, '404.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found | Blooms of Japan</title>
<meta name="robots" content="noindex">
<meta name="theme-color" content="#F6F0E3">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>[hidden]{display:none!important}img{max-width:100%}</style>
${fonts}
<style>
  .nf-bar{ display:flex; align-items:center; gap:10px; padding:14px 28px; border-bottom:1px solid var(--gold-line); }
  .nf-bar a{ display:flex; align-items:center; gap:10px; text-decoration:none; color:var(--navy); }
  .nf-bar .bn{ font-family:var(--serif); font-size:24px; font-weight:600; }
  .nf-bar .bk{ font-family:var(--jp); font-size:12px; letter-spacing:.24em; color:var(--gold); }
  .nf{ max-width:640px; margin:0 auto; padding:84px 24px 40px; text-align:center; }
  .nf-code{ font-family:var(--serif); font-size:clamp(96px,22vw,168px); line-height:1; font-weight:500;
    color:var(--gold); letter-spacing:.04em; font-variant-numeric:lining-nums; margin:0; }
  .nf-jp{ font-family:var(--jp); font-size:13px; letter-spacing:.28em; color:var(--acc); margin:10px 0 0; }
  .nf h1{ font-size:clamp(30px,5vw,42px); margin:22px 0 12px; color:var(--navy); }
  .nf p.lead{ margin:0 auto; max-width:46ch; font-size:16px; line-height:1.75; color:var(--muted); }
  .nf-go{ display:inline-block; margin-top:30px; padding:14px 34px; background:var(--navy); color:#F6F0E3;
    font-family:var(--serif); font-size:18px; font-weight:600; letter-spacing:.05em; text-decoration:none; transition:background .2s; }
  .nf-go:hover{ background:var(--acc); }
  .nf-or{ margin:44px 0 14px; font-family:var(--serif); font-size:12px; font-weight:600; letter-spacing:.24em;
    text-transform:uppercase; color:var(--gold); }
  .nf-links{ display:flex; flex-wrap:wrap; justify-content:center; gap:10px 12px; }
  .nf-links a{ padding:8px 18px; border:1px solid var(--gold-line); color:var(--navy); text-decoration:none;
    font-size:14px; transition:background .18s,border-color .18s; }
  .nf-links a:hover{ background:var(--gold-soft); border-color:var(--gold); }
  @media (max-width:560px){ .nf-bar{ padding:12px 18px; } .nf{ padding-top:56px; } }
</style>
</head>
<body>
<header class="nf-bar"><a href="/" aria-label="Blooms of Japan, home">${mark}<span class="bn">Blooms of Japan</span><span class="bk">花暦</span></a></header>
<main class="nf">
  <p class="nf-code" aria-hidden="true">404</p>
  <p class="nf-jp">ページが見つかりません</p>
  <h1>This page has blown away</h1>
  <p class="lead">The address may be mistyped, or the spot may have moved. The flowers are all still here, so let's get you back to them.</p>
  <a class="nf-go" href="/">Back to home</a>
  <p class="nf-or">Or look around</p>
  <nav class="nf-links" aria-label="Pages">
    <a href="/calendar">The flower calendar</a><a href="/spots">Browse all spots</a><a href="/flowers">By flower</a><a href="/seasons">Four seasons</a>
  </nav>
</main>
${foot}
</body>
</html>
`);

  const today = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + pages.map(p => `  <url><loc>${SITE}${p.url === '/' ? '/' : p.url}</loc><lastmod>${today}</lastmod></url>`).join('\n') + '\n</urlset>\n');
  return pages;

  function withHead(html, pg) {
    const url = SITE + (pg.url === '/' ? '/' : pg.url);
    const img = abs(pg.img);
    const tags = [
      `<meta name="description" content="${attr(pg.desc)}">`,
      `<link rel="canonical" href="${attr(url)}">`,
      pg.noindex ? '<meta name="robots" content="noindex">' : '',
      `<meta property="og:title" content="${attr(pg.title)}">`,
      `<meta property="og:description" content="${attr(pg.desc)}">`,
      `<meta property="og:url" content="${attr(url)}">`,
      `<meta property="og:image" content="${attr(img)}">`,
      pg.ld.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': pg.ld }).replace(/</g, '\\u003c')}</script>` : '',
      // AdSense: added after the snapshot, so it never runs in the headless browser and can't
      // leave ad markup baked into the saved pages
      '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6449041648416680" crossorigin="anonymous"></script>',
    ].filter(Boolean).join('\n');
    return html
      .replace(/<title>[^<]*<\/title>/, `<title>${attr(pg.title).replace(/&quot;/g, '"')}</title>`)
      .replace(/<meta name="description"[^>]*>\s*/, '')
      .replace(/<link rel="canonical"[^>]*>\s*/, '')
      .replace(/<meta property="og:(title|description|url|image)"[^>]*>\s*/g, '')
      .replace('</head>', tags + '\n</head>');
  }
};
