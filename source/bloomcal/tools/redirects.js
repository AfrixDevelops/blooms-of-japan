// Permanent redirects for spot addresses that changed in step 3: renamed spots go to their new
// page, removed spots go to the page for their flower. Written into vercel.json.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', '..');
const read = f => { const p = fs.readFileSync(f, 'utf8'); const s0 = p.indexOf('[', p.indexOf('const DATA')); let d = 0, e = s0;
  for (; e < p.length; e++) { if (p[e] === '[') d++; if (p[e] === ']' && !--d) break; } return eval(p.slice(s0, e + 1)); };
const MONTHS = ['', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const slugify = n => n.toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// the same naming rule build-spots.js uses (a repeated name gets its month added); good enough for
// these rows, which were never hand-picked spots with their own fixed slugs
const slugs = rows => { const used = new Set(), out = {}; rows.forEach(x => { let s = slugify(x.name); if (used.has(s)) s += '-' + MONTHS[x.month]; used.add(s); out[x.id] = s; }); return out; };

const before = read(path.join(root, 'bloomjapan', 'index.pre-step3.bak.html'));
const after = read(path.join(root, 'bloomjapan', 'index.html'));
const sb = slugs(before), sa = slugs(after), keep = new Map(after.map(x => [x.id, x]));
global.window = {}; eval(fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8'));
const live = new Set(window.D.feat.map(f => f.slug)), groups = window.D.flowerGroups;
const groupOf = flower => (groups.find(g => new RegExp(g.label.split(' ')[0], 'i').test(flower)) || {}).k;

// removed because they repeated a spot we already had: send them to that spot
const DUP = { 1001: 'nada-kuroiwa-narcissus-field', 1014: 'tonami-tulip-park', 1016: 'fuji-motosuko-resort',
  1021: 'kawachi-wisteria-garden', 1022: 'tottori-hanakairo', 1050: 'hokuryu-sunflower-village' };
const R = [];
before.filter(x => x.id >= 1000).forEach(x => {
  const from = '/spots/' + sb[x.id];
  if (live.has(sb[x.id])) return;                                    // address unchanged
  const now = keep.get(x.id);
  const to = DUP[x.id] && live.has(DUP[x.id]) ? '/spots/' + DUP[x.id]
    : now && live.has(sa[x.id]) ? '/spots/' + sa[x.id] : (groupOf(x.flower) ? '/flowers/' + groupOf(x.flower) : '/flowers/sunflowers');
  R.push({ source: from, destination: to, permanent: true });
});
// removed later, in the pass over the other flowers (tools/apply-rest.js)
R.push({ source: '/spots/hinoyama-park', destination: '/flowers/tulips', permanent: true },
  { source: '/spots/yuushien', destination: '/spots/yuushien-garden', permanent: true },
  { source: '/spots/nabana-no-sato-march', destination: '/spots/nabana-no-sato', permanent: true });
const vj = path.join(root, '..', 'vercel.json'), v = JSON.parse(fs.readFileSync(vj, 'utf8'));
v.redirects = R;
fs.writeFileSync(vj, JSON.stringify(v, null, 2) + '\n');
console.log(R.length, 'redirects written');
R.forEach(r => console.log('  ', r.source.padEnd(46), '→', r.destination));
