// Puts all 148 spots (from the mobile prototype's data) into the calendar's D.feat.
// The 16 hand-picked spots keep their slugs, copy and galleries and sort first in their month.
// Tags come only from what a description actually says; nothing is inferred.
const fs = require('fs');

const proto = fs.readFileSync('../bloomjapan/index.html', 'utf8');
const s0 = proto.indexOf('[', proto.indexOf('const DATA'));
let depth = 0, e = s0;
for (; e < proto.length; e++) { if (proto[e] === '[') depth++; if (proto[e] === ']' && !--depth) break; }
const ALL = eval(proto.slice(s0, e + 1));

const D = {}; eval(fs.readFileSync('data.feat16.bak.js', 'utf8').replace('window.D', 'D.x'));
const data = D.x;
const featured = new Map(data.feat.map(f => [f.img, f]));

const MONTHS = ['', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const slugify = n => n.toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const thumbOf = p => p.startsWith('new/') ? 'th/new-' + p.slice(4).replace('.jpg', '.webp') : p.replace(/^img\/(.*)\.jpg$/, 'th/$1.webp');

const TAGS = [
  ['festival', 'Festival', /festival|matsuri/i],
  ['illum', 'Night illumination', /illuminat/i],
  ['free', 'Free entry', /free (entry|admission)|admission is free|no admission fee/i],
];

// The source names vary ("Cherry Blossom (Sakura)", "Plum/Cherry", "Pink Moss (Shibazakura)"), so each spot
// is sorted into clean groups for the By-flower filter. A mixed entry belongs to every group it names.
// [url key, label, match, name used to look up the drawn icon]
const FLOWERS = [
  ['cherry-blossom', 'Cherry blossom', /cherry|sakura\b|\(sakura\)/i, 'Cherry Blossom'],
  ['plum-blossom', 'Plum blossom', /plum|\bume\b/i, 'Plum Blossom'],
  ['tulips', 'Tulips', /tulip/i, 'Tulip'],
  ['lavender', 'Lavender', /lavender/i, 'Lavender'],
  ['iris', 'Iris', /iris|hanashobu/i, 'Iris'],
  ['wisteria', 'Wisteria', /wisteria/i, 'Wisteria'],
  ['roses', 'Roses', /\broses?\b/i, 'Rose'],
  ['hydrangea', 'Hydrangea', /hydrangea|ajisai/i, 'Hydrangea'],
  ['sunflowers', 'Sunflowers', /sunflower|himawari/i, 'Sunflower'],
  ['cosmos', 'Cosmos', /cosmos/i, 'Cosmos'],
  ['autumn-leaves', 'Autumn leaves', /foliage|momiji/i, 'Autumn Foliage'],
  ['ginkgo', 'Ginkgo', /ginkgo|icho/i, 'Ginkgo'],
  ['kinmokusei', 'Kinmokusei', /kinmokusei|osmanthus|fragrant olive/i, 'Kinmokusei'],
  ['deigo', 'Deigo', /deigo|coral tree/i, 'Deigo'],
  ['sagaribana', 'Sagaribana', /sagaribana|powder.?puff/i, 'Sagaribana'],
  ['wintersweet', 'Wintersweet', /wintersweet|robai/i, 'Wintersweet'],
  ['shibazakura', 'Shibazakura', /shibazakura|moss phlox|pink moss/i, 'Shibazakura'],
  ['lotus', 'Lotus', /lotus|hasu/i, 'Lotus'],
  ['red-spider-lily', 'Red spider lily', /spider lily|higanbana/i, 'Red Spider Lily'],
  ['narcissus', 'Narcissus', /narcissus/i, 'Narcissus'],
  ['rapeseed', 'Rapeseed', /rapeseed|nanohana|rape blossom/i, 'Rapeseed'],
  ['camellia', 'Camellia', /camellia|tsubaki|sasanqua|sazanka/i, 'Camellia'],   // sasanqua is a camellia too
  ['peony', 'Peony', /peony|botan/i, 'Peony'],
  ['azalea', 'Azalea', /azalea|tsutsuji/i, 'Azalea'],
  ['chrysanthemum', 'Chrysanthemum', /chrysanthemum/i, 'Chrysanthemum'],
  ['nemophila', 'Nemophila', /nemophila/i, 'Nemophila'],
  ['kochia', 'Kochia', /kochia/i, 'Kochia'],
  ['begonia', 'Begonia', /begonia/i, 'Begonia'],
  ['lilies', 'Lilies', /^(?!.*spider).*\blil(y|ies)\b/i, 'Lily'],
  // aloe has a single spot, so it sits here rather than getting a one-spot flower page of its own
  ['mixed-gardens', 'Mixed gardens', /various|seasonal flowers|spring flowers|tropical|aloe/i, 'Various'],
];

// The prefecture a spot is in, read from its address: nearly all end with it ("…, Hirosaki, Aomori").
// The few that end with a big city instead are mapped from the city, each of which sits in one prefecture.
const PREFECTURES = ['Hokkaido', 'Aomori', 'Iwate', 'Miyagi', 'Akita', 'Yamagata', 'Fukushima', 'Ibaraki', 'Tochigi',
  'Gunma', 'Saitama', 'Chiba', 'Tokyo', 'Kanagawa', 'Niigata', 'Toyama', 'Ishikawa', 'Fukui', 'Yamanashi', 'Nagano',
  'Gifu', 'Shizuoka', 'Aichi', 'Mie', 'Shiga', 'Kyoto', 'Osaka', 'Hyogo', 'Nara', 'Wakayama', 'Tottori', 'Shimane',
  'Okayama', 'Hiroshima', 'Yamaguchi', 'Tokushima', 'Kagawa', 'Ehime', 'Kochi', 'Fukuoka', 'Saga', 'Nagasaki',
  'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima', 'Okinawa'];
const CITY_PREFECTURE = { Nagoya: 'Aichi', Yokohama: 'Kanagawa', Sendai: 'Miyagi', Sapporo: 'Hokkaido', Kyoto: 'Kyoto' };
function prefectureOf(address) {
  const last = String(address || '').split(',').pop().replace(/\(.*?\)/g, '').replace(/\s+Prefecture$/i, '').trim();
  return PREFECTURES.find(p => p.toLowerCase() === last.toLowerCase()) || CITY_PREFECTURE[last] || null;
}

const used = new Set();
const spots = ALL.map((x, i) => {
  // two prototype entries can share a photo; only the first takes the featured copy
  const f = featured.get(x.img); if (f) featured.delete(x.img);
  let slug = f ? f.slug : slugify(x.name);
  if (!f && used.has(slug)) slug += '-' + MONTHS[x.month];
  used.add(slug);
  const own = f && !x.ed;   // ed:1 = this row has been rewritten and its text wins over the hand-picked copy
  const desc = own ? f.desc : x.desc;
  const o = {
    m: x.month, slug, name: f ? f.name : x.name, jp: (f ? f.jp : x.jp) || '', flower: x.flower, region: x.region,
    peak: own ? f.peak : x.peak, img: x.img, th: thumbOf(x.img), desc, address: own ? f.address : x.address,
    station: own ? f.station : x.station,
    tags: (x.type || []).concat(TAGS.filter(([, , re]) => re.test(desc)).map(([k]) => k)),
    fl: FLOWERS.filter(([, , re]) => re.test(x.flower)).map(([k]) => k),
    rank: f ? 0 : x.est ? 2 : 1, i,
  };
  if (f && f.gal) o.gal = f.gal;
  if (x.cred) o.cred = x.cred;   // hero photo credit, for CC BY / BY-SA
  // latitude/longitude for the weather box, worked back from the map position (Mercator, same box as the map)
  if (x.ll) o.ll = x.ll;   // spots off the map (Okinawa) carry their own
  else if (x.mx != null && x.my != null) {
    const r = d => d * Math.PI / 180, mY = l => Math.log(Math.tan(Math.PI / 4 + r(l) / 2));
    const X0 = r(128.3), X1 = r(146.3), YT = mY(45.8), YB = mY(30.4);
    const lon = (X0 + x.mx / 300 * (X1 - X0)) * 180 / Math.PI;
    const lat = (2 * Math.atan(Math.exp(YT - x.my / 328 * (YT - YB))) - Math.PI / 2) * 180 / Math.PI;
    o.ll = [+lat.toFixed(2), +lon.toFixed(2)];
  }
  if (!o.gal && x.gal) o.gal = x.gal;   // galleries can also live on the spot itself
  o.pref = prefectureOf(o.address);
  return o;
});
// every spot has to land in a prefecture, or the card would show a blank
const unplaced = spots.filter(s => !s.pref);
if (unplaced.length) throw new Error('no prefecture for: ' + unplaced.map(s => s.slug + ' (' + s.address + ')').join(', '));
spots.sort((a, b) => a.m - b.m || a.rank - b.rank || a.i - b.i);
spots.forEach(s => { delete s.rank; delete s.i; });

// every thumbnail must exist
const missing = spots.filter(s => !fs.existsSync(s.th));
if (missing.length) throw new Error('missing thumbs: ' + missing.map(s => s.th).join(', '));

// ginkgo came after the drawn icon set: a fan-shaped gold leaf on a short stalk, notched at the top
data.icons.ginkgo = '<path d="M20 36 L20 27" stroke="#A8862E" stroke-width="2.2" stroke-linecap="round"/>'
  + '<path d="M20 28 C11 28 2 22 2 11 C8 5 16 5 19.2 11.5 L20 8.5 L20.8 11.5 C24 5 32 5 38 11 C38 22 29 28 20 28 Z" fill="#E2B33C"/>'
  + '<path d="M20 27 L10 11M20 27 L15.5 9M20 27 L24.5 9M20 27 L30 11" stroke="#C9972A" stroke-width="1" stroke-linecap="round"/>';
data.iconOf.Ginkgo = 'ginkgo';

// kinmokusei: a cluster of tiny four-petalled orange flowers between two dark leaves
data.icons.kinmokusei = '<path d="M20 38 C10 36 4 29 4 20 C12 22 18 28 20 38 Z" fill="#4E7A3A"/>'
  + '<path d="M20 38 C30 36 36 29 36 20 C28 22 22 28 20 38 Z" fill="#5C8A44"/>'
  + [[13, 15], [21, 10], [28, 16], [17, 22], [24, 24]].map(([x, y]) =>
    `<g fill="#F08A24"><circle cx="${x - 2.3}" cy="${y}" r="2.3"/><circle cx="${x + 2.3}" cy="${y}" r="2.3"/>`
    + `<circle cx="${x}" cy="${y - 2.3}" r="2.3"/><circle cx="${x}" cy="${y + 2.3}" r="2.3"/></g><circle cx="${x}" cy="${y}" r="1.1" fill="#C25A12"/>`).join('');
data.iconOf.Kinmokusei = 'kinmokusei';
data.iconOf['Fragrant Olive'] = 'kinmokusei';   // the month sidebar looks icons up by the flower's English name

// deigo, Okinawa's prefectural flower: curved scarlet petals fanning up from a branch, one leaf below
data.icons.deigo = '<path d="M20 38 L20 24" stroke="#6B4A2E" stroke-width="2" stroke-linecap="round"/>'
  + '<path d="M20 35 C13 35 9 31 8 27 C13 27 18 30 20 35 Z" fill="#4E7A3A"/>'
  + ['M20 24 C15 19 11 13 11 6 C15 10 18 16 20 24 Z', 'M20 24 C17 17 16 10 18 3 C20 9 21 16 20 24 Z',
     'M20 24 C23 17 24 10 22 3 C20 9 19 16 20 24 Z', 'M20 24 C25 19 29 13 29 6 C25 10 22 16 20 24 Z',
     'M20 24 C14 22 8 19 5 14 C10 15 15 19 20 24 Z', 'M20 24 C26 22 32 19 35 14 C30 15 25 19 20 24 Z']
    .map((d, i) => `<path d="${d}" fill="${i % 2 ? '#E8523F' : '#D9342B'}"/>`).join('');
data.iconOf.Deigo = 'deigo';

// sagaribana: a hanging strand of night flowers, each a pink powder-puff of stamens
data.icons.sagaribana = '<path d="M20 2 C21 12 19 22 20 38" stroke="#5C7A3A" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
  + [[20, 11], [19.5, 21.5], [20, 32]].map(([x, y]) => [...Array(12)].map((_, k) => {
    const a = k * Math.PI / 6, c = Math.cos(a), s = Math.sin(a);
    return `<path d="M${(x + 1.5 * c).toFixed(1)} ${(y + 1.5 * s).toFixed(1)} L${(x + 6 * c).toFixed(1)} ${(y + 6 * s).toFixed(1)}" stroke="#E58FB0" stroke-width="1.1" stroke-linecap="round"/>`;
  }).join('') + `<circle cx="${x}" cy="${y}" r="1.5" fill="#FBE3EC"/>`).join('');
data.iconOf.Sagaribana = 'sagaribana';

// wintersweet: waxy pale-yellow cups on a bare winter twig, each with a dark heart
data.icons.wintersweet = '<path d="M8 36 C14 28 20 20 33 5M20 21 L11 14M26 13 L32 18" stroke="#7A5A3A" stroke-width="1.8" fill="none" stroke-linecap="round"/>'
  + [[12, 31], [18, 24], [11, 14], [25, 15], [32, 18], [31, 7]].map(([x, y]) =>
    `<g fill="#F2D466"><circle cx="${x - 2.4}" cy="${y}" r="2.6"/><circle cx="${x + 2.4}" cy="${y}" r="2.6"/>`
    + `<circle cx="${x}" cy="${y - 2.4}" r="2.6"/><circle cx="${x}" cy="${y + 2.4}" r="2.6"/></g><circle cx="${x}" cy="${y}" r="1.3" fill="#8A4A2A"/>`).join('');
data.iconOf.Wintersweet = 'wintersweet';

// the month sidebar looks icons up by the flower's English name, so newer names borrow existing icons
Object.assign(data.iconOf, { 'Winter Cherry': 'sakura', 'Kawazu Cherry Blossom & Rapeseed': 'sakura',
  Sasanqua: 'camellia', 'Tropical Orchids': 'mixed', Aloe: 'mixed' });

const ungrouped = spots.filter(s => !s.fl.length);
if (ungrouped.length) throw new Error('no flower group for: ' + ungrouped.map(s => s.flower).join(', '));
data.flowerGroups = FLOWERS.map(([k, label, , icon]) => ({ k, label, icon: data.iconOf[icon] || data.iconOf.Various,
  n: spots.filter(s => s.fl.includes(k)).length })).filter(g => g.n).sort((a, b) => b.n - a.n);
console.log('groups', data.flowerGroups.map(g => `${g.label} ${g.n}${data.iconOf[FLOWERS.find(f => f[0] === g.k)[3]] ? '' : ' (no icon)'}`).join(', '));

data.feat = spots;

// Map pins, per-month counts, flower chips and region bars are all derived from the
// same source list, so they stay in step whenever spots are added (was extract-cal2.js).
data.pins = ALL.filter(d => d.mx !== null && d.mx !== undefined).map(d => [d.month, d.mx, d.my]);
data.flowers = {}; data.counts = {}; data.regions = {};
for (let m = 1; m <= 12; m++) {
  const inMonth = ALL.filter(d => d.month === m);
  data.counts[m] = inMonth.length;
  const fc = {}, rc = {};
  inMonth.forEach(d => {
    const f = d.flower.replace(/\s*\(.*?\)/, '').replace(/\/.*$/, '').trim();
    fc[f] = (fc[f] || 0) + 1;
    rc[d.region] = (rc[d.region] || 0) + 1;
  });
  data.flowers[m] = Object.entries(fc).sort((a, b) => b[1] - a[1]).slice(0, 8);
  data.regions[m] = Object.entries(rc).sort((a, b) => b[1] - a[1]);
}
// what kind of place a spot is (set per spot in the source data as type:[...])
const PLACE = { shrine: 'Shrine', temple: 'Temple', park: 'Park', river: 'River', castle: 'Castle',
  mountain: 'Mountain', street: 'Street', countryside: 'Countryside' };
const badType = spots.flatMap(s => s.tags).filter(k => !PLACE[k] && !TAGS.some(([t]) => t === k));
if (badType.length) throw new Error('unknown place type: ' + badType.join(', '));
data.tagLabels = Object.assign(Object.fromEntries(TAGS.map(([k, l]) => [k, l])), PLACE);
fs.writeFileSync('data.js', 'window.D = ' + JSON.stringify(data) + ';\n');

const per = MONTHS.slice(1).map((_, i) => spots.filter(s => s.m === i + 1).length);
console.log('spots', spots.length, '| per month', per.join(' '), '| featured kept', spots.filter(s => s.gal).length);
console.log('tagged', spots.filter(s => s.tags.length).map(s => `${s.name} [${s.tags}]`).join('; '));
console.log('duplicate slugs', spots.length - new Set(spots.map(s => s.slug)).size, '| data.js', Math.round(fs.statSync('data.js').size / 1024) + ' KB');
