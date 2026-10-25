// Pulls the 25 flower icons out of the app and maps each month's flower names to one.
const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
const js = h.slice(h.lastIndexOf('<script>') + 8, h.lastIndexOf('</script>'));

// the icon map is built with helper fns (ring/ringC/ringP/stem/leaf) — evaluate the whole prelude
const prelude = js.slice(0, js.indexOf('const DATA ='));
(0, eval)(prelude.replace(/^const /gm, 'globalThis.').replace(/^let /gm, 'globalThis.'));

const icons = globalThis.F;
console.log('icons found:', Object.keys(icons).length);

// flower label -> icon key. Order matters: specific before general.
const MAP = [
  [/winter peony|kan.?botan/i, 'peony'], [/peony|botan/i, 'peony'],
  [/spider lily|higanbana|manjushage/i, 'spiderlily'],
  [/kawazu|cherry|sakura/i, 'sakura'],
  [/plum|ume/i, 'plum'],
  [/shibazakura|moss phlox|pink moss/i, 'shibazakura'],
  [/nemophila/i, 'nemophila'], [/kochia/i, 'kochia'],
  [/tulip/i, 'tulip'], [/rose/i, 'rose'], [/lavender/i, 'lavender'],
  [/wisteria|fuji/i, 'wisteria'], [/hydrangea|ajisai/i, 'hydrangea'],
  [/iris|hanashobu|ayame/i, 'iris'], [/azalea|tsutsuji/i, 'azalea'],
  [/sunflower|himawari/i, 'sunflower'], [/cosmos/i, 'cosmos'],
  [/chrysanthemum|kiku/i, 'kiku'], [/autumn|momiji|foliage/i, 'momiji'],
  [/camellia|tsubaki/i, 'camellia'], [/narcissus|daffodil/i, 'narcissus'],
  [/rapeseed|nanohana|rape blossom/i, 'nanohana'], [/begonia/i, 'begonia'],
  [/lotus|hasu/i, 'lotus'], [/lily/i, 'lily'],
  [/.*/, 'mixed'],
];
const keyFor = name => MAP.find(([re]) => re.test(name))[1];

// check every flower label used by the calendar resolves to a real icon
const cal = require('../bloomcal/data.json');
const labels = new Set();
Object.values(cal.flowers).forEach(arr => arr.forEach(([n]) => labels.add(n)));
const resolved = {};
let missing = [];
[...labels].forEach(n => {
  const k = keyFor(n);
  if (!icons[k]) missing.push(n + ' -> ' + k);
  resolved[n] = k;
});
console.log('distinct flower labels:', labels.size, '| unresolved:', missing.join(', ') || 'none');
console.log('mapping sample:', Object.entries(resolved).slice(0, 8).map(([a, b]) => `${a}=${b}`).join(', '));

// only ship the icons actually used
const used = {};
Object.values(resolved).forEach(k => { used[k] = icons[k]; });
console.log('icons shipped:', Object.keys(used).length);

cal.icons = used;
cal.iconOf = resolved;
fs.writeFileSync('../bloomcal/data.json', JSON.stringify(cal));
console.log('data KB:', Math.round(JSON.stringify(cal).length / 1024));
