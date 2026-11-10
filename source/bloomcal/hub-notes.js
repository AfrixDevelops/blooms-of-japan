// Intros for the flower pages (/flowers/<key>) and month pages (/when/<month>), shown above the
// page's list of spots. Same rules as spot-notes.js: checked facts only, [[slug]] or [[slug|text]]
// links to spots, which the build checks. A page without an intro still works; it just shows the list.
module.exports = {
flowers: {

'wisteria': `
<p>Wisteria is the flower that follows the cherry blossom. It usually starts in Kyushu and around Tokyo and Osaka in mid to late April and peaks from late April into early May, across Golden Week, then moves north. The last trellises open in Hokkaido in late May and early June, at [[maeda-forest-park]] in Sapporo.</p>
<p>The great spots are not wild hillsides but trellises, some of them very old. A single vine at [[ashikaga-flower-park]] covers a trellis the size of a small hall, and [[kawachi-wisteria-garden]] in Kitakyushu has two long tunnels of wisteria in many colours. In Tokyo, [[kameido-tenjin-shrine]] grows its wisteria over a pond with a red arched bridge and the Skytree behind it.</p>
<p>Wisteria is quick: a trellis is at its best for about a week, and the scent is strongest on a warm afternoon. Some of the famous gardens, Kawachi among them, need tickets bought in advance in season, so check before you go. For a month-by-month plan, see our <a href="/guides/wisteria-spots">guide to the best wisteria spots</a>.</p>
`,

'cherry-blossom': `
<p>Japan's cherry season lasts about five months, not two weeks, because the blossom moves up the country. It starts in Okinawa in January with the deep pink kanhizakura at spots like [[nago-central-park]], reaches the early Kawazu cherries of the Izu Peninsula in February, and arrives in Tokyo, Kyoto and Osaka in late March. Tohoku usually flowers in mid to late April, and Hokkaido in early May, at [[goryokaku-park]] and [[matsumae-park]].</p>
<p>Each place is at its best for only about a week, from first full bloom until the petals fall. That's why we list more than 90 spots: if you miss the peak in one city, there's usually another a few hours north. A few trees even flower in autumn, like the shikizakura of [[obara-shikizakura]], which bloom among the November maples.</p>
<p>For timing, read our <a href="/guides/cherry-blossom-season">cherry blossom season guide</a> and the <a href="/guides/cherry-blossom-forecast">forecast guide</a>. If you want to avoid the crowds, try our <a href="/guides/quiet-cherry-blossom-spots">quieter cherry blossom spots</a>.</p>
`,

'plum-blossom': `
<p>Plum blossom is the first big flower of the year, and the one Japan admired before the cherry. The earliest trees open in January, and most groves are at their best from mid February to early March. In the north and the mountains, plums flower in March, and in Sapporo they come with the cherries in late April and May, at [[hiraoka-park-plum-grove]].</p>
<p>Plums last longer than cherries, often three or four weeks, because the early and late varieties flower one after another. Many of the best spots are Tenmangu shrines, which honour the scholar Sugawara no Michizane, who loved plums: [[kitano-tenmangu-shrine]] in Kyoto, [[dazaifu-tenmangu-shrine]] near Fukuoka and [[yushima-tenjin]] in Tokyo. In Mito, [[kairakuen-garden]] is one of Japan's three great gardens.</p>
<p>The scent is part of it, so go on a still, sunny day. Read our <a href="/guides/plum-blossom-season">plum blossom season guide</a>, or see the <a href="/guides/plum-blossoms-near-tokyo">best plum spots near Tokyo</a>.</p>
`,

'autumn-leaves': `
<p>Autumn colour runs the opposite way to the cherry blossom: it starts in the north and in the mountains and moves south and downhill. The first leaves turn on [[mount-asahidake]] in Hokkaido in mid to late September. Tohoku and the Japanese Alps follow in October, at places like [[oirase-gorge]] and [[naruko-gorge]], and Tokyo and Kyoto usually peak from mid November into early December.</p>
<p>The colour comes mostly from Japanese maples, which turn red, with ginkgo and other trees adding yellow and orange. Temples are the classic setting: in Kyoto, [[tofuku-ji-temple]] and [[eikando-temple]] draw huge crowds, and in Tokyo, [[rikugien-garden]] and [[mount-takao]] are easy trips. Many gardens light up their maples in the evenings.</p>
<p>A cold snap brings the best colour, so the timing changes each year. See our <a href="/guides/autumn-leaves-season">autumn leaves season guide</a> and <a href="/guides/autumn-leaves-tokyo">where to see autumn leaves in Tokyo</a>.</p>
`,

'ginkgo': `
<p>Ginkgo trees turn bright yellow in late autumn. In Sapporo, the avenue at [[hokkaido-university-ginkgo-avenue]] turns in late October. In Tokyo and Osaka the peak is usually from mid November to early December, and the last trees, like [[midosuji-ginkgo-avenue]] in Osaka, hold on into December.</p>
<p>The ginkgo is Tokyo's tree: its leaf is the city's symbol, and the city plants it along many of its avenues. The most famous is [[meiji-jingu-gaien-ginkgo-avenue]], with two rows of trees trimmed into cones. Some of the oldest trees in Japan are ginkgos too, at temples and shrines like [[zenpuku-ji-temple-upside-down-ginkgo]] and [[hida-kokubun-ji-ginkgo]].</p>
<p>The colour lasts about two weeks, and the fallen leaves turn the ground gold for a few days more. Read our <a href="/guides/ginkgo-trees-japan">guide to ginkgo trees in Japan</a>.</p>
`,

'roses': `
<p>Japan's rose gardens flower twice. The main show is from mid May to early June, and many gardens hold a rose festival then. A smaller second flowering comes in October and early November, when the colours are often deeper. In Hokkaido and the cooler north, the spring roses are later, from late June into July, as at [[iwamizawa-park-rose-garden]].</p>
<p>The gardens range from the big collections of [[keisei-rose-garden]] near Tokyo and [[fukuyama-rose-park]], in a city that calls itself the city of roses, to [[kyu-furukawa-gardens]], where a Western-style rose terrace sits above a Japanese garden. In Yokohama, [[yamashita-park]] and [[minato-no-mieru-oka-park]] have roses by the harbour.</p>
<p>Roses are at their best in the morning, before the heat and the crowds. Most gardens post bloom updates on their own sites, so check before you go.</p>
`,

'tulips': `
<p>Tulip season in Japan is mostly April. The first fields open in early April in the warmer south and around Tokyo, and the big festivals run from mid April into Golden Week. In Hokkaido, tulips flower in May, at [[kamiyubetsu-tulip-park]] and [[takino-suzuran-hillside-park]].</p>
<p>The tulip country is the Japan Sea coast: Toyama grows more tulip bulbs than anywhere else in Japan, and [[tonami-tulip-park]] holds one of the country's biggest tulip fairs. Niigata grows many too, at [[tainai-tulip-festival]] and [[echigo-hillside-park]]. Near Tokyo, [[showa-kinen-park-april]] and [[sakura-furusato-hiroba]], with its Dutch windmill, are easy day trips.</p>
<p>Tulips open in the sun and close on cloudy days, so a bright afternoon shows them best. Some fields plant tulips to flower with the cherry blossoms in early April, like [[asahi-funakawa-spring-quartet]] in Toyama.</p>
`,

'red-spider-lily': `
<p>Red spider lilies, higanbana in Japanese, flower around the autumn equinox, usually from mid to late September. They come up fast: the stalks appear with no leaves, and the flowers open within days. A hot summer can push them back into early October, so check the bloom reports first.</p>
<p>They grow along rice field banks, riversides and temple paths, where people have long planted them; their bulbs are poisonous, which is said to keep animals away. The biggest show is [[kinchakuda-manjushage-park]] near Tokyo, with millions in the woods by the Koma River. In the countryside, they line terraced fields like [[inabuchi-terraced-rice-fields]] in Asuka just as the rice turns gold.</p>
<p>The flowers last about a week, then the leaves grow through the winter. Read our <a href="/guides/red-spider-lily-season">red spider lily season guide</a>.</p>
`,

'iris': `
<p>Japanese irises, hanashobu, flower in June, during the rainy season. The first gardens open in late May in Kyushu, at [[kabashima-iris-garden]] in Yanagawa, and most gardens around Tokyo and Kyoto peak in mid June. In the north, irises are at their best from late June into early July.</p>
<p>Iris gardens are usually laid out in wet fields with wooden walkways over the water, so you walk among the flowers. Tokyo has some of the best: [[meiji-jingu-inner-garden]], where the irises were planted for Empress Shoken, and [[horikiri-iris-garden]], which Hiroshige painted. Many towns hold an iris festival in June.</p>
<p>Irises look their best in light rain or on an overcast day, so the rainy season works in your favour. Some gardens open early in the morning in season.</p>
`,

'hydrangea': `
<p>Hydrangeas are the flower of the rainy season. Around Tokyo, Kyoto and Osaka they usually peak in mid to late June. In Okinawa and Kyushu they start in May, and in the north and the mountains they last into July, as at [[michinoku-hydrangea-garden]] in Iwate.</p>
<p>Temples are the classic setting. In Kamakura, [[meigetsu-in-temple]] and [[hasedera-temple]] are so popular that there are queues on weekends, and near Kyoto, [[mimuroto-ji-temple]] has tens of thousands of plants. One of the best ways to see them is from the train: the [[hakone-tozan-railway]] runs past hydrangeas on its climb into the mountains.</p>
<p>The flowers last for weeks and look good in the rain, so a wet day is not a wasted one. See our <a href="/guides/hydrangea-spots">guide to hydrangea spots</a>, or [[takahata-fudo]] in Hino.</p>
`,

'mixed-gardens': `
<p>These are the gardens and flower parks that have something in flower for most of the year, rather than one big show. Botanical gardens like [[kyoto-botanical-gardens]] and [[makino-botanical-garden]] in Kochi change through the seasons, and flower parks like [[florante-miyazaki]] and [[hokuso-hananooka-park]] plant new beds every few months.</p>
<p>They're worth knowing when the big seasons are over, or when the weather is against you: many have greenhouses, and a few, like [[tropical-dream-center]] in Okinawa and [[southeast-botanical-gardens]], grow tropical plants all year. In Hokkaido, [[shikisai-no-oka]] and [[zerubu-hill]] plant their hills in stripes of colour through the summer.</p>
<p>Check each garden's own site for what's in flower before you go, as the planting changes year to year.</p>
`,

'rapeseed': `
<p>Rapeseed, nanohana in Japanese, is one of the longest seasons of all. In southern Kyushu it flowers from January, at [[lake-ikeda-rapeseed]] below Mount Kaimon. Around Tokyo and the Izu Peninsula it's out from February to April, often with the cherry blossoms, and in Hokkaido and northern Aomori it flowers in May.</p>
<p>The best views put the yellow next to something else. At [[sakurazutsumi-park]] and [[asahi-funakawa-spring-quartet]], rapeseed runs under rows of pink cherries. At [[azumayama-park]] in Kanagawa, it covers a hilltop with Mount Fuji behind. And the farm fields of [[takikawa-rapeseed-fields]] in Hokkaido turn whole valleys yellow in late May.</p>
<p>Many farm fields are private land, so stay on the roads and paths.</p>
`,

'kochia': `
<p>Kochia are round, bushy plants that turn from green to red in autumn. They're green in summer, start to blush in late September, and are usually reddest in mid October. Highland fields turn first, from late September, and lowland parks follow through October. After the red fades they turn a golden brown.</p>
<p>The most famous is the hill at [[hitachi-seaside-park-october]], covered with tens of thousands of kochia. Near Tokyo, [[tokyo-german-village]] and [[mother-farm-october]] have big fields too, and [[biwako-hakodateyama]] puts them on a slope above Lake Biwa.</p>
<p>The colour is best for about two weeks, and it changes fast, so check the park's updates. Read our <a href="/guides/kochia-season">kochia season guide</a>.</p>
`,

'lavender': `
<p>Japan's lavender country is Hokkaido. Around Furano and Biei the fields usually flower from late June to late July, with the peak in mid July. [[farm-tomita]] made Furano's lavender famous, and the hills of [[hinode-park-lavender-garden]] and [[hokuseiyama-lavender-park]] are nearby.</p>
<p>On Honshu, lavender flowers earlier, in June, at gardens like [[lavender-park-taka]] in Hyogo and [[kobe-nunobiki-herb-gardens]] above Kobe. By Lake Kawaguchi, [[oishi-park]] has lavender with Mount Fuji behind in late June and July. In Sapporo, the [[hill-of-the-buddha]] surrounds a great stone Buddha with a hill of lavender.</p>
<p>Lavender is best on a sunny morning, before the heat. July is peak season in Furano, so book rooms early.</p>
`,

'kinmokusei': `
<p>Kinmokusei, fragrant olive, is the scent of autumn in Japan. Its tiny orange flowers usually open in late September or early October, and for about a week whole streets smell sweet. In some years the trees flower a second time, a week or two later.</p>
<p>It's a common garden and street tree rather than a sight in itself, so the spots we list are places with many old trees together: temples like [[eimei-ji-temple-kinmokusei]], shrines like [[mishima-taisha-kinmokusei]], and parks in Tokyo such as [[hibiya-park-kinmokusei]] and [[kitanomaru-park-kinmokusei]].</p>
<p>You'll usually smell it before you see it. The flowers fall quickly after rain, and they make a thin orange carpet under the trees.</p>
`,

'nemophila': `
<p>Nemophila, baby blue eyes, flower in spring, usually from mid April to early May. The most famous display is Miharashi Hill at [[hitachi-seaside-park]] in Ibaraki, where millions of flowers turn the whole hill sky blue, at its best around late April.</p>
<p>Other parks plant them by the sea or with a view: [[uminonakamichi-seaside-park-april]] and [[nokonoshima-island-park]] in Fukuoka, [[oishi-park-april]] by Lake Kawaguchi, and [[mother-farm]] in Chiba. On Mount Fuji, [[grinpa]] is high enough that its nemophila last into late May, and in Hokkaido, [[shikisai-no-oka-june]] has them in June.</p>
<p>Nemophila look bluest under a clear sky. Golden Week is very busy, so go early in the day or just before the holiday.</p>
`,

'cosmos': `
<p>Cosmos are Japan's autumn field flower. The first fields open in early September in the highlands and the north, at [[kurohime-kogen-cosmos-garden]] and [[matsuyama-gohonmaru-park-cosmos]], and most lowland fields are at their best in October, like [[showa-kinen-park]] near Tokyo and [[hannya-ji-temple]] in Nara. In Okinawa, cosmos flower in winter, in January.</p>
<p>The flowers are planted in huge fields, often millions at once. [[kiyozumi-cosmos-garden]] in Hyogo and [[konosu-cosmos-fields]] in Saitama are among the biggest.</p>
<p>A field lasts two to three weeks, and the colour is best on a sunny day with a little breeze. Typhoons can flatten the plants, so check the updates after a storm.</p>
`,

'camellia': `
<p>Camellias, tsubaki, flower through the cold months, from December to April depending on the kind. The wild yabu-tsubaki of the coasts and islands usually peaks in February and March, and garden camellias open in turn through the winter.</p>
<p>The islands south of Tokyo are camellia country: [[izu-oshima-camellia-garden]] holds a camellia festival each winter, and [[toshima-island-camellias]] grows camellias for oil. On the coast, [[cape-ashizuri-camellia-tunnel]] in Kochi has a path through wild trees, and [[tsubakiyama-forest-park]] in Miyazaki grows tens of thousands.</p>
<p>Camellias drop their flowers whole, so the ground under the trees is often as red as the branches. Read our <a href="/guides/winter-flowers-japan">guide to winter flowers in Japan</a>.</p>
`,

'azalea': `
<p>Azaleas, tsutsuji, flower in spring and early summer. Gardens around Tokyo usually peak in late April and early May: [[nezu-shrine]] in Tokyo and [[tsutsujigaoka-park]] in Gunma are among the best. Wild mountain azaleas follow in May, as at [[mount-katsuragi]] in Nara.</p>
<p>In Kyushu, the small wild miyama-kirishima covers the volcanic mountains from late May into June, at [[ebino-kogen-tsutsuji-ga-oka]] and in the [[kuju-mountains]]. At [[mifuneyama-rakuen]] in Saga, a whole valley of clipped azaleas flowers in late April.</p>
<p>Clipped garden azaleas are at their best for about two weeks. Mountain azaleas depend on the altitude, so check the reports before you climb.</p>
`,

'sunflowers': `
<p>Sunflowers mark the height of summer, usually from mid July to late August. The biggest fields are in Hokkaido, where [[hokuryu-sunflower-village]] plants more than a million on a hillside. On Honshu, [[akeno-sunflower-field]] has the mountains of Yamanashi behind it, and near Tokyo, [[zama-sunflower-fields]] flower in early August.</p>
<p>Many fields are planted in batches so the season lasts longer, and some hold a sunflower festival with paths through the flowers. In Okinawa, sunflowers flower in winter, at [[kitanakagusuku-sunflowers]] in February.</p>
<p>Go in the morning, when the flowers face the sun in the east and before the worst heat. Bring water and a hat; there's little shade in a sunflower field.</p>
`,

'lotus': `
<p>Lotus flowers open in July and August, in ponds, moats and temple gardens. Each flower opens early in the morning and closes by the middle of the day, so the best time to visit is between about 7 and 9 am. Many lotus gardens open early in the season for that reason.</p>
<p>Some of Japan's lotuses grew from ancient seeds: the Oga lotus at [[chiba-park]] sprouted from seeds about 2,000 years old, and the Gyoda lotus at [[kodaihasu-no-sato]] from seeds dug up in 1971. In Tokyo, [[shinobazu-pond]] in Ueno is covered in leaves all summer, and in Kyoto, [[hokongo-in-temple]] is known as the lotus temple.</p>
<p>On hot days the flowers close even earlier, so plan your morning around them.</p>
`,

'shibazakura': `
<p>Moss phlox, shibazakura, carpets hillsides in pink, white and purple in spring. The main season is from mid April to mid May. The Fuji Shibazakura Festival at [[fuji-motosuko-resort]] puts the flowers right under Mount Fuji, and [[hitsujiyama-park]] in Chichibu is the easy day trip from Tokyo.</p>
<p>In Hokkaido, the season is later, from mid May into early June, and the hills are some of the largest in Japan: [[higashimokoto-shibazakura-park]] and [[takinoue-park]] each cover about 10 hectares. The mountain fields of [[chausuyama-highlands]] in Nagano flower in May too.</p>
<p>The plants are low, so the best views are from above. Most parks charge entry only while the flowers are out.</p>
`,

'lilies': `
<p>Lilies flower from spring into summer, depending on the kind and the place. The white trumpet lilies of Okinawa come first, in late April, at [[iejima-lily-field-park]] on Ie Island. Garden lilies follow in June and July, in lily parks like [[yuri-no-sato-park]] and [[sasayama-tamamizu-yuri-en]].</p>
<p>The cool highlands have the biggest summer displays: [[hunter-mountain-yuri-park]] in Tochigi covers a ski slope with lilies, reached by lift, and [[yurigahara-park]] in Sapporo has a garden of lilies from around the world.</p>
<p>Lilies have a strong scent, best on a warm, still day. Most lily parks open only during the flowering, so check the dates.</p>
`,

'peony': `
<p>Japan has two peony seasons. The main one is late April and early May, when the tree peonies, botan, open in temple gardens like [[hase-dera]] in Nara and parks like [[higashimatsuyama-peony-garden]]. In the north, [[sukagawa-peony-garden]] in Fukushima flowers in May.</p>
<p>The other is winter. In January, gardens like [[ueno-toshogu-peony-garden]] and [[tsurugaoka-hachimangu-winter-peonies]] grow peonies under little straw shelters, flowering in the cold. On Daikonshima, [[yuushien-garden]] fills a pond with peony blooms around Golden Week.</p>
<p>Each flower lasts only a few days, so a garden changes from week to week. Read our <a href="/guides/peony-season-japan">peony season guide</a>.</p>
`,

'chrysanthemum': `
<p>The chrysanthemum, kiku, is the flower of the imperial family and of autumn. Shows run from mid October to late November across Japan, with flowers trained over months into single huge blooms, cascades and bonsai shapes.</p>
<p>Some shows make kiku ningyo, life-size dolls dressed in living chrysanthemums: [[nihonmatsu-chrysanthemum-dolls]] in Fukushima and [[takefu-chrysanthemum-dolls]] in Fukui are the best known. In Tokyo, [[shinjuku-gyoen-november]] and [[meiji-jingu-chrysanthemum-show]] hold traditional shows, and [[kasama-inari-shrine-chrysanthemum-festival]] in Ibaraki is one of the oldest in Japan.</p>
<p>The shows overlap with the autumn leaves, so you can see both in a day. Read our <a href="/guides/chrysanthemum-shows-japan">guide to chrysanthemum shows</a>.</p>
`,

'narcissus': `
<p>Narcissus, suisen, flower on the coast in the middle of winter, from December to February. They grow on sea cliffs facing the Japan Sea and the Pacific, and their scent carries a long way on a calm day.</p>
<p>Japan's three big narcissus coasts are the Echizen coast in Fukui, at [[echizen-coast-narcissus]], the Boso Peninsula in Chiba, at [[edzuki-narcissus-road]], and Awaji Island, where [[nada-kuroiwa-narcissus-field]] covers a steep slope above the sea. Near Tokyo, [[jogashima-park]] in Miura has narcissus by the cliffs in January.</p>
<p>The flowers are at their best in January. Read our <a href="/guides/winter-flowers-japan">guide to winter flowers in Japan</a> for more.</p>
`,

'begonia': `
<p>Begonias are the flower for a rainy day, because most of the big displays are indoors. Greenhouses grow them all year, so this is one flower you can see in any season.</p>
<p>The most impressive is the begonia garden at [[nabana-no-sato]] in Mie, with hanging baskets filling a huge glasshouse, and [[matsue-vogel-park]] by Lake Shinji, where begonias and fuchsias hang from the roof. Botanical gardens hold begonia shows too, at [[kyoto-botanical-gardens-begonia-show]] and [[jindai-botanical-gardens-begonia-room]] in Tokyo.</p>
<p>Check opening hours before you go, as some greenhouses close earlier than the gardens around them.</p>
`,

'wintersweet': `
<p>Wintersweet, robai, flowers in the depth of winter, from late December to February. Its small, waxy yellow flowers look almost translucent in the sun, and they have one of the strongest scents of any winter flower.</p>
<p>The best known grove is [[hodosan-wintersweet-garden]] near the top of Mount Hodo in Chichibu, where the yellow trees look out over the mountains. [[robai-no-sato]] in Gunma and [[kyodo-no-mori-museum-wintersweet]] in Fuchu, Tokyo, are good too.</p>
<p>It's one of the few flowers in bloom in January, so it pairs well with an early plum grove or a winter onsen trip. Read our <a href="/guides/winter-flowers-japan">guide to winter flowers in Japan</a>.</p>
`,

'deigo': `
<p>Deigo, the Indian coral tree, is Okinawa's prefectural flower. Its bright red flowers open on bare branches in spring, usually from March to May, and the timing changes a lot from year to year. In some years the trees flower only lightly.</p>
<p>Look for it in parks and along streets across Okinawa: [[okinawa-comprehensive-athletic-park-deigo]] on the main island, [[miyakojima-tropical-botanical-garden]] on Miyako, and the road into the old village on [[taketomi-island-deigo-and-bougainvillea|Taketomi Island]].</p>
<p>An old Okinawan saying has it that a year when the deigo flowers well brings many typhoons.</p>
`,

'adonis': `
<p>Adonis, fukujuso, is one of the first wildflowers of the year. Its name means "happiness and long life", and its gold flowers come up through the last of the snow, usually in March and into April in the mountains.</p>
<p>The flowers open only in the sun and close on cloudy days, so pick a bright day and go around midday. The fields we list are in the hills of Nagano, at [[akanuta-adonis-fields]] near Matsumoto and [[nanaimai-kosaka-adonis]] near Nagano city, and at [[numanotaira-adonis]] in Kitakata, Fukushima.</p>
<p>The plants are small and grow on woodland floors and field edges, so stay on the paths.</p>
`,

'sagaribana': `
<p>Sagaribana, the powder-puff tree, flowers at night. Its white and pink flowers open after sunset in long hanging strings, give off a sweet scent through the night, and fall before morning. The season is June and July, in the subtropical south.</p>
<p>The famous place to see it is [[iriomote-sagaribana]], where trees grow along the mangrove rivers and boat tours set out before dawn to see the fallen flowers floating on the water. In Naha, [[shuri-sagaribana-avenue]] has a row of trees you can walk to in the evening.</p>
<p>Go at night or just before dawn; by mid morning the flowers have dropped.</p>
`,

},
months: {

'january': `
<p>January is the quietest month for flowers, but not an empty one. In Okinawa, the cherry season starts: the deep pink kanhizakura flower from mid January at [[nago-central-park]] and [[nakijin-castle-ruins-cherry-blossoms]]. On the mainland, the winter flowers are out on the coasts and in sheltered gardens.</p>
<p>Narcissus covers the sea cliffs at [[echizen-coast-narcissus]] and [[nada-kuroiwa-narcissus-field]], and wintersweet fills the air with scent at [[hodosan-wintersweet-garden]] in Chichibu. In southern Kyushu, rapeseed is already yellow at [[lake-ikeda-rapeseed]], and in Tokyo, [[ueno-toshogu-peony-garden]] shows winter peonies under straw shelters.</p>
<p>The first plum trees open late in the month in warm places like Atami. Read our <a href="/guides/winter-flowers-japan">guide to winter flowers in Japan</a>.</p>
`,

'february': `
<p>February is plum month. Most groves around Tokyo, Kyoto and Osaka are at their best from mid February into early March: [[kairakuen-garden]] in Mito, [[atami-plum-garden]], and the Tenmangu shrines, [[kitano-tenmangu-shrine]] in Kyoto and [[dazaifu-tenmangu-shrine]] near Fukuoka.</p>
<p>The first mainland cherries open too. The early Kawazu cherries flower along the [[kawazu-river]] on the Izu Peninsula from early or mid February, often with rapeseed underneath, and [[miura-kaigan-kawazu-cherries]] follow near Tokyo. On the islands, wild camellias are at their peak, at [[izu-oshima-camellia-garden]].</p>
<p>It's still cold, so the crowds are smaller than in spring. Read our <a href="/guides/plum-blossom-season">plum blossom season guide</a>.</p>
`,

'march': `
<p>March is when spring arrives. The plum groves finish in the first half of the month, the Kawazu cherries hold on in Izu, and the main cherry season starts: Tokyo usually opens in the third week, and Kyoto and Osaka around the end of the month, with the peak spilling into early April.</p>
<p>In Tokyo, the classic spots are [[ueno-park]], [[chidorigafuchi]] and the [[meguro-river]], and [[shinjuku-gyoen]] has early and late varieties for a longer season. In Kumamoto and Kagawa, [[kumamoto-castle]] and [[ritsurin-garden]] flower at the same time. In the mountains, adonis comes up through the snow.</p>
<p>Book rooms early for late March. Read our <a href="/guides/cherry-blossom-season">cherry blossom season guide</a> and the <a href="/guides/cherry-blossom-forecast">forecast guide</a>.</p>
`,

'may': `
<p>May is the month for wisteria, azaleas and roses. The wisteria of [[ashikaga-flower-park]] and [[kawachi-wisteria-garden]] are usually at their peak in late April and early May, across Golden Week, and the clipped azaleas of [[nezu-shrine]] and [[tsutsujigaoka-park]] flower at the same time.</p>
<p>In the north, May is still spring. The cherries reach Hokkaido in early May, at [[goryokaku-park]] and [[matsumae-park]], and the moss phlox hills of [[takinoue-park]] and [[higashimokoto-shibazakura-park]] flower in mid to late May. Further south, the rose gardens open in mid May, at [[keisei-rose-garden]] and [[yokohama-english-garden]], and the first irises appear at the end of the month.</p>
<p>Golden Week, from late April to early May, is the busiest holiday of the year, so the second half of May is calmer. See our <a href="/guides/wisteria-spots">guide to wisteria spots</a>.</p>
`,

'june': `
<p>June is the rainy season in most of Japan, and the month of hydrangeas and irises. Hydrangeas usually peak in mid to late June around Tokyo and Kyoto, at temples like [[meigetsu-in-temple]] in Kamakura and [[mimuroto-ji-temple]] near Kyoto, and along the [[hakone-tozan-railway]].</p>
<p>The iris gardens peak in the middle of the month, at [[meiji-jingu-inner-garden]] and [[horikiri-iris-garden]] in Tokyo. On Honshu, the first lavender opens late in the month, and in Hokkaido the roses and early lavender begin. The rainy season usually skips Hokkaido, so June there is a good time to go.</p>
<p>Both hydrangeas and irises look good in the rain, so a wet day isn't wasted. See our <a href="/guides/hydrangea-spots">guide to hydrangea spots</a>.</p>
`,

'july': `
<p>July is Hokkaido's month. The lavender around Furano and Biei peaks in mid July, at [[farm-tomita]] and [[hinode-park-lavender-garden]], and the flower hills of [[shikisai-no-oka]] are striped with colour. It's cooler there than in the rest of Japan.</p>
<p>On Honshu, the rainy season usually ends in mid to late July and the heat sets in. Lotus flowers open in the mornings, at [[kodaihasu-no-sato]] in Gyoda and [[shinobazu-pond]] in Ueno, and the first sunflower fields bloom late in the month, like [[himawari-no-oka-park]]. In Okinawa, the night-flowering sagaribana are out at [[iriomote-sagaribana]].</p>
<p>See the lotus early, before about 9 am, when the flowers start to close.</p>
`,

'august': `
<p>August is the hottest month, and the flowers are the summer ones: sunflowers and lotus. The biggest sunflower fields are at their best in early to mid August, at [[hokuryu-sunflower-village]] in Hokkaido, [[akeno-sunflower-field]] in Yamanashi and [[zama-sunflower-fields]] near Tokyo.</p>
<p>Lotus ponds keep flowering into August, as at [[okayama-korakuen]] and [[izunuma-and-uchinuma]] in Miyagi, where the lakes are covered in flowers. The highlands are the place to escape the heat: the lily slopes of [[hunter-mountain-yuri-park]] and the fields of Hokkaido stay cooler.</p>
<p>Go to the fields early in the morning, carry water, and watch for typhoons late in the month. Obon in mid August is a busy travel week.</p>
`,

'september': `
<p>September is the start of the autumn flowers. Red spider lilies come up around the autumn equinox, in the second half of the month, at [[kinchakuda-manjushage-park]] near Tokyo, along the [[yakachi-river]] in Aichi and on terraced fields like [[inabuchi-terraced-rice-fields]] in Asuka.</p>
<p>The first cosmos open in the highlands, at [[kurohime-kogen-cosmos-garden]], and late in the month the kochia start to turn red in the cooler fields. Kinmokusei scents the streets from the end of September. In Hokkaido, the first autumn leaves turn on [[mount-asahidake]], the earliest in Japan.</p>
<p>A hot summer can push the spider lilies later, into early October. Read our <a href="/guides/red-spider-lily-season">red spider lily season guide</a>.</p>
`,

'october': `
<p>October is the month for kochia and cosmos. The kochia hill of [[hitachi-seaside-park-october]] is usually reddest in mid October, and cosmos fill fields like [[showa-kinen-park]] near Tokyo and [[hannya-ji-temple]] in Nara. The roses have a second flowering, at [[keisei-rose-garden-october]].</p>
<p>In the north and the mountains, the autumn leaves are at their peak: Tohoku's gorges, like [[oirase-gorge]] and [[naruko-gorge]], and the hot spring valleys of Hokkaido, like [[jozankei]]. Kinmokusei is in flower early in the month, and the chrysanthemum shows open in the second half.</p>
<p>It's a good month to travel, with mild days and fewer crowds than spring. Read our <a href="/guides/kochia-season">kochia season guide</a>.</p>
`,

'november': `
<p>November is autumn leaf season in most of Japan. Kyoto and Tokyo usually peak from mid November into early December, at temples like [[tofuku-ji-temple]] and [[eikando-temple]] in Kyoto and gardens like [[rikugien-garden]] in Tokyo. Ginkgo avenues turn gold at the same time, like [[meiji-jingu-gaien-ginkgo-avenue]].</p>
<p>The chrysanthemum shows run through the month, at [[shinjuku-gyoen-november]] and [[nihonmatsu-chrysanthemum-dolls]]. A few cherries flower in autumn too: the shikizakura of [[obara-shikizakura]] bloom among the red maples.</p>
<p>Many gardens light up their maples in the evenings. See our <a href="/guides/japan-in-november">guide to Japan in November</a> and <a href="/guides/autumn-leaves-tokyo">autumn leaves in Tokyo</a>.</p>
`,

'december': `
<p>December is the end of the autumn colour and the start of the winter flowers. The last ginkgo trees turn in early December, at [[midosuji-ginkgo-avenue]] in Osaka and [[nishi-hongan-ji-water-spouting-ginkgo]] in Kyoto, and the late maples hold on in Kyoto and Tokyo into the first week or so.</p>
<p>The first narcissus open on the coasts, at [[edzuki-narcissus-road]] in Chiba and [[tsumekizaki-narcissus]] in Shizuoka, and camellias and sasanqua flower in gardens like [[matsuyama-sogo-park-camellia-garden]]. Indoors, [[nabana-no-sato]] has its begonia garden, and many parks hold winter illuminations.</p>
<p>Read our <a href="/guides/winter-flowers-japan">guide to winter flowers in Japan</a>.</p>
`,

'april': `
<p>April is Japan's busiest flower month. Early in the month the cherry blossoms reach their peak in Tokyo, Kyoto and Osaka, then move north: Tohoku usually flowers from mid to late April, and Hokkaido follows in early May. In the mountains and the north, April is still cherry season from start to finish.</p>
<p>Behind the cherries come the spring fields. Tulips open across the country, the nemophila of [[hitachi-seaside-park]] turn the hill blue in late April, and moss phlox covers the slopes at [[hitsujiyama-park]] in Chichibu. By the last week of the month, the first wisteria are out.</p>
<p>Golden Week, Japan's longest holiday, starts on 29 April, so the end of the month is crowded and trains and hotels book up early. If you can, see the late-April spots in the week before it. For the cherry blossoms, start with our <a href="/guides/cherry-blossom-season">cherry blossom season guide</a>.</p>
`,

},
};
