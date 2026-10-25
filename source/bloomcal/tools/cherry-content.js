// Cherry blossom spots: verified descriptions (researched 2026-10-13 from Jorudan, Weathernews,
// Rurubu, nippon.com, tourism-board and city pages). Each row is marked ed:1 so the build uses this
// text even for the hand-picked spots, whose older copy otherwise takes precedence.
const fs = require('fs'), path = require('path');
const P = path.join(__dirname, '..', '..', 'bloomjapan', 'index.html');
let s = fs.readFileSync(P, 'utf8');
global.window = {}; eval(fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8'));
const feat = window.D.feat;

const T = {
  'kawazu-river': { peak: 'Mid February - Early March', station: '3 min walk from Kawazu Station (Izukyu Line)',
    desc: 'About 850 Kawazu-zakura trees line the Kawazu River, an early, deep-pink cherry that opens a month or more before the usual somei-yoshino, with some 8,000 across the town. The Kawazu Cherry Blossom Festival runs from early February to early March, with food stalls and evening light-ups.' },
  'sengan-en': { peak: 'February - Early April',
    desc: 'The Shimazu clan\'s seaside garden, with Sakurajima across the bay. Its 150 or so cherry trees flower over a long season: deep-pink kanhizakura from February, then mountain cherry and somei-yoshino into early April. Admission, shared with the Shoko Shuseikan museum, is about 1,600 yen.' },
  'kenrokuen': { peak: 'March - Mid April',
    desc: 'One of Japan\'s three great gardens. Its plum grove flowers in March; then about 400 cherry trees of some 40 kinds open in early to mid April, followed into May by the garden\'s own Kenrokuen Kikuzakura, with more than 300 petals to a flower. In cherry season the garden opens free for about a week and is lit up until 9:30 pm.' },
  'shinjuku-gyoen': { peak: 'Late March - Mid April',
    desc: 'About 1,000 cherry trees of some 65 kinds, so something is in flower from February (kanzakura and Kawazu-zakura), through the somei-yoshino in late March, to the double-flowered ichiyo and kanzan in mid April. Entry is 500 yen, and weekend and holiday visits in March and April have to be booked ahead.' },
  'meguro-river': { peak: 'Late March - Early April', station: '5 min walk from Naka-Meguro Station',
    desc: 'About 800 somei-yoshino line both banks of the Meguro River for nearly 4 km, arching over the water around Naka-Meguro. Lanterns light the trees in the evening through the season. The stretch by Naka-Meguro Station gets very crowded; early morning is quietest.' },
  'yoyogi-park': { peak: 'Late March - Early April', station: '3 min walk from Harajuku Station',
    desc: 'Around 650 cherry trees of several kinds, best known for the picnic crowds under the trees by the Shibuya gate and on the central lawn. There is no light-up, but the park is open around the clock.' },
  'ritsurin-garden': { peak: 'February - Early April', station: '3 min walk from Ritsurin-koen Kitaguchi Station (JR)',
    desc: 'A daimyo garden of ponds and sculpted pines below Mount Shiun. Its north and south plum groves flower first, with a plum festival in early February; then about 300 cherry trees flower from late March to early April, when the garden is lit up in the evenings. Adults 500 yen.' },
  'suizenji-jojuen': { peak: 'Late March - Early April',
    desc: 'A stroll garden around a spring-fed pond, laid out with a miniature Mount Fuji among scenes from the old Tokaido road. About 160 cherry trees flower in late March and early April. Adults about 400 to 500 yen.' },
  'motoara-river-cherry-blossom-avenue': { peak: 'Late March - Early April', station: '10 min walk from Fukiage Station (JR Takasaki Line)', address: 'Fukiage, Konosu, Saitama',
    desc: 'About 500 somei-yoshino line both banks of the Moto-Arakawa for some 2.5 km through Fukiage. During the cherry festival, roofed yakata-bune boats carry visitors along the river under the trees.' },
  'funaoka-castle-ruin-park': { peak: 'Early - Mid April',
    desc: 'About 1,000 cherry trees on the old castle hill, looking down on the Shiroishi River\'s Hitome Senbon-zakura, "a thousand cherries at a glance", with snow on the Zao mountains behind. A footbridge links the park to the river bank. The slope car is out of service until about April 2027.' },
  'mount-yoshino': { peak: 'Early - Late April',
    desc: 'About 30,000 cherry trees, mostly white mountain cherry, climb the mountain in four zones (Shimo, Naka, Kami and Oku Senbon) that flower one after another from early to late April, so the season lasts around three weeks. Part of the Kii Mountains World Heritage site, with Kinpusen-ji at its heart. Extra buses run from Kintetsu Yoshino Station in season.' },
  'senshu-park': { peak: 'Mid - Late April',
    desc: 'About 650 cherry trees, mostly somei-yoshino, on the site of Kubota Castle in central Akita. The park sits on a rise, so it flowers a few days after the rest of the city. During the cherry festival in mid to late April the trees are lit up in the evening.' },
  'heisogen-park': { peak: 'Late March - Early April',
    desc: 'About 2,000 cherry trees of ten or so kinds on a plateau above Shirahama\'s beaches, looking out over the Pacific. A cherry festival is held from late March to early April.' },
  'kyoto-botanical-gardens': { peak: 'Mid March - Late April', station: 'Next to Kitayama Station (Karasuma subway line)',
    desc: 'Japan\'s oldest public botanical garden keeps about 500 cherry trees of some 180 kinds, so the season runs from mid March to late April. The somei-yoshino peak in early April, with weeping cherries and late-flowering satozakura by the Kitayama gate. Adults 500 yen.' },
  'hamamatsu-flower-park-april': { peak: 'Late March - Mid April',
    desc: 'About 1,300 cherry trees above some 500,000 tulips in the park\'s cherry and tulip garden, at their best from late March to mid April. Early cherries open in February and double-flowered ones in April. The entry fee changes with the flowers (about 600 to 1,000 yen).' },
  'takato-castle-ruins-park': { peak: 'Early - Mid April',
    desc: 'About 1,500 Takato kohigan-zakura, a small deep-pink cherry found here and protected as a prefectural natural monument, often called the finest cherry under heaven. The trees are lit up in the evenings for about ten days. Entry is charged in cherry season only (about 600 yen, more on peak weekends).' },
  'hirosaki-park': { peak: 'Mid April - Early May',
    desc: 'About 2,600 cherry trees of some 50 kinds around Hirosaki Castle. The Hirosaki Cherry Blossom Festival runs from mid April to early May with evening light-ups, and as the petals fall they cover the outer moat in a pink carpet, the hanaikada.' },
  'bizan-park': { peak: 'Late March - Early April', station: 'Ropeway from the Awa Odori Kaikan, near Tokushima Station',
    desc: 'About 1,500 somei-yoshino on Mount Bizan, Tokushima\'s best-known cherry spot, from the foot of the mountain to the top, where they flower slightly later. The ropeway takes about six minutes, and the trees are lit up until 10 pm.' },
  'sakurazutsumi-park': { peak: 'Late March - Early April',
    desc: 'About 500 cherry trees along the embankment with a carpet of rapeseed beneath them, so pink and yellow peak together in late March and early April. Parking fills early on weekends at full bloom.' },
};

const q = v => JSON.stringify(v);
let n = 0;
for (const [slug, t] of Object.entries(T)) {
  const f = feat.find(x => x.slug === slug); if (!f) throw new Error('no spot ' + slug);
  // find its row by photo (and month, where two rows share a photo)
  const rows = [];
  let i = -1; while ((i = s.indexOf('img:"' + f.img + '"', i + 1)) >= 0) rows.push(i);
  let at = null;
  for (const r of rows) { const a = s.lastIndexOf(' {id:', r), b = s.indexOf('},', r); if (new RegExp('month:' + f.m + ',').test(s.slice(a, b))) at = [a, b]; }
  if (!at) throw new Error('row for ' + slug);
  let row = s.slice(...at);
  const set = (k, v) => { const re = new RegExp(k + ':"(?:[^"\\\\]|\\\\.)*"'); if (!re.test(row)) throw new Error(slug + ' no ' + k); row = row.replace(re, k + ':' + q(v)); };
  set('desc', t.desc); set('peak', t.peak);
  if (t.station) set('station', t.station);
  if (t.address) set('address', t.address);
  if (!/,ed:1/.test(row)) row += ',ed:1';
  s = s.slice(0, at[0]) + row + s.slice(at[1]);
  n++;
}
fs.writeFileSync(P, s);
console.log('updated', n, 'cherry spots');
