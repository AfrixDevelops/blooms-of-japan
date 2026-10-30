// The artifact viewer only serves index.html, so the spot and seasons pages move
// in here as full-page views behind hash routes. On real hosting they stay the
// standalone spot.html / seasons.html files, which are still published alongside.
const fs = require('fs');
let t = fs.readFileSync('index.html', 'utf8');   // output of build-index.js

/* the guides (guides.js), with their spot links and counts filled in from the spot data. A link to a
   spot that no longer exists fails the build rather than shipping a dead link. */
const SPOTS = (() => { const prev = global.window; global.window = {};
  eval(fs.readFileSync('data.js', 'utf8')); const D = global.window.D; global.window = prev; return D; })();
const GUIDES = require('./guides.js').map(g => {
  const spot = s => { const f = SPOTS.feat.find(x => x.slug === s); if (!f) throw new Error(`guide ${g.slug}: no spot "${s}"`); return f; };
  const body = g.body.trim()
    .replace(/\{\{n:([a-z-]+)\}\}/g, (_, k) => { const fg = SPOTS.flowerGroups.find(x => x.k === k);
      if (!fg) throw new Error(`guide ${g.slug}: no flower group "${k}"`); return fg.n; })
    .replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (_, s, text) => `<a href="/spots/${s}">${text || spot(s).name}</a>`);
  if (g.img) spot(g.img);
  return Object.assign({}, g, { body });
});
const GUIDES_JSON = JSON.stringify(GUIDES).replace(/</g, '\\u003c');

/* 1. wrap the hero down to the <!-- /home --> marker as the home view. The footer sits after the
      marker, outside all three views, so it stays on screen on every page. */
const start = t.indexOf('<section class="hero">');
const homeEnd = t.indexOf('<!-- /home -->');
if (start < 0 || homeEnd < start) throw new Error('could not find home content bounds');

const home = t.slice(start, homeEnd);
t = t.slice(0, start)
  + '<div id="view-home">\n' + home + '\n</div>\n\n'
  + '<div id="view-spot" hidden></div>\n<div id="view-seasons" hidden></div>\n'
  + t.slice(homeEnd);

/* 2. cards point at hash routes rather than a sibling file */
t = t.replace(/href="spot\.html\?s=\$\{f\.slug\}"/g, 'href="/spots/${f.slug}"');

/* 3. router + the two extra views, appended to the END of the last script
      (a plain .replace would hit the <script src="data.js"></script> tag first) */
