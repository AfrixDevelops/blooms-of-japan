// Hokkaido additions (researched 2026-10-16: Hokkaido Shimbun, nippon.com, Walkerplus, Rurubu, tabi-mag,
// Visit Hokkaido, Weathernews). Photo-first from Wikimedia Commons.
const A = 'Autumn Foliage (Momiji)';
const s = (name, jp, flower, month, type, peak, address, desc, q, cq, station) =>
  ({ name, jp, flower, month, region: 'Hokkaido', type, peak, address, desc, q, cq, station: station || '' });
module.exports = [
  s('Hokkaido University Ginkgo Avenue', '北海道大学 イチョウ並木', 'Autumn Foliage (Ginkgo)', 10, ['street'], 'Late October - Early November', 'Kita 13-jo Nishi, Kita Ward, Sapporo',
    'About 70 ginkgo trees line both sides of a 380 m avenue on the Hokkaido University campus, turning gold at the end of October. During the student-run Kin\'yosai festival the avenue is lit up at night. Free.', '北海道大学', ['Ginkgo at hokkaido university', '北海道大学 イチョウ並木', 'Hokkaido University ginkgo'], '5 min walk from Kita-12-jo Station (Namboku Line)'),
  s('Hokkaido University Botanic Garden', '北海道大学植物園', A, 10, ['park'], 'October', 'Kita 3-jo Nishi 8-chome, Chuo Ward, Sapporo',
    'A 13-hectare botanic garden in the middle of Sapporo, a few minutes from the station, where the old trees colour in October. Open from late April to 3 November; adults 420 yen.', '北海道大学植物園', ['Hokkaido University Botanical Gardens', 'Leaves in autumn in the Botanic Garden, Hokkaido University'], '10 min walk from Sapporo Station'),
  s('Nakajima Park', '中島公園', A, 10, ['park'], 'Mid October - Early November', '1 Nakajimakoen, Chuo Ward, Sapporo',
    'A city park around a pond in central Sapporo. The path in from Nakajima-koen Station runs under tall ginkgos whose fallen leaves carpet the ground; maples colour around the pond. Free.', '中島公園 札幌', ['中島公園 (Nakajima Park)', 'Nakajima Park Sapporo autumn'], 'Next to Nakajima-koen Station (Namboku Line)'),
  s('Onuma Quasi-National Park', '大沼国定公園', A, 10, ['river', 'mountain'], 'Mid October - Early November', 'Onuma-cho, Nanae, Kameda District, Hokkaido',
    'A lake dotted with wooded islands below the volcano Komagatake, north of Hakodate. Paths over little bridges and a sightseeing boat take you among the maples, beech and oak. Boat about 1,460 yen.', '大沼公園', ['Onuma Quasi National Park autumn', 'Late autumn in Onuma'], 'Short walk from Onuma-koen Station (JR Hakodate Line)'),
  s('Kosetsu-en Garden (Hakodate)', '香雪園', A, 10, ['park'], 'Late October - Early November', 'Miharashi-cho, Hakodate, Hokkaido',
    'The only garden in Hokkaido that is a national scenic site, a Meiji-era merchant\'s garden in Miharashi Park with some 600 maples, including a 100 m maple avenue. Lit up in the evenings in late October; free.', '見晴公園 函館', ['Kosetsuen Japanese garden autumn colors', 'Hakodate red autumn'], 'Bus from Hakodate Station to Kosetsuen, about 40 min'),
  s('Sounkyo Gorge', '層雲峡', A, 10, ['river', 'mountain'], 'Late September - Mid October', 'Sounkyo, Kamikawa, Hokkaido',
    'A gorge of sheer basalt cliffs and waterfalls in the Daisetsuzan mountains, among the first places in Japan to colour. The ropeway up Mount Kurodake shows the colour moving down the mountain from late September.', '層雲峡', ['秋函（Autumn in valley）', '紅葉谷への路', 'Sounkyo autumn'], 'Bus from Kamikawa Station or Asahikawa Station'),
  s('Lake Onneto', 'オンネトー', A, 10, ['river', 'mountain'], 'Early - Mid October', 'Ashoro, Ashoro District, Hokkaido',
    'A small lake whose colour shifts with the light, below the volcano Meakandake; rowan and maples reflect in it in early October.', 'オンネトー', ['紅葉のオンネトー（Autumn in Onneto）', 'Onneto']),
  s('Lake Akan', '阿寒湖', A, 10, ['river', 'mountain'], 'Early - Mid October', 'Akanko Onsen, Akan-cho, Kushiro, Hokkaido',
    'A volcanic lake in Akan-Mashu National Park, home of marimo moss balls, whose shoreline forest colours in early to mid October.', '阿寒湖', ['Lake Akan Kushiro Hokkaido Japan', 'Lake Akan autumn'], 'Bus from Kushiro Station, about 2 hours'),
  s('Shiretoko Five Lakes', '知床五湖', A, 10, ['river', 'mountain'], 'Early - Mid October', 'Iwaobetsu, Shari, Shari District, Hokkaido',
    'Five forest lakes in the Shiretoko World Heritage area, with the Shiretoko mountains behind; rowan and maples colour from late September. The elevated boardwalk is free; the ground trail needs a short paid lecture.', '知床五湖', ['Shiretoko Goko Lakes', 'Shiretoko five lakes autumn'], 'Bus from Utoro'),
  s('Iwamizawa Park Rose Garden', 'いわみざわ公園 バラ園', 'Roses', 7, ['park'], 'Late June - Mid July; again mid September - mid October', 'Iwamizawa, Hokkaido',
    'One of the largest rose gardens in Hokkaido, about 4 hectares with some 8,800 plants of around 630 kinds, plus a hill of wild rugosa roses. The Iwamizawa Rose Festa is held in late June and July; free.', 'いわみざわ公園', ['Iwamizawa-park Rose-Garden', 'いわみざわ公園 バラ']),
  s('Kechimyaku-zakura (Matsumae)', '血脈桜', 'Cherry Blossom (Sakura)', 5, ['temple'], 'Late April - Early May', 'Matsushiro, Matsumae, Hokkaido',
    'A cherry over 300 years old beside Kozen-ji temple, the oldest in Matsumae and the parent tree of the Nanden cherry, the town\'s most common variety, with branches spreading 17 m.', '光善寺 松前', ['血脈桜']),
  s('Mount Asahidake', '大雪山旭岳', A, 9, ['mountain'], 'Late August - Late September', 'Asahidake Onsen, Higashikawa, Hokkaido',
    'Hokkaido\'s highest peak and the first place in Japan to colour: from late August the alpine meadows of rowan, Aleutian heath and Geum around the Sugatami ponds turn red and gold. The ropeway rises 490 m in 10 minutes; about 3,500 yen return.', '旭岳', ['チングルマの草原', '姿見の池']),
];
