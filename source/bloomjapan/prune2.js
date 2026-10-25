// Drops image files and GALLERY keys belonging to spots that didn't survive cleanup.
const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');
const js = h.slice(h.lastIndexOf('<script>') + 8, h.lastIndexOf('</script>'));
(0, eval)(js.match(/const DATA = \[[\s\S]*?\n\];/)[0].replace('const DATA', 'globalThis.DATA'));
(0, eval)(js.match(/const GALLERY = \{[\s\S]*?\n\};/)[0].replace('const GALLERY', 'globalThis.GALLERY'));

const liveIds = new Set(DATA.map(d => String(d.id)));

const dead = fs.readdirSync('new').filter(f => {
  const id = (f.match(/^(\d+)/) || [])[1];
  return id && !liveIds.has(id);
});
dead.forEach(f => fs.unlinkSync('new/' + f));
console.log('files for dropped spots removed:', dead.length);

const kept = {};
let droppedKeys = 0;
for (const [id, arr] of Object.entries(GALLERY)) {
  if (!liveIds.has(id)) { droppedKeys++; continue; }
  const ok = arr.filter(g => fs.existsSync(g.i));
  if (ok.length) kept[id] = ok;
}
console.log('GALLERY keys dropped:', droppedKeys);

const esc = s => String(s || '').replace(/\s+/g, ' ').trim()
  .replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const lines = Object.entries(kept).sort((a, b) => +a[0] - +b[0])
  .map(([id, arr]) => ` ${id}:[${arr.map(g => `{i:"${g.i}",a:"${esc(g.a)}",l:"${esc(g.l)}"}`).join(',')}]`);
h = h.replace(/(const GALLERY = \{)[\s\S]*?(\n\};)/, (m, a, b) => a + '\n' + lines.join(',\n') + b);
fs.writeFileSync('index.html', h);

const left = fs.readdirSync('new').filter(f => /\.jpg$/.test(f));
fs.writeFileSync('newlist.json', JSON.stringify(left.sort().map(f => ({ path: 'new/' + f }))));
console.log('new/ files:', left.length, '| version total:', 339 + left.length, '/ 512');
console.log('spots:', DATA.length, '| with gallery:', Object.keys(kept).length);
