// Northern Kanto and Nagano in March, added 2026-10-28: plum groves, Adonis (fukujuso) and katakuri. Cherries
// do not open this far north until April, so none are here. Facts come from Gunma, Tochigi and Nagano tourism
// pages and local press; anything unconfirmed (stations, prices, exact addresses) was left out. Mount
// Tsukuba's katakuri (mid-April peak), Hoshino's setsubunso (February) and spots with unconfirmed dates were
// dropped. This file is the draft; the rows live in the source data.
const s = (name, jp, flower, region, type, peak, address, desc, q, cq, station) =>
  ({ name, jp, flower, month: 3, region, type, peak, address, desc, q, cq, station: station || '' });
module.exports = [
  s('Akima Plum Grove', '秋間梅林', 'Plum Blossom (Ume)', 'Kanto', ['countryside', 'mountain'], 'Early - Late March', 'Akima, Annaka, Gunma',
    'One of Gunma\'s three great plum groves: about 35,000 trees over 50 hectares of hillside in Annaka. The Akima plum festival runs from late February to the end of March, and the trees are usually at their best from early to late March.',
    '秋間梅林', ['秋間梅林', 'Akima plum', '安中 梅林', 'Akima Annaka']),
  s('Haruna Plum Grove', '榛名梅林', 'Plum Blossom (Ume)', 'Kanto', ['countryside', 'mountain'], 'Early - Late March', 'Kamisatomi-machi, Takasaki, Gunma',
    'The heart of Gunma\'s biggest plum-growing area, where some 120,000 trees spread over more than 300 hectares below Mount Haruna. The Haruna plum festival is held on the third Sunday of March, and the groves are usually in flower from early to late March.',
    '榛名梅林', ['榛名梅林', 'Haruna plum', '榛名 梅', 'Takasaki plum grove']),
  s('Minowa Plum Grove', '箕郷梅林', 'Plum Blossom (Ume)', 'Kanto', ['countryside', 'mountain'], 'Early - Late March', 'Minowa-machi, Takasaki, Gunma',
    'About 100,000 plum trees across some 300 hectares of the Misato hills in Takasaki, the third of Gunma\'s great plum groves. The Misato plum festival runs through March, while the trees are usually at their best.',
    '箕郷梅林', ['箕郷梅林', 'みさと梅林', 'Minowa plum', '箕郷 梅']),
  s('Kannonyama Ume no Sato', '観音山梅の里梅園', 'Plum Blossom (Ume)', 'Kanto', ['park', 'countryside'], 'Mid - Late March', '3501 Ichihana, Ichikai, Haga District, Tochigi',
    'About 3,000 plum trees of four kinds, including the white Shirokaga and red plums, fill a 4-hectare hillside garden in Ichikai. They are usually at their best in mid March, when a plum festival is held. Free.',
    '観音山梅の里', ['観音山梅の里', '市貝町 梅', 'Kannonyama Ichikai', 'Ichikai plum'], 'About 30 min walk from Ichihana Station (Moka Railway)'),
  s('Akanuta Adonis Fields', '赤怒田福寿草群生地', 'Adonis (Fukujuso)', 'Mt. Fuji & Central', ['countryside', 'mountain'], 'Mid March - Early April', 'Shiga district, Matsumoto, Nagano',
    'About 500,000 wild Adonis plants cover a 1.5-hectare north-facing slope in the Shiga district of Matsumoto, one of the largest colonies in Japan and a city natural monument. Their golden flowers are usually at their best around the spring equinox, during the Shiga fukujuso festival. Free.',
    '赤怒田 福寿草', ['赤怒田 福寿草', '四賀 福寿草', 'Adonis amurensis Japan', 'Fukujuso']),
  s('Nanaimai Kosaka Adonis', '七二会 小坂の福寿草', 'Adonis (Fukujuso)', 'Mt. Fuji & Central', ['countryside', 'mountain'], 'Early - Late March', 'Nanaimai, Nagano, Nagano',
    'More than 30,000 Adonis crowd a steep hectare of hillside in Kosaka, in the Nanaimai district of Nagano city, opening one after another as the snow melts. A fukujuso festival runs through March. The colony is a 500 m walk up a mountain path from the car park, so wear good shoes.',
    '七二会 長野市', ['七二会 福寿草', '小坂 福寿草', 'Adonis ramosa', 'Nanaimai Nagano'], 'About 40 min by car from Nagano IC (Joshinetsu Expressway)'),
  s('Katakuri no Sato (Mount Mikamo)', '万葉自然公園かたくりの里', 'Katakuri (Dogtooth Violet)', 'Kanto', ['park', 'mountain'], 'Mid March - Early April', 'Sano, Tochigi',
    'About 1.5 million katakuri, a small purple spring lily, carpet the wooded slopes of Mount Mikamo in Sano, usually at their best from mid to late March, when the katakuri flower festival is held. Free entry; parking is charged in season.',
    'かたくりの里 佐野', ['かたくりの里 佐野', 'Erythronium japonicum', 'カタクリ 群生', 'Mikamo katakuri'], 'About 20 min by taxi from Sano Station, or 10 min by car from Sano-Fujioka IC'),
];
