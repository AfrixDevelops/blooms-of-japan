// The guides at /guides/<slug>: one question per page, answered in the first lines, for readers and for
// Google's AI Overviews. build-router.js embeds them in the page; tools/prerender.js gives each one its own
// title, description and Article data.
//
// Writing rules (keep to these for every guide): by "the Blooms of Japan team", "we" and "you"; answer first;
// contractions; mix short and long sentences; take a side; specific numbers. No delve/testament/tapestry-type
// words, no "not just X but Y", no filler openers, few exclamation marks, no em dashes. Never invent trips
// or first-hand stories.
//
// In body:  {{n:<flower key>}}  the number of spots in that flower group
//           [[<spot slug>]] or [[<spot slug>|text]]  a link to that spot (the build fails if the slug is gone)
// fl: flower groups whose spot pages link back here. img: spot slug whose photo leads the guide.
module.exports = [
  {
    slug: 'cherry-blossom-season',
    h1: 'When is cherry blossom season in Japan?',
    title: 'When Is Cherry Blossom Season in Japan? Usual Dates by City',
    short: 'Usual opening and full-bloom dates for 15 cities, how long the blossoms last, and when to book.',
    desc: 'Cherry blossom season in Japan runs from late March in Tokyo, Kyoto and Fukuoka to early May in Hokkaido. Usual dates by city, how long it lasts and how to time a trip.',
    published: '2026-10-28', updated: '2026-10-28',
    fl: ['cherry-blossom'], img: 'chidorigafuchi',
    sources: 'Japan Meteorological Agency, normal flowering and full-bloom dates for somei-yoshino cherries, 1991–2020.',
    body: `
<p class="answer"><strong>For most of Japan it's late March to mid April.</strong> Tokyo's cherries usually open around 24 March and reach full bloom a week later. Kyoto and Osaka run a few days behind. The north is about a month later, and Hokkaido doesn't get going until May.</p>

<h2>When do cherry blossoms bloom in each city?</h2>
<p>These are the Japan Meteorological Agency's normal dates, averaged over 1991 to 2020. They're for somei-yoshino, the pale pink cherry that almost every forecast tracks.</p>
<div class="gtable"><table>
<thead><tr><th>City</th><th>First flowers</th><th>Full bloom</th></tr></thead>
<tbody>
<tr><td>Fukuoka</td><td>22 March</td><td>31 March</td></tr>
<tr><td>Tokyo</td><td>24 March</td><td>31 March</td></tr>
<tr><td>Nagoya</td><td>24 March</td><td>2 April</td></tr>
<tr><td>Hiroshima</td><td>25 March</td><td>3 April</td></tr>
<tr><td>Kyoto</td><td>26 March</td><td>4 April</td></tr>
<tr><td>Osaka</td><td>27 March</td><td>4 April</td></tr>
<tr><td>Kagoshima</td><td>26 March</td><td>5 April</td></tr>
<tr><td>Kanazawa</td><td>3 April</td><td>8 April</td></tr>
<tr><td>Sendai</td><td>8 April</td><td>13 April</td></tr>
<tr><td>Nagano</td><td>11 April</td><td>16 April</td></tr>
<tr><td>Morioka</td><td>18 April</td><td>24 April</td></tr>
<tr><td>Aomori</td><td>22 April</td><td>26 April</td></tr>
<tr><td>Hakodate</td><td>28 April</td><td>2 May</td></tr>
<tr><td>Sapporo</td><td>1 May</td><td>6 May</td></tr>
<tr><td>Naha (Okinawa)</td><td>16 January</td><td>4 February</td></tr>
</tbody></table></div>
<p>Two things in that table catch people out. Kagoshima is further south than Fukuoka but opens later, because its winters are often too mild to wake the buds properly. And Okinawa isn't on the same calendar at all: it has a different, deep pink cherry that flowers in January.</p>

<h2>How long does cherry blossom season last?</h2>
<p>In any one place, not long. Full bloom comes about a week after the first flowers in Tokyo, nine days in Kyoto, and only four or five days in the north, where spring arrives in a rush. The petals start dropping about a week after full bloom, sooner if it rains or blows hard.</p>
<p>So you get roughly two weeks when the trees look good, and about five days when they look their best. Across the whole country, though, the season runs from January in Okinawa to mid May in Hokkaido. Miss it in one city and you can often catch it further north.</p>

<h2>When's the best time to go?</h2>
<p>If you've only got one shot, we'd aim for the first week of April and spend it in Kyoto or Osaka. Tokyo usually peaks around 31 March and Kyoto around 4 April, so a trip from about 28 March to 7 April gives you a fair chance at one of them, even in an early or late year.</p>
<p>Don't plan around a single date months ahead. The dates swing a lot: Tokyo's cherries opened on 14 March in 2020, 2021 and 2023, ten days before normal. Book a flexible week, keep the cities you visit in an order you can swap, and check the <a href="/guides/cherry-blossom-forecast">forecasts</a> once they start appearing in the new year.</p>

<h2>Can you see cherry blossoms outside March and April?</h2>
<p>Yes, which is handy if your dates are fixed. At the early end, Okinawa's cherries peak from late January, at places like [[nago-central-park]] and [[nakijin-castle-ruins-cherry-blossoms]]. The Kawazu cherries along the [[kawazu-river]] in Izu flower from mid February into early March.</p>
<p>At the late end, the north is at its best from mid April into May. [[hirosaki-park|Hirosaki Park]] is the one we'd pick if you can only go late: when the petals fall they cover the castle moat in pink. In Hokkaido, [[matsumae-park]] and [[goryokaku-park]] flower from late April into May.</p>

<h2>Where should you go?</h2>
<p>In Tokyo, [[chidorigafuchi]] is worth the crowds: you can rent a rowing boat under the trees along the old castle moat. [[meguro-river|Meguro River]] is lovely but packed at weekends, so go on a weekday morning. In Kyoto, the [[philosopher-s-path]] and [[daigo-ji-temple]] are the classics. [[mount-yoshino]] near Nara has thousands of trees planted up the mountainside, so the bloom climbs the slope over a few weeks in April.</p>
<p>We track {{n:cherry-blossom}} cherry blossom spots across Japan, each with its usual peak and how to get there. <a href="/flowers/cherry-blossom">See them all</a>.</p>
`,
  },

  {
    slug: 'cherry-blossom-forecast',
    h1: 'How does the cherry blossom forecast work?',
    title: "How Japan's Cherry Blossom Forecast Works, and When It's Published",
    short: 'Who publishes the forecasts, when they start, what "opening" really means, and how far to trust them.',
    desc: "Japan's cherry blossom forecasts come from private weather companies, starting in January. What opening and full bloom mean, how the dates are worked out, and how far ahead to trust them.",
    published: '2026-10-28', updated: '2026-10-28',
    fl: [], img: 'yasukuni-shrine',
    sources: 'Japan Meteorological Agency, observation rules for cherry flowering and full bloom; forecast releases from Weathernews and the Japan Weather Association.',
    body: `
<p class="answer"><strong>The forecasts come from private weather companies, not the government.</strong> The main ones are the Japan Weather Association (tenki.jp), Weathernews and the Japan Meteorological Corporation. Their first forecasts usually come out in January, and they update them every week or two until the trees open.</p>

<h2>Who publishes the cherry blossom forecast?</h2>
<p>The Japan Meteorological Agency used to. It stopped after 2009, saying private companies were already doing the same job. Now each company publishes its own dates, and they often disagree by a day or two. We'd look at two of them rather than trust one.</p>

<h2>What do "opening" and "full bloom" mean?</h2>
<p>Both are judged on one sample tree per city, which the Meteorological Agency still watches. A city's cherries are declared open (<em>kaika</em>) when its tree has five or six flowers out. Full bloom (<em>mankai</em>) is when about 80% of the buds have opened.</p>
<p>Tokyo's sample tree is at [[yasukuni-shrine]], where the agency has watched cherries since 1966. When it's close, news crews gather to watch staff count the flowers.</p>
<p>Here's the part that trips people up: opening day isn't the day to go. Five flowers on one tree isn't much to look at. You want full bloom, which in Tokyo comes about a week later.</p>

<h2>How are the dates worked out?</h2>
<p>Cherry buds need a cold winter to wake up, then warmth to open. Forecasters model both from temperature records and the latest long-range forecasts.</p>
<p>There's a rough rule you can use yourself. Add up each day's high temperature from 1 February, and somei-yoshino tends to open when the total reaches about 600°C. It's only a rule of thumb, but it explains why a warm February brings an early season.</p>

<h2>How far ahead can you trust it?</h2>
<p>January forecasts are a rough guide, because they lean on long-range weather forecasts. By early March the buds are visible and there are two weeks of proper forecasts to work with, so they're usually within a few days.</p>
<p>Our advice: book your trip on the <a href="/guides/cherry-blossom-season">normal dates</a>, then use the March forecasts to decide which city you're in when. Booking flights off a January forecast is the mistake we'd avoid.</p>

<h2>Where can you check it?</h2>
<p>tenki.jp, Weathernews and n-kishou.com all publish city-by-city dates. They're in Japanese, but the tables are easy to read with your browser's translate button.</p>
`,
  },

  {
    slug: 'plum-vs-cherry-blossoms',
    h1: 'How do you tell plum blossoms from cherry blossoms?',
    title: 'Plum vs Cherry Blossoms: How to Tell Them Apart in Japan',
    short: 'The quick checks that work every time, and when each one flowers.',
    desc: 'Plum blossoms sit tight on the branch, have round petals and a strong scent, and flower in February and March. Cherry blossoms hang on long stalks, have notched petals and come later.',
    published: '2026-10-28', updated: '2026-10-28',
    fl: ['plum-blossom'], img: 'kitano-tenmangu-shrine',
    sources: 'Spot bloom windows from local tourism sites and our own spot pages.',
    body: `
<p class="answer"><strong>Look at where the flower joins the branch.</strong> Plum blossoms sit right on the twig with almost no stalk. Cherry blossoms hang from long thin stalks, usually in bunches. Still not sure? Check the petal tips: cherry petals have a small notch, plum petals are round.</p>

<h2>What's the quickest way to tell them apart?</h2>
<div class="gtable"><table>
<thead><tr><th></th><th>Plum (ume)</th><th>Cherry (sakura)</th></tr></thead>
<tbody>
<tr><td>Stalk</td><td>Almost none, the flower sits on the twig</td><td>Long, flowers hang in clusters</td></tr>
<tr><td>Petal tips</td><td>Round</td><td>A small notch</td></tr>
<tr><td>Scent</td><td>Strong and sweet</td><td>Faint</td></tr>
<tr><td>Colours</td><td>White, pink and deep red</td><td>Mostly pale pink to white</td></tr>
<tr><td>Bark</td><td>Dark and rough</td><td>Glossy, with horizontal stripes</td></tr>
<tr><td>When</td><td>February and March</td><td>Late March and April</td></tr>
</tbody></table></div>
<p>The scent's the one we like best. You'll often smell a plum grove before you see it.</p>

<h2>What about peach blossoms?</h2>
<p>Peach is the one that muddles things. It flowers around cherry time in a hotter pink, with pointed petals on short stalks, and its leaves come out with the flowers. Cherry and plum mostly flower on bare branches.</p>

<h2>When do plum blossoms bloom?</h2>
<p>From late January in the warmest places to April in the north. [[atami-plum-garden]] on the Izu coast is one of the earliest, from late January. Around Tokyo and Kyoto it's mid February to mid March, at places like [[kairakuen-garden]] in Mito and [[kitano-tenmangu-shrine]]. Up north, the plum groves of Gunma and Tohoku run through March, at [[haruna-plum-grove]] and [[sendai-agricultural-center-plum-garden]] for example.</p>

<h2>Are plum blossoms worth seeing if you'll miss the cherries?</h2>
<p>Yes, and in some ways they're the better trip. Crowds are much smaller. A single garden often flowers for a month or more, because early and late kinds open in turn, so your timing doesn't have to be perfect.</p>
<p>Plum was also Japan's first flower-viewing tree. The Man'yoshu, the oldest collection of Japanese poetry, has about 120 poems about plum and only 40-odd about cherry.</p>
<p>We track {{n:plum-blossom}} plum blossom spots, each with its usual peak. <a href="/flowers/plum-blossom">See them all</a>.</p>
`,
  },

  {
    slug: 'autumn-leaves-season',
    h1: 'When is autumn leaves season in Japan?',
    title: 'When Is Autumn Leaves Season in Japan? Usual Dates by City',
    short: 'When the maples turn in 15 cities, why the mountains go first, and when to go.',
    desc: "Japan's autumn leaves turn from September in Hokkaido's mountains to early December in Kyoto, Osaka and Fukuoka. Usual dates by city from the Japan Meteorological Agency, and when to go.",
    published: '2026-10-28', updated: '2026-10-28',
    fl: ['autumn-leaves', 'ginkgo'], img: 'eikando-temple',
    sources: 'Japan Meteorological Agency, normal maple colouring dates (iroha-momiji), 1991–2020.',
    body: `
<p class="answer"><strong>In Tokyo, Kyoto and Osaka it's mid November to early December.</strong> The colour starts on Hokkaido's mountains in September and works its way south and downhill. Tokyo's maples usually turn around 28 November, and Kyoto's around 5 December.</p>

<h2>When do the leaves turn in each city?</h2>
<p>These are the Japan Meteorological Agency's normal dates, averaged over 1991 to 2020. Each one is the day the sample maple in that city has mostly turned red.</p>
<div class="gtable"><table>
<thead><tr><th>City</th><th>Maples turn</th></tr></thead>
<tbody>
<tr><td>Sapporo</td><td>28 October</td></tr>
<tr><td>Hakodate</td><td>2 November</td></tr>
<tr><td>Nagano</td><td>12 November</td></tr>
<tr><td>Aomori</td><td>13 November</td></tr>
<tr><td>Morioka</td><td>13 November</td></tr>
<tr><td>Niigata</td><td>15 November</td></tr>
<tr><td>Sendai</td><td>21 November</td></tr>
<tr><td>Hiroshima</td><td>22 November</td></tr>
<tr><td>Kanazawa</td><td>24 November</td></tr>
<tr><td>Tokyo</td><td>28 November</td></tr>
<tr><td>Nagoya</td><td>28 November</td></tr>
<tr><td>Osaka</td><td>1 December</td></tr>
<tr><td>Fukuoka</td><td>1 December</td></tr>
<tr><td>Kyoto</td><td>5 December</td></tr>
<tr><td>Kagoshima</td><td>15 December</td></tr>
</tbody></table></div>
<p>Those are city trees at low altitude. Gardens and temples in the same city can be a week either side, and the mountains around them are weeks ahead.</p>

<h2>Why do the mountains turn first?</h2>
<p>Maples start to colour when the nights get cold, roughly once the low drops under 8°C, and the change speeds up below 5°C. That happens first up high, so the colour runs downhill as well as south.</p>
<p>[[mount-asahidake]] in Hokkaido is usually the first in Japan, from late August into September. [[irohazaka-and-lake-chuzenji]] and [[oirase-gorge]] are at their best from mid October to early November, weeks before Tokyo.</p>

<h2>How long does it last?</h2>
<p>In one place you get around two weeks of good colour. A storm can strip the trees early. Ginkgo is quicker: the yellow comes on fast and the leaves drop within a week or two, so Tokyo's [[meiji-jingu-gaien-ginkgo-avenue]] is a mid November to early December thing.</p>

<h2>When's the best time to go?</h2>
<p>For Kyoto, we'd aim for the last week of November. [[eikando-temple]] and [[tofuku-ji-temple]] are worth it, but go at opening time, because by mid morning the famous spots are packed. In Tokyo, [[rikugien-garden]] runs late, often into mid December.</p>
<p>If you're in Japan in late October or early November, don't wait for the cities. Go up instead: Nikko and the Tohoku gorges are at their peak then, and you'll beat the Kyoto crowds by a month.</p>
<p>We track {{n:autumn-leaves}} autumn leaves spots and {{n:ginkgo}} ginkgo spots. <a href="/flowers/autumn-leaves">See the autumn leaves</a>.</p>
`,
  },

  {
    slug: 'flowers-by-season',
    h1: 'What flowers bloom in Japan in each season?',
    title: 'Japan Flowers by Season: What Blooms When, All Year',
    short: "A season-by-season run through what's flowering, with the usual peak for each.",
    desc: "What's in bloom in Japan through the year: plum and camellia in winter, cherry, nemophila and wisteria in spring, hydrangea and lavender in summer, spider lilies, kochia and autumn leaves in autumn.",
    published: '2026-10-28', updated: '2026-10-28',
    fl: [], img: 'hitachi-seaside-park',
    sources: 'Bloom windows from local tourism sites, checked for each spot page.',
    body: `
<p class="answer"><strong>There's something in flower every month of the year.</strong> Spring is cherry blossom, then nemophila and wisteria. Summer has hydrangea in the June rains and lavender in Hokkaido. Autumn brings spider lilies, red kochia and the autumn leaves, and winter has plum, camellia and narcissus.</p>

<h2>Spring (March to May)</h2>
<p>Cherry blossom gets all the attention, from late March into April (here's <a href="/guides/cherry-blossom-season">when it peaks in each city</a>). But the weeks after it are just as good. The blue nemophila at [[hitachi-seaside-park]] peak from mid April to early May. Wisteria follows at [[ashikaga-flower-park]] and [[kawachi-wisteria-garden]], from late April to mid May.</p>
<p>Our favourite stretch of the whole year is late April into early May, when wisteria, nemophila and the northern cherries all overlap. The catch is Golden Week, from 29 April to 5 May, when half of Japan is on holiday too. Go on weekdays either side if you can.</p>
<p>Month by month: <a href="/when/march">March</a>, <a href="/when/april">April</a>, <a href="/when/may">May</a>.</p>

<h2>Summer (June to August)</h2>
<p>June is the rainy season, and that's hydrangea time. [[meigetsu-in-temple]] in Kamakura is the classic, and iris gardens peak the same month. In July the lavender comes out at [[farm-tomita]] in Furano, and sacred lotus opens at [[kodaihasu-no-sato]]. August is sunflowers, with [[hokuryu-sunflower-village]] the biggest field we list.</p>
<p>If you're choosing where to spend summer, we'd pick Hokkaido. It's cooler and largely misses the rainy season.</p>
<p>Month by month: <a href="/when/june">June</a>, <a href="/when/july">July</a>, <a href="/when/august">August</a>.</p>

<h2>Autumn (September to November)</h2>
<p>Red spider lilies flower for a couple of weeks in late September, and [[kinchakuda-manjushage-park]] is the big one. In October the kochia at [[hitachi-seaside-park-october|Hitachi Seaside Park]] turn from green to deep red, and the sweet smell of kinmokusei is everywhere. Then the leaves: from September in the mountains to early December in Kyoto (see <a href="/guides/autumn-leaves-season">when they turn in each city</a>).</p>
<p>Month by month: <a href="/when/september">September</a>, <a href="/when/october">October</a>, <a href="/when/november">November</a>.</p>

<h2>Winter (December to February)</h2>
<p>Winter is the season most visitors skip, and the easiest time to have a garden almost to yourself. Narcissus cover the coast at [[echizen-coast-narcissus]] and on Awaji at [[nada-kuroiwa-narcissus-field]]. Wintersweet fills [[hodosan-wintersweet-garden]] with scent in January and February. Okinawa's cherries flower in January, and plum starts on the mainland from late January at [[atami-plum-garden]].</p>
<p>Month by month: <a href="/when/december">December</a>, <a href="/when/january">January</a>, <a href="/when/february">February</a>.</p>
<p>For every spot on one page, see the <a href="/calendar">flower calendar</a>.</p>
`,
  },

  {
    slug: 'quiet-cherry-blossom-spots',
    h1: 'Where can you see cherry blossoms in Japan without the crowds?',
    title: 'Quiet Cherry Blossom Spots in Japan, Near Tokyo and Beyond',
    short: 'Riverbanks, old lone trees and early cherries where you won\'t be fighting for a view.',
    desc: 'Quieter cherry blossom spots in Japan: long riverbanks near Tokyo, ancient lone trees in Yamanashi and Tohoku, early cherries in February and March, and Kyoto gardens with weeks of bloom.',
    published: '2026-10-29', updated: '2026-10-29',
    fl: [], img: 'wanizuka-cherry-tree',
    sources: 'Tree counts, ages and access from each spot\'s official or city site.',
    body: `
<p class="answer"><strong>Get out of the city centres, or go at the edges of the season.</strong> Ueno, Meguro River and Kyoto's Maruyama Park are packed every year. You'll share the view with far fewer people at long riverbanks where the crowd spreads out, at old lone trees in the countryside, and at cherries that flower weeks before or after the main rush.</p>

<h2>Where are the quieter cherry blossom spots near Tokyo?</h2>
<p>Our pick is the [[motoara-river-cherry-blossom-avenue|Moto-Arakawa in Konosu]], Saitama. About 500 trees line both banks for some 2.5 km, so even on a busy day there's room to walk. It's a 10 minute walk from Fukiage Station on the JR Takasaki Line, and during the festival you can ride a roofed boat under the trees.</p>
<p>Also in Saitama, [[sakurazutsumi-park]] in Yoshimi has about 500 cherries over a carpet of yellow rapeseed, both at their best in late March and early April. Parking fills early at weekends, so go on a weekday.</p>
<p>If you're stuck in central Tokyo, [[zojo-ji-temple]] is a decent compromise. It has about 200 trees around the main hall with Tokyo Tower behind, and it's far calmer first thing in the morning than by lunchtime.</p>

<h2>Which cherries flower before the crowds arrive?</h2>
<p>The early kinds. Kawazu cherries are a deeper pink and flower from mid February to early March, a month before the somei-yoshino that everyone else is waiting for. Near Tokyo you'll find them at [[matsuda-nishihirabatake-park]], where about 360 trees grow on a slope above rapeseed with Mount Fuji behind on clear mornings, and along the coast road at [[miura-kaigan-kawazu-cherries]].</p>
<p>A little later, about 160 Okame cherries line the road up to Mount Oyama at [[oyama-shindo-okame-cherries]] in Isehara. They usually open in early March, they're free, and it's about 20 minutes by bus from Isehara Station on the Odakyu Line.</p>

<h2>Are the famous old cherry trees worth the trip?</h2>
<p>Some are busier than you'd think. [[miharu-takizakura]] in Fukushima, a weeping cherry over 1,000 years old, gets very crowded on peak weekends. The less famous trees are the better bet if you want quiet.</p>
<p>[[wanizuka-cherry-tree]] is the one we'd go out of our way for. It's a single edo-higan about 330 years old on a small mound among the fields in Nirasaki, with the snowy Yatsugatake range behind. Take a city bus from Nirasaki Station to Takeda-Hachiman-iriguchi, then walk five minutes. Next door in Hokuto, [[yamataka-jindai-zakura]] at Jisso-ji temple may be the oldest cherry in Japan, at an estimated 1,800 to 2,000 years. It's about 20 minutes by taxi from Hinoharu Station.</p>
<p>In Tohoku, [[kubo-zakura]] in Nagai is about 1,200 years old with branches spreading some 25 m. And in the middle of Morioka, [[ishiwarizakura]] grows out of a split in a granite boulder outside the district court. You can see it from the pavement any time, for free.</p>

<h2>Where else do the crowds thin out?</h2>
<p>Anywhere long. At the [[nicchu-line-weeping-cherries]] in Kitakata, about 1,000 weeping cherries line a 3 km cycling path along an old railway line, and the further you walk from the station, the quieter it gets. In Miyagi, the [[shiroishi-river-hitome-senbonzakura|Shiroishi River]] has about 1,200 trees along 8 km between Ogawara and Funaoka, with the Zao mountains behind.</p>
<p>The north also helps on timing. Tohoku flowers in mid to late April, after the Tokyo and Kyoto seasons are over, so if your trip runs late you're not competing with the crowds who came for the south.</p>

<h2>What about Kyoto?</h2>
<p>Kyoto's hard to do quietly in early April. The trick is to pick places where the bloom is spread over weeks, so nobody's squeezing into one perfect weekend. The [[kyoto-botanical-gardens]] grow about 500 cherry trees of some 180 kinds, flowering from mid March to late April, and it's right by Kitayama Station. [[hirano-shrine]] has about 400 trees of some 60 kinds, many raised at the shrine itself.</p>
<p>Or leave the city: [[mii-dera-temple]] in Otsu has about 1,000 trees above Lake Biwa and is 10 minutes on foot from Miidera Station. Late in the season, the short Omuro cherries at [[ninna-ji-temple]] are among the last in Kyoto to flower.</p>

<h2>How do you avoid the crowds anywhere?</h2>
<p>Go on a weekday, go early, and skip the weekend closest to full bloom. That's when every famous spot is at its busiest. At most spots, 8 am and 11 am feel like different places. For the usual dates in each city, see <a href="/guides/cherry-blossom-season">when cherry blossom season is</a>.</p>
<p>We track {{n:cherry-blossom}} cherry blossom spots across Japan. <a href="/flowers/cherry-blossom">See them all</a>.</p>
`,
  },

  {
    slug: 'wisteria-spots',
    h1: 'Where can you see wisteria in Japan besides Ashikaga Flower Park?',
    title: 'Where to See Wisteria in Japan Beyond Ashikaga Flower Park',
    short: 'Ancient vines, long tunnels and trellises from Tokyo to Kyushu, with peak dates and how to get there.',
    desc: 'The best wisteria spots in Japan besides Ashikaga Flower Park: Kameido Tenjin and Ushijima near Tokyo, Tennogawa Park in Aichi, Byakugo-ji in Hyogo and Kawachi in Kitakyushu, with bloom dates, access and fees.',
    published: '2026-10-29', updated: '2026-10-29',
    fl: ['wisteria'], img: 'ushijima-wisteria',
    sources: 'Fees, bloom windows and access from each spot\'s official site.',
    body: `
<p class="answer"><strong>Near Tokyo, go to Kameido Tenjin Shrine in mid April or Ushijima in late April.</strong> Further afield, Tennogawa Park in Aichi, Byakugo-ji and Shirai Omachi in Hyogo, and Kawachi in Kitakyushu are all worth a trip. Most wisteria in Japan peaks between late April and early May.</p>

<h2>Where can you see wisteria near Tokyo?</h2>
<p>[[kameido-tenjin-shrine]] is the closest and the earliest, at its best in mid to late April. About 100 vines hang over the shrine pond on 15 trellises, with red arched bridges and Tokyo Skytree behind. Hiroshige painted it. It's a 15 minute walk from Kameido Station, and the trellises are lit up in the evening during the festival.</p>
<p>[[ushijima-wisteria]] in Kasukabe is the one we'd pick if you only see one. It's a single vine thought to be over 1,000 years old, and it's the only wisteria in Japan that's a Special Natural Monument. It's open only in season, from mid April to early May, and costs about 1,200 yen. Walk 10 minutes from Fuji-no-Ushijima Station on the Tobu Urban Park Line.</p>
<p>Two smaller ones are worth knowing about if you're nearby. There's a wisteria over 450 years old beside the shrine at [[tamashiki-park]] in Kazo, Saitama. And at [[koppata-wisteria|Chosen-ji temple]] in Kanra, Gunma, a 650-year-old vine flowers in several colours.</p>

<h2>Where is the best wisteria in central Japan?</h2>
<p>Aichi has more wisteria spots than anywhere else we list. [[tennogawa-park]] in Tsushima has a 275 m trellis of 12 kinds reflected in the park pond, 15 minutes on foot from Tsushima Station on the Meitetsu line, and it's lit up at night during the festival. In Okazaki, [[okazaki-park]] has old vines with tresses about 1.2 m long beside the castle where Tokugawa Ieyasu was born. [[mandara-ji-park]] in Konan has about 60 vines around an old temple.</p>
<p>In Shizuoka, [[yuya-no-naga-fuji]] at Gyoko-ji temple is said to have been planted about 850 years ago, and it's free. It's also one of the earlier ones, in mid to late April.</p>

<h2>What about Kyoto, Osaka and the west?</h2>
<p>[[byakugo-ji-temple]] in Tamba, Hyogo is known for its "nine-foot" wisteria hanging along a 120 m trellis. Entry is about 300 yen, a bit more during the festival, and it's 8 minutes by taxi from Ichijima Station. For sheer length, [[shirai-omachi-wisteria-park]] in Asago has a 500 m trellis of nine kinds in the hills of northern Hyogo. It's open in season only, costs about 1,000 yen and is a 22 minute walk from Kami-Yakuno Station.</p>
<p>In Nara, wisteria is the crest of [[kasuga-taisha-shrine]]. The [[manyo-botanical-garden]] next door has about 200 wisteria of some 20 kinds (700 yen). Further west, [[wake-wisteria-park]] in Okayama has about 100 kinds on a 500 m trellis, but you'll want a car. [[omishima-wisteria-park]] is on an island on the Shimanami Kaido cycling route, with a festival around 3 May.</p>

<h2>Where is the best wisteria in Kyushu?</h2>
<p>[[kawachi-wisteria-garden]] in Kitakyushu has the two famous wisteria tunnels, 80 m and 110 m long, and about 22 kinds. You can't just turn up in peak season: entry is by timed ticket, bought in advance online or at convenience stores, and the price goes up with the bloom. If you'd rather not plan that far ahead, [[kuroki-great-wisteria]] in Yame is a 600-year-old vine on a 3,000 square metre trellis, with clusters up to 1.2 m long, and it's free.</p>
<p>[[nakayama-ofuji]] in Yanagawa flowers earlier, in mid to late April, and is lit up in the evening during its festival.</p>

<h2>When does wisteria bloom?</h2>
<div class="gtable"><table>
<thead><tr><th>Spot</th><th>Prefecture</th><th>Usual peak</th></tr></thead>
<tbody>
<tr><td>Kameido Tenjin Shrine</td><td>Tokyo</td><td>Mid to late April</td></tr>
<tr><td>Yuya no Naga Fuji</td><td>Shizuoka</td><td>Mid to late April</td></tr>
<tr><td>Nakayama Ofuji</td><td>Fukuoka</td><td>Mid to late April</td></tr>
<tr><td>Ushijima Wisteria</td><td>Saitama</td><td>Late April to early May</td></tr>
<tr><td>Tennogawa Park</td><td>Aichi</td><td>Late April to early May</td></tr>
<tr><td>Kasuga Taisha</td><td>Nara</td><td>Late April to early May</td></tr>
<tr><td>Byakugo-ji Temple</td><td>Hyogo</td><td>Late April to mid May</td></tr>
<tr><td>Shirai Omachi</td><td>Hyogo</td><td>Late April to mid May</td></tr>
<tr><td>Kawachi Wisteria Garden</td><td>Fukuoka</td><td>Late April to mid May</td></tr>
</tbody></table></div>
<p>Wisteria comes a few weeks after the cherry blossom, and most places peak right in Golden Week, from 29 April to 5 May. That's the busiest week of the year to travel in Japan. If you can, go in the last few days of April on a weekday.</p>
<p>The dates move with the spring. A warm April can bring everything forward a week, so check the spot's own bloom report before you set off.</p>

<h2>Is Ashikaga Flower Park still worth it?</h2>
<p>Yes, if you can live with the crowds. Its Great Wisteria is over 160 years old and covers about 1,000 square metres, and there are more than 350 wisteria in all, so the season runs from mid April to mid May. Entry runs from 900 to 2,300 yen depending on the bloom. But if you'd rather see an ancient vine without the queues, Ushijima is closer to Tokyo, and its vine is older by more than 800 years.</p>
<p>We track {{n:wisteria}} wisteria spots. <a href="/flowers/wisteria">See them all</a>.</p>
`,
  },

  {
    slug: 'hydrangea-spots',
    h1: 'Where can you see hydrangeas in Japan in June?',
    title: 'Where to See Hydrangeas in Japan: Temples, Gardens and the Rainy Season',
    short: 'The best hydrangea temples near Tokyo and Kyoto, and where they flower later, with access and timing.',
    desc: "The best places to see hydrangeas in Japan in June: Meigetsu-in and Hasedera in Kamakura, Takahata Fudo in Tokyo, Mimuroto-ji in Uji, Shimoda Park in Izu, and later gardens in Tohoku and Shikoku.",
    published: '2026-10-29', updated: '2026-10-29',
    fl: ['hydrangea'], img: 'mimuroto-ji-temple',
    sources: 'Japan Meteorological Agency, normal start and end dates of the rainy season, 1991–2020.',
    body: `
<p class="answer"><strong>Near Tokyo, Kamakura's temples are the classic, at their best through June.</strong> Meigetsu-in is famous for one particular shade of blue, and Hasedera has hydrangeas on a hillside above the sea. Near Kyoto, go to Mimuroto-ji in Uji. Hydrangeas flower in the rainy season, from early June to early July in most of Japan.</p>

<h2>Where are the best hydrangeas near Tokyo?</h2>
<p>[[meigetsu-in-temple]] in Kita-Kamakura is called the "hydrangea temple". It has some 2,000 to 2,500 hime-ajisai in a blue so distinctive it's called Meigetsu-in blue. Entry is 500 yen and it's a 10 minute walk from Kita-Kamakura Station. Get there early on June weekends.</p>
<p>[[hasedera-temple]] in Kamakura has about 2,500 hydrangeas of more than 40 kinds along a hillside path with views over Sagami Bay. In season the path needs a timed ticket, about 500 yen on top of temple entry, which you can book online. Expect around 200 steps.</p>
<p>Kamakura is busy in June. If you'd rather skip it, [[takahata-fudo]] in Hino is our pick. It has about 7,800 hydrangeas of some 250 kinds around a five-storey pagoda, it's free, and it's 5 minutes from Takahata-fudo Station on the Keio Line. Inside the city, [[hakusan-shrine]] in Bunkyo has about 3,000 hydrangeas and peaks a little earlier, in early to mid June.</p>
<p>For a lot of flowers in one place, [[hondo-ji-temple]] in Matsudo, Chiba, fills its grounds with about 50,000 hydrangeas (500 yen). It's 15 minutes on foot from Kita-Kogane Station on the JR Joban Line.</p>

<h2>Where else around Tokyo?</h2>
<p>The [[hakone-tozan-railway]] switchbacks up the mountain from Hakone-Yumoto to Gora with hydrangeas along the track. Because it climbs, the flowers last from mid June to mid July, and in the second half of June there's a reserved "night hydrangea" train with the trackside flowers lit up.</p>
<p>Down in Izu, [[shimoda-park]] has about 150,000 hydrangea plants of more than 100 kinds on a hill above Shimoda harbour, around 3 million flowers. It's the biggest display we list, and peaks in mid to late June.</p>

<h2>Where can you see hydrangeas near Kyoto and Nara?</h2>
<p>[[mimuroto-ji-temple]] in Uji has about 20,000 hydrangeas of 50 kinds in a garden that only opens from early June to early July. It's a 15 minute walk from Mimuroto Station on the Keihan Uji Line, and it's lit up on some June weekends.</p>
<p>In Kyoto itself, [[fujinomori-shrine]] has about 3,500 hydrangeas in two gardens (500 yen) and holds a hydrangea festival on 15 June. In Nara, [[yata-dera-temple]] has between 10,000 and 20,000 hydrangeas of some 60 kinds on the hillside around the temple, about 700 yen in season.</p>

<h2>When do hydrangeas bloom in Japan?</h2>
<p>They follow the rainy season north. Okinawa goes first: [[yohena-hydrangea-garden]] in Motobu is at its best from late May. Kamakura, Tokyo and Kyoto peak in June. Hilltop gardens and the north run into July, at [[shingu-hydrangea-village]] in Ehime (about 20,000 plants, free), [[ohirasan-ajisai-zaka]] in Tochigi, and [[michinoku-hydrangea-garden]] in Iwate, which flowers from late June to late July.</p>
<div class="gtable"><table>
<thead><tr><th>Spot</th><th>Prefecture</th><th>Usual peak</th></tr></thead>
<tbody>
<tr><td>Yohena Hydrangea Garden</td><td>Okinawa</td><td>Late May to June</td></tr>
<tr><td>Hasedera Temple</td><td>Kanagawa</td><td>Late May to late June</td></tr>
<tr><td>Meigetsu-in Temple</td><td>Kanagawa</td><td>Early to late June</td></tr>
<tr><td>Takahata Fudo</td><td>Tokyo</td><td>Early to late June</td></tr>
<tr><td>Mimuroto-ji Temple</td><td>Kyoto</td><td>June to early July</td></tr>
<tr><td>Shimoda Park</td><td>Shizuoka</td><td>Mid to late June</td></tr>
<tr><td>Hakone Tozan Railway</td><td>Kanagawa</td><td>Mid June to mid July</td></tr>
<tr><td>Michinoku Hydrangea Garden</td><td>Iwate</td><td>Late June to late July</td></tr>
</tbody></table></div>

<h2>Is the rainy season a good time to visit Japan?</h2>
<p>For hydrangeas, it's the only time. In Tokyo and Kansai the rainy season normally starts around 6 or 7 June and ends around 19 July, and in Okinawa it runs from about 10 May to 21 June. It doesn't rain all day every day. You'll get grey, humid days with showers, and the odd dry spell.</p>
<p>We'd say rain actually suits hydrangeas. The colours look deeper on a wet, overcast day than in hard sun. Bring an umbrella and good shoes, because many of these gardens are on steps or slopes.</p>
<p>Irises flower in June too, so you can pair the two. Hondo-ji has about 5,000 irises in early June, just before its hydrangeas. If you'd rather avoid the rain altogether, Hokkaido mostly misses it. See <a href="/guides/flowers-by-season">what flowers in each season</a>.</p>

<h2>Why are some hydrangeas blue and others pink?</h2>
<p>It's the soil. In acidic soil the plant can take up aluminium, and the flowers turn blue. In neutral or alkaline soil they go pink. Japan's soils are mostly acidic, which is why blue is so common.</p>
<p>We track {{n:hydrangea}} hydrangea spots. <a href="/flowers/hydrangea">See them all</a>.</p>
`,
  },

  {
    slug: 'takahata-fudo-hydrangeas',
    h1: 'Takahata Fudo: a free hydrangea temple in Tokyo',
    title: 'Takahata Fudo Hydrangeas: Tokyo\'s Free Alternative to Kamakura',
    short: '7,800 hydrangeas around a five-storey pagoda in Hino, with when to go and how to get there.',
    desc: 'Takahata Fudo in Hino, Tokyo has about 7,800 hydrangeas of some 250 kinds around a 45 m pagoda, free to visit in June. Bloom dates, what to see, and access from Takahata-fudo Station.',
    published: '2026-10-29', updated: '2026-10-29',
    fl: [], img: 'takahata-fudo',
    sources: 'Takahata Fudoson Kongo-ji official site (takahatafudoson.or.jp); Walkerplus festival listing; TV Tokyo programme notes on the pagoda.',
    body: `
<p class="answer"><strong>Takahata Fudo is a big Buddhist temple in Hino, western Tokyo, with about 7,800 hydrangeas of some 250 kinds.</strong> They flower through June, and the temple's hydrangea festival runs from 1 to 30 June. It's free, and it's five minutes on foot from Takahata-fudo Station.</p>

<h2>Where is it?</h2>
<p>The full name is Takahata-san Kongo-ji, at 733 Takahata, Hino, Tokyo. It's one of the three great Fudo temples of the Kanto region, alongside Naritasan Shinsho-ji and Oyama Fudo, and a special head temple of the Chizan school of Shingon Buddhism. The Fudo hall and the Nio gate date from the early Muromachi period and are Important Cultural Properties.</p>

<h2>When do the hydrangeas bloom?</h2>
<p>Usually from early June into early July. The wild mountain hydrangeas (yama-ajisai) on the hill behind the temple go first, from late May. The bigger garden kinds around the main grounds follow, and the whole place tends to be at its best from mid June.</p>
<p>Dates move a week or so either way with the weather, so check the temple's site before you go. If you can only pick one week, we'd go for the middle of June.</p>

<h2>What will you see?</h2>
<p>Two quite different things. Around the main buildings are the familiar big mophead and lacecap hydrangeas in blues, purples and pinks, with the red five-storey pagoda behind them. That pagoda is 45 m tall, built in 1980 in an early Heian style, and it's the photo most people come for.</p>
<p>Behind the temple, on the hill called Fudogaoka, about 3,000 mountain hydrangeas grow along the temple's woodland pilgrimage path, a miniature version of Shikoku's 88-temple route. They're smaller, paler and much more delicate than the garden kinds. It's a proper hillside path, so wear shoes you don't mind getting muddy.</p>

<h2>How do you get there?</h2>
<p>Take the Keio Line from Shinjuku to Takahata-fudo Station. The Tama Monorail stops at the same station. From there it's a five minute walk to the temple gate.</p>
<p>If you're driving, it's about 10 minutes from the Kunitachi-Fuchu exit of the Chuo Expressway. There's paid parking around the station, but we'd take the train in June.</p>

<h2>Why go here and not Kamakura?</h2>
<p>Kamakura's hydrangea temples are beautiful, and busy. [[hasedera-temple]] needs a timed ticket in season, and [[meigetsu-in-temple]] has queues on June weekends. Takahata Fudo has more plants than either, costs nothing, and you don't have to book.</p>
<p>What Kamakura has that Takahata doesn't is the sea view and the famous "Meigetsu-in blue". If it's your first trip and you've got a free day, Kamakura is still the classic. But if you're based in Tokyo and want hydrangeas without the queues, we'd come here.</p>

<h2>Anything else worth knowing?</h2>
<p>It's the family temple of Hijikata Toshizo, vice-commander of the Shinsengumi, and there's a memorial to him in the grounds. On the 28th of every month there's a temple fair with stalls along the approach. In autumn the maples around the pagoda turn red in the second half of November.</p>
<p>For more hydrangea spots around Tokyo and further afield, see <a href="/guides/hydrangea-spots">where to see hydrangeas in Japan</a>, or the spot page for [[takahata-fudo|Takahata Fudo]].</p>
`,
  },

  {
    slug: 'wanizuka-cherry-tree',
    h1: 'Wanizuka: a hidden cherry blossom tree in Nirasaki, Yamanashi',
    title: 'Wanizuka Cherry Tree, Nirasaki: A Lone Sakura with Mountain Views',
    short: 'A 330-year-old cherry alone on a mound, with the Yatsugatake mountains behind. When to go and how to get there.',
    desc: 'The Wanizuka cherry in Nirasaki, Yamanashi is a 330-year-old edo-higan alone on a small mound in the fields, with Yatsugatake and Mount Fuji in view. Bloom dates, night light-up and bus access from Nirasaki Station.',
    published: '2026-10-29', updated: '2026-10-29',
    fl: [], img: 'wanizuka-cherry-tree',
    sources: 'Yamanashi Prefecture tourism site (yamanashi-kankou.jp); Nirasaki City Tourism Association.',
    body: `
<p class="answer"><strong>Wanizuka is a single wild cherry tree, about 330 years old, standing on its own on a small mound among the fields of Nirasaki in Yamanashi.</strong> It usually flowers from late March to early April. On a clear day you can see the snowy Yatsugatake range behind it, and Mount Fuji as well. It's free, and it's 15 minutes by bus from Nirasaki Station.</p>

<h2>Where is it?</h2>
<p>The address is 624 Kitamiyaji, Kamiyama-machi, Nirasaki, Yamanashi. It's in farmland near Takeda Hachiman Shrine, about two hours from Shinjuku by limited express.</p>

<h2>What is it?</h2>
<p>An edo-higan cherry, the long-lived wild species behind many of Japan's famous old trees. It's 17 m tall with a trunk 3.6 m round, and it's a city-designated cultural property. It has the place to itself: no other trees on the mound, nothing taller around it.</p>
<p>"Wanizuka" means "Wani mound", and nobody's quite sure whose mound it is. One story says it's the tomb of Prince Takeda, a son of the legendary Yamato Takeru. Others say it's an old burial mound, or that the name comes from a clan once settled here.</p>

<h2>When does it bloom?</h2>
<p>Usually from late March to early April. Edo-higan flowers are small and pale pink, and the tree is in flower before its leaves come out, so at full bloom it's a solid pink dome.</p>
<p>For a few evenings around full bloom the tree is lit up after dark, usually from about 6 pm to 8 pm. The times and dates are set each year, so check with the Nirasaki City Tourism Association (0551-22-1991) before you plan around it.</p>

<h2>How do you get there?</h2>
<p>Take the JR Chuo Line to Nirasaki Station. From there:</p>
<ul>
<li>By bus: a Nirasaki city bus to the Takeda-Hachiman-iriguchi stop, about 15 minutes, then a five minute walk. Buses aren't frequent, so check the return times when you arrive.</li>
<li>By taxi: about 10 minutes from the station.</li>
<li>By car: about 15 minutes from Nirasaki IC on the Chuo Expressway. There are 35 spaces, plus a temporary car park in cherry season.</li>
</ul>

<h2>Why go here?</h2>
<p>Because it's one tree and a big sky. Most cherry spots are rows of trees with people under them. Here you get a single tree you can walk all the way round, mountains on the horizon, and far fewer people than at the famous old trees. It's been used for posters and TV dramas for exactly that reason.</p>
<p>If you've seen the photos of [[miharu-takizakura]] in Fukushima and fancy a famous lone tree without the crowds that come with it, this is the one we'd pick.</p>
<p>Make a day of it with [[yamataka-jindai-zakura]] in neighbouring Hokuto, one of Japan's three great cherry trees and perhaps the oldest. It usually flowers around the same time.</p>

<h2>Any tips?</h2>
<p>Go on a clear day if you can: the mountains are half the view. The tree is surrounded by working farmland, so stay on the paths and don't walk into the fields for a better angle. There are temporary toilets in season, and that's about it for facilities, so bring what you need.</p>
<p>For more quiet places to see the blossom, see <a href="/guides/quiet-cherry-blossom-spots">cherry blossoms without the crowds</a>, or the spot page for [[wanizuka-cherry-tree|Wanizuka]].</p>
`,
  },

  {
    slug: 'nicchu-line-weeping-cherries',
    h1: 'Nicchu Line weeping cherries: a 3 km sakura walk in Kitakata, Fukushima',
    title: 'Nicchu Line Weeping Cherries, Kitakata: A 3 km Sakura Walk',
    short: 'About 1,000 weeping cherries on an old railway line, starting five minutes from Kitakata Station.',
    desc: "About 1,000 weeping cherries line a 3 km path on the old Nicchu railway line in Kitakata, Fukushima. Usual bloom in mid April, evening light-ups, the steam locomotive, and how to get there.",
    published: '2026-10-29', updated: '2026-10-29',
    fl: [], img: 'nicchu-line-weeping-cherries',
    sources: 'Kitakata Tourism and Products Association; Jorudan and Weathernews cherry spot listings.',
    body: `
<p class="answer"><strong>About 1,000 weeping cherries line a 3 km walking and cycling path along the old Nicchu railway line in Kitakata, Fukushima.</strong> They usually flower in mid April. The path starts about five minutes on foot from JR Kitakata Station, and walking it is free.</p>

<h2>Where is it?</h2>
<p>The path is officially the Nicchu Line Memorial Cycling and Walking Path. It runs north from near Kitakata Station, past the town's edge and out towards the countryside, for about 3 km. Kitakata is in the Aizu region of western Fukushima, a short ride from Aizu-Wakamatsu on the JR Ban'etsu West Line.</p>

<h2>What was the Nicchu Line?</h2>
<p>A little rural railway that opened in 1938 and ran 11.6 km from Kitakata to Atsushio. It was planned as part of a longer line north but never got any further, and it closed on 1 April 1984. Steam locomotives pulled its passenger trains, which made it popular with railway fans.</p>
<p>The town turned the track bed into a path and planted it with weeping cherries. A C11 steam locomotive that once worked the line is on display partway along, and the engine framed by pink branches is the photo everyone takes.</p>

<h2>When does it bloom?</h2>
<p>Usually mid April, about two weeks after Tokyo, and in a late year it can run into the third week of April. The Kitakata cherry festival runs through the season, with evening light-ups on part of the path for about a week around full bloom. In 2026, the festival ran from 9 to 23 April and the light-up from 13 to 19 April.</p>

<h2>How do you get there?</h2>
<p>By train, take the JR Ban'etsu West Line to Kitakata Station. The start of the path is about five minutes' walk away. From Tokyo, the usual route is the Tohoku Shinkansen to Koriyama, then the Ban'etsu West Line via Aizu-Wakamatsu.</p>
<p>There's no dedicated car park. In season temporary car parks open, and the local tourism association asks people not to park on the roadside. We'd come by train.</p>

<h2>Why go here?</h2>
<p>Weeping cherries are usually the star of a single temple garden or a lone old tree. Here there are a thousand of them in a row, and you can walk under them for the best part of an hour. The crowd is thickest near the station, so keep walking: the further you go towards the countryside, the quieter it gets.</p>
<p>It's also good timing for a trip north. By mid April the cherries in Tokyo and Kyoto are over, and you can pair this with the castle cherries at [[tsuruga-castle]] in Aizu-Wakamatsu, which flower around the same time.</p>

<h2>Anything else worth knowing?</h2>
<p>Kitakata is famous for ramen, with a light soy broth and thick wavy noodles, and for its old earthen storehouses (kura). Both are in the town centre, so plan for a long lunch. And since the path was built for bikes too, cycling it is a good way to reach the quiet far end.</p>
<p>For other cherry spots that peak late, see <a href="/guides/cherry-blossom-season">when cherry blossom season is</a>, or the spot page for the [[nicchu-line-weeping-cherries|Nicchu Line weeping cherries]].</p>
`,
  },

  {
    slug: 'japan-in-november',
    h1: 'Is November a good time to visit Japan?',
    title: "Is November a Good Time to Visit Japan? Leaves, Weather and What's On",
    short: "What's in season in early, mid and late November, what the weather's like, and where to go.",
    desc: "November is one of the best months to visit Japan: autumn leaves in Tokyo and Kyoto, gold ginkgo avenues, chrysanthemum shows and even winter cherries, with mild, mostly dry weather. What's on week by week.",
    published: '2026-10-29', updated: '2026-10-29',
    fl: [], img: 'korankei',
    sources: 'Japan Meteorological Agency, maple colouring normals and Tokyo climate normals, 1991–2020.',
    body: `
<p class="answer"><strong>Yes, it's one of the best months of the year.</strong> The autumn leaves reach Tokyo and Kyoto in the second half of November, the ginkgo avenues turn gold, and the weather is mild and mostly dry. The catch is that late November in Kyoto is as busy as cherry blossom season.</p>

<h2>What's the weather like in November?</h2>
<p>Comfortable. In Tokyo, daytime highs average about 17°C over the month, cooler by the end, and nights drop below 10°C. It's much drier than September and October, with plenty of clear blue days.</p>
<p>Pack layers: a light jacket for the day and something warmer for the evenings, especially if you're going to the mountains or a night light-up. Hokkaido is a different story. The leaves there are mostly finished by November and winter's on its way.</p>

<h2>What's in season in November?</h2>
<p>It depends which week you go.</p>
<p><strong>Early November</strong> is mountain time. The colour is still up high, at places like [[irohazaka-and-lake-chuzenji]] in Nikko and [[oirase-gorge]] in Aomori, while the cities are still green. It's also chrysanthemum season. [[shinjuku-gyoen-november|Shinjuku Gyoen]] puts on its chrysanthemum show from 1 to 15 November, and the [[meiji-jingu-chrysanthemum-show]] runs through the month for free.</p>
<p><strong>Mid November</strong> is when the colour comes down to the valleys near the big cities. [[korankei]] near Nagoya, [[mount-takao]] outside Tokyo and [[hananuki-gorge]] in Ibaraki are all at their best. Ginkgo starts turning in western Tokyo, at [[showa-kinen-park-ginkgo-avenue]] and along the [[hachioji-koshu-kaido-ginkgo-avenue|Koshu Kaido in Hachioji]].</p>
<p><strong>Late November</strong> is the big one. Central Tokyo's ginkgo avenues, like [[meiji-jingu-gaien-ginkgo-avenue]], go gold, and Kyoto's temples reach their peak at [[eikando-temple]], [[tofuku-ji-temple]] and [[nanzen-ji-temple]]. Tokyo's gardens, such as [[rikugien-garden]], carry on into early December.</p>
<p>There's one surprise too: some cherries flower in November. See <a href="/guides/cherry-blossoms-in-november">where to see cherry blossoms in November</a>.</p>

<h2>Is it crowded?</h2>
<p>Early and mid November are fairly relaxed. The last two weeks are a different matter. Kyoto in late November is one of the busiest times of the year, and the famous temples are packed from mid morning. There's also a public holiday on 23 November, so if it makes a long weekend, expect that to be especially busy.</p>
<p>If you're set on Kyoto, go to the big names at opening time, and book your hotel early. If you'd rather avoid the rush, come in the first half of the month and head for the mountains, or go to Tokyo, where the crowds spread across far more parks.</p>

<h2>When in November should you go?</h2>
<p>If you want peak leaves in both Tokyo and Kyoto, we'd aim for 20 November to early December. If you'd rather beat the crowds and don't mind travelling out of the cities, the first two weeks are excellent and noticeably calmer.</p>
<p>For the usual dates city by city, see <a href="/guides/autumn-leaves-season">when the autumn leaves turn</a>, and for everything in flower this month, see <a href="/when/november">November on the calendar</a>.</p>
`,
  },

  {
    slug: 'autumn-leaves-tokyo',
    h1: 'Where can you see autumn leaves in Tokyo?',
    title: 'Where to See Autumn Leaves in Tokyo: Gardens, Ginkgo Avenues and Day Trips',
    short: 'The best maple gardens and ginkgo avenues in the city, easy day trips, and when each one peaks.',
    desc: 'The best places to see autumn leaves in Tokyo: Rikugien, Shinjuku Gyoen, the Meiji Jingu Gaien ginkgo avenue, Showa Kinen Park and Mount Takao, with peak dates, light-ups, fees and stations.',
    published: '2026-10-29', updated: '2026-10-29',
    fl: [], img: 'meiji-jingu-gaien-ginkgo-avenue',
    sources: "Japan Meteorological Agency, maple colouring normals, 1991–2020; fees and opening times from each spot's official site.",
    body: `
<p class="answer"><strong>In central Tokyo, go to Rikugien for maples and the Meiji Jingu Gaien avenue for gold ginkgo.</strong> Both peak from late November into early December. For an easy day trip, Mount Takao colours from mid November and is about an hour from Shinjuku. Tokyo's sample maple usually turns around 28 November.</p>

<h2>Where are the best autumn leaves in central Tokyo?</h2>
<p>[[rikugien-garden]] is our pick for maples. It's an early 1700s stroll garden with about 560 maples, plus ginkgo and enkianthus around its pond. In late November and early December it opens at night with the trees lit up, on a separate ticket. Entry is 300 yen, and it's 7 minutes on foot from Komagome Station.</p>
<p>[[shinjuku-gyoen-ginkgo|Shinjuku Gyoen]] has the room the others don't. Great old ginkgos and maples stand around its lawns and ponds, and in mid November they're colouring together. It's 500 yen, closed on Mondays, and 5 minutes from Shinjuku-gyoemmae Station.</p>

<h2>Where are the best ginkgo trees in Tokyo?</h2>
<p>Ginkgo is Tokyo's official tree, and the city is full of it. The famous one is the [[meiji-jingu-gaien-ginkgo-avenue]]: 146 trees in four rows along a 300 m avenue, pruned into neat cones, gold from mid November to early December. It's busy at weekends, so go early on a weekday.</p>
<p>A few others worth knowing:</p>
<ul>
<li>[[university-of-tokyo-ginkgo-avenue|University of Tokyo, Hongo]]: a tall ginkgo avenue up to the Yasuda Auditorium. It's free, and the ginkgo leaf is the university's emblem.</li>
<li>[[yasukuni-shrine-ginkgo|Yasukuni Shrine]]: big ginkgos along the main approach from Kudanshita. Free.</li>
<li>[[hibiya-park-kubikake-ginkgo|Hibiya Park]]: the "neck-wager ginkgo", about 400 years old, moved here when the park was built. Free.</li>
<li>[[zenpuku-ji-temple-upside-down-ginkgo|Zenpuku-ji]] in Azabu: the biggest ginkgo in Tokyo, with branches that droop like roots. Free.</li>
</ul>

<h2>What are the best day trips for autumn leaves from Tokyo?</h2>
<p>[[mount-takao]] is the easy one: Keio Line from Shinjuku to Takaosanguchi, then the cable car or a hike up. The maples line the cable car route and surround Yakuo-in temple near the top, from mid November to early December. Weekend queues for the cable car can be long, so go early or on a weekday.</p>
<p>[[showa-kinen-park-ginkgo-avenue|Showa Kinen Park]] in Tachikawa has two long ginkgo avenues, and the fallen leaves turn the paths solid gold in mid to late November. It's 2 minutes from Nishi-Tachikawa Station, and entry is 450 yen.</p>
<p>Further out, Kamakura's [[engakuji-temple]] is right by Kita-Kamakura Station and colours from mid November. For the latest colour near Tokyo, [[yoro-valley]] in Chiba usually peaks in late November and early December. If you're coming earlier in the autumn, Nikko's [[irohazaka-and-lake-chuzenji]] is at its best from mid October to early November.</p>

<h2>When do the leaves peak in Tokyo?</h2>
<div class="gtable"><table>
<thead><tr><th>Spot</th><th>Usual peak</th></tr></thead>
<tbody>
<tr><td>Irohazaka and Lake Chuzenji (Nikko)</td><td>Mid October to early November</td></tr>
<tr><td>Mount Takao</td><td>Mid November to early December</td></tr>
<tr><td>Showa Kinen Park ginkgo</td><td>Mid to late November</td></tr>
<tr><td>Engaku-ji (Kamakura)</td><td>Mid November to early December</td></tr>
<tr><td>Meiji Jingu Gaien ginkgo</td><td>Mid November to early December</td></tr>
<tr><td>Shinjuku Gyoen</td><td>Mid November to early December</td></tr>
<tr><td>Rikugien</td><td>Late November to mid December</td></tr>
<tr><td>Yoro Valley (Chiba)</td><td>Late November to early December</td></tr>
</tbody></table></div>
<p>Ginkgo usually turns a little before the maples in the same place. So if you're in Tokyo in the third week of November, see the ginkgo first, and if you're there in early December, head for the maple gardens.</p>
<p>For other cities, see <a href="/guides/autumn-leaves-season">when the autumn leaves turn across Japan</a>. We track {{n:autumn-leaves}} autumn leaves spots and {{n:ginkgo}} ginkgo spots. <a href="/flowers/ginkgo">See the ginkgo</a>.</p>
`,
  },

  {
    slug: 'cherry-blossoms-in-november',
    h1: 'Can you see cherry blossoms in Japan in November?',
    title: 'Cherry Blossoms in November: Where to See Japan\'s Autumn Sakura',
    short: 'Yes, at a few places. Which cherries flower in autumn, where to see them, and what to expect.',
    desc: 'You can see cherry blossoms in Japan in November. Autumn-flowering cherries bloom alongside the red leaves at Obara in Aichi, Sakurayama Park in Gunma and Jomine Park in Saitama. What to expect and when to go.',
    published: '2026-10-29', updated: '2026-10-29',
    fl: [], img: 'obara-shikizakura',
    sources: "Bloom windows and tree counts from each spot's official or local tourism site.",
    body: `
<p class="answer"><strong>Yes, at a few places.</strong> A handful of cherry varieties flower in autumn, and in November you can see them next to the red maples. The best-known are Obara in Aichi, Sakurayama Park in Gunma and Jomine Park in Saitama. Just don't expect the clouds of pink you get in spring.</p>

<h2>Which cherries flower in the autumn?</h2>
<p>Three names come up. Shikizakura, the "four-season cherry", flowers twice a year: a light bloom from October into winter, then again in spring. Fuyuzakura, the "winter cherry", does the same. Jugatsuzakura, the "October cherry", is another twice-flowering kind, usually with double flowers.</p>
<p>They're all small, pale pink or white, and they flower in scattered bursts rather than all at once. A tree in November looks lightly dusted, not covered. What makes them special is the setting: pink blossom against red and gold leaves, which you can't see any other time of year.</p>

<h2>Where can you see cherry blossoms in November?</h2>
<p>[[obara-shikizakura|Obara]] in Toyota, Aichi is the biggest. About 10,000 shikizakura grow across the hills of the Obara district, and in mid to late November they flower among the maples. Kawami Shikizakura Park alone has about 1,200 trees, and the Obara shikizakura festival runs at the same time. You'll want a car, or a bus from central Toyota. [[korankei]], one of the best-known leaf spots in central Japan, is in the same city and peaks around the same weeks.</p>
<p>[[sakurayama-park-winter-cherries|Sakurayama Park]] in Fujioka, Gunma has about 7,000 fuyuzakura on a hillside. They flower with the autumn leaves from mid November to early December, and the combination has made it a national Place of Scenic Beauty and a Natural Monument. It's free, with parking for 500 yen, and there's a festival in early December with light-ups on weekends.</p>
<p>[[jomine-park-winter-cherries|Jomine Park]] in Kamikawa, Saitama is the earliest of the three. Its 600 winter cherries flower from late October to early December, and it holds evening light-ups. On weekends in season the roads around the park run one way.</p>

<h2>When is the best time to see them?</h2>
<p>Mid to late November, when the cherries and the leaves overlap. Earlier than that, the trees have flowers but the maples are still green. Later, the leaves fall and the blossom thins out.</p>
<p>Autumn cherries are a nice extra rather than a reason to fly to Japan. If cherry blossom is the main thing you want to see, plan for spring: here's <a href="/guides/cherry-blossom-season">when cherry blossom season is</a>. But if you're already here for the leaves, these are well worth a detour.</p>
<p>For everything else that's in season, see <a href="/guides/japan-in-november">is November a good time to visit Japan</a>.</p>
`,
  },

  {
    slug: 'winter-flowers-japan',
    h1: 'What flowers bloom in Japan in winter?',
    title: 'Winter Flowers in Japan: What Blooms from December to February',
    short: 'Narcissus, wintersweet, camellias, winter peonies, plum and the first cherries, with where to see each.',
    desc: 'Flowers that bloom in Japan in winter: narcissus on the coast, wintersweet, camellias, winter peonies under straw shelters, the first plum blossoms and Okinawa\'s January cherries. Where to see each and when.',
    published: '2026-10-29', updated: '2026-10-29',
    fl: ['camellia', 'narcissus', 'wintersweet'], img: 'echizen-coast-narcissus',
    sources: "Bloom windows, fees and access from each spot's official or local tourism site.",
    body: `
<p class="answer"><strong>More than you'd think.</strong> Wild narcissus cover the coast from late December, wintersweet fills the air with scent in January, and camellias flower right through the winter. Winter peonies are on show under straw shelters in Tokyo and Kamakura. By late January the first plum blossoms are out, and Okinawa's cherries are already in bloom.</p>

<h2>What flowers bloom in Japan in winter?</h2>
<div class="gtable"><table>
<thead><tr><th>Flower</th><th>When</th><th>Where to see it</th></tr></thead>
<tbody>
<tr><td>Sasanqua</td><td>Late November to December</td><td>Kayumi, Mie</td></tr>
<tr><td>Narcissus</td><td>Late December to February</td><td>Echizen coast, Awaji, Shimoda</td></tr>
<tr><td>Wintersweet</td><td>Mid December to February</td><td>Robai no Sato, Mount Hodo</td></tr>
<tr><td>Winter peony</td><td>January to February</td><td>Ueno Toshogu, Tsurugaoka Hachimangu</td></tr>
<tr><td>Camellia</td><td>December to March</td><td>Izu Oshima, Toshima</td></tr>
<tr><td>Okinawa cherries</td><td>Mid January to mid February</td><td>Nago, Motobu, Nakijin</td></tr>
<tr><td>Plum</td><td>Late January to March</td><td>Atami, Koishikawa Korakuen</td></tr>
</tbody></table></div>

<h2>Where can you see narcissus in Japan?</h2>
<p>On the coast, where they grow wild on cliffs facing the sea. The three best known are the [[echizen-coast-narcissus|Echizen coast]] in Fukui, above the Sea of Japan; [[nada-kuroiwa-narcissus-field|Nada-Kuroiwa]] on Awaji Island, where some five million flowers cover a steep slope (500 yen); and [[tsumekizaki-narcissus|Cape Tsumeki]] near Shimoda, with over three million on old coastal terraces. All three are at their best from late December into January or February.</p>
<p>Near Tokyo, [[jogashima-park]] at the tip of the Miura Peninsula has about 300,000 double-flowered narcissus from mid January to mid February. The scent's the thing: on a still day you smell them before you see them.</p>

<h2>What is wintersweet?</h2>
<p>A shrub called robai in Japanese, with waxy, pale yellow flowers on bare branches and a strong sweet scent. It's one of the first things to flower in the new year. [[robai-no-sato]] in Gunma has about 12,000 of them, at their peak in January. [[hodosan-wintersweet-garden|Mount Hodo]] above Nagatoro has about 3,000, from mid January to late February, with views over the Chichibu mountains.</p>
<p>In Tokyo, [[tadao-park-wintersweet|Tadao Park]] in Machida is free and usually peaks around New Year, and the [[kyodo-no-mori-museum-wintersweet|Kyodo no Mori Museum]] in Fuchu has about 130 trees from mid December.</p>

<h2>Where can you see camellias in Tokyo?</h2>
<p>Technically still in Tokyo: the Izu Islands are part of the city. The [[izu-oshima-camellia-garden|camellia garden on Izu Oshima]] covers 7 hectares, with about 1,000 cultivars, and its festival runs from early February into March. Smaller [[toshima-island-camellias|Toshima]] is about 80 percent camellia forest.</p>
<p>On the mainland, the hillside garden at [[hotel-chinzanso-tokyo-garden|Hotel Chinzanso]] in Mejiro has about 1,000 camellias of some 100 kinds, flowering in turn through the winter. Access can be limited to guests and diners, so check first.</p>

<h2>What are winter peonies?</h2>
<p>Peonies grown to flower in the depths of winter, each one under its own little straw shelter against the snow. The [[ueno-toshogu-peony-garden|Ueno Toshogu peony garden]] in Ueno Park shows about 160 of them from 1 January to late February (about 1,000 yen). In Kamakura, [[tsurugaoka-hachimangu-winter-peonies|Tsurugaoka Hachimangu]] opens its garden by the Genji Pond on New Year's Day with around 1,000 plants. For the spring peonies, see <a href="/guides/peony-season-japan">when peony season is</a>.</p>

<h2>Are there cherry blossoms in winter?</h2>
<p>Yes, in two places. Okinawa's deep pink cherries flower from mid January, at [[nago-central-park]], [[mount-yae-cherry-forest-park]] and [[nakijin-castle-ruins-cherry-blossoms]]. On the mainland, the [[atami-itokawa-cherry-blossoms|Atami cherries]] along the Itokawa river flower from early January, and they're free.</p>
<p>Plum takes over from late January. [[atami-plum-garden]] is one of the earliest, and in Tokyo [[koishikawa-korakuen]] has about 150 plum trees, the first of them open in December.</p>

<h2>Is winter a good time to see flowers in Japan?</h2>
<p>If you go in with the right idea, yes. December is the thinnest month: the autumn leaves are just finishing and the narcissus are only starting. From January it picks up fast. The big bonus is space. These are some of the quietest weeks of the year at most gardens, and winter light is clear.</p>
<p>Month by month: <a href="/when/december">December</a>, <a href="/when/january">January</a>, <a href="/when/february">February</a>.</p>
`,
  },

  {
    slug: 'peony-season-japan',
    h1: 'When is peony season in Japan?',
    title: 'Peony Season in Japan: When They Bloom and Where to See Them',
    short: 'Tree peonies in late April and May, winter peonies in January, and the gardens worth visiting.',
    desc: 'Peony season in Japan is mid April to mid May for tree peonies, with winter peonies on show in January and February. The best peony gardens: Ueno Toshogu, Hase-dera, Sukagawa, Higashimatsuyama and Yuushien.',
    published: '2026-10-29', updated: '2026-10-29',
    fl: ['peony'], img: 'hase-dera',
    sources: "Plant counts, fees and bloom windows from each garden's official or local tourism site.",
    body: `
<p class="answer"><strong>The main peony season in Japan is mid April to mid May.</strong> Around Tokyo and Nara the gardens peak in late April and early May, and further north, like Sukagawa in Fukushima, in early to mid May. There's a second, smaller season in winter, when a few gardens show peonies under straw shelters in January and February.</p>

<h2>When do peonies bloom in Japan?</h2>
<p>It depends which peony. Japan has two kinds in its gardens:</p>
<ul>
<li><strong>Botan</strong>, the tree peony, with huge flowers on woody stems. It flowers from mid April to early May, and it's what most peony gardens are about.</li>
<li><strong>Shakuyaku</strong>, the herbaceous peony, which dies back each winter. It flowers a few weeks later, from May into June.</li>
</ul>
<p>There's an old saying that a beautiful woman stands like a shakuyaku, sits like a botan and walks like a lily. The shakuyaku grows tall and straight, while the botan's flowers sit low and wide.</p>
<p>Then there are the winter peonies, botan grown to flower in January and February.</p>

<h2>Where can you see peonies near Tokyo?</h2>
<p>The [[ueno-toshogu-peony-garden|Ueno Toshogu peony garden]] is the one most people mean. It's in Ueno Park, 5 minutes from Ueno Station, with a winter show of about 160 plants from 1 January to late February and a spring show of about 500 in April. Entry is about 1,000 yen.</p>
<p>For a lot more flowers, [[higashimatsuyama-peony-garden|Higashimatsuyama]] in Saitama has about 6,500 peonies of some 150 kinds, from mid April to early May. Entry is 300 or 500 yen, depending on how far they're out, and it's a bus ride from Shinrin-koen Station. The [[machida-peony-garden]] in western Tokyo flowers from mid April to mid May.</p>
<p>In Kamakura, [[tsurugaoka-hachimangu-winter-peonies|Tsurugaoka Hachimangu]] has about 1,000 winter peonies by the Genji Pond from New Year's Day.</p>

<h2>Where are the best peony gardens in Japan?</h2>
<p>[[hase-dera]] in Nara is our favourite. About 7,000 peonies line the 399-step covered staircase up to the main hall, from mid April to early May, and the temple stays open longer during the festival. It's a 15 minute walk from Hasedera Station on the Kintetsu line.</p>
<p>[[sukagawa-peony-garden]] in Fukushima is a national Place of Scenic Beauty with about 7,000 peonies of 290 varieties, some over 200 years old. It peaks a little later, in early to mid May, and costs about 500 yen in season.</p>
<p>On Daikonshima, the peony-growing island in Lake Nakaumi in Shimane, [[yuushien-garden]] fills its pond with about 30,000 floating peony blooms around Golden Week.</p>

<h2>When's the best time to go?</h2>
<p>For tree peonies near Tokyo and Nara, the last week of April. Each flower only lasts a few days, so gardens with early and late kinds give you a longer window. A hot spell can bring the whole season forward, so check the garden's bloom report before you go.</p>
<p>Peonies overlap with wisteria and azaleas, so late April is a good time to combine them. See <a href="/guides/wisteria-spots">where to see wisteria</a>. We track {{n:peony}} peony spots. <a href="/flowers/peony">See them all</a>.</p>
`,
  },

  {
    slug: 'japanese-flowers-by-month',
    h1: 'What flowers bloom in Japan each month?',
    title: 'Japanese Flowers by Month: A Month-by-Month Bloom Calendar',
    short: 'A quick month-by-month table of what flowers in Japan, with the best place to see each.',
    desc: "What's in bloom in Japan each month: narcissus and wintersweet in January, plum in February, cherry blossom in March and April, wisteria in May, hydrangea in June, lavender in July, through to autumn leaves in November.",
    published: '2026-10-29', updated: '2026-10-29',
    fl: [], img: 'ashikaga-flower-park',
    sources: "Bloom windows from each spot's official or local tourism site.",
    body: `
<p class="answer"><strong>Something flowers in Japan every month.</strong> January is narcissus and wintersweet, February plum, late March and April cherry blossom, May wisteria and nemophila, June hydrangea and iris, July lavender and lotus, August sunflowers, September red spider lilies, October kochia and cosmos, November autumn leaves and ginkgo, and December the last leaves and the first narcissus.</p>

<h2>Japanese flowers by month</h2>
<div class="gtable"><table>
<thead><tr><th>Month</th><th>What's in bloom</th><th>Where to go</th></tr></thead>
<tbody>
<tr><td><a href="/when/january">January</a></td><td>Narcissus, wintersweet, winter peony, Okinawa cherries</td><td>[[nada-kuroiwa-narcissus-field|Nada-Kuroiwa]], [[robai-no-sato]]</td></tr>
<tr><td><a href="/when/february">February</a></td><td>Plum, camellia, Kawazu cherries</td><td>[[atami-plum-garden]], [[izu-oshima-camellia-garden|Izu Oshima]]</td></tr>
<tr><td><a href="/when/march">March</a></td><td>Plum, early cherries, then cherry blossom from late March</td><td>[[kairakuen-garden]], [[kawazu-river]]</td></tr>
<tr><td><a href="/when/april">April</a></td><td>Cherry blossom, tulips, shibazakura, nemophila</td><td>[[hirosaki-park]], [[hitsujiyama-park]]</td></tr>
<tr><td><a href="/when/may">May</a></td><td>Wisteria, nemophila, azalea, peony, roses</td><td>[[ashikaga-flower-park]], [[hitachi-seaside-park]]</td></tr>
<tr><td><a href="/when/june">June</a></td><td>Hydrangea, iris</td><td>[[meigetsu-in-temple]], [[horikiri-iris-garden]]</td></tr>
<tr><td><a href="/when/july">July</a></td><td>Lavender, lotus</td><td>[[farm-tomita]], [[kodaihasu-no-sato]]</td></tr>
<tr><td><a href="/when/august">August</a></td><td>Sunflowers, lotus</td><td>[[hokuryu-sunflower-village]], [[shinobazu-pond]]</td></tr>
<tr><td><a href="/when/september">September</a></td><td>Red spider lily, cosmos, kinmokusei</td><td>[[kinchakuda-manjushage-park]], [[showa-kinen-park]]</td></tr>
<tr><td><a href="/when/october">October</a></td><td>Kochia, cosmos, autumn roses, mountain leaves</td><td>[[hitachi-seaside-park-october|Hitachi Seaside Park]], [[konosu-cosmos-fields]]</td></tr>
<tr><td><a href="/when/november">November</a></td><td>Autumn leaves, ginkgo, chrysanthemum</td><td>[[eikando-temple]], [[meiji-jingu-gaien-ginkgo-avenue]]</td></tr>
<tr><td><a href="/when/december">December</a></td><td>Late leaves, wintersweet, narcissus begin</td><td>[[rikugien-garden]], [[tsumekizaki-narcissus|Cape Tsumeki]]</td></tr>
</tbody></table></div>
<p>These are the usual windows around Tokyo and Kyoto. The north and the mountains run about two to four weeks later in spring and earlier in autumn, and Okinawa is on a calendar of its own.</p>

<h2>Which month has the most flowers?</h2>
<p>April and May. Cherry blossom runs into tulips, shibazakura and nemophila, and then wisteria, azaleas and peonies all flower around Golden Week. If flowers are the reason for your trip and you can pick any month, we'd choose late April to mid May. Just avoid Golden Week itself, 29 April to 5 May, when the whole country's on holiday.</p>

<h2>Which month has the fewest?</h2>
<p>December. The leaves are finishing and winter flowers are only just starting. But even then there's narcissus on the coast and wintersweet in Tokyo, and you'll have the gardens almost to yourself. See <a href="/guides/winter-flowers-japan">winter flowers in Japan</a>.</p>

<h2>Do the dates change every year?</h2>
<p>Yes, by a week or more either way. A warm spring brings everything forward and a hot summer can delay the autumn flowers. Use this table to plan, then check the spot pages and local bloom reports nearer the time.</p>
<p>For the story behind each season, see <a href="/guides/flowers-by-season">Japan's flowers by season</a>. For every spot on one page, see the <a href="/calendar">flower calendar</a>.</p>
`,
  },

  {
    slug: 'red-spider-lily-season',
    h1: 'When do red spider lilies bloom in Japan?',
    title: 'Red Spider Lily Season in Japan: When They Bloom and Where to See Them',
    short: 'Usual dates, why they flower at the equinox, and the best fields near Tokyo and across Japan.',
    desc: 'Red spider lilies (higanbana) bloom in Japan from mid September to early October, peaking around the autumn equinox. The best places to see them: Kinchakuda in Saitama, Yakachi River in Aichi, and terraced rice fields in Nara, Fukuoka and Saga.',
    published: '2026-10-29', updated: '2026-10-29',
    fl: ['red-spider-lily'], img: 'kinchakuda-manjushage-park',
    sources: "Flower counts, fees and bloom windows from each spot's official or local tourism site.",
    body: `
<p class="answer"><strong>Red spider lilies bloom in Japan from mid September to early October, and they usually peak around the autumn equinox, about 23 September.</strong> That's where their Japanese name, higanbana, comes from: higan is the week around the equinox. A field is at its best for only about a week or two, and after a hot summer the flowers come later.</p>

<h2>When is red spider lily season?</h2>
<p>For most of Honshu, Kyushu and Shikoku, the second half of September. They're remarkably punctual in a normal year. In recent hot summers, though, they've often been a week or more late, running into early October. Some spots, like [[hagurosan-park]] in Miyagi, have also seen thinner flowering after the hottest years.</p>
<p>Our advice is to plan for the last ten days of September, then check the spot's bloom report a week before.</p>

<h2>Where are the best red spider lilies near Tokyo?</h2>
<p>[[kinchakuda-manjushage-park|Kinchakuda]] in Hidaka, Saitama is the biggest in Japan, with about 5 million flowers in the woods along a bend of the Koma River. During the festival it's 500 yen, and it's 15 minutes on foot from Koma Station on the Seibu Ikebukuro Line. The roads jam at weekends, so take the train.</p>
<p>[[gongendo-park]] in Satte has about 3 million under the cherry trees of the embankment, free. In Kanagawa, the [[hinata]] valley in Isehara has wild spider lilies along the rice fields, about 25 minutes by bus from Isehara Station. For a city option, [[koishikawa-korakuen-september|Koishikawa Korakuen]] has them among its paths and ponds (300 yen), 8 minutes from Iidabashi Station.</p>
<p>If you want something unusual, [[josen-ji-temple]] in Zama is known for white spider lilies flowering with the red (about 300 yen).</p>

<h2>Where else in Japan?</h2>
<p>In Aichi, the [[yakachi-river]] in Handa has about 3 million along 1.5 km of riverbank, planted by volunteers over many years. In Gifu, around 100,000 line 3 km of the [[tsuya-river]] below the Yoro mountains.</p>
<p>The prettiest settings are the terraced rice fields, where the red lines the ridges just as the rice turns gold: [[inabuchi-terraced-rice-fields|Inabuchi]] in Asuka, Nara; [[tsuzura-terraced-rice-fields|Tsuzura]] in Fukuoka, with some 500,000 flowers; and [[eriyama-rice-terraces|Eriyama]] in Saga. For a castle backdrop, they come up all over the stone walls of [[tsuyama-castle-september|Tsuyama Castle]] in Okayama.</p>

<h2>Why do they grow along rice fields?</h2>
<p>The bulbs are poisonous. The usual explanation is that farmers planted them on the ridges between paddies and around graves to keep moles and mice away, which is why you see them in neat red lines through the countryside. They're thought to have come to Japan from China long ago, possibly along with rice farming.</p>
<p>They're also odd plants. The flowers come up on bare stalks with no leaves at all. The leaves only appear after the flowers fade, stay green through the winter, and die back in spring.</p>

<h2>Are red spider lilies bad luck in Japan?</h2>
<p>They're linked with death, partly because they grow around graves and partly because they flower at higan, when people visit family graves. So you won't often see them in a bouquet. But that doesn't stop thousands of people going to see them every September, and the fields are some of the most striking sights of the Japanese autumn.</p>
<p>We track {{n:red-spider-lily}} red spider lily spots. <a href="/flowers/red-spider-lily">See them all</a>.</p>
`,
  },

  {
    slug: 'kochia-season',
    h1: 'When do kochia turn red in Japan?',
    title: 'Kochia Season in Japan: When They Turn Red, and Can You See Them in November?',
    short: 'When the kochia fields turn red, what is left by November, and where to see them.',
    desc: "Kochia in Japan turn red in October and are usually at their reddest around mid October. By November most fields, including Hitachi Seaside Park, have faded to gold or been cleared. Shima City Tourist Farm in Mie is the main field still red in November.",
    published: '2026-10-29', updated: '2026-10-29',
    fl: ['kochia'], img: 'hitachi-seaside-park-october',
    sources: "Plant counts and bloom windows from each spot's official or local tourism site; 2026 timing from Weathernews.",
    body: `
<p class="answer"><strong>Kochia in Japan turn red in October, and most fields are at their reddest around the middle of the month.</strong> They're green through the summer, go red over two or three weeks, then fade to russet and wheat gold in the last week of October. So if you're coming in November, you'll mostly find gold rather than red. The one big exception is <a href="#november">Shima in Mie</a>, which turns later.</p>

<h2>When do kochia turn red?</h2>
<p>The plants are a soft lime green through the summer and turn red as the nights cool. [[biwako-hakodateyama|Biwako Hakodateyama]] reckons on about 90 days for the whole change from green to red and gold. A field stays properly red for about two weeks, then goes red-brown and finally a pale gold.</p>
<p>Cooler places go first. The highland fields, all about 1,000 m up or more, turn first, in late September: [[hirugano-picnic-garden]] in Gifu, [[yuzawa-kogen-panorama-park]] in Niigata and [[tambara-lavender-park|Tambara]] in Gunma. So does [[takino-suzuran-hillside-park-october|Takino]] in Sapporo. Lowland fields near Tokyo follow in October.</p>

<h2>Hitachi Seaside Park</h2>
<p>[[hitachi-seaside-park-october|Hitachi Seaside Park]] in Ibaraki is the one in all the photos: about 40,000 kochia covering Miharashi Hill, with around 2.7 million yellow cosmos flowering below them at the same time. In a normal year they're reddest around mid October. Take the JR Joban Line from Ueno or Tokyo to Katsuta, then the bus to the park.</p>
<p>2026 was early. Weathernews put the peak at four or five days ahead of average and expected the red to last until about 20 October, with the red-brown stage after that. By the end of October the hill is gold. Then, in early November, the park pulls the kochia and cosmos out to get the hill ready for spring's nemophila. In 2025 that happened on a closed day in the first week of November.</p>

<h2 id="november">Can you see red kochia in November?</h2>
<p>Mostly no, but there's one good option. At [[shima-city-tourist-farm|Shima City Tourist Farm]], beside the Ise-Shima roadside station in Mie, the kochia go in later and turn red from late October into November, with cosmos in the same field. In 2025 they were still green on 22 October and were expected to start turning in early November, and the farm stayed open until 24 November. It's 300 yen, and free for junior high school students and younger. The timing moves with the weather, so call the Shima city agriculture section (0599-44-0288) before you go.</p>
<p>Elsewhere, an early November visit gets you gold kochia at best. That's still a pretty sight, but it's not the red in the photos. [[michinoku-lakeside-park|Michinoku Lakeside Park]] in Miyagi, for example, is usually red in early to mid October and wheat-coloured by the end of the month.</p>
<p>If you're in Japan in November and the kochia have gone, the autumn leaves are the thing to see. See <a href="/guides/japan-in-november">Japan in November</a> for what's on, and <a href="/guides/autumn-leaves-tokyo">autumn leaves in Tokyo</a> for the city.</p>

<h2>Other kochia fields near Tokyo</h2>
<p>Both of the big ones are in Chiba. [[tokyo-german-village|Tokyo German Village]] has 15,000 kochia in front of its fishing pond, turning from early October. [[mother-farm-october|Mother Farm]] has about 8,000 on the hillside above Tokyo Bay, usually at their best around the mid-October long weekend.</p>
<p>For Mount Fuji in the background, go to [[oishi-park-october|Oishi Park]] on the north shore of Lake Kawaguchi. It has rows of kochia in the lakeside beds, red from mid to late October, and it's free.</p>

<h2>Where else in Japan?</h2>
<p>Near Osaka, [[expo-70-commemorative-park-october|Expo '70 Commemorative Park]] has about 4,000 on its Flower Hill during the Cosmos and Kochia festival. Allow time for the long walk from the central gate. Above Lake Biwa, [[biwako-hakodateyama|Biwako Hakodateyama]] has about 8,000 at the top of the gondola, which is included in the ticket. In Fukuoka, [[uminonakamichi-seaside-park|Uminonakamichi Seaside Park]] on Hakata Bay is red for a week or two in mid to late October.</p>

<h2>What is kochia?</h2>
<p>It's a shrubby annual, <em>Bassia scoparia</em>, sometimes called summer cypress or burning bush. People go to see its foliage, since its flowers are tiny and green. In Japanese it's hōkigi, the "broom tree", because the dried plants were once tied into brooms. In Akita the seeds are eaten as tonburi, sometimes called "field caviar".</p>
<p>We track {{n:kochia}} kochia spots. <a href="/flowers/kochia">See them all</a>.</p>
`,
  },

  {
    slug: 'tofuku-ji-autumn-leaves',
    h1: 'When is the best time to see the autumn leaves at Tofuku-ji?',
    title: 'Tofuku-ji Autumn Leaves: Best Time, Crowds, and Fushimi Inari Nearby',
    short: "Peak dates for Kyoto's great maple ravine, how to beat the crowds, and Fushimi Inari one stop away.",
    desc: "Tofuku-ji's maples in Kyoto usually peak from mid November to early December, and the 2026 autumn viewing runs from 14 November to 6 December. How to beat the crowds on the Tsutenkyo bridge, and how to pair it with Fushimi Inari, one stop away.",
    published: '2026-10-30', updated: '2026-10-30',
    fl: [], spots: ['tofuku-ji-temple', 'jonangu-shrine'], img: 'tofuku-ji-temple',
    sources: "Dates and fees from Tofuku-ji's autumn viewing notices and Kyoto tourism listings.",
    body: `
<p class="answer"><strong>The maples at Tofuku-ji usually peak from mid November to early December, and the third and fourth weeks of November are the safest bet.</strong> In 2026 the temple's special autumn viewing runs from 14 November to 6 December, with the Tsutenkyo bridge opening earlier than usual. Go on a weekday, right at opening, because it's one of the most crowded places in Kyoto at peak.</p>

<h2>When do the leaves turn at Tofuku-ji?</h2>
<p>Kyoto is one of the last places in Japan to turn, and [[tofuku-ji-temple|Tofuku-ji]] runs with the rest of the city: colour starts in early November, peaks from around the middle of the month, and lasts into early December. A warm autumn pushes everything back by a week or so. For how Kyoto compares with the rest of the country, see <a href="/guides/autumn-leaves-season">when the leaves turn in each city</a>.</p>

<h2>What is the Tsutenkyo bridge?</h2>
<p>It's the covered wooden bridge across the Sengyokukan ravine, and it's the reason people come. About 2,000 maples fill the ravine below it, so from the bridge you look down onto the treetops, which is why the view gets called a sea of red clouds. Some of the trees are three-pointed Tsuten maples, said to have come from Song China. Expect to pay around 1,000 yen in autumn.</p>

<h2>How do you avoid the crowds?</h2>
<p>Come at opening on a weekday. At peak, weekends bring queues to get onto the bridge and a slow shuffle once you're on it. The temple says it may ban photography on the bridge when it's crowded, so don't plan your visit around the photo. The views from the paths down in the ravine are quieter, and you see the maples from below as well as above.</p>
<p>If you can only come at the weekend, go first thing or in the last hour before closing. The middle of the day is the worst time.</p>

<h2>Can you combine Tofuku-ji with Fushimi Inari?</h2>
<p>Yes, and it's an easy pairing. Fushimi Inari is one stop south, on either the JR Nara Line (Tofukuji to Inari) or the Keihan Line (Tofukuji to Fushimi-Inari). The shrine's tunnels of torii gates are open all day and all night with no entry fee, so you can do Tofuku-ji in the morning and Fushimi Inari later, when the day-trip crowds have thinned.</p>
<p>If you'd rather see the torii after dark with someone who knows the mountain, there's a <a href="https://www.getyourguide.com/kyoto-l96826/kyoto-fushimi-inari-night-walking-tour-t758261/?partner_id=HB90XTH&utm_medium=online_publisher" target="_blank" rel="sponsored noopener">guided Fushimi Inari night walking tour</a>.</p>

<h2>What's in flower nearby in spring?</h2>
<p>Come back in late February or March for [[jonangu-shrine|Jonangu]], a shrine in Fushimi with about 150 weeping plum trees and camellia petals scattered on the moss beneath them. The weeping plum and camellia festival runs from mid February to late March, garden entry is about 1,000 yen, and it's a 15 minute walk from Takeda Station.</p>

<h2>Where else in Kyoto for autumn leaves?</h2>
<p>[[eikando-temple|Eikando]] and [[nanzen-ji-temple|Nanzen-ji]] sit next to each other in the east of the city, and [[ruriko-in-temple|Ruriko-in]] in the north is known for maples reflected in a polished black desk (it opens only for special viewings, with timed booking at peak). We track {{n:autumn-leaves}} autumn leaves spots. <a href="/flowers/autumn-leaves">See them all</a>.</p>
`,
  },

  {
    slug: 'ueno-park-cherry-blossoms',
    h1: 'When do the cherry blossoms bloom in Ueno Park?',
    title: 'Ueno Park Cherry Blossoms: When to Go, Night Lanterns, and Asakusa Nearby',
    short: "When Ueno's 800 cherry trees peak, how to handle the crowds, and Sumida Park and Senso-ji three stops away.",
    desc: "Ueno Park's 800 cherry trees usually reach full bloom around the end of March, about a week after Tokyo's average opening date of 24 March. What to expect, when to beat the crowds, and how to pair it with Sumida Park and Senso-ji in Asakusa.",
    published: '2026-10-30', updated: '2026-10-30',
    fl: [], spots: ['ueno-park', 'sumida-park', 'shinobazu-pond', 'ueno-toshogu-peony-garden'], img: 'ueno-park',
    sources: "Tree counts and festival details from Taito and Sumida city tourism sites; average dates from the Japan Meteorological Agency.",
    body: `
<p class="answer"><strong>Ueno Park's cherry blossoms usually reach full bloom around the last days of March.</strong> Tokyo's cherries open on about 24 March in an average year and are at full bloom a week later, around 31 March, and Ueno runs with the city. Aim for the last few days of March or the first few days of April, and check the <a href="/guides/cherry-blossom-forecast">forecasts</a> from early March, because the date can move by ten days either way.</p>

<h2>What is Ueno Park like in cherry season?</h2>
<p>[[ueno-park|Ueno Park]] has about 800 cherry trees of some 50 kinds, and most of them line the wide central avenue. It's Tokyo's classic hanami spot: groups spread blue sheets under the trees and picnic all day. During the Ueno Cherry Blossom Festival, lanterns light the trees in the evening, and Ueno is counted among Japan's three great spots for night cherry blossoms.</p>
<p>It's also one of the busiest places in Tokyo at full bloom. A weekday morning is the calmest time. Weekend afternoons and evenings at peak are crowded enough that the avenue moves at walking pace.</p>

<h2>Is Sumida Park in Asakusa worth it too?</h2>
<p>Yes, and it's an easy add. [[sumida-park|Sumida Park]] has cherry trees along both banks of the Sumida River, a cherry spot since the Edo period, with Tokyo Skytree across the water. It's 5 minutes on foot from Asakusa Station, and Asakusa is three stops from Ueno on the Ginza Line. The Sumida Park Cherry Blossom Festival runs through the season.</p>
<p>Senso-ji, Tokyo's oldest temple, is a few minutes' walk from the river, so most people see both. If you'd like the history of the temple and the old streets around it explained, there's a <a href="https://www.getyourguide.com/tokyo-l193/tokyo-asakusa-and-tokyo-s-oldest-temple-senso-ji-tour-t695420/?partner_id=HB90XTH&utm_medium=online_publisher&cmp=tokyo-asakusa" target="_blank" rel="sponsored noopener">guided Asakusa and Senso-ji tour</a>.</p>

<h2>How do you see both in one day?</h2>
<p>Start at Ueno Park in the morning, before the picnic crowds settle in. Take the Ginza Line three stops to Asakusa, see Senso-ji, and walk down to the river for the afternoon at Sumida Park. If you still have energy, go back to Ueno after dark for the lanterns.</p>

<h2>What else flowers in Ueno through the year?</h2>
<p>Ueno isn't only about April. In January and February the peony garden at [[ueno-toshogu-peony-garden|Ueno Toshogu]] shows about 160 winter peonies under straw shelters, and a spring show follows in April with about 500 plants (entry about 1,000 yen). From mid July to mid August, lotus covers the southern part of [[shinobazu-pond|Shinobazu Pond]]. The flowers open early and close by midday, so go between about 7 and 9 am.</p>

<h2>Where else in Tokyo for cherry blossoms?</h2>
<p>[[chidorigafuchi]] has rowing boats under the trees along the old castle moat, and [[meguro-river|Meguro River]] is the one for evening lights over the water. For dates across Japan, see <a href="/guides/cherry-blossom-season">when cherry blossom season is</a>.</p>
`,
  },

  {
    slug: 'mount-fuji-flowers',
    h1: 'Where can you see flowers with Mount Fuji behind them?',
    title: 'Mount Fuji Flowers by Season: Cherry Blossoms, Shibazakura, Lavender and Kochia',
    short: 'The best flower views with Mount Fuji, month by month, and how to see them on a day trip from Tokyo.',
    desc: 'The best flower views with Mount Fuji, month by month: Chureito Pagoda cherry blossoms in early to mid April, the Fuji Shibazakura Festival from mid April to late May, Lake Kawaguchi lavender in early July and red kochia in October.',
    published: '2026-10-30', updated: '2026-10-30',
    fl: [], spots: ['arakurayama-sengen-park', 'fuji-motosuko-resort', 'oishi-park', 'oishi-park-april', 'oishi-park-october', 'hananomiyako-park', 'yagisaki-park', 'grinpa'], img: 'arakurayama-sengen-park',
    sources: "Plant counts, fees and bloom windows from each spot's official or local tourism site.",
    body: `
<p class="answer"><strong>Spring is the best time for flowers with Mount Fuji: cherry blossoms at the Chureito Pagoda in early to mid April, then pink shibazakura near Lake Motosu from mid April to late May.</strong> Summer brings lavender around Lake Kawaguchi in late June and early July, and October turns the kochia red. Whatever the season, go early in the day, because Fuji often hides behind cloud by the afternoon.</p>

<h2>Which month is best?</h2>
<div class="gtable"><table>
<thead><tr><th>When</th><th>Flower</th><th>Where</th></tr></thead>
<tbody>
<tr><td>Early - mid April</td><td>Cherry blossom</td><td>[[arakurayama-sengen-park|Chureito Pagoda]]</td></tr>
<tr><td>Mid April - late May</td><td>Shibazakura</td><td>[[fuji-motosuko-resort|Fuji Shibazakura Festival]]</td></tr>
<tr><td>Mid April - mid May</td><td>Nemophila</td><td>[[oishi-park-april|Oishi Park]], [[grinpa]]</td></tr>
<tr><td>Late April - early May</td><td>Tulips</td><td>[[hananomiyako-park|Hananomiyako Park]]</td></tr>
<tr><td>Late June - mid July</td><td>Lavender</td><td>[[oishi-park|Oishi Park]], [[yagisaki-park|Yagisaki Park]]</td></tr>
<tr><td>Mid - late October</td><td>Kochia</td><td>[[oishi-park-october|Oishi Park]]</td></tr>
</tbody>
</table></div>
<p>The area sits high, so everything flowers later than in Tokyo. The cherries at Chureito come a week or two after Tokyo's, and the tulips at Lake Yamanaka, about 1,000 m up, two or three weeks after the city's.</p>

<h2>When are the cherry blossoms at the Chureito Pagoda?</h2>
<p>Usually early to mid April. [[arakurayama-sengen-park|Arakurayama Sengen Park]] has about 650 cherry trees below the five-storey pagoda, with Fuji behind it: one of the most photographed views in Japan. It's 398 steps up the hillside from the shrine, and a 10 minute walk from Shimoyoshida Station on the Fujikyu Line. Get there early, because the viewing deck is crowded by mid morning.</p>

<h2>When is the Fuji Shibazakura Festival?</h2>
<p>From mid April to late May. [[fuji-motosuko-resort|The festival]] covers the ground near Lake Motosu with around 500,000 moss phlox in pink and white, right at the foot of the mountain. Adults pay 1,000 to 1,300 yen depending on the date, and the Fuji Shibazakura Liner bus runs from Kawaguchiko Station in about 40 minutes.</p>

<h2>What can you see at Lake Kawaguchi?</h2>
<p>[[oishi-park|Oishi Park]], on the north shore, looks straight across the lake to Fuji, and it's free. Its flower beds change with the seasons: nemophila from mid April, about 3,000 lavender plants for the Kawaguchiko Herb Festival in early July, and red kochia in October. [[yagisaki-park|Yagisaki Park]] on the same lake has about 80,000 lavender plants, most of the lavender around the lake.</p>
<p>Two more spring options: tulips with Fuji behind them at [[hananomiyako-park|Hananomiyako Park]] above Lake Yamanaka (the flower fields are free), and about 32,000 nemophila at [[grinpa|Grinpa]], a theme park about 1,200 m up on Fuji's southern side.</p>

<h2>Will you actually see Mount Fuji?</h2>
<p>Not on every day. The mountain is often hidden by cloud or haze, more so in spring and summer than in winter, and the clouds tend to build up as the day goes on. Your best chance is the early morning. If the forecast is cloudy for your only day, the flowers are still there, but plan around the clearest morning you can.</p>

<h2>Can you do it as a day trip from Tokyo?</h2>
<p>Yes. Lake Kawaguchi is reachable by express bus from Shinjuku or by the Fuji Excursion train, and from there local buses run to the lakes and the shibazakura. If you'd rather not plan the connections, there's a <a href="https://www.getyourguide.com/tokyo-l193/tokyo-mt-fujichureito-pagodalake-kawaguchioshino-hakkai-t792363/?partner_id=HB90XTH&utm_medium=online_publisher" target="_blank" rel="sponsored noopener">day trip from Tokyo to the Chureito Pagoda, Lake Kawaguchi and Oshino Hakkai</a>, the village of spring-fed ponds at the foot of the mountain. It doesn't go to the shibazakura festival.</p>
<p>For cherry blossom dates across Japan, see <a href="/guides/cherry-blossom-season">when cherry blossom season is</a>.</p>
`,
  },

  {
    slug: 'igano-flower-garden',
    h1: 'When is the best time to visit Igano Flower Garden?',
    title: 'Igano Flower Garden in Minakami: Red Kochia and Chrysanthemums',
    short: "When the kochia turn red at this small hillside field in Gunma, the chrysanthemums that follow, and how to get there.",
    desc: "Igano Flower Garden (Igano no Hanabatake) in Minakami, Gunma is a hillside field of kochia and small chrysanthemums. The kochia start turning red in early October and peak around mid October, then the chrysanthemums take over into early November.",
    published: '2026-10-30', updated: '2026-10-30',
    fl: [], spots: ['igano-flower-garden'], img: 'igano-flower-garden',
    sources: "Dates from Gunma Prefecture's autumn listings and the garden's own notices.",
    body: `
<p class="answer"><strong>Go in mid October for the red kochia, or in late October and early November for the small chrysanthemums.</strong> At Igano Flower Garden, known locally as Igano no Hanabatake, the kochia usually start turning red in early October and are at their reddest around the middle of the month. As they fade, the chrysanthemums planted alongside them come into full flower. Soon after that, the field is cleared and goes back to farmland until spring.</p>

<h2>What is Igano Flower Garden?</h2>
<p>[[igano-flower-garden|Igano Flower Garden]] is a small flower field on a hillside in Haba, in the Tsukiyono area of Minakami in northern Gunma. Its own name for it is "the hill of broom grass and small chrysanthemums": broom grass (hōkigusa) is the Japanese name for kochia. It's planted out each spring, and there's a viewing deck where you can look over the whole field as well as walk among the plants. Don't expect the scale of Hitachi Seaside Park. It's a small local field, which is part of its appeal.</p>

<h2>When do the kochia turn red?</h2>
<p>In a normal year, colour starts in early October and peaks around mid October. The garden says you can see autumn colour twice here: first the red of the kochia, then the chrysanthemums as the kochia fade to brown. By the first week of November the chrysanthemums are in full flower, and the field is cleared not long after.</p>
<p>The timing moves by a week or so with the weather, so check the garden's notices before a late visit. For other fields and how kochia change through the season, see <a href="/guides/kochia-season">when kochia turn red in Japan</a>.</p>

<h2>Is there an entry fee?</h2>
<p>No entry fee is listed, and there's a car park. You can bring your own food. Events are sometimes held in the field in October, with stalls and live music, and there have been free broom-making sessions using the dried kochia.</p>

<h2>How do you get there?</h2>
<p>By car. It's about 10 minutes from Tsukiyono IC on the Kan-Etsu Expressway, and about 10 minutes from Takumi no Sato. Public transport to this part of Minakami is sparse, so most visitors drive.</p>

<h2>What else is nearby?</h2>
<p>Takumi no Sato, the craft village 10 minutes away, has workshops for straw craft, bamboo craft and pressed flowers, which makes an easy half day with the garden. For a bigger kochia field in Gunma, [[tambara-lavender-park|Tambara]] on the highlands in Numata has about 10,000 kochia, and it turns earlier, from late September.</p>
<p>We track {{n:kochia}} kochia spots. <a href="/flowers/kochia">See them all</a>.</p>
`,
  },
];
