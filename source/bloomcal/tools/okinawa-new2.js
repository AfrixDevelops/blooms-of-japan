// Fifteen more Okinawa spots, added 2026-10-27: eleven on or near the main island, four on the outer
// islands (Iriomote, Taketomi, Miyako, Ishigaki). Facts come from the Ryukyu Shimpo, Okinawa Prefecture's
// "top 100 flower and green spots" list, and the spots' own or local tourism pages; anything unconfirmed
// (prices, stations, tree counts) was left out. Okinawa sits outside the map frame, so each spot carries
// its own latitude/longitude instead of a map position. This file is the draft; the rows live in the
// source data.
const s = (name, jp, flower, month, type, peak, address, desc, q, cq, station) =>
  ({ name, jp, flower, month, region: 'Kyushu & Okinawa', type, peak, address, desc, q, cq, station: station || '' });
module.exports = [
  // ---- main island: winter cherries, cosmos and sunflowers ----
  s('Nakijin Castle Ruins Cherry Blossoms', '今帰仁城跡 桜', 'Cherry Blossom (Sakura)', 1, ['castle'], 'Late January - Early February', '5101 Imadomari, Nakijin, Kunigami District, Okinawa',
    'Deep-pink kanhizakura line the path from the gate up to the main enclosure of these World Heritage castle ruins, about 630 trees across the site. The Nakijin Gusuku cherry festival, usually from late January into early February, lights them up in the evenings.',
    '今帰仁城跡', ['今帰仁城跡 桜', 'Nakijin Castle cherry', 'Nakijin Gusuku sakura', 'Nakijin Castle']),
  s('Yaese Park Cherry Blossoms', '八重瀬公園 桜', 'Cherry Blossom (Sakura)', 2, ['park'], 'Late January - Early February', 'Tomori, Yaese, Shimajiri District, Okinawa',
    'Southern Okinawa\'s best-known cherry spot: kanhizakura across the hillside park in Tomori, with the Yaese cherry festival in early February and evening light-ups while the trees are in flower.',
    '八重瀬公園', ['八重瀬公園 桜', 'Yaese Park', '八重瀬公園', 'Yaese cherry blossom']),
  s('Yogi Park Cherry Blossoms', '与儀公園 桜', 'Cherry Blossom (Sakura)', 2, ['park', 'river'], 'Early - Mid February', 'Yogi, Naha, Okinawa',
    'Kanhizakura line the stream through this park in central Naha, the setting for the Naha cherry festival and one of Okinawa Prefecture\'s top 100 flower and green spots. Usually at their best in early to mid February. Free.',
    '与儀公園', ['与儀公園 桜', 'Yogi Park Naha', '与儀公園', 'Yogi Park cherry']),
  s('Yomitan Cosmos Field', 'よみたんコスモス畑', 'Cosmos', 1, ['countryside'], 'Late January - Early February', 'Zakimi, Yomitan, Nakagami District, Okinawa',
    'Okinawa\'s cosmos flower in winter. In the field opposite Yomitan Junior High School in Zakimi, about a million of them come into bloom, usually from late January into early February.',
    '読谷村 座喜味', ['よみたんコスモス畑', '読谷 コスモス', 'Yomitan cosmos', '座喜味 コスモス']),
  s('Haneji Paddies Cosmos', '羽地ターブックヮー コスモス', 'Cosmos', 1, ['countryside'], 'Late January', 'Kawakami, Nago, Okinawa',
    'The rice paddies of Haneji, around Kawakami in Nago, are sown with cosmos while they lie fallow, about 6.6 hectares of pink beside Route 58. Usually at their best at the end of January; from February the flowers are ploughed back in before planting.',
    '名護市 川上', ['羽地 コスモス', '羽地ターブックヮー', 'Haneji Nago', '名護 コスモス']),
  s('Kitanakagusuku Sunflowers', '北中城村 ひまわり', 'Sunflower (Himawari)', 2, ['countryside'], 'Mid February - Early March', 'Atta, Kitanakagusuku, Nakagami District, Okinawa',
    'In Okinawa the sunflowers come in winter. About 200,000 of them fill some 22,000 square metres of farmland in the Atta district, and the sunflower festival usually runs from mid February into early March.',
    '北中城村', ['北中城 ひまわり', 'Kitanakagusuku sunflower', '北中城村', 'Okinawa sunflower']),
  // ---- main island: orchids, hydrangeas, sagaribana and deigo ----
  s('Tropical Dream Center (Ocean Expo Park)', '熱帯ドリームセンター', 'Tropical Orchids', 1, ['park'], 'Year-round', '424 Ishikawa, Motobu, Kunigami District, Okinawa',
    'The great glasshouse in Ocean Expo Park, near Churaumi Aquarium, keeps orchids and other tropical flowers in bloom all year. In late January it hosts the Okinawa International Orchid Show, Japan\'s longest-running international orchid exhibition. Adults 760 yen.',
    '熱帯ドリームセンター', ['熱帯ドリームセンター', 'Tropical Dream Center', 'Ocean Expo Park orchid', '海洋博公園 ラン']),
  s('BIOS no Oka Orchids', 'ビオスの丘 ラン', 'Tropical Orchids', 10, ['park'], 'Mid September - November', 'Ishikawa, Uruma, Okinawa',
    'A subtropical forest park in Uruma with a boat ride across its lake. Its autumn orchid festival, usually mid September to the end of November, hangs about 10,000 dendrobium blooms around the grounds, and spring brings orchid events too. Adults 2,200 yen including the boat.',
    'ビオスの丘', ['ビオスの丘', 'BIOS no Oka', 'ビオスの丘 ラン', 'Bios Hill Okinawa']),
  s('Yohena Hydrangea Garden', 'よへなあじさい園', 'Hydrangea (Ajisai)', 6, ['park', 'mountain'], 'Late May - June', 'Izumi, Motobu, Kunigami District, Okinawa',
    'Hydrangeas cover the slopes of this private garden in Izumi, in the hills inland from Motobu. It opens for the season in early May, the flowers are usually at their best from late May and last until the end of June, and weekdays are quieter than the crowded weekends. Adults 500 yen.',
    'よへなあじさい園', ['よへなあじさい園', 'Yohena hydrangea', '本部 あじさい', 'Yohena Ajisai']),
  s('Shuri Sagaribana Avenue', '首里崎山町 サガリバナ', 'Sagaribana', 7, ['street'], 'June - August', 'Sakiyama-cho, Shuri, Naha, Okinawa',
    'About 30 sagaribana trees line some 150 m of Baba-dori in Shuri Sakiyama-cho. Their powder-puff flowers open after dark and drop by morning, so this is an evening walk, and the street is lit up in season. Free.',
    '首里崎山町', ['サガリバナ 首里', 'Sagaribana Shuri', '首里 崎山', 'Barringtonia racemosa Okinawa'], 'About 10 min walk from Shuri Station (Yui Rail)'),
  s('Okinawa Comprehensive Athletic Park Deigo', '沖縄県総合運動公園 デイゴ', 'Deigo (Coral Tree)', 4, ['park'], 'Mid April - Early May', 'Okinawa City, Okinawa',
    'The deigo, Okinawa\'s prefectural flower, comes into bright-red bloom across this large sports park in Okinawa City in spring, and the fallen flowers turn the lawns into a red carpet that draws photographers.',
    '沖縄県総合運動公園', ['沖縄県総合運動公園', 'Okinawa Comprehensive Athletic Park', 'デイゴ 沖縄', 'Erythrina variegata Okinawa']),
  // ---- outer islands ----
  s('Iriomote Sagaribana', '西表島 サガリバナ', 'Sagaribana', 7, ['river'], 'Late June - Mid July', 'Iriomote, Taketomi, Yaeyama District, Okinawa',
    'Sagaribana flower at night along Iriomote\'s mangrove rivers and drop into the water by dawn, so the usual way to see them is an early-morning canoe or kayak tour, often around 12,000 yen per person. Going into the dark forest alone is not advised.',
    '西表島', ['西表島 サガリバナ', 'Iriomote sagaribana', 'Iriomote mangrove', 'Sagaribana Iriomote']),
  s('Taketomi Island Deigo and Bougainvillea', '竹富島 デイゴ並木', 'Deigo (Coral Tree)', 4, ['street', 'countryside'], 'March - May', 'Taketomi, Yaeyama District, Okinawa',
    'The road from Taketomi\'s port to its red-tiled village is a deigo avenue listed among Okinawa\'s top 100 flower spots, red in spring. Bougainvillea spills over the village\'s coral-stone walls all year and is at its showiest around February.',
    '竹富島', ['竹富島 デイゴ', '竹富島 ブーゲンビリア', 'Taketomi bougainvillea', 'Taketomi Island village']),
  s('Miyakojima Tropical Botanical Garden', '宮古島市熱帯植物園', 'Deigo (Coral Tree)', 4, ['park'], 'April - May', 'Miyakojima, Okinawa',
    'A botanical garden about 10 minutes by car from Miyako Airport, whose 400 m deigo avenue becomes a tunnel of red flowers in spring. Bougainvillea and hibiscus flower here all year. Free.',
    '宮古島市熱帯植物園', ['宮古島市熱帯植物園', 'Miyako tropical botanical garden', '宮古島 デイゴ', 'Miyakojima botanical garden']),
  s('Cape Mikanzaki Lilies', '御神崎 テッポウユリ', 'Lily (Yuri)', 4, ['countryside'], 'Late March - April', 'Sakieda, Ishigaki, Okinawa',
    'Wild Easter lilies cover the headland at Cape Mikanzaki on Ishigaki in spring, usually from late March into April, above the cliffs and the white lighthouse. The cape is windy and the path up to the lighthouse has steep steps.',
    '御神崎', ['御神崎', 'Cape Ugan Ishigaki', 'Mikanzaki lily', '御神崎 灯台']),
];
