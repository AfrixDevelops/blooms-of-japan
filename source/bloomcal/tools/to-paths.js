// One-off: moves the site from #/ hash addresses to real paths (/spots/mother-farm).
// Exact-string replacements only, and each one must be found, so nothing changes silently.
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..');
const R = (file, pairs) => {
  const p = path.join(dir, file);
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(file + ': missing ' + a.slice(0, 80));
    s = s.split(a).join(b);
  }
  fs.writeFileSync(p, s);
  console.log(file, 'ok', pairs.length);
};

R('index.src.html', [
  ["h=location.hash.match(/^#\\/(spring|summer|autumn|winter)$/),",
   "h=location.search.match(/[?&]season=(spring|summer|autumn|winter)\\b/),"],
  ['<a href="#/calendar" data-nav="calendar">', '<a href="/calendar" data-nav="calendar">'],
  ['<a href="#/spots" data-nav="spots">', '<a href="/spots" data-nav="spots">'],
  ['<a href="#/flowers" data-nav', '<a href="/flowers" data-nav'],
  ['href="#/seasons"', 'href="/seasons"'],
  ['<a class="feat" href="#/spots/${f.slug}">', '<a class="feat" href="/spots/${f.slug}">'],
  ['<a class="seeall" href="#/when/${MON[m].toLowerCase()}">', '<a class="seeall" href="/when/${MON[m].toLowerCase()}">'],
  ['return `<a class="card" href="#/spots/${f.slug}">', 'return `<a class="card" href="/spots/${f.slug}">'],
  ["href=\"#/${g && g.k === x.k ? 'spots' : 'flowers/' + x.k}\"", "href=\"/${g && g.k === x.k ? 'spots' : 'flowers/' + x.k}\""],
  ["clear.addEventListener('click', () => { history.replaceState(null, '', '#/spots'); renderGrid(0); });",
   "clear.addEventListener('click', () => { history.replaceState(null, '', '/spots'); renderGrid(0); });"],
  ['<a class="fchip" href="#/flowers/${x.k}">', '<a class="fchip" href="/flowers/${x.k}">'],
  ["history.replaceState(history.state, '', '#/spots'); renderGrid(0);", "history.replaceState(history.state, '', '/spots'); renderGrid(0);"],
  ["history.replaceState(history.state, '', '#/search/' + encodeURIComponent(raw.trim()));",
   "history.replaceState(history.state, '', '/spots?q=' + encodeURIComponent(raw.trim()));"],
  ["location.hash = '#/spots/' + lastList[0].slug;", "go('/spots/' + lastList[0].slug);"],
  // internal links are handled in the page: pushState instead of a full reload
  ["const a = e.target.closest && e.target.closest('a[href^=\"#/\"]');",
   "const a = e.target.closest && e.target.closest('a[href^=\"/\"]');"],
  ["if (a.getAttribute('href') === location.hash) { e.preventDefault(); history.replaceState(null, '', location.hash); route(); }",
   "if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target || /\\.[a-z0-9]+$/i.test(a.pathname)) return;\n  e.preventDefault(); go(a.getAttribute('href'));"],
  ["const cur = location.hash.startsWith('#/seasons') ? 'seasons'", "const cur = location.pathname.startsWith('/seasons') ? 'seasons'"],
  [": inView('tool') ? (location.hash.startsWith('#/flowers') ? 'flowers' : 'spots') : '';",
   ": inView('tool') ? (location.pathname.startsWith('/flowers') ? 'flowers' : 'spots') : '';"],
]);

R('hero.js', [
  ["`<a href=\"#/${k === auto ? '' : k}\"", "`<a href=\"/${k === auto ? '' : '?season=' + k}\""],
  ["Season comes from today's date; #/spring, #/summer etc. preview another.", "Season comes from today's date; /?season=spring etc. previews another."],
]);

R('build-router.js', [
  ["'href=\"#/spots/${f.slug}\"'", "'href=\"/spots/${f.slug}\"'"],
  ['<nav class="crumbs"><a href="#/">Home</a> › <a href="#/">\\${MON[f.m]}</a> › \\${esc(f.name)}</nav>',
   '<nav class="crumbs"><a href="/">Home</a> › <a href="/when/\\${MON[f.m].toLowerCase()}">\\${MON[f.m]}</a> › <a href="/flowers/\\${f.fl[0]}">\\${esc(flowerName(f))}</a> › \\${esc(f.name)}</nav>'],
  ['<a class="card rv" href="#/spots/\\${nb.slug}">', '<a class="card rv" href="/spots/\\${nb.slug}">'],
  ['<nav class="crumbs" style="padding-left:0"><a href="#/">Home</a> › All four seasons</nav>',
   '<nav class="crumbs" style="padding-left:0"><a href="/">Home</a> › All four seasons</nav>'],
  ['<a href="#/\\${k}" aria-label=', '<a href="/?season=\\${k}" aria-label='],
]);
