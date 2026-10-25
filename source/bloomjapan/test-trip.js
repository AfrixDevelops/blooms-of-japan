// Exercises the trip-planner filter against the real DATA in the page.
const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
const js = h.slice(h.lastIndexOf('<script>') + 8, h.lastIndexOf('</script>'));

const src = js.match(/const DATA = \[[\s\S]*?\n\];/)[0].replace('const DATA', 'globalThis.DATA')
  + '\n' + js.match(/const BASES = \[[\s\S]*?\n\];/)[0].replace('const BASES', 'globalThis.BASES');
(0, eval)(src);

const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
console.log('base'.padEnd(24) + MON.map(x => x.padStart(4)).join(''));
let emptyCells = 0;
for (const base of BASES) {
  const row = [];
  for (let mo = 1; mo <= 12; mo++) {
    const n = DATA.filter(d => d.month === mo && (!base.regions || base.regions.includes(d.region))).length;
    if (n === 0) emptyCells++;
    row.push(String(n).padStart(4));
  }
  console.log(base.label.padEnd(24) + row.join(''));
}
console.log('\ntotal spots:', DATA.length);
console.log('empty base/month combos:', emptyCells, 'of', BASES.length * 12);

const covered = new Set(BASES.flatMap(b => b.regions || []));
const orphan = [...new Set(DATA.map(d => d.region))].filter(r => !covered.has(r));
console.log('regions only reachable via "Travelling around":', orphan.join(', ') || 'none');
console.log('  those spots:', DATA.filter(d => orphan.includes(d.region)).map(d => d.name).join(', ') || 'none');
