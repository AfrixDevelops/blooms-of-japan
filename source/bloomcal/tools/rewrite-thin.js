// Step 3 of the SEO plan: the 55 auto-generated spots ("A park in X, listed for its Y").
// Every fact below comes from the research done on 2026-10-13 (tourism boards, city sites,
// Rurubu / Walkerplus / Jorudan listings). Anything that could not be confirmed was left out.
// Spots that turned out to be duplicates, closed, or not real flower spots are removed.
const fs = require('fs'), path = require('path');
const P = path.join(__dirname, '..', '..', 'bloomjapan', 'index.html');
let src = fs.readFileSync(P, 'utf8');

const REMOVE = {
  1000: 'closed in 2023 (Tachikawa Suisenkyo)',
  1001: 'duplicate of Nada-Kuroiwa Narcissus Field',
  1014: 'duplicate of Tonami Tulip Park',
  1016: 'duplicate of Fuji Motosuko Resort',
  1021: 'duplicate of Kawachi Wisteria Garden',
  1022: 'duplicate of Tottori Hanakairo',
  1050: 'duplicate of Hokuryu Sunflower Village',
  1006: 'no plum-viewing spot found', 1011: 'no rapeseed field found', 1013: 'no rapeseed field found',
  1020: 'no cherry trail found', 1031: 'no hydrangea garden found', 1037: 'a pond named Hasuike, not a lotus spot',
  1039: 'no lavender garden found', 1040: 'no lotus park found', 1043: 'no iris garden found', 1044: 'no lotus spot found',
  1046: 'no sunflower field found', 1052: 'no cosmos field found (site closed for renovation)', 1058: 'no autumn-leaf spot found',
  1063: 'no current camellia garden found',
};

