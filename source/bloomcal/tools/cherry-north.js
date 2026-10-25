// Cherry blossom spots in northern Japan (Hokkaido and Tohoku), researched 2026-10-15 from Jorudan,
// Weathernews, Rurubu, tabi-mag, nippon.com and city/prefecture pages. Photo-first: each has free photos.
const CB = 'Cherry Blossom (Sakura)';
const s = (name, jp, month, region, type, peak, address, desc, q, cq, station) =>
  ({ name, jp, flower: CB, month, region, type, peak, address, desc, q, cq, station: station || '' });
module.exports = [
  // ---- Hokkaido
  s('Maruyama Park (Sapporo)', '円山公園 札幌', 5, 'Hokkaido', ['park'], 'Late April - Early May', 'Miyagaoka, Chuo Ward, Sapporo, Hokkaido',
    'About 120 cherry trees, mostly Ezo mountain cherry and somei-yoshino, in Sapporo\'s favourite hanami park at the foot of Mount Maruyama, a short walk from Hokkaido Shrine.', '円山公園 札幌', ['Maruyama Park Sapporo cherry', 'SAKURAKO - Maruyama Park', '円山公園 札幌 桜'], '5 min walk from Maruyama-koen Station (Tozai Line)'),
  s('Hokkaido Shrine', '北海道神宮', 5, 'Hokkaido', ['shrine'], 'Late April - Early May', '474 Miyagaoka, Chuo Ward, Sapporo, Hokkaido',
    'About 1,000 cherry trees, Ezo mountain cherry, somei-yoshino and double-flowered kinds, in the forested grounds of Hokkaido\'s main shrine, next to Maruyama Park.', '北海道神宮', ['北海道神宮 桜', 'Hokkaido Shrine cherry', 'SAKURAKO - The Hokkaido Shrine'], '15 min walk from Maruyama-koen Station (Tozai Line)'),
  // ---- Aomori
  s('Ashino Park', '芦野公園', 4, 'Northern Japan', ['park'], 'Mid - Late April', 'Kanagi-machi, Goshogawara, Aomori',
    'About 1,500 cherry trees around a lake in Kanagi, home town of the writer Osamu Dazai. The little Tsugaru Railway runs right through a tunnel of blossom, and the trees are lit up during the Kanagi cherry festival.', '芦野公園 五所川原', ['Cherry in bloom in Ashino Park', '芦野公園 桜'], 'Next to Ashinokoen Station (Tsugaru Railway)'),
  s('Towada Kanchogai Street', '十和田市官庁街通り', 4, 'Northern Japan', ['street'], 'Mid April - Early May', 'Nishi-nibancho, Towada, Aomori',
    'About 156 cherry trees and 160 or so pines line a 1.1 km avenue through central Towada, one of Japan\'s top 100 roads. During the spring festival the trees are lit up and horseback archery is held under the blossom.', '十和田市 官庁街通り', ['官庁街通り 桜', '十和田市 官庁街通り']),
  // ---- Iwate
  s('Ishiwarizakura', '石割桜', 4, 'Northern Japan', ['street'], 'Mid April', '2-9 Uchimaru, Morioka, Iwate',
    'An edo-higan cherry some 350 years old that has grown out of a split in a huge granite boulder in front of the Morioka District Court, a national natural monument since 1923. It can be seen from the pavement at any time.', '盛岡地方裁判所', ['Ishiwari Zakura', '石割桜'], '20 min walk from Morioka Station'),
  s('Morioka Castle Ruins Park', '盛岡城跡公園', 4, 'Northern Japan', ['castle', 'park'], 'Mid - Late April', '1-37 Uchimaru, Morioka, Iwate',
    'About 250 cherry trees of several kinds above the massive granite walls of Morioka Castle in the middle of the city; the trees are lit up in the evening in season.', '盛岡城跡公園', ['Cherry blossoms in Morioka Castle Park', '盛岡城跡公園 桜'], '15 min walk from Morioka Station'),
  s('Takamatsu Park (Morioka)', '高松公園 高松の池', 4, 'Northern Japan', ['park'], 'Mid April - Early May', 'Takamatsu, Morioka, Iwate',
    'More than 1,000 cherry trees around Takamatsu Pond, with Mount Iwate behind, one of Japan\'s top 100 cherry spots.', '高松の池 盛岡', ['高松公園 盛岡 桜', 'Takamatsunoike']),
  // ---- Miyagi
  s('Nishi Park (Sendai)', '西公園', 4, 'Northern Japan', ['park'], 'Mid April', 'Sakuragaoka-koen, Aoba Ward, Sendai, Miyagi',
    'About 350 cherry trees, most of them double red weeping cherries, in the oldest park in Sendai, by the Hirose River.', '西公園 仙台', ['West Park (Sendai) cherry', 'Cherry blossoms in Nishi Park'], 'Next to Omachi-nishi-koen Station (Tozai Line)'),
  s('Tsutsujigaoka Park', '榴岡公園', 4, 'Northern Japan', ['park'], 'Late March - Mid April', 'Gorin, Miyagino Ward, Sendai, Miyagi',
    'About 350 cherry trees, many of them double red weeping cherries spread in Sendai by its first mayor in the Meiji era. A favourite picnic spot near Sendai Station.', '榴岡公園', ['Cherry blossoms in the Tsutsujigaoka Park', '榴岡公園 桜'], '5 min walk from Tsutsujigaoka Station (JR Senseki Line)'),
  s('Shiroishi River Hitome Senbonzakura', '白石川堤一目千本桜', 4, 'Northern Japan', ['river'], 'Early - Mid April', 'Ogawara, Shibata District, Miyagi',
    'About 1,200 cherry trees, planted in 1923 and 1927, line 8 km of the Shiroishi River from Ogawara to Funaoka, a "thousand cherries at a glance", with the snowy Zao mountains behind. One of Japan\'s top 100 cherry spots.', '白石川 大河原', ['白石川堤一目千本桜', 'Mount Zaō and Sakura'], 'Short walk from Ogawara Station (JR Tohoku Line)'),
  // ---- Yamagata
  s('Kajo Park (Yamagata Castle)', '霞城公園', 4, 'Northern Japan', ['castle', 'park'], 'Early - Mid April', 'Kajomachi, Yamagata',
    'About 1,500 cherry trees, mostly somei-yoshino, on the site of Yamagata Castle, around its moats and rebuilt gate; the trees are lit up in the evening.', '霞城公園 山形', ['霞城公園（山形城趾）の桜', '霞城公園 桜'], '10 min walk from Yamagata Station'),
  s('Eboshiyama Park', '烏帽子山公園', 4, 'Northern Japan', ['park', 'mountain'], 'Mid April', 'Akayu, Nanyo, Yamagata',
    'Cherry trees of some 25 kinds, including old edo-higan, on a small hill above the Akayu hot springs, one of Japan\'s top 100 cherry spots.', '烏帽子山公園', ['Eboshiyama-koen Sakura', '烏帽子山公園の桜と赤湯温泉街']),
  s('Kubo-zakura (Isazawa)', '伊佐沢の久保桜', 4, 'Northern Japan', ['countryside'], 'Mid - Late April', '2027 Kami-Isazawa, Nagai, Yamagata',
    'An edo-higan thought to be about 1,200 years old, among the largest in Tohoku, with branches spreading some 25 m, a natural monument. Also called "Otama-zakura" after a local legend.', '伊佐沢 長井市', ['伊佐沢の久保桜', 'Kubo-zakura']),
  s('Tsuruoka Park', '鶴岡公園', 4, 'Northern Japan', ['castle', 'park'], 'Early - Mid April', 'Babacho, Tsuruoka, Yamagata',
    'About 700 cherry trees on the site of Tsurugaoka Castle, seat of the Sakai lords of Shonai, around its moats and stone walls; lanterns light the trees in the evening. Free.', '鶴岡公園', ['Cherry blossoms in Tsuruoka Park', '鶴岡公園 桜']),
  // ---- Fukushima
  s('Nicchu Line Weeping Cherries', '日中線しだれ桜並木', 4, 'Northern Japan', ['street'], 'Mid April', 'Kitakata, Fukushima',
    'About 1,000 weeping cherries line a 3 km cycling path along the old Nicchu railway line, from near Kitakata Station into the countryside. The Kitakata cherry festival brings evening light-ups; the further from the station, the quieter.', '日中線記念自転車歩行者道', ['日中線のしだれ桜'], 'Starts near Kitakata Station (JR Ban\'etsu West Line)'),
  s('Kannonji River', '観音寺川の桜並木', 4, 'Northern Japan', ['river'], 'Late April - Early May', 'Kawageta, Inawashiro, Fukushima',
    'About 200 cherry trees, somei-yoshino, edo-higan and weeping cherries, line both banks of a small river for about 1 km near Lake Inawashiro.', '観音寺川 猪苗代', ['観音寺川の桜'], 'Near Kawageta Station (JR Ban\'etsu West Line)'),
  s('Komine Castle (Shirakawa)', '白河小峰城', 4, 'Northern Japan', ['castle'], 'Mid - Late April', '1-73 Kakunai, Shirakawa, Fukushima',
    'About 180 cherry trees around the rebuilt three-storey turret and stone walls of Komine Castle, right by Shirakawa Station.', '小峰城', ['Komine castle sakura', '小峰城 桜'], 'Short walk from Shirakawa Station (JR Tohoku Line)'),
];
