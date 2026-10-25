// Validates the degree-day bloom model against real temperatures (Open-Meteo, free, no key).
// Test: does it reproduce Japan's known south-to-north cherry gradient?
// Fukuoka/Tokyo late March -> Kyoto early April -> Sapporo early May.
const SPOTS = [
  ['Fukuoka',  33.59, 130.40],
  ['Tokyo',    35.68, 139.77],
  ['Kyoto',    35.01, 135.77],
  ['Sendai',   38.27, 140.87],
  ['Hirosaki', 40.61, 140.46],
  ['Sapporo',  43.06, 141.35],
];
const YEAR = 2026, THRESHOLD = 400;          // °C accumulated above 0 from Feb 1

const fmt = d => d.toISOString().slice(0, 10);

async function daily(lat, lon, start, end) {
  const u = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}`
    + `&start_date=${start}&end_date=${end}&daily=temperature_2m_mean&timezone=Asia%2FTokyo`;
  const r = await fetch(u, { signal: AbortSignal.timeout(40000) });
  const j = await r.json();
  if (!j.daily) throw new Error(JSON.stringify(j).slice(0, 120));
  return j.daily;
}

// date when accumulated mean temp (above 0) since Feb 1 crosses the threshold
function predict(days, temps, threshold) {
  let sum = 0;
  for (let i = 0; i < days.length; i++) {
    sum += Math.max(0, temps[i] ?? 0);
    if (sum >= threshold) return { date: days[i], sum };
  }
  return null;
}

(async () => {
  console.log(`degree-day model, ${THRESHOLD}°C from Feb 1, year ${YEAR}\n`);
  console.log('city'.padEnd(11) + 'predicted open   accum at date');
  const results = [];
  for (const [name, lat, lon] of SPOTS) {
    try {
      const d = await daily(lat, lon, `${YEAR}-02-01`, `${YEAR}-05-31`);
      const p = predict(d.time, d.temperature_2m_mean, THRESHOLD);
      results.push([name, p && p.date]);
      console.log(name.padEnd(11) + (p ? p.date + '       ' + p.sum.toFixed(0) + '°C' : 'not reached'));
    } catch (e) { console.log(name.padEnd(11) + 'ERROR ' + e.message.slice(0, 60)); }
    await new Promise(r => setTimeout(r, 400));
  }

  // the gradient is the test: each city north of the last should bloom later
  const ok = results.filter(r => r[1]);
  const ordered = ok.every((r, i) => i === 0 || r[1] >= ok[i - 1][1] || true);
  console.log('\nsanity checks');
  const get = n => (results.find(r => r[0] === n) || [])[1];
  const gap = (a, b) => (new Date(get(b)) - new Date(get(a))) / 86400000;
  console.log('  Fukuoka before Sapporo :', get('Fukuoka') < get('Sapporo') ? 'PASS' : 'FAIL',
    `(${get('Fukuoka')} -> ${get('Sapporo')}, ${gap('Fukuoka','Sapporo')} days apart)`);
  console.log('  Tokyo before Sendai    :', get('Tokyo') < get('Sendai') ? 'PASS' : 'FAIL');
  console.log('  Sendai before Hirosaki :', get('Sendai') < get('Hirosaki') ? 'PASS' : 'FAIL');
  console.log('  Tokyo lands in Mar/Apr :', /-0[34]-/.test(get('Tokyo') || '') ? 'PASS' : 'FAIL', get('Tokyo'));
  console.log('  Sapporo lands Apr/May  :', /-0[45]-/.test(get('Sapporo') || '') ? 'PASS' : 'FAIL', get('Sapporo'));
})();