const S = {
  1002: { name: 'Bairin-ji Temple Garden (Kurume)', jp: '梅林寺外苑', month: 2, peak: 'Early February - Early March',
    desc: 'The outer garden of this Zen temple holds about 500 plum trees of some 30 kinds, white, red and weeping. A small tea house sits among them, and the garden fills with visitors when they flower.',
    address: 'Kyomachi, Kurume, Fukuoka', station: '' },
  1003: { name: 'Atami Plum Garden', jp: '熱海梅園', month: 2, peak: 'Late January - Mid February',
    desc: 'Around 470 plum trees of nearly 60 varieties, some of the earliest to flower in Japan. The plum festival runs from early January to early March, when there is a small entry fee (about 300 yen); the rest of the year the garden is free.',
    address: 'Baien-cho, Atami, Shizuoka', station: '' },
  1004: { name: 'Ikegami Plum Garden', jp: '池上梅園', month: 2, peak: 'Early February - Early March',
    desc: 'About 370 red and white plum trees of 30 kinds on a hillside in southern Tokyo, lit up in the evenings for part of February. Entry costs around 100 yen.',
    address: 'Ikegami, Ota City, Tokyo', station: '10 min walk from Nishi-Magome Station (Toei Asakusa Line)' },
  1007: { name: 'Okamoto Plum Grove Park', jp: '岡本梅林公園', month: 2, peak: 'February - Early March',
    desc: 'About 200 plum trees of some 40 varieties on a slope above the Okamoto neighbourhood of Kobe, an old plum-viewing area that gives the park its name.',
    address: 'Okamoto 6-chome, Higashinada Ward, Kobe, Hyogo', station: 'Short walk north of Hankyu Okamoto Station' },
  1008: { name: 'Gifu Bairin Park', jp: '梅林公園', month: 2, peak: 'Mid February - Mid March',
    desc: 'About 1,300 plum trees of 50 kinds, roughly 700 white and 600 red, in a free city park. The Gifu Plum Festival is held here in early March.',
    address: 'Bairin-minamimachi, Gifu, Gifu', station: 'Bus from JR or Meitetsu Gifu Station to Bairin Koen-mae' },
  1009: { name: 'Anpachi Hyakubaien', jp: '安八百梅園', month: 2, peak: 'Mid February - Early March',
    desc: 'More than 1,200 plum trees of over 100 varieties on 3.9 hectares, one of the widest collections in Japan. Early kinds open in late January and late ones last into March. Entry is free.',
    address: 'Anpachi, Gifu', station: 'Car: 5 min from Anpachi Smart IC (Meishin Expressway)' },
  1012: { name: 'Sakurazutsumi Park (Yoshimi)', jp: 'さくら堤公園', month: 4, peak: 'Early April', flower: 'Rapeseed (Nanohana)/Cherry',
    desc: 'A riverside embankment of cherry trees in Yoshimi, Saitama, with rapeseed flowering in yellow beneath them, so pink and yellow peak together in early April.',
    address: 'Yoshimi, Saitama', station: '' },
  1015: { name: 'Shiofune Kannon-ji Temple', jp: '塩船観音寺', month: 4, peak: 'Mid April - Early May',
    desc: 'Around 20,000 azaleas of about 20 kinds cover the bowl-shaped hillside around this temple. Different kinds open in turn through the azalea festival, which is held from mid April to early May.',
    address: 'Shiofune, Ome, Tokyo', station: '' },
  1018: { name: 'Kitajima Tulip Park', jp: '北島チューリップ公園', month: 4, peak: 'Early - Mid April',
    desc: 'About 40,000 tulips planted by the town each spring, usually at their best around 10 April. The park opens for the season from late March to late April, and entry is free.',
    address: 'Kitajima, Itano District, Tokushima', station: 'Car: 5 min from Matsushige Smart IC' },
  1019: { name: 'Igagawa Cherry Embankment', jp: '伊賀川桜堤', month: 4, peak: 'Late March - Early April',
    desc: 'About 700 cherry trees line the Iga River beside Okazaki Castle Park. During the Okazaki cherry festival the trees are lit up at night, and the Ieyasu procession passes through the town in early April.',
    address: 'Okazaki, Aichi', station: '' },
  1023: { name: 'Shikishima Park Rose Garden', jp: '敷島公園ばら園', month: 5, peak: 'Mid May - Early June', flower: 'Roses',
    desc: 'About 7,000 rose bushes of some 600 varieties, including every rose in the World Rose Hall of Fame and varieties bred in Maebashi. There is a second flowering in autumn (mid October to early November). Admission is free.',
    address: 'Shikishima-machi, Maebashi, Gunma', station: '' },
  1024: { name: 'Flower Park Kagoshima', jp: 'フラワーパークかごしま', month: 5, peak: 'Year-round',
    desc: 'A 36-hectare botanical park at the southern tip of Satsuma, with flower fields set against Mount Kaimon, subtropical plants, greenhouses and a walkway looking over Kagoshima Bay. Adults about 630 yen.',
    address: 'Yamakawa, Ibusuki, Kagoshima', station: '' },
  1025: { name: 'Hokuso Hananooka Park', jp: '北総花の丘公園', month: 5, peak: 'Mid May - Early June',
    desc: 'A large prefectural park with a rose garden in its B zone (mid May to early June), then hydrangeas and lavender from mid June. Admission is free.',
    address: 'Inzai, Chiba', station: '10 min walk from Chiba New Town Chuo Station (Hokuso Line)' },
  1026: { name: 'Ibaraki Flower Park', jp: 'いばらきフラワーパーク', month: 10, peak: 'Mid October - Mid November', flower: 'Roses',
    desc: 'About 8,000 rose bushes of some 800 varieties, arranged by colour and by scent, with a rose tunnel. The autumn roses are lit up in the evenings from October.',
    address: 'Ishioka, Ibaraki', station: '' },
  1027: { name: 'Sukagawa Peony Garden', jp: '須賀川牡丹園', month: 5, peak: 'Early - Mid May',
    desc: 'A nationally designated Place of Scenic Beauty with about 7,000 peonies of 290 varieties, some of them more than 200 years old. There is a fee during the flowering season (late April to late May, adults about 500 yen).',
    address: '80-1 Botanen, Sukagawa, Fukushima', station: 'Bus from JR Sukagawa Station to Botanen-mae' },
  1028: { name: 'Horikiri Iris Garden', jp: '堀切菖蒲園', month: 6, peak: 'Late May - Mid June',
    desc: 'About 6,000 irises of some 200 kinds, mostly old Edo varieties, in a garden painted by Hiroshige. The Katsushika iris festival runs through the first weeks of June. Admission is free.',
    address: 'Horikiri, Katsushika City, Tokyo', station: 'Short walk from Horikiri-Shobuen Station (Keisei Line)' },
  1029: { name: 'Suigo Itako Ayame Garden', jp: '水郷潮来あやめ園', month: 6, peak: 'Late May - Late June',
    desc: 'About one million iris plants of 500 varieties along the waterways of Itako, usually best around 10 June. During the iris festival, the traditional bridal boat (yomeiri-bune) carries a bride along the canal.',
    address: 'Itako, Ibaraki', station: '' },
  1030: { name: 'Shingu Hydrangea Village', jp: '新宮あじさいの里', month: 6, peak: 'Late June - Early July',
    desc: 'About 20,000 hydrangeas on a four-hectare mountain slope looked after by local residents. It is high up, so it flowers later than most. Entry is free, and a small monorail runs up the slope during the festival.',
    address: 'Shingu-cho, Shikokuchuo, Ehime', station: 'Bus from JR Iyo-Mishima Station to Nagatebashi, then 3 min walk' },
  1032: { name: 'Kabashima Iris Garden (Yanagawa)', jp: '椛島菖蒲園', month: 5, peak: 'Mid May - Early June',
    desc: 'Tens of thousands of irises of about 50 kinds beside Yanagawa\'s canals. Entry is free, and the punts (donkobune) of the canal cruise glide past the garden.',
    address: 'Honmachi, Yanagawa, Fukuoka', station: '' },
  1033: { name: 'Mimuroto-ji Temple', jp: '三室戸寺', month: 6, peak: 'June - Early July',
    desc: 'About 20,000 hydrangeas of 50 kinds fill the garden of this Uji temple, which opens from early June to early July and is lit up on some June weekends.',
    address: 'Todo, Uji, Kyoto', station: '15 min walk from Mimuroto Station (Keihan Uji Line)' },
  1034: { name: 'Utatsuyama Iris Garden', jp: '卯辰山花菖蒲園', month: 6, peak: 'Early June - Mid July',
    desc: 'About 20,000 irises of 58 kinds on three terraces above Kanazawa, with around 2,900 hydrangeas around them. Admission is free.',
    address: 'Utatsuyama Park, Kanazawa, Ishikawa', station: 'Bus from Kanazawa Station (about 20 min)' },
  1035: { name: 'Ohirasan Ajisai-zaka', jp: '太平山あじさい坂', month: 6, peak: 'Late June - Early July',
    desc: 'About 2,500 hydrangeas line the stone steps of the approach to Ohirasan Shrine, first planted in 1974. The Tochigi hydrangea festival is held here in June.',
    address: 'Hiraimachi, Tochigi, Tochigi', station: 'Bus from Tochigi Station (15 min), then 5 min walk' },
  1038: { name: 'Kobe Nunobiki Herb Gardens', jp: '神戸布引ハーブ園', month: 6, peak: 'Late May - Early July',
    desc: 'A hillside herb garden above Kobe whose lavender garden holds about 1,200 plants, flowering through June alongside hydrangeas and lilies.',
    address: 'Kitano-cho, Chuo Ward, Kobe, Hyogo', station: 'Nunobiki ropeway from near Shin-Kobe Station' },
  1042: { name: 'Motsu-ji Temple Iris Garden', jp: '毛越寺', month: 6, peak: 'Mid June - Early July',
    desc: 'About 30,000 irises of 300 kinds around the Oizumi-ga-ike pond of this World Heritage temple in Hiraizumi, planted from 1953. The iris festival runs from mid June.',
    address: 'Hiraizumi, Iwate', station: '10 min walk from JR Hiraizumi Station' },
  1047: { name: 'Tsunan Sunflower Square', jp: '津南ひまわり広場', month: 8, peak: 'Late July - Mid August',
    desc: 'About 500,000 sunflowers on four hectares, planted in three blocks so they open in turn, with a sunflower maze and a viewing platform. Entry is free; parking is paid.',
    address: 'Tsunan, Niigata', station: 'Taxi from Tsunan Station (about 15 min)' },
  1048: { name: 'Sarukubo Rice-Field Park Sunflowers', jp: '猿久保田んぼ公園', month: 8, peak: 'Mid August',
    desc: 'About 200,000 sunflowers sown in fallow rice fields around Kobana, in full flower around the mid-August Obon holiday, beside the little JR Karasuyama Line.',
    address: 'Kobana, Nasukarasuyama, Tochigi', station: '12 min walk from Kobana Station (JR Karasuyama Line)' },
  1049: { name: 'Hokuseiyama Lavender Park', jp: '北星山町営ラベンダー園', month: 7, peak: 'Mid July - Early August',
    desc: 'A town-run lavender hillside in Nakafurano with a sightseeing lift to the top, looking across the Furano valley. Entry is free.',
    address: 'Nakafurano, Hokkaido', station: '15 min walk from Nakafurano Station (JR Furano Line)' },
  1053: { name: 'Kinryu Park Cosmos Garden', jp: '金立公園コスモス園', month: 10, peak: 'October',
    desc: 'A free cosmos garden in Kinryu Park, reachable on foot from the Kinryu service area of the Nagasaki Expressway.',
    address: 'Kinryu-machi, Saga, Saga', station: 'Walk from Kinryu SA (Nagasaki Expressway)' },
  1054: { name: 'Matsuyama Gohonmaru Park Cosmos', jp: '松山御本丸公園', month: 9, peak: 'Early September - Early October',
    desc: 'About 200,000 cosmos of several kinds on the castle-site park of Matsuyama in Osaki, one of the earliest cosmos fields of the year.',
    address: 'Matsuyama, Osaki, Miyagi', station: '' },
  1055: { name: 'Momijidani Park (Miyajima)', jp: '紅葉谷公園', month: 11, peak: 'Mid - Late November',
    desc: 'About 700 maples line the stream in the valley behind Itsukushima Shrine, most of them Japanese maple. The trees are lit up in the evenings in November.',
    address: 'Miyajima-cho, Hatsukaichi, Hiroshima', station: 'Ferry from Miyajimaguchi to Miyajima, then walk' },
  1059: { name: 'Negoro-ji Temple Momijidani', jp: '根来寺 もみじ谷公園', month: 11, peak: 'Late November - Early December',
    desc: 'The maple valley in the grounds of Negoro-ji, one of the later autumn-leaf spots in Kansai. The temple festival is held in late November; adults about 500 yen.',
    address: 'Negoro, Iwade, Wakayama', station: '' },
  1060: { name: 'Komoro Castle Ruins Kaikoen', jp: '小諸城址 懐古園', month: 11, peak: 'Late October - Mid November',
    desc: 'Maples against the mossy stone walls of Komoro Castle. During the autumn-leaf festival there are lanterns in the evening and a chrysanthemum show. Walking ticket about 300 yen.',
    address: 'Komoro, Nagano', station: '' },
  1061: { name: 'Matsuyama Sogo Park Camellia Garden', jp: '松山総合公園 椿園', month: 12, peak: 'Winter - Early Spring',
    desc: 'The camellia is Matsuyama\'s city flower, and this hilltop park keeps a camellia garden of several hundred varieties. Camellias generally flower from winter into early spring.',
    address: 'Matsuyama, Ehime', station: '' },
  1062: { name: 'Tsubakiyama Forest Park', jp: '椿山森林公園', month: 2, peak: 'January - April',
    desc: 'About 48,000 camellias of some 1,000 kinds, the first garden in Japan to be named an International Camellia Garden of Excellence.',
    address: 'Kitago, Miyazaki, Miyazaki', station: '' },
};