const lastClose = t.lastIndexOf('</script>');
if (lastClose < 0) throw new Error('no script tag to extend');
t = t.slice(0, lastClose) + `
/* ---------- views ---------- */
const MONTHS_LONG = { spring:'March – May', summer:'June – August', autumn:'September – November', winter:'December – February' };
const SEASON_PROPS = {
  spring: 'Cherry and plum — <b>春の訪れ</b>, the arrival of spring. Petals drift across the page.',
  summer: 'Hydrangea for the rainy season and morning glory for the hot mornings after it. Loose florets fall.',
  autumn: 'Maple and chrysanthemum — <b>紅葉</b> season, when the colour moves south again. Leaves fall.',
  winter: 'Camellia and narcissus, the <b>雪中花</b> that flowers in snow. Snow falls.',
};
const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const nowSeason = (() => { const n = new Date().getMonth() + 1;
  return (n>=3&&n<=5)?'spring':(n>=6&&n<=8)?'summer':(n>=9&&n<=11)?'autumn':'winter'; })();

function statusLine(mm){
  const d = (mm - (new Date().getMonth() + 1) + 12) % 12;
  if(d === 0) return 'Blooming now — this is the week.';
  if(d === 1) return 'Coming soon, about a month out.';
  if(d === 11) return 'Just finished for this year.';
  return \`About \${d} months away. Typical window, shifts with the season.\`;
}

// Google Maps search for the spot: the Japanese name plus the address finds the place itself,
// not just the town (the weather coordinates are rounded to about 1 km, too rough for directions)
const mapsUrl = f => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(((f.jp || '') + ' ' + f.address).trim());

// Partner links and the Pro box in the spot sidebar: hidden for now, set to true to bring them back
const SHOW_PROMOS = false;

// Affiliate partner box in the spot sidebar, keyed by prefecture. Shown only where there is a
// genuinely relevant product, so most spots carry nothing. skip matches addresses the product
// doesn't serve: the Okinawa pass covers main-island attractions, so the outer islands
// (Miyako, Ishigaki, and Taketomi town, which includes Iriomote) get no box.
const PARTNERS = {
  Okinawa: { label: 'Have Fun in Okinawa Pass',
    href: 'https://affiliate.klook.com/redirect?aid=140862&aff_adid=1527910&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F97490-have-fun-in-okinawa',
    copy: 'Any three Okinawa attractions on one pass, good for a week.',
    skip: /Yaeyama|Ishigaki|Miyakojima/ },
};
// a box for one spot, keyed by slug, wins over its prefecture's: Tofuku-ji (one stop from Inari)
// and Jonangu are close to Fushimi Inari, which the rest of Kyoto isn't
const FUSHIMI_INARI = { label: 'Fushimi Inari Night Walking Tour',
  href: 'https://www.getyourguide.com/kyoto-l96826/kyoto-fushimi-inari-night-walking-tour-t758261/?partner_id=HB90XTH&utm_medium=online_publisher',
  copy: 'A guided evening walk through the torii gates of Fushimi Inari, a short trip from here.' };
// Sumida Park is in Asakusa; the Ueno spots are three stops from it on the Ginza Line
const SENSOJI = (copy) => ({ label: "Asakusa and Senso-ji Tour", copy,
  href: 'https://www.getyourguide.com/tokyo-l193/tokyo-asakusa-and-tokyo-s-oldest-temple-senso-ji-tour-t695420/?partner_id=HB90XTH&utm_medium=online_publisher&cmp=tokyo-asakusa' });
const SENSOJI_ASAKUSA = SENSOJI("A guided tour of Senso-ji, Tokyo's oldest temple, and the old streets of Asakusa, a few minutes' walk from here.");
const SENSOJI_UENO = SENSOJI("A guided tour of Senso-ji, Tokyo's oldest temple, and the old streets of Asakusa, three stops from Ueno on the Ginza Line.");
// the Fuji day trip stops at the Chureito Pagoda (Arakurayama) and Lake Kawaguchi (Oishi Park), but not
// at Motosuko, so that box says so
const FUJI_TRIP = (copy) => ({ label: 'Mt Fuji Day Trip from Tokyo', copy,
  href: 'https://www.getyourguide.com/tokyo-l193/tokyo-mt-fujichureito-pagodalake-kawaguchioshino-hakkai-t792363/?partner_id=HB90XTH&utm_medium=online_publisher' });
const FUJI_KAWAGUCHI = FUJI_TRIP('A day trip from Tokyo to the Chureito Pagoda, Lake Kawaguchi, where this park is, and the springs of Oshino Hakkai.');
const SPOT_PARTNERS = { 'tofuku-ji-temple': FUSHIMI_INARI, 'jonangu-shrine': FUSHIMI_INARI,
  'sumida-park': SENSOJI_ASAKUSA,
  'ueno-park': SENSOJI_UENO, 'shinobazu-pond': SENSOJI_UENO, 'ueno-toshogu-peony-garden': SENSOJI_UENO,
  'arakurayama-sengen-park': FUJI_TRIP('A day trip from Tokyo that stops here at the Chureito Pagoda, then Lake Kawaguchi and the springs of Oshino Hakkai.'),
  'oishi-park': FUJI_KAWAGUCHI, 'oishi-park-april': FUJI_KAWAGUCHI, 'oishi-park-october': FUJI_KAWAGUCHI,
  'fuji-motosuko-resort': FUJI_TRIP("A day trip from Tokyo to the Chureito Pagoda, Lake Kawaguchi and Oshino Hakkai. It doesn't stop at the shibazakura, so it suits another day in the area.") };
const partnerBox = f => { const p = SPOT_PARTNERS[f.slug] || PARTNERS[f.pref]; if(!p || (p.skip && p.skip.test(f.address))) return '';
  return '<div class="dbox partner"><h4>Partner</h4>'
    + '<p class="pcopy">' + esc(p.copy) + '</p>'
    + '<a href="' + p.href + '" target="_blank" rel="sponsored noopener">' + esc(p.label) + ' ›</a>'
    + '<p class="pdisc">We earn a commission if you book through this link, at no extra cost to you.</p></div>'; };

function spotView(slug){
  const f = D.feat.find(x => x.slug === slug);
  if(!f) return '<div style="max-width:640px;margin:80px auto;text-align:center"><h2>Spot not found</h2></div>';
  const near = D.feat.filter(x => x.slug !== f.slug && x.region === f.region).slice(0,3);
  // CC BY / BY-SA photos have to name their author, so every credit we hold gets printed
  const credits = [f.cred].concat((f.gal||[]).map(g => g.a ? g.a + ' (' + g.l + ')' : g.l))
    .filter((c,i,a) => c && a.indexOf(c) === i);
  return \`
  <nav class="crumbs"><a href="/">Home</a> › <a href="/when/\${MON[f.m].toLowerCase()}">\${MON[f.m]}</a> › <a href="/flowers/\${f.fl[0]}">\${esc(flowerName(f))}</a> › \${esc(f.name)}</nav>
  <div class="detail"><div class="dwrap">
    <div class="dmain">
      <div class="eyebrow">\${esc(f.flower.replace(/\\s*\\(.*?\\)/,''))} · \${MON[f.m]}</div>
      <h1 style="margin-top:12px">\${esc(f.name)}</h1>
      <div class="pills dpills">\${statusPill(f)}\${tagPills(f)}</div>
      <div class="dsub">\${esc(f.jp)} · \${esc(f.flower.replace(/\\s*\\(.*?\\)/,''))} · \${esc(f.region)}</div>
      <div class="dhero"><img src="\${f.img}" alt="\${esc(flowerName(f))} at \${esc(f.name)}, \${esc(f.address)}"></div>
      \${f.gal && f.gal.length ? \`<div class="dthumbs">\${f.gal.map((g,i)=>\`<img src="\${g.i}" alt="\${esc(f.name)}, photo \${i + 2}" loading="lazy">\`).join('')}</div>\` : ''}
      \${credits.length ? \`<p class="dcred">\${(f.gal && f.gal.length) ? 'Photos' : 'Photo'} \${credits.map(esc).join(' · ')}\${credits.some(c => c[0] === '©') ? '' : ' — via Wikimedia Commons'}</p>\` : ''}
      <div class="dblock"><h3>About this spot</h3><p>\${esc(f.desc)}</p></div>
      <div class="dblock"><h3>Getting there</h3><div class="dfacts">
        \${f.station ? \`<div class="dfact"><div class="k">Nearest station</div><div class="v">\${esc(f.station)}</div></div>\` : ''}
        <div class="dfact"><div class="k">Address</div><div class="v">\${esc(f.address)}</div></div>
        <div class="dfact"><div class="k">Show this at the station</div><div class="v">\${esc(f.jp || f.name)}</div></div>
      </div>
      <a class="mapbtn" href="\${mapsUrl(f)}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.4"/></svg>
        Open in Google Maps</a></div>
    </div>
    <aside class="dside">
      <div class="dbox"><h4>Typical peak</h4><div class="pk">\${esc(usually(f.peak))}</div><p>\${bloomStatus(f).t} — the usual window from past years, not a report from this season. It moves with the weather, so check locally before you travel.</p></div>
      \${guideBox(f)}
      \${f.ll ? \`<div class="dbox wx" id="wx"><h4>Weather here</h4><div class="wxb" aria-live="polite"></div></div>\` : ''}
      \${partnerBox(f)}
      \${SHOW_PROMOS ? \`<div class="dbox partner"><small>Partner</small>
        <a>Japan Rail Pass — covers getting here ›</a>
        <a>Small-group tours near \${esc(f.region)} ›</a></div>
      <div class="dbox"><h4>Blooms of Japan Pro</h4>
        <p>Ad-free, offline access and alerts for every spot you save. ¥700 for a 30-day trip pass.</p></div>\` : ''}
    </aside>
  </div></div>
  \${near.length ? \`<section class="nearby"><h3>Nearby in \${esc(f.region)}</h3>
    <div class="grid">\${near.map(nb=>\`<a class="card rv" href="/spots/\${nb.slug}">
      <img src="\${nb.th}" alt="\${esc(flowerName(nb))} at \${esc(nb.name)}" loading="lazy" decoding="async">
      <div class="cb"><h4>\${esc(nb.name)}</h4>
        <div class="mt"><span>\${esc(nb.flower.replace(/\\s*\\(.*?\\)/,''))}</span><span>\${MON[nb.m]}</span></div>
      </div></a>\`).join('')}</div></section>\` : ''}\`;
}

/* Weather box on spot pages: today and the next few days from Open-Meteo (free, no key), fetched in the
   browser when the page opens. Never baked into the saved pages; nothing is shown if it can't load. */
const WX_ICON = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  part: '<path d="M8 3.5v1.3M3.5 8h1.3M4.8 4.8l.9.9M11.2 4.8l-.9.9"/><path d="M5.6 10.2A3.2 3.2 0 1 1 11 7"/><path d="M8 20h9.5a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6 1.2A2.9 2.9 0 0 0 8 20z"/>',
  cloud: '<path d="M7 19h10.5a4 4 0 0 0 .5-8 5.5 5.5 0 0 0-10.6 1.3A3.4 3.4 0 0 0 7 19z"/>',
  fog: '<path d="M7 14h10.5a4 4 0 0 0 .5-8 5.5 5.5 0 0 0-10.6 1.3A3.4 3.4 0 0 0 7 14z"/><path d="M5 17.5h14M7 20.5h10"/>',
  rain: '<path d="M7 15h10.5a4 4 0 0 0 .5-8 5.5 5.5 0 0 0-10.6 1.3A3.4 3.4 0 0 0 7 15z"/><path d="M8.5 18l-1 2.5M12.5 18l-1 2.5M16.5 18l-1 2.5"/>',
  snow: '<path d="M7 15h10.5a4 4 0 0 0 .5-8 5.5 5.5 0 0 0-10.6 1.3A3.4 3.4 0 0 0 7 15z"/><path d="M8.5 18.5h.01M12 20h.01M15.5 18.5h.01M10 21.5h.01M14 21.5h.01" stroke-width="2.4"/>',
  storm: '<path d="M7 15h10.5a4 4 0 0 0 .5-8 5.5 5.5 0 0 0-10.6 1.3A3.4 3.4 0 0 0 7 15z"/><path d="M12.5 15.5l-2 3.5h3l-2 3.5"/>',
};
// WMO weather codes, grouped
const wxKind = c => c === 0 ? ['sun','Clear'] : c <= 2 ? ['part','Partly cloudy'] : c === 3 ? ['cloud','Cloudy']
  : c <= 48 ? ['fog','Fog'] : c <= 67 || (c >= 80 && c <= 82) ? ['rain','Rain'] : c <= 77 || c === 85 || c === 86 ? ['snow','Snow'] : ['storm','Thunderstorms'];
const wxSvg = (k, sz) => \`<svg viewBox="0 0 24 24" width="\${sz}" height="\${sz}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\${WX_ICON[k]}</svg>\`;
const wxCache = {};
async function loadWeather(f){
  const box = document.getElementById('wx'); if (!box || !f.ll) return;
  const body = box.querySelector('.wxb');
  body.innerHTML = '<p class="wxl">Loading forecast…</p>';
  const key = f.ll.join(',');
  try {
    if (!wxCache[key] || Date.now() - wxCache[key].t > 30 * 60e3) {
      const u = 'https://api.open-meteo.com/v1/forecast?' + new URLSearchParams({ latitude: f.ll[0], longitude: f.ll[1],
        current: 'temperature_2m,weather_code', daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
        timezone: 'Asia/Tokyo', forecast_days: '5' });
      const r = await fetch(u); if (!r.ok) throw 0;
      wxCache[key] = { t: Date.now(), d: await r.json() };
    }
    if (document.getElementById('wx') !== box) return;          // the reader has moved on to another page
    const d = wxCache[key].d, c = d.current, dy = d.daily;
    const [ck, cl] = wxKind(c.weather_code);
    const day = s => new Date(s + 'T12:00:00+09:00').toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'Asia/Tokyo' });
    body.innerHTML = \`<div class="wxnow">\${wxSvg(ck, 34)}<div><b>\${Math.round(c.temperature_2m)}°</b><span>\${cl} now</span></div></div>
      <div class="wxdays">\${dy.time.map((t, i) => { const [k, l] = wxKind(dy.weather_code[i]); const p = dy.precipitation_probability_max[i];
        return \`<div class="wxd" title="\${l}\${p != null ? ', ' + p + '% chance of rain' : ''}"><small>\${i ? day(t) : 'Today'}</small>\${wxSvg(k, 22)}<span>\${Math.round(dy.temperature_2m_max[i])}°<i>\${Math.round(dy.temperature_2m_min[i])}°</i></span></div>\`; }).join('')}</div>
      <p class="wxsrc">Japan time · <a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a></p>\`;
  } catch { box.hidden = true; }
}

/* ---------- standalone information pages ----------
   Privacy, terms, about and contact. They are plain strings with no interpolation, and they render into
   the same secondary container the seasons page uses. Keep the privacy page honest: it has to describe
   what the site actually does, so amend it whenever a new third party or any storage is introduced. */
var CONTACT_EMAIL = 'hello@bloomsofjapan.com';   // must be a mailbox that works before applying to AdSense

var INFO = {
  privacy: { title: 'Privacy', jp: '個人情報', h1: 'Privacy policy', body:
    '<p>This site is run as a personal project and collects as little as it can. There is no account to ' +
    'create and nothing is sold or handed to a data broker. It does use <strong>Google Analytics</strong> ' +
    'to count visits, and that is described in full below.</p>' +
    '<h3>Google Analytics</h3>' +
    '<p><strong>Only if you agree.</strong> The first time you arrive the site asks whether it may use ' +
    'cookies for visit statistics and personalised ads. Analytics is not loaded and no Analytics request ' +
    'reaches Google unless you say yes, and your answer is remembered in your browser so you are not asked ' +
    'again. You can change it whenever you like with the &ldquo;Cookie choice&rdquo; link at the bottom of ' +
    'any page.</p>' +
    '<p>If you do agree, the site uses Google Analytics 4 to see how many people visit and which pages ' +
    'they read. To do that it stores a randomly generated identifier in your browser and sends Google ' +
    'your IP address, the page you are on, roughly where you are, and basic details about your device ' +
    'and browser.</p>' +
    '<p>It is used to answer questions like &ldquo;is anyone finding the ginkgo pages?&rdquo; &mdash; not to ' +
    'identify you. No name, email or address is collected by this site, so nothing here is tied to you ' +
    'personally. Google anonymises IP addresses in Analytics 4 and the data is not used for advertising ' +
    'by this site.</p>' +
    '<p>If you would rather not be counted, Google publishes an ' +
    '<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">opt-out browser ' +
    'add-on</a>, and any tracker blocker or your browser&rsquo;s &ldquo;do not track&rdquo; list will stop ' +
    'it too. Nothing on the site stops working if you block it.</p>' +
    '<h3>Third parties that can see your visit</h3>' +
    '<p>Two services necessarily receive a request from your browser, which means each can see your IP ' +
    'address, roughly where you are and which page you asked for:</p>' +
    '<ul>' +
    '<li><strong>Vercel</strong> hosts the site and keeps standard server logs.</li>' +
    '<li><strong>Google Analytics</strong>, on every page, but only once you have agreed to it.</li>' +
    '<li><strong>Open-Meteo</strong> supplies the live forecast shown on a spot page. Your browser asks it ' +
    'directly for the weather at that spot. It is only contacted when you open a spot page, and it is sent ' +
    "the spot's coordinates, never yours.</li>" +
    '</ul>' +
    '<p>Typefaces are served from this site rather than from Google Fonts, so the fonts themselves send ' +
    'no request to Google.</p>' +
    '<h3>Mailing list</h3>' +
    '<p>There is no mailing list and no sign-up form on the site, so there is no address of yours here to ' +
    'store. If a seasonal list is ever opened, this page will name the provider that receives addresses ' +
    'before any form appears.</p>' +
    '<h3>Affiliate links</h3>' +
    '<p>Some spot pages carry a clearly marked "Partner" box linking to a booking site, currently Klook or GetYourGuide. ' +
    'If you book through one of those links we may earn a commission, and you pay no more than you ' +
    'otherwise would. The link carries a tag identifying this site, so the booking site can see the visit ' +
    'came from here and may set its own cookies once you arrive; what it then collects is covered by that ' +
    'site\\'s privacy policy, not this one. Nothing about you is sent to them by us, and no partner box ' +
    'appears on a spot unless the place it points to is genuinely relevant.</p>' +
    '<h3>Advertising</h3>' +
    '<p>The site currently carries no advertising beyond the affiliate links described above. If display ' +
    'advertising is introduced, Google and its partners may ' +
    'set cookies or read device identifiers to serve and measure ads, and this page will be updated to say ' +
    'so before any ad is shown. You can review and change your choices at ' +
    '<a href="https://myadcenter.google.com/" target="_blank" rel="noopener">Google My Ad Center</a> and read ' +
    'how Google uses data at ' +
    '<a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">' +
    'policies.google.com/technologies/partner-sites</a>.</p>' +
    '<h3>Your rights and how to ask</h3>' +
    '<p>Because nothing is stored, there is no profile to download or erase. For any question about this ' +
    'policy, write to <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>.</p>' },

  terms: { title: 'Terms', jp: '利用規約', h1: 'Terms of use', body:
    '<h3>What this site is</h3>' +
    '<p>Blooms of Japan is a free guide to where and when flowers bloom in Japan. You are welcome to use it ' +
    'for planning a trip.</p>' +
    '<h3>Bloom dates are estimates</h3>' +
    '<p>Every peak time on this site is a typical window, not a forecast. Flowering shifts by a week or more ' +
    'with each year&rsquo;s weather, and a single warm spell can move it. Opening hours and admission prices ' +
    'change too. <strong>Check the official site for a place before travelling to it.</strong> The site is ' +
    'offered as it is, without any warranty, and cannot be held responsible for a wasted journey.</p>' +
    '<h3>Photographs</h3>' +
    '<p>Photographs come from Wikimedia Commons and are used under their individual licences, which are ' +
    'Creative Commons or public domain. The photographer and licence are named beneath the photographs on ' +
    'every spot page. Those credits belong to the photographers, not to this site, and each photograph ' +
    'remains theirs under its own licence.</p>' +
    '<h3>The site&rsquo;s own text</h3>' +
    '<p>The written descriptions, the calendar and the maps are the work of this site. Quote a sentence with ' +
    'a link if it is useful to you; please do not republish the whole collection.</p>' +
    '<h3>Getting something corrected</h3>' +
    '<p>If a price, a bloom window or a photo credit here is wrong, or a photograph is yours and you would ' +
    'like it removed, write to <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a> and it will ' +
    'be put right.</p>' },

  about: { title: 'About', jp: '花暦について', h1: 'About Blooms of Japan', body:
    '<p>Almost everything written about flowers in Japan is about cherry blossom, and cherry blossom is ' +
    'about three weeks of the year. This site is an attempt to cover the other forty-nine.</p>' +
    '<h3>What is here</h3>' +
    '<p>A calendar of the flowering year, and a page for every spot with its typical peak window, the nearest ' +
    'station, and what the place is actually like. Each flower has its own page, and each month has its own ' +
    'page, so you can start from a date or from a flower.</p>' +
    '<h3>Where the information comes from</h3>' +
    '<p>Bloom windows, prices and access details are compiled from prefectural and city tourism sources, ' +
    'park and temple websites, and Japanese autumn-colour and blossom trackers. They are checked against ' +
    'those sources and corrected when they turn out to be out of date &mdash; admission prices in particular ' +
    'change more often than most travel pages admit.</p>' +
    '<p>Photographs are free-licensed images from Wikimedia Commons, credited to their photographers on each ' +
    'spot page.</p>' +
    '<h3>What it is not</h3>' +
    '<p>It is not a live bloom forecast. The dates describe a normal year; a real one is always a little ' +
    'early or a little late. Please check locally before you travel.</p>' +
    '<p>Spotted a mistake? <a href="/contact">Tell me about it</a>.</p>' },

  contact: { title: 'Contact', jp: 'お問い合わせ', h1: 'Contact', body:
    '<p>Write to <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>. It is read by one person, ' +
    'so a reply may take a few days.</p>' +
    '<h3>Especially worth writing about</h3>' +
    '<ul>' +
    '<li><strong>Something is wrong.</strong> A changed admission price, a station that has been renamed, a ' +
    'bloom window that no longer matches reality, a garden that has closed.</li>' +
    '<li><strong>A photograph is yours.</strong> If a photo is credited wrongly, or you would like it taken ' +
    'down, say so and it will be removed promptly.</li>' +
    '<li><strong>A spot is missing.</strong> Particularly outside the big cities, and most of all if you have ' +
    'a photograph of it you are willing to license.</li>' +
    '</ul>' },
};

function infoView(key){
  var p = INFO[key];
  if (!p) return '<div style="max-width:640px;margin:80px auto;text-align:center"><h2>Page not found</h2></div>';
  return '<div class="pagehead">' +
    '<nav class="crumbs" style="padding-left:0"><a href="/">Home</a> &rsaquo; ' + esc(p.title) + '</nav>' +
    '<div class="eyebrow">' + esc(p.title) + ' <span class="jpk">' + p.jp + '</span></div>' +
    '<h1>' + esc(p.h1) + '</h1></div>' +
    '<div class="prose">' + p.body + '</div>';
}

/* ---------- guides ----------
   /guides lists them, /guides/<slug> is one guide: the question as the heading, the answer straight after.
   The text comes from guides.js, with spot links and counts already filled in by the build. */
const GUIDES = ${GUIDES_JSON};
const longDate = s => { const [y, m, d] = s.split('-').map(Number); return d + ' ' + MON[m] + ' ' + y; };

function guidesIndex(){
  return '<div class="pagehead">' +
    '<nav class="crumbs" style="padding-left:0"><a href="/">Home</a> &rsaquo; Guides</nav>' +
    '<div class="eyebrow">Guides <span class="jpk">案内</span></div>' +
    "<h1>Guides to Japan's flower seasons</h1>" +
    '<p>Straight answers to the questions people ask before a trip, from the Blooms of Japan team.</p></div>' +
    '<div class="glist">' + GUIDES.map(g => '<a class="gitem rv" href="/guides/' + g.slug + '">' +
      '<h2>' + esc(g.h1) + '</h2><p>' + esc(g.short) + '</p>' +
      '<span>Updated ' + longDate(g.updated) + '</span></a>').join('') + '</div>';
}

function guideView(g){
  if (!g) return '<div style="max-width:640px;margin:80px auto;text-align:center"><h2>Guide not found</h2><p><a href="/guides">All guides</a></p></div>';
  const f = g.img && D.feat.find(x => x.slug === g.img);
  return '<div class="pagehead">' +
    '<nav class="crumbs" style="padding-left:0"><a href="/">Home</a> &rsaquo; <a href="/guides">Guides</a> &rsaquo; ' + esc(g.h1) + '</nav>' +
    '<div class="eyebrow">Guide <span class="jpk">案内</span></div>' +
    '<h1>' + esc(g.h1) + '</h1>' +
    '<p class="gmeta">By the Blooms of Japan team &middot; Updated <time datetime="' + g.updated + '">' + longDate(g.updated) + '</time></p></div>' +
    '<div class="prose guide">' +
    (f ? '<figure class="ghero"><img src="' + f.img + '" alt="' + esc(flowerName(f)) + ' at ' + esc(f.name) + '">' +
      '<figcaption><a href="/spots/' + f.slug + '">' + esc(f.name) + '</a>' + (f.cred ? ' &middot; Photo ' + esc(f.cred) : '') + '</figcaption></figure>' : '') +
    g.body +
    (g.sources ? '<p class="gsrc">Sources: ' + esc(g.sources) + ' Spot details are checked against local tourism sites.</p>' : '') +
    guidePager(g) + '</div>';
}

// previous / next guide, in the order of guides.js
function guidePager(g){
  const i = GUIDES.indexOf(g), prev = GUIDES[i - 1], next = GUIDES[i + 1];
  const card = (x, cls, label) => x ? '<a class="' + cls + '" href="/guides/' + x.slug + '" rel="' + (cls === 'gprev' ? 'prev' : 'next') + '">' +
    '<span>' + label + '</span>' + esc(x.h1) + '</a>' : '<i></i>';
  return '<nav class="gpager" aria-label="More guides">' + card(prev, 'gprev', '&lsaquo; Previous guide') + card(next, 'gnext', 'Next guide &rsaquo;') + '</nav>';
}

// spot pages link to a guide written about that spot (its spots list), else the one covering their flower
const guideBox = f => { const g = GUIDES.find(x => (x.spots || []).includes(f.slug)) || GUIDES.find(x => (x.fl || []).some(k => f.fl.includes(k)));
  return g ? '<div class="dbox guide"><h4>Guide</h4><a href="/guides/' + g.slug + '">' + esc(g.h1) + ' ›</a></div>' : ''; };

function seasonsView(){
  return \`<div class="pagehead">
      <nav class="crumbs" style="padding-left:0"><a href="/">Home</a> › All four seasons</nav>
      <div class="eyebrow">Four seasons <span class="jpk">四季</span></div>
      <h1>Two flowers for every season</h1>
      <p>The homepage paints whichever pair matches today's date — the same washi paper, gold rings and kanji every time, with the flowers and falling petals swapped. Tap one to see it on the homepage.</p>
    </div>
    <div class="seasonlist">\${['spring','summer','autumn','winter'].map(k=>{
      const a = HeroArt.ART[k];
      return \`<section class="card-s rv">
        <div class="cap"><i style="background:\${a.dot}"></i>
          <h2>\${a.label.replace(' in Japan','')}</h2>
          <span class="mo">\${MONTHS_LONG[k]}</span>
          \${k === nowSeason ? '<span class="now">Showing today</span>' : ''}</div>
        <div class="art"><a href="/?season=\${k}" aria-label="Show \${a.label} on the homepage" style="position:absolute;inset:0;z-index:3"></a>\${HeroArt.build(k, 'card')}</div>
        <p class="props">\${SEASON_PROPS[k]}</p>
      </section>\`;}).join('')}</div>\`;
}

/* Page titles. The build reads these back out of each pre-rendered page for its <title>,
   so the tab title and what Google shows are always the same words. */
const SITE_TITLE = 'Blooms of Japan — The flower year in Japan';
const T = s => s + ' | Blooms of Japan';
function spotTitle(f){
  const fl = flowerName(f), first = fl.toLowerCase().split(' ')[0];
  return T(f.name.toLowerCase().includes(first) ? \`\${f.name} — Best Time & How to Get There\` : \`\${f.name} \${fl} — Best Time & How to Get There\`);
}

/* Routes. Every view has a real address; spot and seasons pages are their own views, everything
   else is the homepage scrolled to a section with the grid set up to match:
     /calendar          the year, opened at this month
     /spots             search section, in season now     (/spots?q=… a search)
     /flowers[/key]     search section, flower picker (and one flower's spots)
     /when/<month>      search section, every spot for that month
     /?season=spring    homepage with another season's hero                      */
function homeRoute(h){
  const tool = () => document.getElementById('tool').offsetTop - 40;
  const params = new URLSearchParams(location.search);
  const wm = h.match(/^\\/when\\/([a-z]+)$/), mi = wm ? MON.findIndex(x => x.toLowerCase() === wm[1]) : -1;
  const fm = h.match(/^\\/flowers(?:\\/([a-z-]+))?$/);
  const season = /^(spring|summer|autumn|winter)$/.test(params.get('season') || '') ? params.get('season') : null;
  const q = h === '/spots' ? (params.get('q') || '').trim() : '';
  if (q) {                                    // a shared or bookmarked search
    qEl.value = q; qClear.hidden = false; renderSearch(q);
    return { title: T('“' + q + '” — Search'), y: tool };
  }
  if (qEl) { qEl.value = ''; qClear.hidden = true; }   // any other view starts with an empty box
  if (h === '/calendar') {
    renderGrid(0);
    const t = document.getElementById('track'), m = new Date().getMonth() + 1;
    show(m);
    return { title: T('Japan Flower Calendar — What Blooms Each Month'), y: () => t.getBoundingClientRect().top + (window.scrollY || 0) - 54 };
  }
  if (h === '/spots') { renderGrid(0); return { title: T(\`Where to See Flowers in Japan — All \${D.feat.length} Spots\`), y: tool }; }
  if (fm) {
    const g = D.flowerGroups.find(x => x.k === fm[1]);
    renderGrid(0, g ? g.k : '');
    return { title: T(g ? g.label + ' in Japan — Where & When to See Them' : 'Flowers of Japan — Browse by Flower'), y: tool, notFound: fm[1] && !g };
  }
  if (mi > 0) { renderGrid(mi); return { title: T(\`What's Blooming in Japan in \${MON[mi]}\`), y: tool }; }
  renderGrid(0);
  return { title: null, y: () => 0, season, notFound: h !== '/' && !wm };
}

/* in-page navigation: internal links push a new address instead of reloading */
function go(href){
  const here = location.pathname + location.search;
  if (href === here) history.replaceState(null, '', href); else history.pushState(null, '', href);
  route();
}

let routed = false;   // the first route (page load) always jumps
function route(){
  // links shared before the move to real addresses (#/spots/x, #/search/x, #/spring) still work
  if (location.hash.startsWith('#/')) {
    const old = location.hash.slice(1);
    const to = old.startsWith('/search/') ? '/spots?q=' + old.slice(8)
             : /^\\/(spring|summer|autumn|winter)$/.test(old) ? '/?season=' + old.slice(1) : old;
    history.replaceState(null, '', to);
  }
  const h = location.pathname.replace(/\\/+$/, '') || '/';
  const home = document.getElementById('view-home');
  const spot = document.getElementById('view-spot');
  const seas = document.getElementById('view-seasons');
  const wasHome = !home.hidden;
  const show = el => { [home,spot,seas].forEach(x => x.hidden = x !== el); };
  // Back/Forward land where the reader left off; a fresh link goes to its section
  const saved = history.state && typeof history.state.y === 'number' ? history.state.y : null;
  let y = 0, smooth = false, yFn = null;

  if(h.startsWith('/spots/')){
    spot.innerHTML = spotView(h.slice(7)); show(spot);
    const f = D.feat.find(x => x.slug === h.slice(7));
    document.title = f ? spotTitle(f) : T('Spot not found');
    if (f) loadWeather(f);
  } else if(h === '/seasons'){
    seas.innerHTML = seasonsView(); show(seas);
    document.title = T("Japan's Flowers by Season");
  } else if(h === '/guides' || h.startsWith('/guides/')){
    const g = GUIDES.find(x => '/guides/' + x.slug === h);
    seas.innerHTML = h === '/guides' ? guidesIndex() : guideView(g); show(seas);
    document.title = h === '/guides' ? T("Guides to Japan's Flower Seasons") : T(g ? g.title : 'Guide not found');
  } else if(INFO[h.slice(1)]){
    seas.innerHTML = infoView(h.slice(1)); show(seas);
    document.title = T(INFO[h.slice(1)].h1);
  } else {
    const r = homeRoute(h);
    const key = r.season || HeroArt.auto;
    HeroArt.render(key); paintSide(key);
    show(home);
    document.title = r.title || SITE_TITLE;
    y = r.y(); yFn = r.y;
    smooth = routed && wasHome && saved === null;      // moving within the homepage glides; arriving from another view jumps
    onScroll();
  }
  closeMenu && closeMenu();
  window.scrollTo({ top: saved !== null ? saved : y, behavior: smooth ? 'smooth' : 'auto' });
  markTop();   // a jump to a new address fires no scroll event, so the button would keep its old state
  // a plain #anchor on the first load (e.g. /about#itravelnet for the directory's link-back check) is
  // honoured after the scroll above, which would otherwise undo the browser's own jump to it
  if (!routed && location.hash.length > 1 && !location.hash.startsWith('#/')) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView({ block: 'center' });
  }
  // on first load the web fonts arrive one by one and re-wrap the hero, shifting everything below it,
  // so keep the section lined up while the hero settles, until the visitor scrolls themselves
  if (!routed && saved === null && yFn && y > 0 && window.ResizeObserver) {
    const heroEl = document.querySelector('.hero');
    let done = false;
    const stop = () => { done = true; ro.disconnect(); ['wheel','touchstart','keydown','mousedown'].forEach(t => window.removeEventListener(t, stop)); };
    const ro = new ResizeObserver(() => { if (!done) window.scrollTo({ top: yFn(), behavior: 'auto' }); });
    ro.observe(heroEl);
    ['wheel','touchstart','keydown','mousedown'].forEach(t => window.addEventListener(t, stop, { passive: true }));
    setTimeout(stop, 4000);
  }
  reveal(spot.hidden ? seas : spot);
  markNav();
  // Analytics: the tag's own page_view covers the first load, so only report the moves after it.
  // document.title is already set above, so the hit carries the right page name.
  if (routed && window.gtag) gtag('event', 'page_view',
    { page_location: location.href, page_title: document.title });
  routed = true;
}
window.addEventListener('popstate', route);
window.addEventListener('hashchange', route);
route();
` + t.slice(lastClose);

fs.writeFileSync('index.html', t);
console.log('view-home wrapped :', t.includes('<div id="view-home">'));
console.log('extra views       :', t.includes('id="view-spot"'), t.includes('id="view-seasons"'));
console.log('hash links        :', (t.match(/href="#\/spots\//g) || []).length);
console.log('sibling-file links:', (t.match(/spot\.html\?s=/g) || []).length);
console.log('KB                :', Math.round(t.length / 1024));
