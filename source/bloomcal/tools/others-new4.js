// Nemophila, lavender and wisteria additions (researched 2026-10-15). Chosen photo-first: only places that
// have free photos of the flower there on Wikimedia Commons. Facts from the sources listed in the report.
const N = 'Nemophila', V = 'Lavender', W = 'Wisteria';
const s = (name, jp, flower, month, region, type, peak, address, desc, q, cq, station) =>
  ({ name, jp, flower, month, region, type, peak, address, desc, q, cq, station: station || '' });
module.exports = [
  // ---------------- Nemophila
  s('Uminonakamichi Seaside Park (Nemophila)', '海の中道海浜公園 ネモフィラ', N, 4, 'Kyushu & Okinawa', ['park'], 'Mid April - Early May', 'Saitozaki, Higashi Ward, Fukuoka',
    'About a million nemophila turn the flower fields of this seaside park on the Uminonakamichi sandbar blue in spring, with the Ferris wheel above them; one of the largest displays in western Japan.', '海の中道海浜公園', ['海の中道 ネモフィラ', 'Umino Nakamichi nemophila', 'Nemophila Uminonakamichi'], 'Next to Uminonakamichi Station (JR Kashii Line)'),
  s('Nagai Botanical Garden', '長居植物園', N, 4, 'Kyoto & Kansai', ['park'], 'April', 'Nagaikoen, Higashisumiyoshi Ward, Osaka',
    'A botanical garden inside Nagai Park in southern Osaka, where a field of nemophila flowers in spring.', '長居植物園', ['Nagai Botanical Garden Nemophila', '長居植物園 ネモフィラ'], 'Short walk from Nagai Station (Midosuji Line, JR Hanwa Line)'),
  s('Nokonoshima Island Park (Nemophila)', 'のこのしまアイランドパーク ネモフィラ', N, 4, 'Kyushu & Okinawa', ['park'], 'April', 'Nokonoshima, Nishi Ward, Fukuoka',
    'A flower park on a small island in Hakata Bay, ten minutes by ferry from the city, where nemophila flower with the spring tulips and rapeseed.', 'のこのしまアイランドパーク', ['Nemophila Nokonoshima Island Park', 'Nokonoshima Island Park nemophila'], 'Ferry from Meinohama, then bus'),
  s('Ochiai Park (Kasugai)', '落合公園', N, 4, 'Mt. Fuji & Central', ['park'], 'Late April', 'Ochiai, Kasugai, Aichi',
    'A large lakeside park in Kasugai, north of Nagoya, with beds of nemophila in spring.', '落合公園 春日井', ['Nemophila in Ochiai park', 'Ochiai Park Kasugai']),
  // ---------------- Lavender
  s('Misato Lavender Garden', '美郷町ラベンダー園', V, 6, 'Northern Japan', ['park'], 'Mid June - Early July', 'Misato, Senboku District, Akita',
    'About 20,000 lavender plants on some 2 hectares, purple and white planted apart, including "Misato Sekka", a white lavender found only here. A lavender festival with picking is held through June.', '美郷町ラベンダー園', ['Lavender field in Misato Town, Akita', '美郷町 ラベンダー'], 'Shuttle taxi from Omagari Station (JR)'),
  s('Farm Tomita Lavender East', 'ファーム富田 ラベンダーイースト', V, 7, 'Hokkaido', ['countryside'], 'July', 'Kamifurano, Sorachi District, Hokkaido',
    'Farm Tomita\'s second farm, a few kilometres from the main farm, with a single huge field of lavender against the open Hokkaido hills. Open only in the July flowering season; free.', 'ラベンダーイースト 上富良野', ['Farm Tomita Lavender East', 'ラベンダーイースト']),
  s('Yagisaki Park', '八木崎公園', V, 6, 'Mt. Fuji & Central', ['park'], 'Late June - Mid July', 'Kodachi, Fujikawaguchiko, Yamanashi',
    'A lakeside park on Lake Kawaguchi with about 80,000 lavender plants, most of the lavender around the lake, with Mount Fuji across the water. A venue of the Kawaguchiko Herb Festival in some years; free.', '八木崎公園', ['Field of Lavender in Kawaguchiko', '八木崎公園 ラベンダー']),
  s('Tokai University Sapporo Lavender Field', '東海大学 札幌キャンパス ラベンダー畑', V, 7, 'Hokkaido', ['park'], 'Early - Late July', 'Minamisawa, Minami Ward, Sapporo, Hokkaido',
    'A lavender field on a university campus in Sapporo, opened to the public in July. The Minamisawa Lavender Festival is held there, with a brass band concert and stalls; free.', '東海大学 札幌キャンパス', ['Lavender Fields, Tokai University', '東海大学 ラベンダー']),
  // ---------------- Wisteria
  s('Yuya no Naga Fuji (Gyoko-ji)', '熊野の長藤', W, 4, 'Mt. Fuji & Central', ['temple'], 'Mid - Late April', 'Ikeda, Iwata, Shizuoka',
    'Long-tressed wisteria said to have been planted about 850 years ago by Lady Yuya, a heroine of the Heike era; the oldest vine is a national natural monument. They hang in the grounds of Gyoko-ji temple; free.', '行興寺 磐田', ['Yuya no Naga Fuji', '熊野の長藤']),
  s('Byakugo-ji Temple', '白毫寺', W, 5, 'Kyoto & Kansai', ['temple'], 'Late April - Mid May', 'Ichijima-cho, Tamba, Hyogo',
    'A 1,300-year-old temple known for its "kyushaku" wisteria, nine-foot tresses hanging along a 120 m trellis. Entry about 300 yen (more during the festival).', '白毫寺 丹波', ['Kyushaku japanese wisteria Byakugoji', '白毫寺 九尺藤'], 'About 8 min by taxi from Ichijima Station (JR Fukuchiyama Line)'),
  s('Omishima Wisteria Park', '大三島藤公園', W, 4, 'Western Japan', ['park'], 'Late April - Early May', 'Omishima-cho, Imabari, Ehime',
    'A 300 m wisteria trellis on Omishima island in the Seto Inland Sea, on the Shimanami Kaido cycling route. A wisteria festival is held around 3 May.', '大三島藤公園', ['Omishima Wisteria Park', '大三島藤公園']),
  s('Okazaki Park (Gomangoku Wisteria)', '岡崎公園 五万石藤', W, 4, 'Mt. Fuji & Central', ['castle', 'park'], 'Late April - Early May', 'Kosei-cho, Okazaki, Aichi',
    'Old wisteria vines on about 1,300 square metres beside Okazaki Castle, birthplace of Tokugawa Ieyasu, with tresses about 1.2 m long. The Gomangoku Wisteria Festival runs from late April to early May, with the trellises lit up at night.', '岡崎公園', ['Okazaki-Park-Fujimatsuri', '岡崎公園 藤'], '15 min walk from Higashi-Okazaki Station (Meitetsu)'),
  s('Yamanokami no Fuji', '山ノ神のフジ', W, 5, 'Mt. Fuji & Central', ['shrine'], 'May', 'Kamikurechi, Fujiyoshida, Yamanashi',
    'Two old Noda wisteria vines at a small mountain shrine near Mount Fuji, a national natural monument; one climbs a great maple that is itself a protected tree.', '上暮地 富士吉田', ['Yamanokami no Fuji', '山ノ神のフジ']),
  s('Nakayama Ofuji', '中山の大藤', W, 4, 'Kyushu & Okinawa', ['shrine'], 'Mid - Late April', 'Mitsuhashi-machi Nakayama, Yanagawa, Fukuoka',
    'A wisteria about 300 years old at Nakayama Kumano Shrine, a prefectural natural monument, grown from seed a local sake brewer brought back from Noda in Osaka. During the festival in mid April it is lit up in the evening (100 yen).', '中山熊野神社 柳川', ['Nakayama Ofuji', '中山大藤'], 'About 12 min by car from Nishitetsu-Yanagawa Station'),
  s('Rengeji-ike Park', '蓮華寺池公園', W, 4, 'Mt. Fuji & Central', ['park'], 'Mid April - Early May', 'Wakaouji, Fujieda, Shizuoka',
    'About 260 wisteria vines of 23 kinds on 560 m of trellis around a pond in Fujieda. The wisteria festival from mid April to early May draws about 250,000 visitors.', '蓮華寺池公園', ['Rengeji ike', '蓮華寺池公園 藤'], 'Bus from Fujieda Station (JR)'),
  s('Ushijima Wisteria', '牛島の藤', W, 4, 'Kanto', ['park'], 'Late April - Early May', '786 Ushijima, Kasukabe, Saitama',
    'A Noda wisteria thought to be over 1,000 years old, the only wisteria designated a Special Natural Monument, its long flower clusters hanging over a garden pond. Open only in season; adults about 1,000 yen.', '藤の牛島駅', ['Kasukabe Wisteria Floribunda From Tokaen', 'Ushijima no Fuji', 'Kasukabe Tokaen'], '10 min walk from Fuji-no-Ushijima Station (Tobu Urban Park Line)'),
  s('Hagi Castle Ruins (Shizuki Park)', '萩城跡 指月公園', W, 4, 'Western Japan', ['castle', 'park'], 'Late April - May', 'Horiuchi, Hagi, Yamaguchi',
    'The ruins of the Mori lords\' castle by the sea at Hagi, known for cherry blossom and also for wisteria among its stone walls and moats. Entry 220 yen.', '指月公園 萩', ['Wisteria floribunda in Hagi Castle', '萩城 藤']),
];
