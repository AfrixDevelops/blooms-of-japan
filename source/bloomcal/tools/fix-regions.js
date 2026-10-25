// Region labels for the rewritten spots, matched to how the rest of the site files each prefecture,
// and the leftover "est" flag on rows whose photo credit came after it.
const fs = require('fs'), path = require('path');
const P = path.join(__dirname, '..', '..', 'bloomjapan', 'index.html');
let s = fs.readFileSync(P, 'utf8');
const FIX = { 1003: 'Mt. Fuji & Central', 1004: 'Tokyo Area', 1015: 'Tokyo Area', 1028: 'Tokyo Area', 1047: 'Mt. Fuji & Central', 1060: 'Mt. Fuji & Central' };
for (const [id, region] of Object.entries(FIX)) {
  const a = s.indexOf(' {id:' + id + ','), b = s.indexOf('},', a);
  if (a < 0) throw new Error('row ' + id);
  const row = s.slice(a, b), fixed = row.replace('region:"Kanto"', 'region:"' + region + '"');
  if (row === fixed) throw new Error('region not Kanto in ' + id);
  s = s.slice(0, a) + fixed + s.slice(b);
}
for (const id of [1003, 1004, 1008, 1009]) {
  const a = s.indexOf(' {id:' + id + ','), b = s.indexOf('},', a);
  const row = s.slice(a, b), fixed = row.split(',est:1').join('');
  if (row === fixed) throw new Error('no est in ' + id);
  s = s.slice(0, a) + fixed + s.slice(b);
}
fs.writeFileSync(P, s);
console.log('regions fixed', Object.keys(FIX).length, '| est flags cleared 4');
