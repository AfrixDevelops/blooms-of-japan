// Runs the page's real scripts against a tiny DOM stub and exercises each route.
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const ids = [...new Set([...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]))];
const nodes = {};
ids.forEach(id => nodes[id] = {
  id, innerHTML: '', textContent: '', hidden: false, style: {}, children: [],
  classList: { add(){}, remove(){}, toggle(){} },
  setAttribute(){}, getAttribute(){ return null; },
  querySelector(){ return { style:{} }; }, querySelectorAll(){ return []; },
  closest(){ return { classList:{ toggle(){} } }; },
  getBoundingClientRect: () => ({ top: 0, height: 800 }),
  offsetTop: 0, offsetHeight: 4000, clientWidth: 1200,
  addEventListener(){},
});

let hash = '';
global.window = {
  addEventListener(){}, scrollTo(){}, innerHeight: 900,
  get location(){ return global.location; },
};
global.location = { pathname:'/', search:'', hash:'' };
Object.defineProperty(global.location, 'hash', { get: () => hash, set: v => { hash = v; } });
const setUrl = u => { if (u == null) return; const m = String(u).match(/^([^?#]*)(\?[^#]*)?(#.*)?$/); global.location.pathname = m[1] || '/'; global.location.search = m[2] || ''; hash = m[3] || ''; };
global.document = {
  getElementById: id => nodes[id] || null,
  querySelectorAll: () => [],
  addEventListener(){},
  body: { style: {} },
  title: '',
};
global.history = { state: null, replaceState(s, t, u){ setUrl(u); }, pushState(s, t, u){ setUrl(u); } };

// load the page's scripts in order: data.js, hero.js, then the inline one
eval(fs.readFileSync('data.js', 'utf8'));
global.D = global.window.D;
eval(fs.readFileSync('hero.js', 'utf8'));
global.HeroArt = global.window.HeroArt;

const inline = html.slice(html.lastIndexOf('<script>') + 8, html.lastIndexOf('</script>'));
eval(inline);

function visit(h) {
  setUrl(h);
  route();
  return { home: nodes['view-home'].hidden, spot: nodes['view-spot'].hidden, seas: nodes['view-seasons'].hidden };
}

console.log('route       home spot seasons   rendered');
let fail = 0;
[['/', 'home'], ['/?season=spring', 'home'], ['/seasons', 'seas'], ['/spots/kenrokuen', 'spot'], ['/spots/oishi-park', 'spot'], ['/when/april', 'home'], ['/calendar', 'home'], ['/spots', 'home'], ['/flowers', 'home'], ['/flowers/wisteria', 'home'], ['/spots/meguro-river', 'spot'], ['/spots?q=kochia', 'home'], ['/spots?q=zzzz', 'home'], ['/#/spots/kenrokuen', 'spot'], ['/#/search/kochia', 'home'], ['/#/winter', 'home']]
  .forEach(([h, expect]) => {
    const v = visit(h);
    const visible = !v.home ? 'home' : !v.spot ? 'spot' : !v.seas ? 'seas' : 'none';
    const body = visible === 'spot' ? nodes['view-spot'].innerHTML
               : visible === 'seas' ? nodes['view-seasons'].innerHTML : '(home)';
    // home is static markup in the page; the other two are injected, so only they need content
    const ok = visible === expect && (visible === 'home' || body.length > 10);
    if (!ok) fail++;
    console.log(h.padEnd(22), String(v.home)[0], '   ', String(v.spot)[0], '   ', String(v.seas)[0],
      '    ', visible.padEnd(5), body === '(home)' ? '' : body.length + ' chars', ok ? '' : '  <-- FAIL');
  });

// the seasons view must contain all four scenes
go('#/seasons');
const s = nodes['view-seasons'].innerHTML;
console.log('\nseasons view: svgs =', (s.match(/<svg/g) || []).length,
  '| spring', s.includes('Spring'), '| summer', s.includes('Summer'),
  '| autumn', s.includes('Autumn'), '| winter', s.includes('Winter'));

// a spot view must carry the real content
go('#/spots/kenrokuen');
const sp = nodes['view-spot'].innerHTML;
console.log('spot view: has hero img', /<img src="img\//.test(sp),
  '| gallery', (sp.match(/dthumbs/g) || []).length > 0,
  '| sidebar', sp.includes('Best time to go'),
  '| nearby links', (sp.match(/class="card rv" href="\/spots\//g) || []).length);

console.log('\n' + (fail ? fail + ' ROUTE(S) FAILED' : 'all routes OK'));
process.exit(fail ? 1 : 0);