/* ---- apply ---- */
const rowRe = id => new RegExp(` \\{id:${id},[\\s\\S]*?\\},\\n`);
const q = v => JSON.stringify(v);
let removed = 0, rewritten = 0;
for (const id of Object.keys(REMOVE)) {
  const m = src.match(rowRe(id)); if (!m) throw new Error('row ' + id + ' not found');
  src = src.replace(m[0], ''); removed++;
  const g = new RegExp(`\\n ${id}:\\[[^\\n]*\\],`); src = src.replace(g, '');   // its gallery entry, if any
}
for (const [id, s] of Object.entries(S)) {
  const m = src.match(rowRe(id)); if (!m) throw new Error('row ' + id + ' not found');
  let r = m[0];
  const set = (k, v) => { const re = new RegExp(`${k}:"(?:[^"\\\\]|\\\\.)*"`); if (!re.test(r)) throw new Error(id + ' no ' + k); r = r.replace(re, `${k}:${q(v)}`); };
  set('name', s.name); set('jp', s.jp); set('desc', s.desc); set('address', s.address); set('station', s.station); set('peak', s.peak);
  if (s.flower) set('flower', s.flower);
  r = r.replace(/month:\d+/, 'month:' + s.month).replace(/,est:1\}/, '}');
  src = src.replace(m[0], r); rewritten++;
}
fs.writeFileSync(P, src);
console.log('removed', removed, '| rewritten', rewritten);
