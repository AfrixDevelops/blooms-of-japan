// Dedupes image URLs across rows, assigns stable local filenames, emits a download list.
const fs = require('fs');
const rows = require('./rows.json');

const seen = new Map();   // url -> filename
const used = new Set(fs.readdirSync('img'));
let n = 0;

for (const r of rows) {
  if (seen.has(r.img)) continue;
  // reuse the source filename, normalised
  const base = decodeURIComponent(r.img.split('?')[0].split('/').pop())
    .replace(/[^A-Za-z0-9.]/g, '').replace(/\.(jpe?g|png)$/i, '').toLowerCase();
  let file = base.slice(0, 28) + '.jpg';
  let i = 2;
  while ([...seen.values()].includes(file)) file = base.slice(0, 26) + (i++) + '.jpg';
  seen.set(r.img, file);
  n++;
}

const todo = [...seen].filter(([, f]) => !used.has(f));
fs.writeFileSync('img-map.json', JSON.stringify(Object.fromEntries(seen), null, 1));
fs.writeFileSync('download.sh', todo.map(([u, f]) => `curl -L -s -o "img/${f}" "${u}"`).join('\n') + '\n');

console.log('unique images:', n);
console.log('already on disk:', n - todo.length);
console.log('to download:', todo.length);
