// Washi paper tile: faint fibres, a soft mottle and scattered gold leaf flecks.
const fs = require('fs');
let seed = 5; const R = () => (seed = seed * 16807 % 2147483647) / 2147483647;
const n = v => Math.round(v * 10) / 10;
let flecks = '';
for (let i = 0; i < 34; i++) {
  const x = R() * 480, y = R() * 480, s = R() < .82 ? 1 + R() * 2.4 : 3.5 + R() * 3.5, a = R() * 360;
  const pts = Array.from({ length: 5 }, (_, k) => { const t = (k / 5) * Math.PI * 2 + R() * .8, r = s * (.5 + R() * .7);
    return n(Math.cos(t) * r) + ' ' + n(Math.sin(t) * r); }).join(' L');
  flecks += `<path d="M${pts}Z" transform="translate(${n(x)},${n(y)}) rotate(${n(a)})" fill="${R() < .5 ? '#C9A456' : '#B8914A'}" opacity="${n(.45 + R() * .45)}"/>`;
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480">
<filter id="h" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".008 .32" numOctaves="3" seed="8" stitchTiles="stitch"/>
<feColorMatrix values="0 0 0 0 .55  0 0 0 0 .46  0 0 0 0 .32  0 0 0 4 -2.2"/></filter>
<filter id="v" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".3 .01" numOctaves="3" seed="3" stitchTiles="stitch"/>
<feColorMatrix values="0 0 0 0 .55  0 0 0 0 .46  0 0 0 0 .32  0 0 0 4 -2.3"/></filter>
<filter id="m" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".006" numOctaves="2" seed="2" stitchTiles="stitch"/>
<feColorMatrix values="0 0 0 0 .78  0 0 0 0 .7  0 0 0 0 .55  0 0 0 .5 -.18"/></filter>
<rect width="480" height="480" filter="url(#m)"/>
<rect width="480" height="480" filter="url(#h)" opacity=".09"/>
<rect width="480" height="480" filter="url(#v)" opacity=".07"/>
${flecks}
</svg>`;
fs.writeFileSync('art/washi.svg', svg);
console.log('washi.svg', Math.round(svg.length / 1024) + ' KB');
