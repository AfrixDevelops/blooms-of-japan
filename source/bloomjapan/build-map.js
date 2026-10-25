// Converts Natural Earth 10m TopoJSON -> projected SVG paths for Japan,
// and projects the app's bloom-spot coordinates through the same projection
// so pins land in true geographic positions.
const fs = require('fs');
const topo = require('./countries-10m.json');

/* ---- minimal TopoJSON arc decoder ---- */
const { scale: [sx, sy], translate: [tx, ty] } = topo.transform;
const arcs = topo.arcs.map(arc => {
  let x = 0, y = 0;
  return arc.map(([dx, dy]) => {
    x += dx; y += dy;
    return [x * sx + tx, y * sy + ty];
  });
});
function ringOf(indices) {
  const pts = [];
  for (const idx of indices) {
    const rev = idx < 0;
    const arc = arcs[rev ? ~idx : idx];
    const seg = rev ? arc.slice().reverse() : arc;
    for (const p of (pts.length ? seg.slice(1) : seg)) pts.push(p);
  }
  return pts;
}

const japan = topo.objects.countries.geometries.find(g => /japan/i.test(g.properties.name));
// MultiPolygon: [ [ring, hole...], ... ]
let rings = japan.arcs.map(poly => ringOf(poly[0]));

/* ---- frame: mainland Japan, Ryukyu/Ogasawara excluded (matches poster framing) ---- */
const BOX = { lonMin: 128.3, lonMax: 146.3, latMin: 30.4, latMax: 45.8 };
const inBox = ([lon, lat]) => lon >= BOX.lonMin && lon <= BOX.lonMax && lat >= BOX.latMin && lat <= BOX.latMax;
rings = rings.filter(r => r.filter(inBox).length / r.length > 0.5);

/* ---- Mercator ---- */
const rad = d => d * Math.PI / 180;
const mercY = lat => Math.log(Math.tan(Math.PI / 4 + rad(lat) / 2));
const X0 = rad(BOX.lonMin), X1 = rad(BOX.lonMax);
const YTop = mercY(BOX.latMax), YBot = mercY(BOX.latMin);  // mercY grows northward
const W = 300;
const H = Math.round(W * (YTop - YBot) / (X1 - X0));
const project = (lon, lat) => [
  (rad(lon) - X0) / (X1 - X0) * W,
  (YTop - mercY(lat)) / (YTop - YBot) * H,
];

/* ---- shoelace area in projected space, to drop specks ---- */
function area(ring) {
  let a = 0;
  for (let i = 0, n = ring.length; i < n; i++) {
    const [x1, y1] = ring[i], [x2, y2] = ring[(i + 1) % n];
    a += x1 * y2 - x2 * y1;
  }
  return Math.abs(a / 2);
}

/* ---- Douglas-Peucker ---- */
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const sqTol = tol * tol;
  const sqSegDist = (p, a, b) => {
    let [x, y] = a; let dx = b[0] - x, dy = b[1] - y;
    if (dx || dy) {
      const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) { x = b[0]; y = b[1]; }
      else if (t > 0) { x += dx * t; y += dy * t; }
    }
    dx = p[0] - x; dy = p[1] - y;
    return dx * dx + dy * dy;
  };
  const keep = new Array(pts.length).fill(false);
  keep[0] = keep[pts.length - 1] = true;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop();
    let maxSq = 0, index = -1;
    for (let i = first + 1; i < last; i++) {
      const sq = sqSegDist(pts[i], pts[first], pts[last]);
      if (sq > maxSq) { maxSq = sq; index = i; }
    }
    if (maxSq > sqTol) { keep[index] = true; stack.push([first, index], [index, last]); }
  }
  return pts.filter((_, i) => keep[i]);
}

const projected = rings
  .map(r => r.map(([lon, lat]) => project(lon, lat)))
  .map(r => ({ ring: r, a: area(r) }))
  .filter(o => o.a > 1.2)                       // drop specks
  .sort((a, b) => b.a - a.a)
  .map(o => simplify(o.ring, 0.35));

const d = projected
  .map(r => 'M' + r.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z')
  .join('');

/* ---- project the app's spots + reference cities ---- */
const SPOTS = [
  [1,'Mount Yoshino',34.3592,135.8677],[2,'Ashikaga',36.314,139.52],[3,'Farm Tomita',43.4186,142.4275],
  [4,'Kinchakuda',35.8828,139.3094],[5,'Hitachi Seaside',36.402,140.596],[6,'Kairakuen',36.3739,140.4552],
  [7,'Hasedera',35.3125,139.5328],[8,'Showa Kinen',35.7061,139.3908],[9,'Akeno',35.7766,138.4442],
  [10,'Engakuji',35.3347,139.5458],[11,'Nabana no Sato',35.0864,136.7025],[12,'Ueno Toshogu',35.7138,139.7719],
  [13,'Meguro River',35.6445,139.6991],[14,'Nezu Shrine',35.7202,139.7607],[15,'Fuji Motosuko',35.438,138.59],
  [16,'Hokuryu',43.7256,141.8906],[17,'Nada-Kuroiwa',34.2372,134.845],[18,'Hirosaki',40.608,140.464],
  [19,'Tsubaki',33.8333,134.6667],[20,'Shinjuku Gyoen',35.6852,139.7101],[21,'Kawachi',33.83,130.81],
  [22,'Sera Kogen',34.6,132.95],[23,'Yakachi River',34.9083,136.9158],[24,'Gongendo',36.0886,139.7303],
  [25,'Hagurosan',38.5833,140.9333],
];
const CITIES = [
  ['Sapporo',43.06,141.35],['Sendai',38.27,140.87],['Tokyo',35.68,139.77],
  ['Kyoto',35.01,135.77],['Osaka',34.69,135.50],['Hiroshima',34.39,132.46],['Fukuoka',33.59,130.40],
];
const FUJI = project(138.7274, 35.3606);

const out = {
  width: W, height: H,
  path: d,
  spots: SPOTS.map(([id, name, lat, lon]) => {
    const [x, y] = project(lon, lat);
    return { id, name, x: +x.toFixed(1), y: +y.toFixed(1) };
  }),
  cities: CITIES.map(([name, lat, lon]) => {
    const [x, y] = project(lon, lat);
    return { name, x: +x.toFixed(1), y: +y.toFixed(1) };
  }),
  fuji: { x: +FUJI[0].toFixed(1), y: +FUJI[1].toFixed(1) },
};

fs.writeFileSync('map-data.json', JSON.stringify(out, null, 1));
console.log(`viewBox 0 0 ${W} ${H}`);
console.log('rings kept:', projected.length, '| total points:', projected.reduce((s, r) => s + r.length, 0));
console.log('path chars:', d.length);
console.log('fuji:', out.fuji);
console.log('cities:', out.cities.map(c => `${c.name}(${c.x},${c.y})`).join(' '));
console.log('spot sample:', out.spots.slice(0, 4).map(s => `${s.name}(${s.x},${s.y})`).join(' '));
