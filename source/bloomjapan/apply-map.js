// Splices the generated map into index.html: real coastline SVG + projected pin coords.
const fs = require('fs');
const m = require('./map-data.json');
let html = fs.readFileSync('index.html', 'utf8');

/* ---- city reference labels: [name, dx, dy, anchor] offsets aim into open water ---- */
const LABELS = {
  Sapporo:  [-9,  3, 'end'],
  Sendai:   [ 9,  3, 'start'],
  Tokyo:    [ 9,  4, 'start'],
  Kyoto:    [-9, -3, 'end'],
  Hiroshima:[-8,  7, 'end'],
  Fukuoka:  [ 0, -8, 'middle'],
};
const cityMarkup = m.cities
  .filter(c => LABELS[c.name])
  .map(c => {
    const [dx, dy, anchor] = LABELS[c.name];
    return `<circle cx="${c.x}" cy="${c.y}" r="1.9" fill="#9B8AA8"/>` +
      `<text x="${c.x + dx}" y="${c.y + dy}" text-anchor="${anchor}" font-size="8.5" font-weight="700" ` +
      `fill="#6B5A78" stroke="#FFFCF7" stroke-width="2.4" paint-order="stroke" ` +
      `font-family="Zen Kaku Gothic New, sans-serif">${c.name}</text>`;
  }).join('');

const fuji = `<g transform="translate(${m.fuji.x},${m.fuji.y}) scale(.52)" opacity=".95">
    <circle cx="1" cy="-17" r="9.5" fill="#F3907B"/>
    <path d="M-21 11 L-6.5 -12.5 Q0 -20 6.5 -12.5 L21 11 Z" fill="#8FAFD0"/>
    <path d="M-9 -3 L-6.5 -12.5 Q0 -20 6.5 -12.5 L9 -3 Q4.5 -6.5 0 -3.4 Q-4.5 -6.5 -9 -3 Z" fill="#FFFCF7"/>
   </g>`;

const svg = `<svg viewBox="0 0 ${m.width} ${m.height}" role="img" aria-label="Map of Japan showing bloom spots">
                <defs>
                  <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#F1ECFA"/><stop offset="1" stop-color="#E9F1E5"/>
                  </linearGradient>
                </defs>
                <rect width="${m.width}" height="${m.height}" fill="url(#sea)"/>
                <path d="${m.path}" fill="none" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round" opacity=".75"/>
                <path d="${m.path}" fill="#FFFCF7" stroke="#DFCFB9" stroke-width=".7" stroke-linejoin="round"/>
                ${fuji}
                <g>${cityMarkup}</g>
                <g id="pins"></g>
              </svg>`;

const before = html.length;
html = html.replace(/<svg viewBox="0 0 300 420"[\s\S]*?<\/svg>/, svg);
if (html.length === before) throw new Error('map svg block not found');

/* ---- rewrite pin coordinates in DATA (they appear in id order) ---- */
let i = 0;
html = html.replace(/mx:[\d.]+,my:[\d.]+/g, () => {
  const s = m.spots[i++];
  return `mx:${s.x},my:${s.y}`;
});
if (i !== 25) throw new Error('expected 25 coordinate pairs, replaced ' + i);

fs.writeFileSync('index.html', html);
console.log('map svg injected; pin coords rewritten:', i);
