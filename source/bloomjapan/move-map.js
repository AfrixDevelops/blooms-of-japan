// Demotes the Map tab: moves the map block into Home as a toggled view,
// and replaces the Map tab with a Trip planner tab.
const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');

/* ---- 1. extract map block (mapwrap + legend) ---- */
const mapStart = h.indexOf('<div class="mapwrap" id="mapwrap">');
if (mapStart < 0) throw new Error('mapwrap not found');
const legendStart = h.indexOf('<div class="legend">', mapStart);
const legendEnd = h.indexOf('</div>', legendStart) + '</div>'.length;
let block = h.slice(mapStart, legendEnd);

// hide both by default; Home starts in list mode
block = block
  .replace('<div class="mapwrap" id="mapwrap">', '<div class="mapwrap" id="mapwrap" hidden>')
  .replace('<div class="legend">', '<div class="legend" id="maplegend" hidden>');

/* ---- 2. delete the whole #view-map block ---- */
const viewStart = h.indexOf('          <!-- MAP -->');
if (viewStart < 0) throw new Error('map view comment not found');
// the view closes with the first </div> after the legend
const viewEnd = h.indexOf('</div>', legendEnd) + '</div>'.length;
h = h.slice(0, viewStart) + h.slice(viewEnd).replace(/^\s*\n/, '\n');

/* ---- 3. insert map block into Home after the card list ---- */
const anchor = '<div class="cards" id="homecards"></div>';
if (!h.includes(anchor)) throw new Error('home cards anchor not found');
h = h.replace(anchor, anchor + '\n            ' + block);

fs.writeFileSync('index.html', h);
console.log('map moved into Home; #view-map removed');
