// Can bloom month be derived from flower type + latitude alone?
// Ground truth = the 90 hand-curated spots. If this can't reproduce those,
// it has no business generating months for new spots.
const fs = require('fs');
const rows = require('./rows.json');

// base month at ~35°N (Tokyo latitude), from established flowering seasons.
// ORDER MATTERS — the most specific variety must be tested first, or
// "Red Spider Lily" matches the plain Lily rule and lands in June.
const BASE = [
  // forced / cultivar-specific varieties, tested before their general flower
  [/winter peony|kan.?botan/i,     1],
  [/winter/i,                     12],
  [/kawazu/i,                      2],
  [/spider lily|higanbana|manjushage/i, 9],
  [/plum|ume|梅/i,                 2],
  [/cherry|sakura|桜/i,            4],
  [/nemophila/i,                   4],
  [/tulip/i,                       4],
  [/azalea|tsutsuji/i,             4],
  [/rape|nanohana|菜の花/i,         3],
  [/shibazakura|moss phlox|pink moss/i, 4],
  [/wisteria|藤/i,                 5],
  [/peony|botan/i,                 5],
  [/rose/i,                        5],
  [/iris|hanashobu/i,              6],
  [/hydrangea|ajisai/i,            6],
  [/lily/i,                        6],
  [/lavender/i,                    7],
  [/lotus|hasu/i,                  7],
  [/sunflower|himawari/i,          8],
  [/cosmos/i,                     10],
  [/kochia/i,                     10],
  [/chrysanthemum|kiku/i,         11],
  [/autumn|momiji|紅葉/i,          11],
  [/camellia|tsubaki/i,           12],
  [/begonia/i,                    12],
  [/narcissus|daffodil/i,          1],
];
const AUTUMN = /autumn|momiji|紅葉|kochia|cosmos|chrysanthemum/i;

function derive(flower, lat) {
  const hit = BASE.find(([re]) => re.test(flower));
  if (!hit) return null;
  let m = hit[1];
  // spring/summer blooms run later further north; autumn colour runs earlier
  const shift = (lat - 35) * (AUTUMN.test(flower) ? -0.10 : 0.13);
  m = Math.round(m + shift);
  return ((m - 1 + 24) % 12) + 1;
}

let hit0 = 0, hit1 = 0, miss = 0, none = 0;
const misses = [];
for (const r of rows) {
  const p = derive(r.flower, r.lat);
  if (p == null) { none++; continue; }
  const d = Math.min(Math.abs(p - r.month), 12 - Math.abs(p - r.month));
  if (d === 0) hit0++;
  else if (d === 1) hit1++;
  else { miss++; misses.push(`${r.name.slice(0,26).padEnd(28)} ${r.flower.slice(0,22).padEnd(24)} lat ${r.lat.toFixed(1)}  actual ${r.month} predicted ${p}`); }
}
const scored = hit0 + hit1 + miss;
console.log('spots scored:', scored, '| unmatched flower:', none);
console.log(`exact month      : ${hit0}  (${Math.round(100*hit0/scored)}%)`);
console.log(`within +/- 1 mo  : ${hit0 + hit1}  (${Math.round(100*(hit0+hit1)/scored)}%)`);
console.log(`off by 2+ months : ${miss}  (${Math.round(100*miss/scored)}%)`);
console.log('\nworst cases:');
misses.slice(0, 14).forEach(m => console.log('  ' + m));
