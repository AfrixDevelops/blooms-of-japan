// Cards become real links to spot.html; the overlay code goes away.
const fs = require('fs');
let t = fs.readFileSync('index.src.html', 'utf8');

t = t.replace('<article class="feat" onclick="openSpot(\'${f.slug}\')" style="cursor:pointer">',
              '<a class="feat" href="spot.html?s=${f.slug}">');
t = t.replace('<article class="card" onclick="openSpot(\'${f.slug}\')" style="cursor:pointer">',
              '<a class="card" href="spot.html?s=${f.slug}">');

// close the two tags that were <article>
t = t.replace(/<\/article>`\)\.join\(''\);\n    feats\.style\.opacity/,
              "</a>`).join('');\n    feats.style.opacity");
t = t.replace(/<\/article>`\)\.join\(''\);/, "</a>`).join('');");

// remove the detail-overlay script block entirely
const start = t.indexOf('/* ---------- spot detail ---------- */');
const endMark = "if(location.hash.startsWith('#/spots/')) openSpot(location.hash.slice(8));";
const end = t.indexOf(endMark);
if (start > 0 && end > start) t = t.slice(0, start) + t.slice(end + endMark.length);

fs.writeFileSync('index.html', t);
console.log('feat links :', (t.match(/class="feat" href="spot\.html/g) || []).length);
console.log('card links :', (t.match(/class="card" href="spot\.html/g) || []).length);
console.log('<article> left:', (t.match(/<article/g) || []).length);
console.log('openSpot refs:', (t.match(/openSpot/g) || []).length);
console.log('closeSpot refs:', (t.match(/closeSpot/g) || []).length);
