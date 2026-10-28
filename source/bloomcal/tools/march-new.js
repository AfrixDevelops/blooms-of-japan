// March batch, added 2026-10-28: early-flowering cherries only. Somei-yoshino has opened in April in recent
// years even in Kyushu (Kagoshima and Miyazaki in 2017), so it was ruled out; these varieties peak in March
// every year. Facts come from Shizuoka Prefecture, Mie and Chiba tourism pages and Weathernews; anything
// unconfirmed (prices, exact addresses, stations) was left out. This file is the draft; the rows live in the
// source data.
const s = (name, jp, flower, region, type, peak, address, desc, q, cq, station) =>
  ({ name, jp, flower, month: 3, region, type, peak, address, desc, q, cq, station: station || '' });
module.exports = [
  s('Izu Kogen Sakura no Sato', '伊豆高原 さくらの里', 'Cherry Blossom (Sakura)', 'Mt. Fuji & Central', ['park', 'mountain'], 'Early - Mid March', 'Ito, Shizuoka',
    'About 1,000 cherry trees of some 40 kinds grow at the foot of Mount Omuro, chosen so that something is in flower from February to April. The early varieties, early Oshima-zakura, Jogasaki-zakura and Okan-zakura, are at their best in early to mid March, with somei-yoshino following in April.',
    'さくらの里 伊東', ['さくらの里 伊東', 'Sakura no Sato Izu Kogen', '大室山 さくらの里', 'Omuroyama Ito cherry']),
  s('Izu Kogen Cherry Avenue', '伊豆高原 桜並木', 'Cherry Blossom (Okan-zakura)', 'Mt. Fuji & Central', ['street'], 'Mid - Late March', 'Yawatano, Ito, Shizuoka',
    'A 3 km avenue of about 750 cherries runs from Izu-Kogen Station, roughly 200 of them Okan-zakura, a large-flowered early cherry that opens about a week ahead of somei-yoshino. The Okan-zakura are usually at their best from mid to late March, during the Izu Kogen cherry festival.',
    '伊豆高原駅', ['伊豆高原 桜並木', 'Izu Kogen cherry', '伊豆高原 大寒桜', 'Okanzakura Izu']),
  s('Oyama Shindo Okame Cherries', '大山新道 おかめ桜', 'Okame Cherry Blossom', 'Tokyo Area', ['street', 'mountain'], 'Early - Mid March', 'Oyama, Isehara, Kanagawa',
    'About 160 Okame-zakura, a small early cherry with deep pink flowers, line the new road up to Mount Oyama in Isehara. They usually open in early March, well ahead of the somei-yoshino, and some keep flowering into April. Free.',
    '大山 伊勢原', ['大山新道 おかめ桜', 'Okame zakura', 'Oyama Isehara', 'おかめ桜'], 'About 20 min by bus from Isehara Station (Odakyu Line) to Oyama'),
  s('Kasamatsu Kawazu Cherry Road', '笠松河津桜ロード', 'Kawazu Cherry Blossom', 'Kyoto & Kansai', ['river', 'countryside'], 'Late February - Mid March', 'Kasamatsu-cho, Matsusaka, Mie',
    'About 350 Kawazu cherries, planted by local people, line 1.5 km of a farm canal in Kasamatsu, Matsusaka, their pink flowers reflected in the water. They are usually at their best in early to mid March; in 2025 they were in full bloom on 17 March.',
    '松阪市 笠松町', ['笠松 河津桜', 'Kasamatsu Kawazu', '松阪 河津桜', 'Matsusaka cherry canal'], 'Bus from Ise-Nakagawa Station (Kintetsu) or Matsusaka Station to Mikumo, then about 30 min walk'),
  s('Shirako Kawazu Cherries', '白子町 しらこ桜', 'Kawazu Cherry Blossom', 'Tokyo Area', ['street', 'countryside'], 'Late February - Early March', 'Shirako, Chosei District, Chiba',
    'About 500 Kawazu cherries, known locally as shirako-zakura, line the Kujukuri Beach Line road behind the Pacific coast, with around 1,000 across the town. The Shirako onsen cherry festival runs from late February into early March, with evening light-ups.',
    '白子町', ['白子町 河津桜', 'Shirako Chiba', '九十九里 河津桜', 'Shirako onsen'], 'Bus from Mobara Station (JR Sotobo Line) to Nakazato Kaigan, then 5 min walk'),
];
