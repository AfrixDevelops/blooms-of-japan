// Checks the proposed flower categories against every spot in the dataset.
const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
const js = h.slice(h.lastIndexOf('<script>') + 8, h.lastIndexOf('</script>'));
(0, eval)(js.match(/const DATA = \[[\s\S]*?\n\];/)[0].replace('const DATA', 'globalThis.DATA'));

const CATS = [
  { key: 'sakura',     label: 'Cherry Blossom', match: ['cherry', 'sakura'] },
  { key: 'tulip',      label: 'Tulip',          match: ['tulip'] },
  { key: 'rose',       label: 'Rose',           match: ['rose'] },
  { key: 'lavender',   label: 'Lavender',       match: ['lavender'] },
  { key: 'wisteria',   label: 'Wisteria',       match: ['wisteria'] },
  { key: 'spiderlily', label: 'Spider Lily',    match: ['spider lily', 'higanbana'] },
  { key: 'sunflower',  label: 'Sunflower',      match: ['sunflower', 'himawari'] },
  { key: 'shibazakura',label: 'Moss Phlox',     match: ['shibazakura', 'moss phlox', 'pink moss'] },
  { key: 'plum',       label: 'Plum Blossom',   match: ['plum', 'ume'] },
  { key: 'peony',      label: 'Peony',          match: ['peony', 'botan'] },
  { key: 'lotus',      label: 'Lotus',          match: ['lotus', 'hasu'] },
  { key: 'hydrangea',  label: 'Hydrangea',      match: ['hydrangea', 'ajisai'] },
  { key: 'camellia',   label: 'Camellia',       match: ['camellia', 'tsubaki'] },
  { key: 'kiku',       label: 'Chrysanthemum',  match: ['chrysanthemum', 'kiku'] },
  { key: 'cosmos',     label: 'Cosmos',         match: ['cosmos'] },
  { key: 'narcissus',  label: 'Narcissus',      match: ['narcissus', 'daffodil'] },
  { key: 'iris',       label: 'Iris',           match: ['iris', 'hanashobu'] },
  { key: 'azalea',     label: 'Azalea',         match: ['azalea', 'tsutsuji'] },
  { key: 'lily',       label: 'Lily',           match: ['lily'], not: ['spider'] },
  { key: 'nanohana',   label: 'Rapeseed',       match: ['rape blossom', 'rapeseed', 'nanohana'] },
  { key: 'begonia',    label: 'Begonia',        match: ['begonia'] },
  { key: 'nemophila',  label: 'Nemophila',      match: ['nemophila'] },
  { key: 'kochia',     label: 'Kochia',         match: ['kochia'] },
  { key: 'momiji',     label: 'Autumn Leaves',  match: ['autumn foliage', 'momiji'] },
  { key: 'mixed',      label: 'Mixed Gardens',  match: ['various', 'spring flowers', 'tropical', 'greenery'] },
];

const catsOf = d => {
  const f = d.flower.toLowerCase();
  return CATS.filter(c => c.match.some(m => f.includes(m)) && !(c.not || []).some(n => f.includes(n)));
};

console.log('category'.padEnd(18) + 'spots');
let unmatched = [];
for (const c of CATS) {
  const n = DATA.filter(d => catsOf(d).includes(c)).length;
  console.log(c.label.padEnd(18) + n + (n === 0 ? '   <-- EMPTY' : ''));
}
DATA.forEach(d => { if (!catsOf(d).length) unmatched.push(`${d.name} [${d.flower}]`); });

console.log('\ncategories:', CATS.length);
console.log('spots matching >=1 category:', DATA.filter(d => catsOf(d).length).length, '/', DATA.length);
console.log('unmatched:', unmatched.length ? '\n  ' + unmatched.join('\n  ') : 'none');

// sanity: Lily must not swallow Spider Lily, and vice versa
const sl = DATA.filter(d => /spider lily/i.test(d.flower));
console.log('\nspider-lily spots also tagged plain Lily:',
  sl.filter(d => catsOf(d).some(c => c.key === 'lily')).length, '(must be 0)');
const multi = DATA.filter(d => catsOf(d).length > 1);
console.log('spots in multiple categories:', multi.length);
multi.forEach(d => console.log('   ', d.flower, '->', catsOf(d).map(c => c.label).join(' + ')));
