// Builds the full DATA array from the CSV rows and splices it into index.html.
const fs = require('fs');
const rows = require('./rows.json');
const imgMap = require('./img-map.json');

/* Japanese names for spots I can identify with confidence — these get shown to
   station staff, so anything uncertain is left blank rather than guessed. */
const JP = {
  "Mount Yoshino":"吉野山", "Ashikaga Flower Park (Tochigi)":"あしかがフラワーパーク",
  "Farm Tomita":"ファーム富田", "Farm Tomita (Hokkaido)":"ファーム富田",
  "Kinchakuda Manjushage Park":"巾着田曼珠沙華公園", "Hitachi Seaside Park (Ibaraki)":"国営ひたち海浜公園",
  "Hitachi Seaside Park":"国営ひたち海浜公園", "Kairakuen Garden":"偕楽園", "Hasedera Temple":"長谷寺",
  "Showa Kinen Park":"国営昭和記念公園", "Akeno Sunflower Field":"明野ひまわり畑",
  "Engakuji Temple":"円覚寺", "Nabana no Sato":"なばなの里", "Nabana no Sato (Mie)":"なばなの里",
  "Ueno Toshogu Peony Garden":"上野東照宮ぼたん苑", "Meguro River":"目黒川", "Nezu Shrine":"根津神社",
  "Fuji Motosuko Resort (Yamanashi)":"富士本栖湖リゾート", "Hokuryu Sunflower Village":"北竜町ひまわりの里",
  "Nada-Kuroiwa Narcissus Field":"灘黒岩水仙郷", "Hirosaki Park (Aomori)":"弘前公園",
  "Tsubaki Nature Park":"椿自然園", "Shinjuku Gyoen":"新宿御苑", "Shinjuku Gyoen (Tokyo)":"新宿御苑",
  "Kawachi Wisteria Garden (Fukuoka)":"河内藤園", "Sera Kogen Farm (Hiroshima)":"世羅高原農場",
  "Yakachi River":"矢勝川", "Gongendo Park":"権現堂公園", "Hagurosan Park":"羽黒山公園",
  "Oishi Park":"大石公園", "Yuushien Garden":"由志園", "Yuushien (Shimane)":"由志園",
  "Shinobazu Pond (Ueno)":"不忍池", "Chausuyama Highlands":"茶臼山高原",
  "Higashizawa Rose Park (Yamagata)":"東沢バラ公園", "Kenrokuen (Ishikawa)":"兼六園",
  "Funaoka Castle Ruin Park (Miyagi)":"船岡城址公園", "Tonami Tulip Park (Toyama)":"となみチューリップ公園",
  "Echigo Hillside Park (Niigata)":"国営越後丘陵公園", "Okayama Korakuen":"岡山後楽園",
  "Hitsujiyama Park (Saitama)":"羊山公園", "Kawazu River":"河津川",
  "Sakura Furusato Hiroba":"佐倉ふるさと広場", "Yuri no Sato Park (Fukui)":"ゆりの里公園",
  "Meiji Jingu Inner Garden":"明治神宮御苑", "Yokohama English Garden (Kanagawa)":"横浜イングリッシュガーデン",
  "Keisei Rose Garden":"京成バラ園", "Keisei Rose Garden (Chiba)":"京成バラ園",
  "Yoyogi Park":"代々木公園", "Michinoku Hydrangea Garden (Iwate)":"みちのくあじさい園",
  "Senshu Park (Akita)":"千秋公園", "Hinoyama Park (Yamaguchi)":"火の山公園",
  "Hill of the Buddha":"頭大仏殿", "Ritsurin Garden (Kagawa)":"栗林公園",
  "Expo '70 Commemorative Park (Osaka)":"万博記念公園", "Kuju Flower Park (Oita)":"くじゅう花公園",
  "Heisogen Park (Wakayama)":"平草原公園", "Awaji Hanasajiki (Hyogo)":"あわじ花さじき",
  "Nanrakuen (Ehime)":"南楽園", "Ikoma Kogen":"生駒高原",
  "Hamamatsu Flower Park":"はままつフラワーパーク", "Hamamatsu Flower Park (Shizuoka)":"はままつフラワーパーク",
  "Kyoto Botanical Gardens (Kyoto)":"京都府立植物園", "Florante Miyazaki (Miyazaki)":"フローランテ宮崎",
  "Horomitoge Lavender Garden":"幌見峠ラベンダー園", "Takato Castle Ruins Park (Nagano)":"高遠城址公園",
  "Tottori Hanakairo (Tottori)":"とっとり花回廊", "RSK Rose Garden (Okayama)":"RSKバラ園",
  "Suizenji Jojuen (Kumamoto)":"水前寺成趣園", "Jindai Botanical Gardens":"神代植物公園",
  "Zerubu Hill":"ぜるぶの丘", "Shikisai-no-Oka":"四季彩の丘",
  "Huis Ten Bosch (Nagasaki)":"ハウステンボス", "Kamiyubetsu Tulip Park":"かみゆうべつチューリップ公園",
  "Southeast Botanical Gardens (Okinawa)":"東南植物楽園", "Sengan-en (Kagoshima)":"仙巌園",
  "Higashiyama Zoo and Botanical Gardens (Aichi)":"東山動植物園",
  "Hotel Chinzanso Tokyo Garden":"ホテル椿山荘東京", "Takino Suzuran Hillside Park":"滝野すずらん丘陵公園",
  "Mifuneyama Rakuen (Saga)":"御船山楽園", "Bizan Park (Tokushima)":"眉山公園",
  "Makino Botanical Garden (Kochi)":"牧野植物園", "Manyo Botanical Garden (Nara)":"万葉植物園",
  "Hanamiyama Park (Fukushima)":"花見山公園", "Gunma Flower Park (Gunma)":"ぐんまフラワーパーク",
  "Mizunomori Water Botanical Garden (Shiga)":"水の森水生植物公園",
  "Hinode Park Lavender Garden":"日の出公園", "Higashimokoto Shibazakura Park":"ひがしもこと芝桜公園",
  "Jogashima Park":"城ヶ島公園", "Azumayama Park":"吾妻山公園",
};

