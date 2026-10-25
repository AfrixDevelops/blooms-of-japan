const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
const js = h.slice(h.lastIndexOf('<script>') + 8, h.lastIndexOf('</script>'));
(0, eval)(js.match(/const DATA = \[[\s\S]*?\n\];/)[0].replace('const DATA', 'globalThis.DATA'));
const sample = require('./web-sample.json');
const path = fs.readFileSync('coast.txt', 'utf8');

const pins = DATA.filter(d => d.mx !== null).map(d => [d.month, d.mx, d.my]);
const feat = sample.map(d => ({ m: d.month, slug: d.slug, name: d.name, jp: d.jp,
  flower: d.flower, region: d.region, peak: d.peak, img: d.img }));

const flowers = {}, counts = {}, regions = {};
for (let m = 1; m <= 12; m++) {
  const inMonth = DATA.filter(d => d.month === m);
  counts[m] = inMonth.length;

  // flower -> how many spots, so the chips can carry a number
  const fc = {};
  inMonth.forEach(d => {
    const f = d.flower.replace(/\s*\(.*?\)/, '').replace(/\/.*$/, '').trim();
    fc[f] = (fc[f] || 0) + 1;
  });
  flowers[m] = Object.entries(fc).sort((a, b) => b[1] - a[1]).slice(0, 8);

  // region -> count, for the "where" column
  const rc = {};
  inMonth.forEach(d => { rc[d.region] = (rc[d.region] || 0) + 1; });
  regions[m] = Object.entries(rc).sort((a, b) => b[1] - a[1]);
}

const out = { w: 300, h: 328, path, pins, feat, flowers, counts, regions };
fs.writeFileSync('../bloomcal/data.json', JSON.stringify(out));
console.log('pins:', pins.length, '| featured:', feat.length);
console.log('counts:', Object.values(counts).join(','));
console.log('feat per month:', Array.from({length:12},(_,i)=>feat.filter(f=>f.m===i+1).length).join(','));
console.log('sample regions (Apr):', JSON.stringify(regions[4]));
console.log('sample flowers (Apr):', JSON.stringify(flowers[4].slice(0,4)));
console.log('KB:', Math.round(JSON.stringify(out).length / 1024));
