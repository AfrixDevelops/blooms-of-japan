const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
const js = h.slice(h.lastIndexOf('<script>') + 8, h.lastIndexOf('</script>'));
(0, eval)(js.match(/const DATA = \[[\s\S]*?\n\];/)[0].replace('const DATA', 'globalThis.DATA'));
const sample = require('./web-sample.json');
const path = fs.readFileSync('coast.txt', 'utf8');

const pins = DATA.filter(d => d.mx !== null).map(d => [d.month, d.mx, d.my]);
const feat = sample.map(d => ({ m: d.month, slug: d.slug, name: d.name, jp: d.jp,
  flower: d.flower, region: d.region, peak: d.peak, img: d.img }));

const byMonth = {};
DATA.forEach(d => {
  const f = d.flower.replace(/\s*\(.*?\)/, '').replace(/\/.*$/, '').trim();
  (byMonth[d.month] = byMonth[d.month] || new Set()).add(f);
});
const flowers = {}, counts = {};
for (let m = 1; m <= 12; m++) {
  flowers[m] = [...(byMonth[m] || [])].slice(0, 7);
  counts[m] = DATA.filter(d => d.month === m).length;
}

const out = { w: 300, h: 328, path, pins, feat, flowers, counts };
fs.mkdirSync('../bloomcal', { recursive: true });
fs.writeFileSync('../bloomcal/data.json', JSON.stringify(out));
console.log('pins:', pins.length, '| featured:', feat.length);
console.log('counts:', Object.values(counts).join(','));
console.log('data KB:', Math.round(JSON.stringify(out).length / 1024));
