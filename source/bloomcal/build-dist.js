// Builds the production site from the app build (index.html) into <outDir>:
//   1. a proper HTML document with the search/social tags the artifact viewer used to supply
//   2. only the images the site uses, every asset URL absolute (/img/…) and version-stamped
//   3. a pre-rendered page per address (/spots/<slug>, /flowers/<key>, /when/<month>, …),
//      each with its own title, description, canonical URL, social image and structured data
//   4. sitemap.xml listing all of them, robots.txt, 404.html, favicon
// Usage: node build-dist.js <outDir>
// SITE is the address search engines are told to use. Until bloomsofjapan.com is bought it is the
// Vercel address; once the domain is live, build with BLOOMS_SITE=https://bloomsofjapan.com
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const prerender = require('./tools/prerender.js');
const { KEY: INDEXNOW_KEY } = require('./tools/indexnow.js');
const OUT = path.resolve(process.argv[2] || '../dist');
const SITE = (process.env.BLOOMS_SITE || 'https://blooms-of-japan.vercel.app').replace(/\/$/, '');
const TITLE = 'Blooms of Japan — The flower year in Japan';
// the spot count, read from the data rather than typed, so the description cannot go stale
const FEAT_COUNT = (() => { const prev = global.window; global.window = {};
  eval(fs.readFileSync('data.js', 'utf8')); const n = global.window.D.feat.length;
  global.window = prev; return n; })();
const DESC = 'When and where to see flowers in Japan, month by month: cherry and plum blossom, wisteria, ' +
  'nemophila, kochia, hydrangea, ginkgo, autumn leaves and more, across ' + FEAT_COUNT +
  ' spots with peak times and how to get there.';

const page = fs.readFileSync('index.html', 'utf8');
const cut = '<link rel="stylesheet" href="styles.css">';
const at = page.indexOf(cut);
if (at < 0) throw new Error('stylesheet link not found');
const head = page.slice(0, at + cut.length).replace(/<meta name="viewport"[^>]*>\s*/, '').replace(/<title>[^<]*<\/title>\s*/, '');
const body = page.slice(at + cut.length);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${TITLE}</title>
<meta name="description" content="${DESC}">
<link rel="canonical" href="${SITE}/">
<meta name="theme-color" content="#F6F0E3">
<meta name="msvalidate.01" content="E4DB9D6840072792C05DB04A7C6D1023">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Blooms of Japan">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${DESC}">
<meta property="og:url" content="${SITE}/">
<meta property="og:image" content="${SITE}/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Blooms of Japan — the flower year in Japan, one scroll at a time">
<meta name="twitter:card" content="summary_large_image">
<style>[hidden]{display:none!important}img{max-width:100%}</style>
${head.trim()}
</head>
<body>
${body.trim()}
</body>
</html>
`;

// empty the folder rather than delete it, so a terminal open inside it can't block the build
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) fs.rmSync(path.join(OUT, f), { recursive: true, force: true });
for (const f of ['styles.css', 'data.js', 'hero.js']) fs.copyFileSync(f, path.join(OUT, f));
// self-hosted web fonts: the stylesheet sits beside the other css, the woff2 subsets under /fonts/
fs.copyFileSync('fonts/fonts.css', path.join(OUT, 'fonts.css'));
fs.mkdirSync(path.join(OUT, 'fonts'), { recursive: true });
for (const f of fs.readdirSync('fonts').filter(f => f.endsWith('.woff2'))) fs.copyFileSync(path.join('fonts', f), path.join(OUT, 'fonts', f));

// only the images the site actually references
global.window = {}; eval(fs.readFileSync('data.js', 'utf8'));
const D = window.D, need = new Set();
D.feat.forEach(f => { need.add(f.img); need.add(f.th); (f.gal || []).forEach(g => need.add(g.i)); });
for (const k of ['sakura', 'ume', 'ajisai', 'asagao', 'momiji', 'kiku', 'tsubaki', 'suisen']) { need.add(`art/${k}.webp`); need.add(`art/${k}-sm.webp`); }
need.add('art/washi.svg');
const missing = [...need].filter(p => !fs.existsSync(p));
if (missing.length) throw new Error('missing assets: ' + missing.join(', '));
for (const p of need) { fs.mkdirSync(path.dirname(path.join(OUT, p)), { recursive: true }); fs.copyFileSync(p, path.join(OUT, p)); }

// Every asset URL is absolute (pages now live at /spots/<slug>, so "img/x.jpg" would point at
// /spots/img/x.jpg) and gets ?v=<content hash>: images are cached for a week, and the hash only
// changes when the file does, so a replaced photo shows up straight away.
const ver = p => crypto.createHash('md5').update(fs.readFileSync(path.join(OUT, p))).digest('hex').slice(0, 8);
const stamp = p => p ? `/${p}?v=${ver(p)}` : p;
D.feat.forEach(f => { f.img = stamp(f.img); f.th = stamp(f.th); (f.gal || []).forEach(g => { g.i = stamp(g.i); }); });
fs.writeFileSync(path.join(OUT, 'data.js'), 'window.D = ' + JSON.stringify(D) + ';\n');
// the seasonal flower art is addressed inside the scripts as "art/…"
const absArt = s => s.replace(/(["'`])art\//g, '$1/art/');
fs.writeFileSync(path.join(OUT, 'hero.js'), absArt(fs.readFileSync(path.join(OUT, 'hero.js'), 'utf8')));
let idx = absArt(html);
for (const f of ['styles.css', 'hero.js', 'data.js', 'fonts.css']) idx = idx.split(`"${f}"`).join(`"${stamp(f)}"`);
fs.writeFileSync(path.join(OUT, 'index.html'), idx);

