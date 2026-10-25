// Dedupes OSM candidates against the existing dataset and ranks by notability.
const fs = require('fs');
const cand = require('./candidates-raw.json');
const have = require('./rows.json');           // the 91 CSV rows, with lat/lon

const km = (a, b, c, d) => {
  const R = 6371, r = x => x * Math.PI / 180;
  const dLat = r(c - a), dLon = r(d - b);
  const h = Math.sin(dLat/2)**2 + Math.cos(r(a)) * Math.cos(r(c)) * Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

// anything within 600m of a spot we already have is the same place
const dupes = [];
const fresh = cand.filter(c => {
  const hit = have.find(h => km(c.lat, c.lon, h.lat, h.lon) < 0.6);
  if (hit) { dupes.push([c, hit]); return false; }
  return true;
});

const score = c =>
  (c.wikidata ? 3 : 0) + (c.en ? 2 : 0) + (c.wikipedia ? 2 : 0) + (c.kind === 'garden' ? 1 : 0);

fresh.forEach(c => c.score = score(c));
fresh.sort((a, b) => b.score - a.score || a.flower.localeCompare(b.flower));

const tier1 = fresh.filter(c => c.score >= 3);
const tier2 = fresh.filter(c => c.score > 0 && c.score < 3);
const tier3 = fresh.filter(c => c.score === 0);

console.log('raw candidates      :', cand.length);
console.log('already in dataset  :', dupes.length);
console.log('new                 :', fresh.length);
console.log();
console.log('Tier 1 (wikidata / wikipedia / english name):', tier1.length, '<- ready to enrich');
console.log('Tier 2 (one weak signal)                   :', tier2.length);
console.log('Tier 3 (no signal, likely local parks)     :', tier3.length);

console.log('\n-- Tier 1 sample --');
tier1.slice(0, 18).forEach(c =>
  console.log(`  ${String(c.score).padStart(2)} ${(c.en || c.jp).slice(0, 34).padEnd(36)} ${c.flower.padEnd(16)} ${c.jp.slice(0,18)}`));

console.log('\n-- Tier 1 by flower --');
const bf = {};
tier1.forEach(c => bf[c.flower] = (bf[c.flower] || 0) + 1);
Object.entries(bf).sort((a,b) => b[1]-a[1]).forEach(([f,n]) => console.log('  ' + String(n).padStart(3), f));

console.log('\n-- matched existing spots (name cross-check) --');
dupes.slice(0, 10).forEach(([c, h]) => console.log(`  ${h.name.slice(0,30).padEnd(32)} <- OSM: ${c.jp}`));

fs.writeFileSync('candidates-tier1.json', JSON.stringify(tier1, null, 1));
fs.writeFileSync('candidates-all.json', JSON.stringify(fresh, null, 1));
console.log('\nwrote candidates-tier1.json (' + tier1.length + ') and candidates-all.json (' + fresh.length + ')');
