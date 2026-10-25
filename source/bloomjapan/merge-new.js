// Cleans the enriched set and merges it into the app's DATA / GALLERY.
const fs = require('fs');
const enriched = require('./enriched.json');

/* ---- 1. drop infrastructure and fragments, not actual viewing spots ---- */
const JUNK = /堰堤|入口|散策路|の碑|第[一二三四五六七八九十]|＜|バス停|駐車場|トイレ|橋$/;
let rows = enriched.filter(r => !JUNK.test(r.jp));

/* ---- 2. one entry per place: same city + flower is the same site split in OSM ---- */
const km = (a,b,c,d) => { const R=6371,r=x=>x*Math.PI/180;
  const h=Math.sin(r(c-a)/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(r(d-b)/2)**2;
  return 2*R*Math.asin(Math.sqrt(h)); };
const keep = [];
for (const r of rows) {
  const clash = keep.find(k => k.flower === r.flower && (km(k.lat,k.lon,r.lat,r.lon) < 6 ||
    (k.city && k.city === r.city)));
  if (clash) { if ((r.gallery.length) > (clash.gallery.length)) Object.assign(clash, r); continue; }
  keep.push(r);
}
rows = keep;

/* ---- 3. project onto the same Mercator frame as the map ---- */
const BOX = { lonMin:128.3, lonMax:146.3, latMin:30.4, latMax:45.8 };
const rad = d => d*Math.PI/180, mercY = l => Math.log(Math.tan(Math.PI/4 + rad(l)/2));
const X0=rad(BOX.lonMin), X1=rad(BOX.lonMax), YT=mercY(BOX.latMax), YB=mercY(BOX.latMin);
const project = (lon,lat) => [ +((rad(lon)-X0)/(X1-X0)*300).toFixed(1), +((YT-mercY(lat))/(YT-YB)*328).toFixed(1) ];
const MON = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
const ARTICLE = { Street:'A tree-lined avenue', Countryside:'Open countryside', Viewpoint:'A viewpoint',
  Castle:'A castle park', Temple:'A temple', Shrine:'A shrine', River:'A riverside stretch',
  Mountain:'A hillside', Garden:'A garden', Park:'A park' };

// Commons credits can carry newlines when a file has several authors — collapse
// whitespace or the generated string literal breaks across lines.
const esc = s => String(s||'').replace(/\s+/g,' ').trim().replace(/\\/g,'\\\\').replace(/"/g,'\\"');
const dataLines = [], galLines = [];

rows.forEach(r => {
  const inFrame = r.lat>=BOX.latMin && r.lat<=BOX.latMax && r.lon>=BOX.lonMin && r.lon<=BOX.lonMax;
  const [mx,my] = inFrame ? project(r.lon,r.lat) : [null,null];
  const where = [r.city, r.pref].filter(Boolean).join(', ');
  const flowerShort = r.flower.replace(/\s*\(.*?\)/,'');
  // description built from tags and location only — nothing invented
  const desc = `${ARTICLE[r.venue]||'A park'} in ${where||'Japan'}, listed for its ${flowerShort.toLowerCase()}.`;
  dataLines.push(` {id:${r.id},name:"${esc(r.name)}",jp:"${esc(r.jp)}",flower:"${esc(r.flower)}",month:${r.month},region:"${esc(r.region)}",\n`
    + `  desc:"${esc(desc)}",\n`
    + `  address:"${esc(where||'Japan')}",station:"",peak:"${MON[r.month]}",img:"${r.hero}",mx:${mx},my:${my},est:1},`);
  if (r.gallery.length) {
    galLines.push(` ${r.id}:[${r.gallery.map(g=>`{i:"${g.img}",a:"${esc(g.author).slice(0,60)}",l:"${esc(g.licence)}"}`).join(',')}]`);
  }
});

let h = fs.readFileSync('index.html','utf8');
h = h.replace(/(const DATA = \[[\s\S]*?)\n\];/, (m, body) => body + '\n' + dataLines.join('\n') + '\n];');
if (galLines.length) h = h.replace(/(const GALLERY = \{[\s\S]*?)\n\};/, (m, body) => body + ',\n' + galLines.join(',\n') + '\n};');
fs.writeFileSync('index.html', h);

fs.writeFileSync('new-spots.json', JSON.stringify(rows, null, 1));
console.log('enriched in :', enriched.length);
console.log('after clean :', rows.length);
console.log('gallery sets:', galLines.length);
const pm = {}; rows.forEach(r => pm[r.month]=(pm[r.month]||0)+1);
console.log('per month   :', Array.from({length:12},(_,i)=>`${i+1}:${pm[i+1]||0}`).join(' '));
const v = {}; rows.forEach(r => v[r.venue]=(v[r.venue]||0)+1);
console.log('venues      :', Object.entries(v).sort((a,b)=>b[1]-a[1]).map(([k,n])=>`${k} ${n}`).join(', '));