// social card: the drawn 1200x630 card, which is the shape every platform crops to.
// Rebuild it with `node tools/make-og.js` whenever the spot or flower counts move.
if (!fs.existsSync('og-card.jpg')) throw new Error('og-card.jpg missing — run: node tools/make-og.js');
fs.copyFileSync('og-card.jpg', path.join(OUT, 'og.jpg'));

fs.writeFileSync(path.join(OUT, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-16 -16 32 32"><circle r="15.4" fill="#F6F0E3"/><g fill="none" stroke="#B08A4F" stroke-width="1.4">
<circle r="15"/><g id="p"><path d="M0 -1.6C-3.6 -3.2 -4.8 -7.6 -2.6 -10.4L0 -8.8 2.6 -10.4C4.8 -7.6 3.6 -3.2 0 -1.6Z"/></g>
<use href="#p" transform="rotate(72)"/><use href="#p" transform="rotate(144)"/><use href="#p" transform="rotate(216)"/><use href="#p" transform="rotate(288)"/></g>
<circle r="1.8" fill="#B08A4F"/></svg>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
// proves IndexNow pings (tools/indexnow.js) come from the site's owner
fs.writeFileSync(path.join(OUT, INDEXNOW_KEY + '.txt'), INDEXNOW_KEY);

const size = d => fs.readdirSync(d).reduce((s, f) => { const p = path.join(d, f); return s + (fs.statSync(p).isDirectory() ? size(p) : fs.statSync(p).size); }, 0);
const count = d => fs.readdirSync(d).reduce((s, f) => { const p = path.join(d, f); return s + (fs.statSync(p).isDirectory() ? count(p) : 1); }, 0);

(async () => {
  const pages = await prerender(OUT, { SITE, D, HOME_DESC: DESC });
  console.log('pre-rendered', pages.length, 'pages for', SITE);
  // Guard: a relative image/art path works on the home page but breaks on every nested address
  // (/when/january, /spots/x, ...), so the build fails if one slips back in.
  const REL = /(?:src|href|srcset|imagesrcset)\s*=\s*["'`]\s*(?:img|th|gal|art|new)\/|['"`](?:img|th|gal|art|new)\/[\w.-]*\.(?:webp|jpe?g|png|svg)|\d+w,\s*(?:img|th|gal|art)\//;
  const walk = d => fs.readdirSync(d).flatMap(f => { const p = path.join(d, f); return fs.statSync(p).isDirectory() ? walk(p) : [p]; });
  const offenders = walk(OUT).filter(f => /\.(html|js)$/.test(f)).filter(f => REL.test(fs.readFileSync(f, 'utf8')));
  if (offenders.length) { console.error('relative asset path in:', offenders.slice(0, 5).map(f => path.relative(OUT, f)).join(', ')); process.exit(1); }
  console.log('asset paths       : all absolute');
  console.log('built', OUT, '|', count(OUT), 'files |', (size(OUT) / 1048576).toFixed(1), 'MB');
})().catch(e => { console.error(e); process.exit(1); });
