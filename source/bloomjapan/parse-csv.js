// Parses the full BloomLocation CSV, derives region from the address,
// and reports data-quality issues before anything is generated.
const fs = require('fs');

const CSV = 'C:/Users/geral/Downloads/BloomLocation_export.csv';

function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
      else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const head = rows.shift();
  return rows.filter(r => r.length > 1).map(r => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

const PREF_REGION = {
  Hokkaido: 'Hokkaido',
  Aomori: 'Northern Japan', Iwate: 'Northern Japan', Miyagi: 'Northern Japan',
  Akita: 'Northern Japan', Yamagata: 'Northern Japan', Fukushima: 'Northern Japan',
  Tokyo: 'Tokyo Area', Kanagawa: 'Tokyo Area', Saitama: 'Tokyo Area', Chiba: 'Tokyo Area',
  Ibaraki: 'Tokyo Area', Tochigi: 'Tokyo Area', Gunma: 'Tokyo Area',
  Yamanashi: 'Mt. Fuji & Central', Shizuoka: 'Mt. Fuji & Central', Aichi: 'Mt. Fuji & Central',
  Gifu: 'Mt. Fuji & Central', Nagano: 'Mt. Fuji & Central', Niigata: 'Mt. Fuji & Central',
  Toyama: 'Mt. Fuji & Central', Ishikawa: 'Mt. Fuji & Central', Fukui: 'Mt. Fuji & Central',
  Kyoto: 'Kyoto & Kansai', Osaka: 'Kyoto & Kansai', Nara: 'Kyoto & Kansai', Hyogo: 'Kyoto & Kansai',
  Mie: 'Kyoto & Kansai', Shiga: 'Kyoto & Kansai', Wakayama: 'Kyoto & Kansai',
  Hiroshima: 'Western Japan', Okayama: 'Western Japan', Shimane: 'Western Japan',
  Tottori: 'Western Japan', Yamaguchi: 'Western Japan', Tokushima: 'Western Japan',
  Kagawa: 'Western Japan', Ehime: 'Western Japan', Kochi: 'Western Japan',
  Fukuoka: 'Kyushu & Okinawa', Saga: 'Kyushu & Okinawa', Nagasaki: 'Kyushu & Okinawa',
  Kumamoto: 'Kyushu & Okinawa', Oita: 'Kyushu & Okinawa', Miyazaki: 'Kyushu & Okinawa',
  Kagoshima: 'Kyushu & Okinawa', Okinawa: 'Kyushu & Okinawa',
};
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const raw = parseCSV(fs.readFileSync(CSV, 'utf8'));
console.log('rows:', raw.length);

const rows = raw.map(r => {
  const pref = Object.keys(PREF_REGION).find(p => new RegExp('(^|[ ,])' + p + '\\s*$', 'i').test(r.address.trim()))
    || Object.keys(PREF_REGION).find(p => new RegExp('\\b' + p + '\\b', 'i').test(r.address));
  return {
    name: r.name.trim(),
    flower: r.flower_type.trim(),
    desc: r.description.trim(),
    lat: +r.latitude, lon: +r.longitude,
    address: r.address.trim(),
    month: MONTHS.indexOf(r.best_month.trim()) + 1,
    peak: r.peak_forecast.trim(),
    station: r.access_info.trim(),
    img: r.image_url.trim(),
    pref, region: pref ? PREF_REGION[pref] : null,
  };
});

console.log('\n-- unmapped prefecture --');
rows.filter(r => !r.region).forEach(r => console.log('  ', r.name, '|', r.address));

console.log('\n-- unparsed month --');
rows.filter(r => !r.month).forEach(r => console.log('  ', r.name, '|', r.address));

console.log('\n-- region x month coverage --');
const regions = [...new Set(rows.map(r => r.region))].filter(Boolean).sort();
console.log('region'.padEnd(20) + MONTHS.map(m => m.slice(0,3).padStart(4)).join('') + '  tot');
for (const reg of regions) {
  const cells = [];
  for (let m = 1; m <= 12; m++) cells.push(String(rows.filter(r => r.region === reg && r.month === m).length).padStart(4));
  console.log(reg.padEnd(20) + cells.join('') + String(rows.filter(r => r.region === reg).length).padStart(5));
}
const tot = [];
for (let m = 1; m <= 12; m++) tot.push(String(rows.filter(r => r.month === m).length).padStart(4));
console.log('TOTAL'.padEnd(20) + tot.join('') + String(rows.length).padStart(5));

console.log('\n-- possible duplicate spots (same name stem) --');
const byKey = {};
rows.forEach(r => {
  const k = r.name.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').replace(/[^a-z]/g, '');
  (byKey[k] = byKey[k] || []).push(r);
});
Object.values(byKey).filter(g => g.length > 1).forEach(g => {
  console.log('  ' + g[0].name + ':');
  g.forEach(r => console.log(`      ${r.flower} / ${MONTHS[r.month-1]} / ${r.lat},${r.lon}`));
});

fs.writeFileSync('rows.json', JSON.stringify(rows, null, 1));
console.log('\nwrote rows.json');
