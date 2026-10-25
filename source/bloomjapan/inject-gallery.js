// Splices the gallery manifest into index.html as a GALLERY lookup keyed by spot id.
const fs = require('fs');
const man = require('./gallery-manifest.json');

const esc = s => String(s || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\s+/g, ' ').trim();

const lines = Object.entries(man).map(([id, arr]) =>
  ` ${id}:[${arr.map(a => `{i:"${a.img}",a:"${esc(a.author).slice(0, 60)}",l:"${esc(a.licence)}"}`).join(',')}]`);

const block = `/* Wikimedia Commons photos — CC/public domain, attribution kept per image */\nconst GALLERY = {\n${lines.join(',\n')}\n};`;

let h = fs.readFileSync('index.html', 'utf8');
if (h.includes('const GALLERY = {')) {
  h = h.replace(/\/\* Wikimedia Commons photos[\s\S]*?\nconst GALLERY = \{[\s\S]*?\n\};/, block);
} else {
  const anchor = 'const DATA = [';
  h = h.replace(anchor, block + '\n\n' + anchor);
}
fs.writeFileSync('index.html', h);

const total = Object.values(man).reduce((s, a) => s + a.length, 0);
console.log('GALLERY injected:', Object.keys(man).length, 'spots,', total, 'photos');
