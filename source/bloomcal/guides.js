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
];
