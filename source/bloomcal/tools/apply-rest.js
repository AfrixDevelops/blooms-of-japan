// Applies the researched copy in content-rest.js to the non-cherry spots (by id), marks each row ed:1,
// and removes the rows listed in REMOVE along with their galleries.
const fs = require('fs'), path = require('path');
const C = require('./content-rest.js');
const P = path.join(__dirname, '..', '..', 'bloomjapan', 'index.html');
let s = fs.readFileSync(P, 'utf8');
const q = v => JSON.stringify(v);

const rowAt = id => {
  const a = s.indexOf(' {id:' + id + ','); if (a < 0) throw new Error('no row ' + id);
  // a row ends at the first "}," that is not inside the gal:[...] list
  let b = a, depth = 0, inStr = false;
  for (; b < s.length; b++) {
    const c = s[b];
    if (inStr) { if (c === '\\') b++; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === '{' || c === '[') depth++;
    else if (c === '}' || c === ']') { depth--; if (!depth) break; }
  }
  return [a, b];   // b points at the row's closing brace
};

let n = 0;
for (const [id, t] of Object.entries(C)) {
  if (id === 'REMOVE') continue;
  const at = rowAt(id);
  let row = s.slice(...at);
  const set = (k, v) => {
    const re = new RegExp(k + ':"(?:[^"\\\\]|\\\\.)*"');
    if (re.test(row)) row = row.replace(re, k + ':' + q(v));
    else row = row.replace(/(region:"[^"]*",)/, '$1' + k + ':' + q(v) + ',');
    if (!row.includes(k + ':' + q(v))) throw new Error(id + ' could not set ' + k);
  };
  for (const k of ['desc', 'peak', 'station', 'address', 'name', 'flower', 'jp']) if (t[k] !== undefined) set(k, t[k]);
  if (t.month) row = row.replace(/month:\d+,/, 'month:' + t.month + ',');
  if (!/,ed:1/.test(row)) row += ',ed:1';
  s = s.slice(0, at[0]) + row + s.slice(at[1]);
  n++;
}

let r = 0;
for (const id of Object.keys(C.REMOVE || {})) {
  if (s.indexOf(' {id:' + id + ',') < 0) continue;
  const [a, b] = rowAt(id);
  let e = b + 1; if (s[e] === ',') e++; if (s[e] === '\n') e++;
  const start = s.lastIndexOf('\n', a) + 1;
  s = s.slice(0, start) + s.slice(e);
  r++;
}
fs.writeFileSync(P, s);
console.log('updated', n, 'spots; removed', r);