/* same Mercator frame as build-map.js */
const BOX = { lonMin: 128.3, lonMax: 146.3, latMin: 30.4, latMax: 45.8 };
const rad = d => d * Math.PI / 180;
const mercY = lat => Math.log(Math.tan(Math.PI / 4 + rad(lat) / 2));
const X0 = rad(BOX.lonMin), X1 = rad(BOX.lonMax);
const YTop = mercY(BOX.latMax), YBot = mercY(BOX.latMin);
const W = 300, H = 328;
const project = (lon, lat) => [
  +((rad(lon) - X0) / (X1 - X0) * W).toFixed(1),
  +((YTop - mercY(lat)) / (YTop - YBot) * H).toFixed(1),
];

/* drop the one true duplicate (same spot, same flower, same month, same coords) */
const seen = new Set();
const kept = rows.filter(r => {
  const k = `${r.name.toLowerCase().replace(/\s*\(.*?\)/, '').trim()}|${r.month}|${r.flower.toLowerCase()}`;
  if (seen.has(k)) { console.log('dropped duplicate:', r.name, r.flower, r.month); return false; }
  seen.add(k);
  return true;
});

const esc = s => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
let offmap = 0;

const out = kept.map((r, i) => {
  const inFrame = r.lat >= BOX.latMin && r.lat <= BOX.latMax && r.lon >= BOX.lonMin && r.lon <= BOX.lonMax;
  const [mx, my] = inFrame ? project(r.lon, r.lat) : [null, null];
  if (!inFrame) { offmap++; console.log('off map frame:', r.name, r.lat + ',' + r.lon); }
  const jp = JP[r.name] || '';
  const desc = r.desc.replace(/\s+/g, ' ').trim();
  return ` {id:${i + 1},name:"${esc(r.name)}",jp:"${jp}",flower:"${esc(r.flower)}",month:${r.month},region:"${r.region}",\n`
    + `  desc:"${esc(desc)}",\n`
    + `  address:"${esc(r.address)}",station:"${esc(r.station)}",peak:"${esc(r.peak)}",img:"img/${imgMap[r.img]}",mx:${mx},my:${my}},`;
});

const block = 'const DATA = [\n' + out.join('\n') + '\n];';

let h = fs.readFileSync('index.html', 'utf8');
const before = h.length;
h = h.replace(/const DATA = \[[\s\S]*?\n\];/, block);
if (h.length === before) throw new Error('DATA array not replaced');
fs.writeFileSync('index.html', h);

console.log('\nspots written:', kept.length, '| off map frame:', offmap);
console.log('with Japanese names:', kept.filter(r => JP[r.name]).length, '/', kept.length);
