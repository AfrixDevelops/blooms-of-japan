// Red spider lily additions (researched 2026-10-15). Chosen photo-first from Wikimedia Commons; where no
// published facts were found the description says only what the place is and what the photos show.
const SL = 'Red Spider Lily (Higanbana)';
const s = (name, jp, month, region, type, peak, address, desc, q, cq, station) =>
  ({ name, jp, flower: SL, month, region, type, peak, address, desc, q, cq, station: station || '' });
module.exports = [
  s('Eriyama Rice Terraces', '江里山の棚田', 9, 'Kyushu & Okinawa', ['countryside'], 'Mid - Late September', 'Ogi-machi Eriyama, Ogi, Saga',
    'Terraced rice fields in the hills of Ogi, one of Japan\'s top 100 terraced fields, where red spider lilies line the ridges just as the rice turns gold. A spider lily festival is held around the autumn equinox; parking is limited.', '江里山 小城市', ['Eriyama rice terraces', '江里山 棚田']),
  s('Hinata (Isehara)', '日向の彼岸花', 9, 'Tokyo Area', ['countryside', 'temple'], 'Late September', 'Hinata, Isehara, Kanagawa',
    'Red spider lilies grow wild along the rice fields and paths of the Hinata valley, one of Kanagawa\'s top 100 flower spots, looked after by local volunteers. The path leads up to Hinata Yakushi, a temple founded some 1,300 years ago.', '日向薬師', ['Isehara Hinata', '日向 彼岸花'], 'Bus from Isehara Station to Hinata Yakushi, about 25 min'),
  s('Josen-ji Temple (Yamato)', '常泉寺', 9, 'Tokyo Area', ['temple'], 'Mid - Late September', '2176 Fukuda, Yamato, Kanagawa',
    'A small temple known for its white spider lilies, rare to see growing in numbers, flowering with the red ones in September. Entry about 300 yen.', '常泉寺 大和市', ['Josenji temple Lycoris radiata', '常泉寺 大和'], '7 min walk from Koza-Shibuya Station (Odakyu Enoshima Line)'),
  s('Tsuyama Castle (Spider Lilies)', '津山城 彼岸花', 9, 'Western Japan', ['castle', 'park'], 'Late September', '135 Yamashitacho, Tsuyama, Okayama',
    'Red spider lilies come up all over the tall stone terraces of Tsuyama Castle in Kakuzan Park each autumn; the ones below the walls and the rebuilt Bitchu turret are a favourite photo.', '鶴山公園 津山', ['津山城彼岸花', 'Kakuzan Park lycoris'], '10 min walk from Tsuyama Station (JR)'),
  s('Inabuchi Terraced Rice Fields (Asuka)', '稲渕の棚田', 9, 'Kyoto & Kansai', ['countryside'], 'Mid - Late September', 'Inabuchi, Asuka, Takaichi District, Nara',
    'Red spider lilies line the ridges of terraced rice fields in the village of Asuka, Japan\'s ancient capital, just as the rice ripens. In September a scarecrow contest fills the paths with scarecrows.', '稲渕 明日香村', ['Asukamura and cluster amaryllises', '稲渕 棚田'], 'Bus from Asuka Station (Kintetsu)'),
  s('Koishikawa Korakuen (Spider Lilies)', '小石川後楽園 彼岸花', 9, 'Tokyo Area', ['park'], 'Mid - Late September', '1-6-6 Koraku, Bunkyo City, Tokyo',
    'One of Tokyo\'s oldest daimyo gardens, laid out in the 17th century, where red spider lilies come up among the paths and ponds in September. Entry 300 yen.', '小石川後楽園', ['小石川後楽園 彼岸花', 'Koishikawa Korakuen lycoris', 'Plants in Koishikawa Korakuen'], '8 min walk from Iidabashi Station'),
  s('Sesson-an', '雪村庵', 9, 'Northern Japan', ['temple', 'countryside'], 'Late September', 'Nishita-machi, Koriyama, Fukushima',
    'The hermitage of the 16th-century painter-monk Sesson Shukei, in the countryside near Miharu, with red spider lilies along its approach in autumn.', '雪村庵 郡山', ['雪村庵 参道沿いのヒガンバナ', 'Sesson An']),
  s('Ryokusuien (Koriyama)', '四季の里 緑水苑', 9, 'Northern Japan', ['park'], 'Late September', 'Nakatajima, Koriyama, Fukushima',
    'A private flower garden around a pond in Koriyama, best known for its spring cherries, where red spider lilies flower by the water in late September.', '緑水苑 郡山', ['郡山緑水苑 池の前のヒガンバナ', 'Ryokusuien']),
  s('Oppe River (Kawajima)', '越辺川', 9, 'Kanto', ['river', 'countryside'], 'Late September', 'Kawajima, Hiki District, Saitama',
    'The embankments of the Oppe River in the farm country of Kawajima, where red spider lilies line the levee in late September.', '川島町 越辺川', ['Kawajima Oppe River And Spider Lily', '越辺川 彼岸花']),
  s('Sumiyama Terraced Fields (Uji)', '炭山の棚田', 9, 'Kyoto & Kansai', ['countryside', 'mountain'], 'Late September', 'Sumiyama, Uji, Kyoto',
    'Terraced rice fields in Sumiyama, a hill village of potters above Uji, with red spider lilies along the ridges at harvest time.', '炭山 宇治市', ['彼岸花と炭山棚田']),
  s('Hongo Spider Lily Road (Nanbu)', '本郷 彼岸花街道', 9, 'Mt. Fuji & Central', ['street', 'countryside'], 'Late September', 'Nanbu, Minamikoma District, Yamanashi',
    'A country road in the Fuji River valley in southern Yamanashi, lined with red spider lilies in September.', '南部町 本郷', ['本郷彼岸花街道']),
  s('Mizunuma Station (Watarase Keikoku Railway)', '水沼駅', 9, 'Kanto', ['countryside'], 'Late September', 'Kurohone-cho, Kiryu, Gunma',
    'A country station on the Watarase Keikoku Railway in the mountains of Gunma, with a hot-spring bath in the station building and red spider lilies beside the tracks in autumn.', '水沼駅 桐生', ['水沼駅近くの曼珠沙華'], 'Mizunuma Station (Watarase Keikoku Railway)'),
];
