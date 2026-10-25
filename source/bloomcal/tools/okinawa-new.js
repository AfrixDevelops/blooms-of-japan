// Okinawa bloom spots (researched 2026-10-16: Rurubu, Ryukyu Shimpo, nap-camp, Mapple). Photo-first from Commons.
// Okinawa sits outside the site's map box, so these carry ll (lat/lon) for the weather box and no map pin.
const s = (name, jp, flower, month, type, peak, address, desc, ll, cq, station) =>
  ({ name, jp, flower, month, region: 'Kyushu & Okinawa', type, peak, address, desc, ll, q: jp, cq, station: station || '' });
module.exports = [
  s('Nago Central Park', '名護中央公園', 'Cherry Blossom (Sakura)', 1, ['park', 'castle', 'mountain'], 'Late January - Mid February', 'Nago, Okinawa',
    'Thousands of deep-pink kanhizakura, Okinawa\'s own early cherry, line a 2 km walking path up to the ruins of Nago Castle. The Nago Cherry Blossom Festival, held on the last weekend of January, is one of the first cherry festivals in Japan.',
    [26.588, 127.985], ['Nago-jyo Park Sakura', 'Nago Cherry Blossom Festival', '名護城 桜']),
  s('Mount Yae Cherry Forest Park', '八重岳桜の森公園', 'Cherry Blossom (Sakura)', 1, ['mountain', 'park'], 'Mid January - Early February', 'Motobu, Kunigami District, Okinawa',
    'About 7,000 kanhizakura line the road up Mount Yae on the Motobu Peninsula, the first place in Japan where cherries come out each year. The Motobu Yaedake Cherry Festival is held in late January.',
    [26.656, 127.937], ['Sakura at Mount Yae', '八重岳 桜']),
  s('Iejima Lily Field Park', '伊江島リリーフィールド公園', 'Lily (Yuri)', 4, ['park', 'countryside'], 'Late April - Early May', 'Ie, Kunigami District, Okinawa',
    'White trumpet lilies, Okinawa\'s native Easter lily, cover a field above the sea on the north coast of Ie Island, said to be a million flowers. The Iejima Lily Festival runs from late April into Golden Week. Ferry from Motobu port, about 30 minutes.',
    [26.725, 127.79], ['Iejima Lily Festival', '伊江島 ゆり'], 'Ferry from Motobu port to Ie Island, then bus or rental bike'),
  s('Higashi Village Azalea Garden', '東村村民の森つつじ園', 'Azalea (Tsutsuji)', 3, ['park', 'mountain'], 'Early - Mid March', 'Higashi, Kunigami District, Okinawa',
    'About 50,000 azaleas of seven kinds, red, purple and white, on a hillside in the forests of northern Okinawa. The Higashi Village Azalea Festival is held in March; adults about 300 yen.',
    [26.633, 128.15], ['Azalea flowers', '東村 つつじ']),
];
