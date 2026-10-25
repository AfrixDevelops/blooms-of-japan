// Per spot: is this season running warm or cold versus the 10-year normal?
// Warmer air advances flowering, so the anomaly converts to an estimated day shift.
// Rule of thumb in plant phenology: ~3.5 days per 1°C.
const fs = require('fs');

const h = fs.readFileSync('index.html', 'utf8');
const js = h.slice(h.lastIndexOf('<script>') + 8, h.lastIndexOf('</script>'));
(0, eval)(js.match(/const DATA = \[[\s\S]*?\n\];/)[0].replace('const DATA', 'globalThis.DATA'));
const rows = require('./rows.json');           // lat/lon per spot, in CSV order

// DATA dropped one duplicate row, so match on name rather than index
const coords = DATA.map(d => {
  const r = rows.find(x => x.name === d.name) || rows.find(x => x.name.startsWith(d.name.slice(0, 14)));
  return { id: d.id, name: d.name, month: d.month, lat: r && r.lat, lon: r && r.lon };
}).filter(c => c.lat != null);

const WINDOW = ['07-28', '09-25'];             // the 60 days up to today
const THIS_YEAR = 2026, NORMAL = [2016, 2025];
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchWindow(chunk, year) {
  const u = 'https://archive-api.open-meteo.com/v1/archive'
    + `?latitude=${chunk.map(c => c.lat).join(',')}&longitude=${chunk.map(c => c.lon).join(',')}`
    + `&start_date=${year}-${WINDOW[0]}&end_date=${year}-${WINDOW[1]}`
    + '&daily=temperature_2m_mean&timezone=Asia%2FTokyo';
  for (let a = 0; a < 4; a++) {
    try {
      const r = await fetch(u, { signal: AbortSignal.timeout(90000) });
      const j = await r.json();
      const arr = Array.isArray(j) ? j : [j];
      if (!arr[0] || !arr[0].daily) throw new Error(JSON.stringify(j).slice(0, 100));
      return arr.map(x => {
        const t = (x.daily.temperature_2m_mean || []).filter(v => v != null);
        return t.length ? t.reduce((s, v) => s + v, 0) / t.length : null;
      });
    } catch (e) { await sleep(3000 * (a + 1)); }
  }
  return chunk.map(() => null);
}

(async () => {
  const chunks = [];
  for (let i = 0; i < coords.length; i += 25) chunks.push(coords.slice(i, i + 25));

  const means = {};                            // id -> { year: meanTemp }
  for (let y = NORMAL[0]; y <= THIS_YEAR; y++) {
    if (y > NORMAL[1] && y < THIS_YEAR) continue;
    process.stdout.write(`${y} `);
    for (const ch of chunks) {
      const res = await fetchWindow(ch, y);
      ch.forEach((c, i) => { (means[c.id] = means[c.id] || {})[y] = res[i]; });
      await sleep(900);
    }
  }
  console.log('\n');

  const out = {};
  let ok = 0;
  for (const c of coords) {
    const m = means[c.id] || {};
    const hist = [];
    for (let y = NORMAL[0]; y <= NORMAL[1]; y++) if (m[y] != null) hist.push(m[y]);
    const now = m[THIS_YEAR];
    if (now == null || hist.length < 5) continue;
    const normal = hist.reduce((s, v) => s + v, 0) / hist.length;
    const anom = +(now - normal).toFixed(2);
    const shift = Math.max(-14, Math.min(14, Math.round(anom * -3.5)));  // warm => earlier (negative days)
    out[c.id] = { a: anom, s: shift, n: +normal.toFixed(1), t: +now.toFixed(1) };
    ok++;
  }

  fs.writeFileSync('climate.json', JSON.stringify(out, null, 1));
  const anoms = Object.values(out).map(o => o.a);
  console.log('spots with climate signal:', ok, '/', coords.length);
  console.log('anomaly range: ' + Math.min(...anoms).toFixed(2) + '°C to +' + Math.max(...anoms).toFixed(2) + '°C');
  console.log('mean anomaly : ' + (anoms.reduce((s, v) => s + v, 0) / anoms.length).toFixed(2) + '°C vs 2016-2025');
  const warm = anoms.filter(a => a > 0).length;
  console.log(`warmer than normal: ${warm}/${anoms.length} spots`);
  console.log('\nsample:');
  Object.entries(out).slice(0, 8).forEach(([id, o]) => {
    const c = coords.find(x => x.id == id);
    console.log('  ' + c.name.slice(0, 28).padEnd(30),
      (o.a > 0 ? '+' : '') + o.a + '°C', '->', o.s === 0 ? 'on time' : (o.s < 0 ? `${-o.s} days early` : `${o.s} days late`));
  });
})();
