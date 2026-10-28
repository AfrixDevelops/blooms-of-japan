// Southern Tohoku in March, added 2026-10-28: plum and Adonis (fukujuso), the only outdoor blooms this far north
// that reliably flower in March. Facts come from Fukushima, Miyagi and Yamagata tourism pages, Sendai city and
// local press; anything unconfirmed was left out. Hokkaido and northern Tohoku have nothing outdoors in March.
// This file is the draft; the rows live in the source data.
const s = (name, jp, flower, region, type, peak, address, desc, q, cq, station) =>
  ({ name, jp, flower, month: 3, region, type, peak, address, desc, q, cq, station: station || '' });
module.exports = [
  s('Numanotaira Adonis', '沼ノ平の福寿草', 'Adonis (Fukujuso)', 'Northern Japan', ['countryside', 'mountain'], 'Late March - Mid April', 'Yamato-machi, Kitakata, Fukushima',
    'More than a million wild Adonis cover about 5 hectares of Numanotaira, in the Yamato district of Kitakata, one of the largest colonies in Japan. Two walking paths wind through them. They are usually at their best from late March into April, during the fukujuso festival, and open fully from about 10 to 11 in the morning.',
    '山都町 喜多方市', ['沼ノ平 福寿草', '山都 福寿草', '喜多方 福寿草', 'Adonis amurensis'], 'About 20 min by taxi from Yamato Station (JR Ban\'etsu West Line)'),
  s('Sendai Agricultural Center Plum Garden', 'せんだい農業園芸センター 梅園', 'Plum Blossom (Ume)', 'Northern Japan', ['garden', 'park'], 'Mid - Late March', 'Arai, Wakabayashi Ward, Sendai, Miyagi',
    'About 125 plum trees of some 60 kinds, including the Garyu-bai, said to descend from a plum Date Masamune brought back from the Korean Peninsula. A plum-viewing event is held from mid to late March, while the trees are at their best.',
    'せんだい農業園芸センター', ['せんだい農業園芸センター', '農業園芸センター 仙台', '仙台 梅', 'Sendai plum blossom'], 'Bus from Arai Station (Tozai Line) to Nogyo Engei Center-mae'),
  s('Yutagawa Onsen Plum Park', '湯田川温泉 梅林公園', 'Plum Blossom (Ume)', 'Northern Japan', ['park', 'countryside'], 'Mid March - Early April', 'Yutagawa, Tsuruoka, Yamagata',
    'About 300 red and white plum trees on the hillside above the old hot-spring village of Yutagawa. A plum festival is held while they are at their best, with tea served outdoors by the inn hostesses and Yutagawa kagura dances.',
    '湯田川温泉 鶴岡', ['湯田川温泉 梅', '湯田川 梅林', '湯田川温泉', 'Yutagawa Onsen']),
  s('Tsutsumi Plum Orchards', '堤梅団地', 'Plum Blossom (Ume)', 'Northern Japan', ['countryside'], 'Mid March - Early April', 'Tsutsumi, Ogawara, Shibata District, Miyagi',
    'About 3,000 plum trees of kinds such as Shirokaga and Nanko, on some 6 hectares of hillside cleared and planted before the war. These are working orchards on private land, so keep to the paths and visit quietly.',
    '大河原町 堤', ['堤梅団地', '大河原 梅', '大河原町 梅', 'Ogawara plum'], 'About 17 min by car from Ogawara Station (JR Tohoku Line)'),
];
