// Paints the eight seasonal flower illustrations as watercolour-style SVGs.
// Every branch or stem enters from the left (or bottom-left) edge so a picture can
// sit flush against the side of the page; the right-hand flower is mirrored in CSS.
const fs = require('fs');
fs.mkdirSync('art', { recursive: true });

const S = 900;
let seed = 1;
const R = () => (seed = seed * 16807 % 2147483647) / 2147483647;
const rr = (a, b) => a + R() * (b - a);
const pick = a => a[Math.floor(R() * a.length)];
const n = v => Math.round(v * 10) / 10;
const rad = d => d * Math.PI / 180;
// angle 0 = right, 90 = down (screen space)
const pol = (x, y, a, L) => [x + Math.cos(rad(a)) * L, y + Math.sin(rad(a)) * L];
// angle measured from "up", for radially built flowers and leaves
const up = (a, r) => [Math.sin(rad(a)) * r, -Math.cos(rad(a)) * r];
const P = p => n(p[0]) + ' ' + n(p[1]);

/* ---------- curves ---------- */
function bez(s, t) { const u = 1 - t;
  return [0, 1].map(k => u*u*u*s[0][k] + 3*u*u*t*s[1][k] + 3*u*t*t*s[2][k] + t*t*t*s[3][k]); }
function der(s, t) { const u = 1 - t;
  return [0, 1].map(k => 3*u*u*(s[1][k]-s[0][k]) + 6*u*t*(s[2][k]-s[1][k]) + 3*t*t*(s[3][k]-s[2][k])); }
// a twig from p heading at angle a for length L, bowing sideways by `bow` of its length
function seg(p, a, L, bow = 0) {
  const m1 = pol(...pol(p[0], p[1], a, L * .33), a + 90, L * bow);
  const m2 = pol(...pol(p[0], p[1], a, L * .66), a + 90, L * bow);
  return [p, m1, m2, pol(p[0], p[1], a, L)];
}

// tapered limb filled as a polygon, with a dark and a light streak for bark texture
function limb(s, w0, w1, fill, dark, light) {
  const N = 40, A = [], B = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, [x, y] = bez(s, t), [dx, dy] = der(s, t), l = Math.hypot(dx, dy) || 1;
    const w = (w0 + (w1 - w0) * Math.pow(t, .8)) / 2 * (1 + Math.sin(i * 1.7 + w0) * .06);
    A.push([x - dy / l * w, y + dx / l * w]); B.push([x + dy / l * w, y - dx / l * w]);
  }
  const d = 'M' + [...A, ...B.reverse()].map(P).join('L') + 'Z';
  const sp = `M${P(s[0])}C${P(s[1])} ${P(s[2])} ${P(s[3])}`;
  return {
    svg: `<path d="${d}" fill="${fill}"/>` +
      (dark ? `<path d="${sp}" fill="none" stroke="${dark}" stroke-width="${n(Math.max(1, w0 * .16))}" stroke-opacity=".38" stroke-linecap="round" transform="translate(${n(w0 * .14)},${n(w0 * .14)})"/>` : '') +
      (light ? `<path d="${sp}" fill="none" stroke="${light}" stroke-width="${n(Math.max(.8, w0 * .1))}" stroke-opacity=".35" stroke-linecap="round" transform="translate(${n(-w0 * .16)},${n(-w0 * .16)})"/>` : ''),
    at: t => bez(s, t),
    ang: t => { const [dx, dy] = der(s, t); return Math.atan2(dy, dx) * 180 / Math.PI; },
  };
}

/* ---------- shared bits ---------- */
const lin = (id, stops, x1 = 0, y1 = 1, x2 = 0, y2 = 0) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;

