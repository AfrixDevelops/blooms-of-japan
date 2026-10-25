// Location fixes found by checking every weather point against its card's address (2026-10-15).
// Map position (mx/my) is recomputed from the correct latitude/longitude; text fixes where the card was wrong.
const fs = require('fs'), path = require('path');
const P = path.join(__dirname, '..', '..', 'bloomjapan', 'index.html');
let s = fs.readFileSync(P, 'utf8');
const r = d => d * Math.PI / 180, mY = l => Math.log(Math.tan(Math.PI / 4 + r(l) / 2));
const X0 = r(128.3), X1 = r(146.3), YT = mY(45.8), YB = mY(30.4);
const xy = (la, lo) => [+((r(lo) - X0) / (X1 - X0) * 300).toFixed(1), +((YT - mY(la)) / (YT - YB) * 328).toFixed(1)];
const FIX = [
  // was placed in Kyoto by a geocoder slip
  { name: 'Saitobaru Burial Mounds', ll: [32.11, 131.39] },
  // was placed in Shimane; the garden is in Shikaoi (Tokachi), not Kamikawa as the card said
  { name: 'Fukuhara Sanso', ll: [43.17, 143.04], set: { address: 'Kita-Urimaku, Shikaoi, Kato District, Hokkaido', station: 'About 40 min by car from Shintoku Station (JR)',
    desc: 'A private garden in Shikaoi, Tokachi, with several hundred maples, rare in Hokkaido, around three ponds and five little waterfalls. Opened free to the public for about three weeks each October.' } },
  // longitude was off by half a degree, putting it near Hirosaki
  { name: 'Oirase Gorge', ll: [40.55, 140.95] },
  // the card said Gifu; the park is in Konan, Aichi (the weather point was already right)
  { name: 'Flower Park Konan (Gifu)', ll: [35.36, 136.86], set: { name: 'Flower Park Konan (Aichi)', address: 'Koiri-cho Isshiki, Konan, Aichi' } },
];
for (const f of FIX) {
  const a = s.indexOf('name:' + JSON.stringify(f.name)); if (a < 0) throw new Error('no row ' + f.name);
  const start = s.lastIndexOf(' {id:', a), end = s.indexOf('\n {id:', a);
  let row = s.slice(start, end);
  const [mx, my] = xy(...f.ll);
  row = row.replace(/mx:[-\d.]+,my:[-\d.]+/, `mx:${mx},my:${my}`);
  for (const [k, v] of Object.entries(f.set || {})) {
    const re = new RegExp(k + ':"(?:[^"\\\\]|\\\\.)*"');
    row = re.test(row) ? row.replace(re, k + ':' + JSON.stringify(v)) : row.replace(/(region:"[^"]*",)/, '$1' + k + ':' + JSON.stringify(v) + ',');
  }
  s = s.slice(0, start) + row + s.slice(end);
  console.log(f.name.padEnd(28), '->', mx, my);
}
fs.writeFileSync(P, s);
