// Removes hero files for spots dropped in cleanup, and prunes GALLERY entries
// whose image was deleted to fit the 512-file-per-version cap.
const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');
const js = h.slice(h.lastIndexOf('<script>') + 8, h.lastIndexOf('</script>'));
(0, eval)(js.match(/const DATA = \[[\s\S]*?\n\];/)[0].replace('const DATA', 'globalThis.DATA'));
(0, eval)(js.match(/const GALLERY = \{[\s\S]*?\n\};/)[0].replace('const GALLERY', 'globalThis.GALLERY'));

const usedHeroes = new Set(DATA.map(d => d.img));
const orphans = fs.readdirSync('new').filter(f => /^\d+\.jpg$/.test(f) && !usedHeroes.has('new/' + f));
orphans.forEach(f => fs.unlinkSync('new/' + f));
console.log('orphan heroes removed:', orphans.length);

const esc = s => String(s || '').replace(/\s+/g, ' ').trim()
  .replace(/\\/g, '\\\\').replace(/"/g, '\\"');

let pruned = 0, emptied = 0;
const kept = {};
for (const [id, arr] of Object.entries(GALLERY)) {
  const ok = arr.filter(g => fs.existsSync(g.i));
  pruned += arr.length - ok.length;
  if (ok.length) kept[id] = ok; else emptied++;
}
const lines = Object.entries(kept).sort((a, b) => +a[0] - +b[0])
  .map(([id, arr]) => ` ${id}:[${arr.map(g => `{i:"${g.i}",a:"${esc(g.a)}",l:"${esc(g.l)}"}`).join(',')}]`);
h = h.replace(/(const GALLERY = \{)[\s\S]*?(\n\};)/, (m, a, b) => a + '\n' + lines.join(',\n') + b);
fs.writeFileSync('index.html', h);

console.log('gallery refs pruned:', pruned, '| spots now without a gallery:', emptied);
const left = fs.readdirSync('new').filter(f => /\.jpg$/.test(f));
console.log('new/ files:', left.length, '| version total:', 339 + left.length, '/ 512');
fs.writeFileSync('newlist.json', JSON.stringify(left.sort().map(f => ({ path: 'new/' + f }))));
