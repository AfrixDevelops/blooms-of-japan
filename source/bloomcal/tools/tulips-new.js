// Ten more tulip spots, added 2026-10-30, so every region has a big tulip field. Counts and dates come from each
// park's or town's own pages, prefectural tourism sites and press releases; where the latest year wasn't published
// the text says "in recent years". Hinoyama Park's Turkish tulip garden was left out: it is closed until about 2028.
// This file is the draft; the rows live in the source data.
const s = (name, jp, region, type, peak, address, desc, q, cq, station) =>
  ({ name, jp, flower: 'Tulip', month: 4, region, type, peak, address, desc, q, cq, station: station || '' });
module.exports = [
  s('Hamura Tulip Fields', '羽村市 根がらみ前水田 チューリップ', 'Tokyo Area', ['countryside'], 'Early - Mid April', 'Negarami-mae paddy fields, Hamura, Tokyo',
    'About 350,000 tulips fill the Negarami-mae rice paddies beside the Tama River in spring, one of the largest tulip fields in the Kanto region. The tulip festival runs for about ten days in early to mid April.',
    '羽村市', ['羽村 チューリップ', '根がらみ前水田', 'Hamura tulip', '羽村市 チューリップまつり'], 'Walk from Hamura Station (JR Ome Line)'),
  s('Yokohama Park', '横浜公園', 'Tokyo Area', ['park'], 'Early - Mid April', 'Yokohama Park, Naka Ward, Yokohama, Kanagawa',
    'About 100,000 tulips of some 70 kinds fill the beds around Yokohama Stadium each April, planted the autumn before by local volunteers. They are the centrepiece of the Garden Necklace Yokohama spring festival. Admission is free.',
    '横浜公園', ['横浜公園 チューリップ', 'Yokohama Park tulips', '横浜スタジアム チューリップ'], 'Next to Kannai Station (JR Negishi Line)'),
  s('Yokohama Satoyama Garden', '横浜市立 里山ガーデン', 'Tokyo Area', ['park'], 'April', 'Kamishirane-cho, Asahi Ward, Yokohama, Kanagawa',
    "A 10,000 square metre flower bed on a wooded hillside next to Zoorasia zoo, the biggest in Yokohama, opened free for the spring Satoyama Garden festival from late March to early May. In 2026 it held about 200,000 tulips of 150 kinds, and they are at their best in April.",
    '里山ガーデン 横浜', ['里山ガーデン', '里山ガーデン チューリップ', 'Satoyama Garden Yokohama'], 'Bus from Nakayama Station (JR Yokohama Line) to Jichikaikan-mae, then 10 min walk'),
  s('Hananomiyako Park', '山中湖 花の都公園', 'Mt. Fuji & Central', ['park', 'mountain'], 'Late April - Early May', 'Yamanakako, Minamitsuru District, Yamanashi',
    'Fields of tulips with Mount Fuji rising behind them, on the plateau above Lake Yamanaka. They flower later here than in Tokyo, from late April into early May, because the park is about 1,000 m up. The flower fields are free; only the Seiryu no Sato area charges.',
    '山中湖 花の都公園', ['花の都公園 チューリップ', '花の都公園', 'Hananomiyako Park', '山中湖 チューリップ']),
  s('Kiso Sansen Park', '国営木曽三川公園', 'Mt. Fuji & Central', ['park'], 'Early - Mid April', 'Kiso Sansen Park Center, Kaizu, Gifu',
    'At the Park Center where the Kiso, Nagara and Ibi rivers run side by side, past tulip festivals have laid out over 200,000 tulips and a carpet of blue muscari in a giant flower bed, seen best from the observation tower. The festival is usually held in early to mid April.',
    '木曽三川公園センター', ['木曽三川公園 チューリップ', '木曽三川公園センター', 'Kiso Sansen Park', '木曽三川公園 タワー']),
  s('Awaji Island National Government Park', '国営明石海峡公園 淡路地区', 'Kyoto & Kansai', ['park'], 'Early - Mid April', 'Yumebutai, Awaji, Hyogo',
    'Billed as the largest bulb-flower beds in Kansai, the hillside beds of this national park on Awaji Island hold some 150,000 tulips of about 100 kinds in recent years, looking out over Osaka Bay. They are usually at their best in the first half of April.',
    '国営明石海峡公園', ['国営明石海峡公園 チューリップ', '明石海峡公園 淡路', 'Awaji Island national park tulips'], 'Highway bus from Sannomiya to Awaji Yumebutai'),
  s('Sera Kogen Farm', '世羅高原農場', 'Western Japan', ['countryside'], 'Mid April - Early May', 'Sera, Hiroshima',
    "About 750,000 tulips of some 200 kinds cover 6.5 hectares of this hilltop farm's fields for its tulip festival. They are usually at their best in the second half of April, and the entry fee changes with how far the flowers are out.",
    '世羅高原農場', ['世羅高原農場 チューリップ', '世羅高原 チューリップ', 'Sera tulip']),
  s('Michinoku Lakeside Park', '国営みちのく杜の湖畔公園', 'Northern Japan', ['park'], 'Mid April - Early May', 'Kawasaki, Shibata District, Miyagi',
    "Around 100,000 tulips of up to 100 kinds fill the big flower bed of the Irodori Hiroba during the park's spring flower festival, Tohoku's only national government park. They are usually at their best from mid April to early May.",
    'みちのく杜の湖畔公園', ['みちのく公園 チューリップ', 'みちのく杜の湖畔公園', 'Michinoku Lakeside Park']),
  s('Yukiyagawa Dam Forest Park', '雪谷川ダムフォリストパーク・軽米', 'Northern Japan', ['park'], 'Late April - Mid May', 'Karumai, Kunohe District, Iwate',
    'About 150,000 tulips on some 7,000 square metres of fields beside the Yukiyagawa Dam lake in northern Iwate, flowering for the Forest, Water and Tulip festival from late April to mid May. On stage-event days a free shuttle runs from the town centre.',
    '雪谷川ダム', ['雪谷川ダム チューリップ', '軽米 チューリップ', 'フォリストパーク 軽米'], 'About 1 hr by JR Bus from Ninohe Station'),
  s('Sarakimisaki Tulip Garden', 'サラキ岬 チューリップ園', 'Hokkaido', ['countryside'], 'Late April - Early May', 'Sarakimisaki, Kikonai, Kamiiso District, Hokkaido',
    'Some 50,000 tulips of about 60 kinds bloom on a cape on the Tsugaru Strait, with a Dutch-style windmill and a monument to the Kanrin Maru, which sank on the rocks offshore in 1871. Local volunteers planted the garden; it is usually at its best in early May.',
    'サラキ岬', ['サラキ岬', 'サラキ岬 チューリップ', '木古内 チューリップ', '咸臨丸 サラキ岬'], 'About 15 min by car from Kikonai Station (Hokkaido Shinkansen)'),
];