function wrap(name, defs, body, splat) {
  const dots = Array.from({ length: 16 }, () => {
    const [x, y] = [rr(80, 860), rr(60, 860)];
    return `<circle cx="${n(x)}" cy="${n(y)}" r="${n(rr(1.2, 4.2))}" fill="${pick(splat)}" opacity="${n(rr(.18, .4))}"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
<defs>
<filter id="wc" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
 <feTurbulence type="fractalNoise" baseFrequency=".024" numOctaves="3" seed="4" result="warp"/>
 <feDisplacementMap in="SourceGraphic" in2="warp" scale="8" xChannelSelector="R" yChannelSelector="G" result="d"/>
 <feTurbulence type="fractalNoise" baseFrequency=".45" numOctaves="2" seed="9" result="grain"/>
 <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -.55 1.18" result="gm"/>
 <feComposite in="d" in2="gm" operator="in"/>
</filter>
<filter id="bleed" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="8"/></filter>
${defs}
</defs>
<use href="#art" filter="url(#bleed)" opacity=".2"/>
<g id="art" filter="url(#wc)">${body}</g>
${dots}
</svg>`;
}

function leafShape(L, W) { // pointed leaf along +x from the origin
  return `M0 0 C${n(L * .3)} ${n(-W)} ${n(L * .78)} ${n(-W * .8)} ${n(L)} 0 C${n(L * .78)} ${n(W * .8)} ${n(L * .3)} ${n(W)} 0 0Z`;
}
function leaf(x, y, L, a, fill, rib, W = L * .26) {
  return `<g transform="translate(${n(x)},${n(y)}) rotate(${n(a)})">
    <path d="${leafShape(L, W)}" fill="${fill}" fill-opacity=".9"/>
    <path d="M${n(L * .04)} 0 Q${n(L * .5)} ${n(-W * .12)} ${n(L * .94)} 0" fill="none" stroke="${rib}" stroke-width="${n(Math.max(1, L * .025))}" stroke-opacity=".55"/></g>`;
}

/* =========================================================
   SAKURA
   ========================================================= */
function sakuraFlower(x, y, r, rot, tilt) {
  const pt = `M0 0 C${n(-.46*r)} ${n(-.2*r)} ${n(-.68*r)} ${n(-.7*r)} ${n(-.4*r)} ${n(-.97*r)} Q${n(-.2*r)} ${n(-1.08*r)} ${n(-.07*r)} ${n(-.95*r)} L0 ${n(-.85*r)} L${n(.07*r)} ${n(-.95*r)} Q${n(.2*r)} ${n(-1.08*r)} ${n(.4*r)} ${n(-.97*r)} C${n(.68*r)} ${n(-.7*r)} ${n(.46*r)} ${n(-.2*r)} 0 0Z`;
  let s = `<g transform="translate(${n(x)},${n(y)}) rotate(${n(rot)}) scale(1,${n(tilt * 100) / 100})">`;
  for (let i = 0; i < 5; i++) s += `<path d="${pt}" transform="rotate(${i * 72 + rr(-6, 6) | 0})" fill="url(#pS)" fill-opacity=".9" stroke="#D98799" stroke-opacity=".5" stroke-width="${n(r * .035)}"/>`;
  for (let i = 0; i < 5; i++) { const a = i * 72; const [ex, ey] = up(a, r * .62);
    s += `<path d="M0 0 L${n(ex)} ${n(ey)}" stroke="#E7A2B2" stroke-width="${n(r * .025)}" stroke-opacity=".5"/>`; }
  s += `<circle r="${n(r * .17)}" fill="#C8486A"/>`;
  for (let i = 0; i < 13; i++) { const a = rr(0, 360), L = r * rr(.32, .52), [ex, ey] = up(a, L);
    s += `<path d="M0 0 L${n(ex)} ${n(ey)}" stroke="#C8486A" stroke-width="${n(r * .022)}"/><circle cx="${n(ex)}" cy="${n(ey)}" r="${n(r * .042)}" fill="#E2A845"/>`; }
  return s + '</g>';
}
function sakuraBud(x, y, r, rot) {
  return `<g transform="translate(${n(x)},${n(y)}) rotate(${n(rot)})">
    <path d="M0 0 C${n(-.34*r)} ${n(-.2*r)} ${n(-.34*r)} ${n(-.72*r)} 0 ${n(-r)} C${n(.34*r)} ${n(-.72*r)} ${n(.34*r)} ${n(-.2*r)} 0 0Z" fill="#E07893"/>
    <path d="M${n(-.26*r)} ${n(-.22*r)} Q0 ${n(.12*r)} ${n(.26*r)} ${n(-.22*r)} L0 ${n(.06*r)}Z" fill="#8C5544"/></g>`;
}
function sakuraCluster(p, baseAng, count, r0) {
  let stalks = '', heads = '';
  for (let i = 0; i < count; i++) {
    const a = baseAng + rr(-80, 80), L = rr(18, 58), e = pol(p[0], p[1], a, L);
    stalks += `<path d="M${P(p)} Q${P(pol(...pol(p[0], p[1], a, L * .5), a + 90, 5))} ${P(e)}" stroke="#7E6150" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    heads += R() < .18 ? sakuraBud(e[0], e[1], r0 * .55, a + 90) : sakuraFlower(e[0], e[1], r0 * rr(.82, 1.12), rr(0, 72), rr(.58, 1));
  }
  return { stalks, heads };
}
function sakura() {
  seed = 11;
  const bark = ['#5B4438', '#3B2B24', '#8A7466'];
  const main = limb([[-40, 470], [170, 430], [380, 330], [760, 250]], 46, 8, ...bark);
  const twigs = [
    limb(seg(main.at(.22), -62, 250, .14), 18, 4, ...bark),
    limb(seg(main.at(.42), 28, 300, -.12), 20, 4, ...bark),
    limb(seg(main.at(.55), -48, 230, .1), 15, 3, ...bark),
    limb(seg(main.at(.74), 14, 190, .12), 12, 3, ...bark),
    limb(seg(main.at(.34), 70, 200, .16), 14, 3, ...bark),
  ];
  const subs = [limb(seg(twigs[1].at(.55), -20, 150, .1), 8, 2.5, ...bark), limb(seg(twigs[0].at(.6), 10, 130, -.1), 7, 2.5, ...bark)];
  const all = [main, ...twigs, ...subs];
  let st = '', hd = '', lv = '';
  const spots = [];
  all.forEach((l, i) => [.55, .82, 1].forEach(t => { if (i === 0 && t < .8) return; spots.push([l.at(t), l.ang(t)]); }));
  spots.push([main.at(.62), -80], [main.at(.48), 80], [twigs[1].at(.3), -60], [twigs[0].at(.3), 120]);
  spots.forEach(([p, a]) => {
    const c = sakuraCluster(p, a - 90 + rr(-30, 30), 3 + (R() * 3 | 0), rr(40, 54)); st += c.stalks; hd += c.heads;
    if (R() < .35) lv += leaf(p[0], p[1], rr(30, 46), a + rr(-60, 60), '#9CAF66', '#6E8045');
  });
  const body = all.map(l => l.svg).join('') + lv + st + hd;
  const defs = lin('pS', [[0, '#E2869B'], [.38, '#F3C2CC'], [1, '#FDF0F0']]);
  return wrap('sakura', defs, body, ['#F0B6C2', '#E58FA3', '#F7D6DC']);
}

/* =========================================================
   UME
   ========================================================= */
function umeFlower(x, y, r, rot, tilt, white) {
  const pt = `M0 ${n(-.08*r)} C${n(-.62*r)} ${n(-.2*r)} ${n(-.66*r)} ${n(-1.02*r)} 0 ${n(-r)} C${n(.66*r)} ${n(-1.02*r)} ${n(.62*r)} ${n(-.2*r)} 0 ${n(-.08*r)}Z`;
  let s = `<g transform="translate(${n(x)},${n(y)}) rotate(${n(rot)}) scale(1,${n(tilt * 100) / 100})">`;
  for (let i = 0; i < 5; i++) s += `<path d="${pt}" transform="rotate(${i * 72})" fill="url(#${white ? 'pW' : 'pU'})" fill-opacity=".92" stroke="${white ? '#CDA9B0' : '#7E1328'}" stroke-opacity=".45" stroke-width="${n(r * .035)}"/>`;
  s += `<circle r="${n(r * .16)}" fill="${white ? '#B7C27A' : '#5E1020'}"/>`;
  for (let i = 0; i < 20; i++) { const a = rr(0, 360), L = r * rr(.5, .82), [ex, ey] = up(a, L);
    s += `<path d="M0 0 L${n(ex)} ${n(ey)}" stroke="${white ? '#D9CFA8' : '#F4E7C8'}" stroke-width="${n(r * .02)}" stroke-opacity=".9"/><circle cx="${n(ex)}" cy="${n(ey)}" r="${n(r * .045)}" fill="#EDB843"/>`; }
  return s + '</g>';
}
function ume() {
  seed = 23;
  const bark = ['#3A2D29', '#1F1714', '#6E625A'];
  // ume wood zig-zags: a chain of short straight-ish segments
  const chain = (p, steps, w0, w1) => { const out = []; let q = p; steps.forEach(([a, L], i) => {
    const t0 = i / steps.length, t1 = (i + 1) / steps.length;
    const l = limb(seg(q, a, L, rr(-.05, .05)), w0 + (w1 - w0) * t0, w0 + (w1 - w0) * t1, ...bark);
    out.push(l); q = l.at(1); }); return out; };
  const main = chain([-40, 560], [[-14, 190], [12, 150], [-30, 170], [-6, 150], [-38, 140]], 50, 9);
  const b2 = chain(main[1].at(.9), [[-64, 140], [-40, 120], [-72, 110]], 18, 5);
  const b3 = chain(main[2].at(.7), [[30, 150], [6, 130]], 15, 4);
  const b4 = chain(main[0].at(.8), [[60, 120], [30, 110]], 16, 5);
  // straight new shoots, flowers sit directly on them
  const shoots = [[main[3].at(.6), -78, 230], [main[4].at(1), -50, 160], [b2[2].at(1), -82, 150], [b3[1].at(1), -12, 140],
                  [main[2].at(.3), -100, 170], [b4[1].at(1), 10, 130], [b2[0].at(.7), -130, 120]]
    .map(([p, a, L]) => limb(seg(p, a, L, rr(-.03, .03)), 6, 2.2, '#4A3A33'));
  const all = [...main, ...b2, ...b3, ...b4, ...shoots];
  let hd = '', moss = '';
  main.concat(b2).forEach(l => { for (let k = 0; k < 3; k++) { const p = l.at(rr(.1, .9));
    moss += `<ellipse cx="${n(p[0] + rr(-6, 6))}" cy="${n(p[1] + rr(-6, 6))}" rx="${n(rr(3, 8))}" ry="${n(rr(2, 5))}" fill="#7F8E5E" opacity=".55"/>`; } });
  const twigFlowers = (l, k) => { for (let i = 0; i < k; i++) { const t = (i + rr(.3, .8)) / k, p = l.at(t), a = l.ang(t);
    const side = R() < .5 ? -1 : 1, q = pol(p[0], p[1], a + 90 * side, rr(6, 14));
    if (R() < .25) hd += `<circle cx="${n(q[0])}" cy="${n(q[1])}" r="${n(rr(7, 10))}" fill="url(#pB)"/>`;
    else hd += umeFlower(q[0], q[1], rr(26, 36), rr(0, 72), rr(.6, 1), R() < .22); } };
  shoots.forEach(l => twigFlowers(l, 4));
  [main[4], b2[2], b3[1], b4[1], main[3]].forEach(l => twigFlowers(l, 3));
  const defs = lin('pU', [[0, '#7A1028'], [.45, '#B42A44'], [1, '#DE6A7E']]) +
    lin('pW', [[0, '#E9B9C2'], [.5, '#FBECEC'], [1, '#FFFFFF']]) +
    `<radialGradient id="pB" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#D2546A"/><stop offset="1" stop-color="#7A1028"/></radialGradient>`;
  return wrap('ume', defs, all.map(l => l.svg).join('') + moss + hd, ['#B42A44', '#DE6A7E', '#7A1028']);
}

/* =========================================================
   AJISAI (hydrangea)
   ========================================================= */
function serratedLeaf(x, y, L, W, a, g) {
  const top = [], bot = [];
  for (let i = 0; i <= 28; i++) { const t = i / 28, w = Math.sin(Math.PI * Math.pow(t, .75)) * W, z = i % 2 ? 3.5 : 0;
    top.push([t * L, -(w + z)]); bot.push([t * L, w + z]); }
  const d = 'M' + [...top, ...bot.reverse()].map(P).join('L') + 'Z';
  let veins = '';
  for (let k = 1; k <= 5; k++) { const t = k / 6.5, w = Math.sin(Math.PI * Math.pow(t, .75)) * W * .8;
    veins += `<path d="M${n(t * L)} 0 Q${n(t * L + L * .08)} ${n(-w * .5)} ${n(t * L + L * .14)} ${n(-w)} M${n(t * L)} 0 Q${n(t * L + L * .08)} ${n(w * .5)} ${n(t * L + L * .14)} ${n(w)}"/>`; }
  return `<g transform="translate(${n(x)},${n(y)}) rotate(${n(a)})"><path d="${d}" fill="url(#${g})" fill-opacity=".92"/>
    <g fill="none" stroke="#2F5634" stroke-opacity=".4" stroke-width="1.6"><path d="M0 0 L${n(L * .96)} 0"/>${veins}</g></g>`;
}
function ajisaiHead(cx, cy, Rh, hues) {
  const N = Math.round(Rh * .42), fl = [];
  for (let i = 0; i < N; i++) { const r = Rh * Math.sqrt((i + .5) / N), th = i * 137.508;
    fl.push([r, th]); }
  fl.sort((a, b) => b[0] - a[0]);
  let s = `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(Rh * .92)}" fill="${hues[0]}" opacity=".35"/>`;
  fl.forEach(([r, th]) => {
    const d = r / Rh, [x, y] = pol(cx, cy, th, r), sz = Rh * .19 * (1 - .28 * d) * rr(.88, 1.1);
    const col = hues[Math.floor((Math.sin(rad(th) * 1.3 + d * 2.2) * .5 + .5) * hues.length) % hues.length];
    const pt = `M0 0 C${n(-.46*sz)} ${n(-.18*sz)} ${n(-.52*sz)} ${n(-.82*sz)} 0 ${n(-sz)} C${n(.52*sz)} ${n(-.82*sz)} ${n(.46*sz)} ${n(-.18*sz)} 0 0Z`;
    s += `<g transform="translate(${n(x)},${n(y)}) rotate(${n(th)}) scale(1,${n((1 - .38 * d) * 100) / 100}) rotate(${n(rr(0, 90))})">`;
    for (let k = 0; k < 4; k++) s += `<path d="${pt}" transform="rotate(${k * 90})" fill="${col}" fill-opacity=".82" stroke="#4E5C9A" stroke-opacity=".35" stroke-width="1"/>`;
    s += `<circle r="${n(sz * .12)}" fill="#F7F3EA"/><circle r="${n(sz * .05)}" fill="#4E5C9A"/></g>`;
  });
  return s;
}
function ajisai() {
  seed = 37;
  const stem = ['#6B6E45', '#3F4A2C', '#A3A777'];
  const s1 = limb([[-40, 640], [120, 600], [250, 520], [420, 380]], 26, 12, ...stem);
  const s2 = limb(seg(s1.at(.4), 50, 230, -.2), 14, 8, ...stem);
  let lv = '';
  [[s1.at(.25), -40, 230, 90], [s1.at(.45), 70, 250, 95], [s1.at(.62), -110, 200, 80], [s2.at(.5), 100, 200, 78], [s1.at(.15), 40, 220, 85], [s2.at(.85), -20, 170, 66]]
    .forEach(([p, a, L, W]) => lv += serratedLeaf(p[0], p[1], L, W, a, 'gA'));
  const body = s1.svg + s2.svg + lv +
    ajisaiHead(...s2.at(1), 150, ['#9D86C9', '#B595CC', '#8EA0DC', '#C6A0CF']) +
    ajisaiHead(...s1.at(1), 245, ['#6E8FD0', '#8EA3DF', '#7C86CF', '#9C83C8', '#A9B7E6']);
  const defs = lin('gA', [[0, '#3F6B45'], [.6, '#5E8A58'], [1, '#86A673']], 0, 0, 1, 0);
  return wrap('ajisai', defs, body, ['#8EA3DF', '#9C83C8', '#6E8FD0']);
}

/* =========================================================
   ASAGAO (morning glory)
   ========================================================= */
function asagaoFace(x, y, r, rot, tilt) {
  const pts = []; for (let i = 0; i <= 60; i++) { const th = i / 60 * 360, rr2 = r * (1 + .05 * Math.cos(rad(th * 5))); pts.push(pol(0, 0, th, rr2)); }
  let s = `<g transform="translate(${n(x)},${n(y)}) rotate(${n(rot)}) scale(1,${n(tilt * 100) / 100})">
    <path d="M${pts.map(P).join('L')}Z" fill="url(#pG)" stroke="#3E3A8F" stroke-opacity=".4" stroke-width="1.6"/>`;
  for (let k = 0; k < 5; k++) { const [ex, ey] = up(k * 72 + 36, r * .96);
    s += `<path d="M0 0 L${n(ex)} ${n(ey)}" stroke="#FFFFFF" stroke-width="${n(r * .07)}" stroke-opacity=".75" stroke-linecap="round"/>
      <path d="M0 0 L${n(ex * .96)} ${n(ey * .96)}" stroke="#3A3586" stroke-width="${n(r * .02)}" stroke-opacity=".35" transform="rotate(5)"/>`; }
  return s + `<circle r="${n(r * .2)}" fill="#F7F1D2"/><circle r="${n(r * .07)}" fill="#E9D58A"/></g>`;
}
function asagaoSide(x, y, L, a) {
  return `<g transform="translate(${n(x)},${n(y)}) rotate(${n(a)})">
    <path d="M${n(-L*.05)} 0 C${n(-L*.08)} ${n(-L*.45)} ${n(-L*.38)} ${n(-L*.8)} ${n(-L*.5)} ${n(-L)} L${n(L*.5)} ${n(-L)} C${n(L*.38)} ${n(-L*.8)} ${n(L*.08)} ${n(-L*.45)} ${n(L*.05)} 0Z" fill="url(#pT2)"/>
    <ellipse cx="0" cy="${n(-L)}" rx="${n(L*.5)}" ry="${n(L*.14)}" fill="#5B53B5"/>
    <ellipse cx="0" cy="${n(-L*.99)}" rx="${n(L*.3)}" ry="${n(L*.07)}" fill="#E9E4F6" opacity=".8"/>
    <path d="M${n(-L*.1)} ${n(L*.02)} L0 ${n(-L*.14)} L${n(L*.1)} ${n(L*.02)}Z" fill="#5E8E4F"/></g>`;
}
function heart(x, y, L, a) {
  return `<g transform="translate(${n(x)},${n(y)}) rotate(${n(a)})">
    <path d="M0 ${n(-.05*L)} C${n(-.25*L)} ${n(.1*L)} ${n(-.62*L)} ${n(-.05*L)} ${n(-.55*L)} ${n(-.45*L)} C${n(-.48*L)} ${n(-.75*L)} ${n(-.18*L)} ${n(-.86*L)} 0 ${n(-L)} C${n(.18*L)} ${n(-.86*L)} ${n(.48*L)} ${n(-.75*L)} ${n(.55*L)} ${n(-.45*L)} C${n(.62*L)} ${n(-.05*L)} ${n(.25*L)} ${n(.1*L)} 0 ${n(-.05*L)}Z" fill="url(#gH)" fill-opacity=".9"/>
    <path d="M0 ${n(-.05*L)} L0 ${n(-.9*L)} M0 ${n(-.4*L)} L${n(-.3*L)} ${n(-.6*L)} M0 ${n(-.4*L)} L${n(.3*L)} ${n(-.6*L)}" stroke="#355A30" stroke-opacity=".45" stroke-width="1.6" fill="none"/></g>`;
}
function asagao() {
  seed = 41;
  const v = ['#6F8A4E', '#3E5230', '#A9BF86'];
  const vines = [
    limb([[-40, 760], [160, 700], [120, 420], [330, 330]], 9, 5, ...v),
    limb([[330, 330], [520, 250], [560, 470], [720, 380]], 5, 3, ...v),
    limb([[160, 640], [300, 640], [380, 560], [470, 600]], 6, 3, ...v),
    limb([[200, 480], [180, 340], [260, 200], [380, 150]], 6, 3, ...v),
  ];
  const curl = (p, s) => `<path d="M${P(p)} c${n(10*s)} -${n(8*s)} ${n(22*s)} 2 ${n(16*s)} ${n(12*s)} c-${n(4*s)} ${n(7*s)} -${n(14*s)} ${n(4*s)} -${n(10*s)} -${n(3*s)}" stroke="#6F8A4E" stroke-width="2" fill="none"/>`;
  let lv = '', fl = '';
  [[vines[0].at(.3), -30, 120], [vines[0].at(.62), 60, 110], [vines[1].at(.3), -60, 100], [vines[1].at(.7), 80, 92], [vines[2].at(.6), 20, 96],
   [vines[3].at(.4), -100, 96], [vines[0].at(.85), -140, 90], [vines[3].at(.8), 10, 80]]
    .forEach(([p, a, L]) => lv += heart(p[0], p[1], L, a));
  fl += asagaoFace(...vines[0].at(1), 92, 10, 1);
  fl += asagaoFace(...vines[1].at(1), 82, -20, .82);
  fl += asagaoFace(...vines[2].at(1), 74, 30, .7);
  fl += asagaoFace(...vines[3].at(1), 70, 0, .9);
  fl += asagaoSide(...vines[1].at(.5), 120, 35);
  fl += asagaoSide(...vines[0].at(.45), 100, -60);
  fl += `<g transform="translate(${P(vines[3].at(.62))}) rotate(-20)"><path d="M0 0 C-10 -20 -8 -50 0 -64 C8 -50 10 -20 0 0Z" fill="#6E63B8"/><path d="M-6 -6 L0 -26 L6 -6Z" fill="#5E8E4F"/></g>`;
  const defs = `<radialGradient id="pG"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".3" stop-color="#EDEAF8"/><stop offset=".55" stop-color="#8E86D6"/><stop offset="1" stop-color="#4A43A6"/></radialGradient>` +
    lin('pT2', [[0, '#F3F0FA'], [.6, '#A7A0E0'], [1, '#5B53B5']]) + lin('gH', [[0, '#4E7D45'], [1, '#86AE6B']]);
  return wrap('asagao', defs, vines.map(l => l.svg).join('') + curl(vines[1].at(1), 1.6) + curl(vines[3].at(1), 1.3) + lv + fl, ['#8E86D6', '#4A43A6', '#86AE6B']);
}

/* =========================================================
   MOMIJI (maple)
   ========================================================= */
function maple(x, y, L, a, col) {
  const A = [-100, -66, -33, 0, 33, 66, 100], Ls = [.5, .78, .94, 1, .94, .78, .5].map(v => v * L);
  let d = `M${P(up(-126, L * .18))}`, veins = '';
  A.forEach((ai, i) => {
    const tip = up(ai, Ls[i]), next = i < 6 ? up((ai + A[i + 1]) / 2, L * .4) : up(126, L * .18);
    d += `Q${P(up(ai - 11, Ls[i] * .6))} ${P(tip)}Q${P(up(ai + 11, Ls[i] * .6))} ${P(next)}`;
    veins += `M0 0 L${P(up(ai, Ls[i] * .9))}`;
  });
  d += `L0 ${n(L * .06)}Z`;
  return `<g transform="translate(${n(x)},${n(y)}) rotate(${n(a)})"><path d="M0 ${n(L * .06)} L0 ${n(L * .38)}" stroke="#7A2A1C" stroke-width="2"/>
    <path d="${d}" fill="${col}" fill-opacity=".86" stroke="${col}" stroke-width="1.2"/>
    <path d="${veins}" stroke="#6E1A14" stroke-opacity=".32" stroke-width="1.4" fill="none"/></g>`;
}
function momiji() {
  seed = 53;
  const bark = ['#4E3328', '#2A1A14', '#856455'];
  const main = limb([[-40, 330], [200, 280], [440, 320], [790, 300]], 34, 6, ...bark);
  const tw = [
    limb(seg(main.at(.3), 40, 280, -.12), 14, 3, ...bark), limb(seg(main.at(.5), -40, 220, .14), 12, 3, ...bark),
    limb(seg(main.at(.65), 55, 260, -.1), 12, 3, ...bark), limb(seg(main.at(.82), -20, 160, .12), 8, 2.5, ...bark),
    limb(seg(main.at(.18), -70, 190, .15), 12, 3, ...bark), limb(seg(main.at(.42), 95, 240, .14), 10, 3, ...bark),
  ];
  const all = [main, ...tw];
  const pal = ['#B5252E', '#C8372A', '#D9512B', '#E06F2E', '#E89A3B', '#C23A3A', '#A61E2A'];
  let lv = '';
  all.forEach((l, i) => { const k = i === 0 ? 7 : 6; for (let j = 0; j < k; j++) { const t = i === 0 ? rr(.45, 1) : rr(.25, 1);
    const p = l.at(t), side = R() < .5 ? -1 : 1, q = pol(p[0], p[1], l.ang(t) + 90 * side, rr(10, 30));
    lv += maple(q[0], q[1], rr(44, 72), 180 + rr(-70, 70) + (side < 0 ? 0 : 0), pick(pal)); } });
  for (let j = 0; j < 5; j++) lv += maple(rr(560, 860), rr(520, 860), rr(30, 44), rr(0, 360), pick(pal));
  const body = all.map(l => l.svg).join('') + lv;
  return wrap('momiji', '', body, pal);
}

/* =========================================================
   KIKU (chrysanthemum)
   ========================================================= */
function kikuHead(x, y, Rh, cols, tilt) {
  let s = `<g transform="translate(${n(x)},${n(y)}) scale(1,${n(tilt * 100) / 100})">`;
  for (let k = 0; k < 4; k++) {
    const rk = Rh * (1 - k * .21), cnt = 30 - k * 5, off = k * 7;
    const pt = `M0 0 C${n(-.09*rk)} ${n(-.3*rk)} ${n(-.085*rk)} ${n(-.86*rk)} 0 ${n(-rk)} C${n(.085*rk)} ${n(-.86*rk)} ${n(.09*rk)} ${n(-.3*rk)} 0 0Z`;
    for (let i = 0; i < cnt; i++) s += `<path d="${pt}" transform="rotate(${n(i * 360 / cnt + off + rr(-3, 3))})" fill="${cols[k]}" fill-opacity=".9" stroke="${cols[4]}" stroke-opacity=".4" stroke-width="1"/>`;
  }
  return s + `<circle r="${n(Rh * .13)}" fill="${cols[0]}"/></g>`;
}
function lobedLeaf(x, y, L, a) {
  const A = [-62, -30, 0, 30, 62], Ls = [.6, .85, 1, .85, .6].map(v => v * L);
  let d = `M${P(up(-90, L * .12))}`;
  A.forEach((ai, i) => { const tip = up(ai, Ls[i]), next = i < 4 ? up((ai + A[i + 1]) / 2, L * .55) : up(90, L * .12);
    d += `Q${P(up(ai - 16, Ls[i] * .85))} ${P(tip)}Q${P(up(ai + 16, Ls[i] * .85))} ${P(next)}`; });
  return `<g transform="translate(${n(x)},${n(y)}) rotate(${n(a)})"><path d="${d}Z" fill="url(#gK)" fill-opacity=".9"/>
    <path d="M0 0 L0 ${n(-L * .9)} M0 ${n(-L * .4)} L${P(up(-30, L * .75))} M0 ${n(-L * .4)} L${P(up(30, L * .75))}" stroke="#2F4A2A" stroke-opacity=".4" stroke-width="1.5" fill="none"/></g>`;
}
function kiku() {
  seed = 67;
  const st = ['#5F7A44', '#34482A', '#9DB17A'];
  const s1 = limb([[-40, 860], [140, 760], [260, 560], [400, 330]], 12, 7, ...st);
  const s2 = limb([[-40, 860], [220, 820], [440, 700], [610, 560]], 11, 6, ...st);
  const s3 = limb([[-40, 860], [80, 700], [120, 520], [200, 250]], 10, 6, ...st);
  let lv = '';
  [[s1.at(.35), 40, 120], [s1.at(.6), -50, 104], [s2.at(.4), -20, 116], [s2.at(.7), 70, 96], [s3.at(.5), -70, 96], [s3.at(.3), 50, 110], [s1.at(.8), 60, 80]]
    .forEach(([p, a, L]) => lv += lobedLeaf(p[0], p[1], L, a));
  const body = s1.svg + s2.svg + s3.svg + lv +
    kikuHead(...s1.at(1), 150, ['#D9862A', '#E9A93A', '#F2C25A', '#F8DC8C', '#A85E16'], .82) +
    kikuHead(...s2.at(1), 120, ['#A97FC4', '#C3A3D6', '#DCC8E8', '#F2EAF6', '#7E5A9C'], .74) +
    kikuHead(...s3.at(1), 104, ['#B9472A', '#CF6A38', '#E28F52', '#F0B57A', '#8A3216'], .9);
  return wrap('kiku', lin('gK', [[0, '#456B3E'], [1, '#7FA062']]), body, ['#E9A93A', '#C3A3D6', '#CF6A38']);
}

/* =========================================================
   TSUBAKI (camellia)
   ========================================================= */
function tsubakiFlower(x, y, r, rot, tilt) {
  const pt = s => `M0 0 C${n(-.78*s)} ${n(-.15*s)} ${n(-.74*s)} ${n(-.96*s)} 0 ${n(-s)} C${n(.74*s)} ${n(-.96*s)} ${n(.78*s)} ${n(-.15*s)} 0 0Z`;
  let s = `<g transform="translate(${n(x)},${n(y)}) rotate(${n(rot)}) scale(1,${n(tilt * 100) / 100})">`;
  for (let i = 0; i < 6; i++) s += `<path d="${pt(r)}" transform="rotate(${i * 60 + rr(-8, 8) | 0})" fill="url(#pC)" fill-opacity=".93" stroke="#5E0A18" stroke-opacity=".45" stroke-width="1.6"/>`;
  for (let i = 0; i < 5; i++) s += `<path d="${pt(r * .68)}" transform="rotate(${i * 72 + 30})" fill="url(#pC)" fill-opacity=".9" stroke="#5E0A18" stroke-opacity=".45" stroke-width="1.4"/>`;
  s += `<circle r="${n(r * .3)}" fill="#F6ECCF"/>`;
  for (let i = 0; i < 26; i++) { const [ex, ey] = up(rr(0, 360), r * rr(.08, .28));
    s += `<circle cx="${n(ex)}" cy="${n(ey)}" r="${n(r * .045)}" fill="#EDB12E"/>`; }
  return s + '</g>';
}
function tsubaki() {
  seed = 79;
  const bark = ['#5C5048', '#2E2722', '#968A80'];
  const main = limb([[-40, 420], [200, 400], [420, 330], [760, 300]], 30, 7, ...bark);
  const tw = [limb(seg(main.at(.35), -50, 230, .1), 13, 4, ...bark), limb(seg(main.at(.55), 40, 250, -.1), 12, 4, ...bark),
              limb(seg(main.at(.75), -30, 170, .1), 9, 3, ...bark), limb(seg(main.at(.2), 60, 200, .12), 11, 3, ...bark)];
  const all = [main, ...tw];
  let lv = '';
  all.forEach((l, i) => { for (let j = 0; j < (i ? 4 : 5); j++) { const t = rr(.3, 1), p = l.at(t), side = j % 2 ? 1 : -1;
    lv += leaf(p[0], p[1], rr(130, 175), l.ang(t) + side * rr(30, 60), 'url(#gT)', '#9CBB8E', rr(34, 44)); } });
  const fl = tsubakiFlower(...tw[0].at(1), 140, 10, .9) + tsubakiFlower(...tw[1].at(1), 128, -30, .75) +
    tsubakiFlower(...main.at(.95), 118, 20, .85) + tsubakiFlower(...tw[3].at(1), 108, 40, .7) + tsubakiFlower(...main.at(.5), 96, -10, .65) +
    `<g transform="translate(${P(tw[2].at(1))}) rotate(30)"><ellipse rx="22" ry="30" fill="url(#pC)"/><path d="M-20 10 Q0 30 20 10 L0 24Z" fill="#3F6B47"/></g>`;
  const defs = lin('pC', [[0, '#6E0A1C'], [.5, '#B0172E'], [1, '#D9384B']]) + lin('gT', [[0, '#1F4029'], [1, '#4E7D55']], 0, 0, 1, 0);
  return wrap('tsubaki', defs, all.map(l => l.svg).join('') + lv + fl, ['#B0172E', '#D9384B', '#3F6B47']);
}

/* =========================================================
   SUISEN (narcissus)
   ========================================================= */
function suisenFlower(x, y, r, rot, tilt) {
  const pt = `M0 0 C${n(-.34*r)} ${n(-.25*r)} ${n(-.3*r)} ${n(-.8*r)} 0 ${n(-r)} C${n(.3*r)} ${n(-.8*r)} ${n(.34*r)} ${n(-.25*r)} 0 0Z`;
  let s = `<g transform="translate(${n(x)},${n(y)}) rotate(${n(rot)}) scale(1,${n(tilt * 100) / 100})">`;
  for (let i = 0; i < 6; i++) s += `<path d="${pt}" transform="rotate(${i * 60})" fill="url(#pN)" stroke="#A9A58C" stroke-opacity=".7" stroke-width="1.4"/>`;
  return s + `<circle r="${n(r * .32)}" fill="#F0AE2E" stroke="#D88A1E" stroke-width="2"/><circle r="${n(r * .2)}" fill="#F8D263"/><circle r="${n(r * .07)}" fill="#C9781A"/></g>`;
}
function suisen() {
  seed = 97;
  const base = [-20, 900];
  let lv = '';
  [[-58, 820, .08], [-48, 760, -.06], [-40, 700, .1], [-66, 620, -.12], [-30, 560, .14], [-76, 520, .06]]
    .forEach(([a, L, b]) => lv += limb(seg([base[0] + rr(0, 60), base[1]], a, L, b), 42, 6, '#7C9F85', '#4D6E58', '#B7CDB9').svg);
  const stems = [limb(seg([60, 900], -62, 720, .06), 9, 6, '#88A98C', '#4D6E58'), limb(seg([90, 900], -46, 700, -.04), 8, 6, '#88A98C', '#4D6E58'),
                 limb(seg([40, 900], -74, 560, .05), 8, 6, '#88A98C', '#4D6E58')];
  let fl = '';
  stems.forEach((s, i) => { const top = s.at(1), a = s.ang(1);
    fl += `<path d="M${P(top)} q${n(rr(14, 24))} ${n(rr(-30, -20))} ${n(rr(30, 40))} ${n(rr(-30, -20))} q-6 22 -26 34Z" fill="#D8CDA8" opacity=".9"/>`;
    const k = [6, 5, 5][i];
    for (let j = 0; j < k; j++) { const pa = a + rr(-80, 80) + 90, L = rr(40, 100), q = pol(top[0], top[1], pa - 90, L);
      fl += `<path d="M${P(top)} L${P(q)}" stroke="#88A98C" stroke-width="2.4"/>` + suisenFlower(q[0], q[1], rr(66, 82), rr(0, 60), rr(.62, 1)); } });
  const defs = lin('pN', [[0, '#EEE6CC'], [.5, '#FBF8EE'], [1, '#FFFFFF']]);
  return wrap('suisen', defs, stems.map(s => s.svg).join('') + lv + fl, ['#F0AE2E', '#B7CDB9', '#A9A58C']);
}

const out = { sakura, ume, ajisai, asagao, momiji, kiku, tsubaki, suisen };
for (const [k, f] of Object.entries(out)) {
  const svg = f();
  fs.writeFileSync(`art/${k}.svg`, svg);
  console.log(k.padEnd(8), Math.round(svg.length / 1024) + ' KB');
}
