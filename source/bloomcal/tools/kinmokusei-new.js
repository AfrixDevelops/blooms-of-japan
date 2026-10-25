// Kinmokusei (fragrant olive) spots and four Chiba additions, added 2026-10-25. Facts are from the Agency for
// Cultural Affairs heritage database (the five national natural monuments), the spots' own or city pages, and
// Time Out Tokyo; anything unconfirmed was left out. This file is the draft; the rows live in the source data.
// Kinmokusei flowers for about a week, usually from late September into early October.
const K = 'Fragrant Olive (Kinmokusei)';
const s = (name, jp, flower, month, region, type, peak, address, desc, q, cq, station) =>
  ({ name, jp, flower, month, region, type, peak, address, desc, q, cq, station: station || '' });
const k = (name, jp, month, region, type, peak, address, desc, q, cq, station) =>
  s(name, jp, K, month, region, type, peak, address, desc, q, cq, station);
module.exports = [
  // ---- the five national natural monuments ----
  k('Mishima Taisha Kinmokusei', '三嶋大社 金木犀', 9, 'Mt. Fuji & Central', ['shrine'], 'Early September - Early October', '2-1-5 Omiya-cho, Mishima, Shizuoka',
    'The shrine\'s great osmanthus is estimated at over 1,200 years old, the oldest and largest known, and has been a national natural monument since 1934. It is a pale-yellow usugi-mokusei, a close cousin of the orange kinmokusei, and it flowers twice: first in early to mid September, then again in late September to early October. Legend says its scent once carried 8 km. Free.',
    '三嶋大社', ['Mishima Taisha kinmokusei', '三嶋大社 金木犀', '三嶋大社のキンモクセイ', 'Mishima Taisha osmanthus', 'Mishima Taisha'], '15 min walk from Mishima Station (JR Tokaido Line and Shinkansen)'),
  k('Eimei-ji Temple Kinmokusei', '永明寺のキンモクセイ', 10, 'Kanto', ['temple'], 'Late September - Early October', 'Ora, Ora District, Gunma',
    'A national natural monument since 1937, this temple tree has a trunk about 3.4 m round at eye height that divides into two great limbs. It is one of only five kinmokusei in Japan with that status, and its orange flowers scent the temple grounds for about a week.',
    '永明寺 邑楽町', ['永明寺のキンモクセイ', '永明寺 キンモクセイ', 'Eimeiji kinmokusei', '邑楽町 永明寺'], 'By car or taxi; the nearest stations are on the Tobu Koizumi Line'),
  k('Kezo-ji Temple Kinmokusei', '華蔵寺のキンモクセイ', 10, 'Kanto', ['temple'], 'Late September - Early October', 'Kezoji-machi, Isesaki, Gunma',
    'A national natural monument since 1937: a big old kinmokusei with a trunk about 2.6 m round, splitting into three main limbs. The temple gives its name to the neighbourhood and to Kezoji Park, Isesaki\'s large park with gardens and an amusement area.',
    '華蔵寺 伊勢崎', ['華蔵寺のキンモクセイ', '華蔵寺 キンモクセイ', 'Kezoji kinmokusei', '華蔵寺 伊勢崎'], 'About 10 min by car from Isesaki IC (Kita-Kanto Expressway)'),
  k('Asobaru Kinmokusei', '麻生原のキンモクセイ', 10, 'Kyushu & Okinawa', ['countryside'], 'Late September - Early October', 'Asobaru, Kosa, Kamimashiki District, Kumamoto',
    'A national natural monument since 1934, standing beside a small Kannon hall among the farms of Kosa. Its single trunk, about 2.75 m round, splits into three limbs some 3.5 m up, and the scent of its flowers is said to carry 4 km. The tree is said to be over 770 years old.',
    '麻生原のキンモクセイ', ['麻生原のキンモクセイ', '麻生原 キンモクセイ', 'Asobaru kinmokusei', '甲佐町 キンモクセイ'], 'By car; about 40 min south of Kumamoto city'),
  k('Oshimori-ji Temple Kinmokusei', '王至森寺のキンモクセイ', 10, 'Western Japan', ['temple'], 'Late September - Early October', 'Iioka, Saijo, Ehime',
    'One of Japan\'s biggest kinmokusei, made a national natural monument in 1927. It divides into four trunks just above the ground and stands around 12 m tall; its age is not known. The old trunk is hollowing with age, but the tree still flowers each autumn.',
    '王至森寺', ['王至森寺のキンモクセイ', '王至森寺 キンモクセイ', '往至森寺', 'Oshimoriji kinmokusei'], 'About 15 min by bus from Iyo-Saijo Station (JR Yosan Line)'),
  // ---- other spots ----
  k('Komyo-ji Temple Kinmokusei (Mashiko)', '光明寺 金木犀 益子', 10, 'Kanto', ['temple'], 'Late September - Early October', '1146 Yamamoto, Mashiko, Haga District, Tochigi',
    'A temple in the pottery town of Mashiko whose kinmokusei, estimated at 200 years old, is a town natural monument; local tradition says parishioners gave it when the main hall was built. The temple is also known for a weeping cherry over 180 years old.',
    '光明寺 益子', ['益子 光明寺', '益子町 光明寺 金木犀', 'Mashiko Komyoji', '光明寺 しだれ桜 益子'], 'By car or taxi from Mashiko Station (Moka Railway)'),
  k('Hikarigaoka Park Kinmokusei', '光が丘公園 キンモクセイ', 10, 'Tokyo Area', ['park'], 'Late September - Early October', '4-1-1 Hikarigaoka, Nerima, Tokyo',
    'About 50 kinmokusei line a path of some 300 m along the south side of the park\'s bird sanctuary, and three tall old trees stand in Yurinoki Plaza, so the scent fills the walk for a week or so around the start of October. Free.',
    '光が丘公園', ['Hikarigaoka Park', '光が丘公園 キンモクセイ', '光が丘公園', 'Hikarigaoka Park Nerima'], '8 min walk from Hikarigaoka Station (Oedo Line)'),
  k('Jindai Botanical Gardens Osmanthus', '神代植物公園 モクセイ', 10, 'Tokyo Area', ['park'], 'Late September - Early October', '5-31-10 Jindaiji Motomachi, Chofu, Tokyo',
    'Tokyo\'s largest botanical garden grows all three kinds of osmanthus in several spots, including around the azalea garden: orange kinmokusei, white ginmokusei and pale-yellow usugi-mokusei, so you can compare their colours and scents side by side. Adults 500 yen; closed Mondays.',
    '神代植物公園', ['神代植物公園 キンモクセイ', 'Jindai Botanical Gardens', '神代植物公園', 'Jindai botanical garden autumn'], 'Bus from Chofu Station (Keio Line)'),
  k('Hibiya Park Kinmokusei', '日比谷公園 キンモクセイ', 10, 'Tokyo Area', ['park'], 'Late September - Early October', '1-6 Hibiyakoen, Chiyoda, Tokyo',
    'Kinmokusei grow throughout Tokyo\'s first Western-style park, opened in 1903, with a group near the Iwaidaimon gate on the Imperial Palace side; white ginmokusei flower alongside them. An easy stop between the palace and Ginza. Free.',
    '日比谷公園', ['日比谷公園 キンモクセイ', 'Hibiya Park', '日比谷公園', 'Hibiya Park autumn'], '2 min walk from Hibiya Station (Hibiya, Chiyoda and Mita lines)'),
  k('Kitanomaru Park Kinmokusei', '北の丸公園 キンモクセイ', 10, 'Tokyo Area', ['park'], 'Late September - Early October', '1-1 Kitanomaru-koen, Chiyoda, Tokyo',
    'The park on the northern grounds of old Edo Castle is planted with kinmokusei, and in October their scent drifts across the lawns along with flowering abelia. Free.',
    '北の丸公園', ['北の丸公園 キンモクセイ', 'Kitanomaru Park', '北の丸公園', 'Kitanomaru Park autumn'], '5 min walk from Kudanshita Station (Tozai, Hanzomon and Shinjuku lines)'),
  k('Okuma Garden Kinmokusei (Waseda)', '大隈庭園 キンモクセイ', 10, 'Tokyo Area', ['park'], 'Late September - Early October', '1-104 Totsukamachi, Shinjuku, Tokyo',
    'The garden of Okuma Shigenobu, founder of Waseda University, beside the main campus, has a large kinmokusei whose scent draws white-eyes and tits when it flowers. Open to the public on teaching days; free.',
    '大隈庭園', ['大隈庭園', 'Okuma Garden Waseda', 'Okuma Garden', '早稲田 大隈庭園'], 'About 5 min walk from Waseda Station (Tozai Line)'),
  k('Johoku Park Kinmokusei', '城北公園 キンモクセイ', 10, 'Mt. Fuji & Central', ['park'], 'Late September - Early October', '29 Oiwa-honcho, Aoi Ward, Shizuoka, Shizuoka',
    'A city park at the foot of Mount Shizuhata in Shizuoka, with kinmokusei planted through the grounds and along the Asabata road beside it, around a flower clock and a Japanese garden. The scent is strongest just as the flowers open. Free.',
    '城北公園 静岡', ['城北公園 静岡', 'Johoku Park Shizuoka', '城北公園 静岡市', '静岡 城北公園 花時計'], '12 min by Shizutetsu Justline bus from Shizuoka Station to Rinzaiji'),
  // ---- Chiba ----
  s('Shimizu Park', '清水公園', 'Plum Blossom (Ume)', 2, 'Tokyo Area', ['park'], 'Late February', '906 Shimizu, Noda, Chiba',
    'About 100 plum trees of some 20 kinds, many of them old, flower in the plum garden of the First Park area, with a plum festival from early February to early March. Free entry; some attractions are paid.',
    '清水公園', ['清水公園 梅', 'Shimizu Park Noda', '清水公園 野田', 'Shimizu Koen Noda plum'], '10 min walk from Shimizu-koen Station (Tobu Urban Park Line)'),
  s('Shimizu Park', '清水公園', 'Azalea (Tsutsuji)', 4, 'Tokyo Area', ['park'], 'Late April - Early May', '906 Shimizu, Noda, Chiba',
    'About 20,000 azaleas of around 100 kinds flower in late April and early May, when the park holds its azalea festival. It is also known for about 2,000 cherry trees of some 50 kinds in early April. Free entry; some attractions are paid.',
    '清水公園', ['清水公園 つつじ', 'Shimizu Park Noda azalea', '清水公園 野田', 'Shimizu Park Noda'], '10 min walk from Shimizu-koen Station (Tobu Urban Park Line)'),
  s('Shimizu Park', '清水公園', 'Autumn Foliage (Momiji)', 11, 'Tokyo Area', ['park'], 'Late November - Early December', '906 Shimizu, Noda, Chiba',
    'About 800 maples colour the Momiji-dani, a walking path through a small valley in the park, usually from late November into early December. Free entry; some attractions are paid.',
    '清水公園', ['清水公園 紅葉', 'Shimizu Park Noda autumn', '清水公園 もみじ谷', 'Shimizu Park Noda'], '10 min walk from Shimizu-koen Station (Tobu Urban Park Line)'),
  s('Nagareyama Open Garden', 'ながれやまオープンガーデン', 'Roses', 5, 'Tokyo Area', ['street'], 'Mid May', 'Nagareyama, Chiba',
    'For three days each May, private gardens across Nagareyama open their gates to visitors; 2026 was the 19th year, with 15 gardens taking part. It falls in rose season, and many of the gardens are planted with roses. Free, with no booking needed; the city website publishes a map of the gardens.',
    '流山 オープンガーデン', ['流山 オープンガーデン', 'Nagareyama garden', '流山市 バラ', 'Nagareyama Chiba'], 'Gardens are spread across the city, from Minami-Nagareyama to Nagareyama-otakanomori stations'),
  s('Hondo-ji Temple', '本土寺', 'Hydrangea (Ajisai)', 6, 'Tokyo Area', ['temple'], 'Mid - Late June', '63 Hiraga, Matsudo, Chiba',
    'Known as the hydrangea temple, this Nichiren temple fills its grounds with about 50,000 hydrangeas of more than ten kinds in June, after about 5,000 irises in early June; its maples colour in late November. Adults 500 yen in the paid seasons.',
    '本土寺', ['本土寺 あじさい', 'Hondoji Matsudo', '本土寺', 'Hondo-ji hydrangea'], '15 min walk from Kita-Kogane Station (JR Joban Line)'),
];
