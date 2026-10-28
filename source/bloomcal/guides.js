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
<p>Don't plan around a single date months ahead. The dates swing a lot: Tokyo's cherries opened on 14 March in 2020, 2021 and 2023, ten days before normal. Book a flexible week, keep the cities you visit in an order you can swap, and check the forecasts once they start appearing in the new year.</p>

<h2>Can you see cherry blossoms outside March and April?</h2>
<p>Yes, which is handy if your dates are fixed. At the early end, Okinawa's cherries peak from late January, at places like [[nago-central-park]] and [[nakijin-castle-ruins-cherry-blossoms]]. The Kawazu cherries along the [[kawazu-river]] in Izu flower from mid February into early March.</p>
<p>At the late end, the north is at its best from mid April into May. [[hirosaki-park|Hirosaki Park]] is the one we'd pick if you can only go late: when the petals fall they cover the castle moat in pink. In Hokkaido, [[matsumae-park]] and [[goryokaku-park]] flower from late April into May.</p>

<h2>Where should you go?</h2>
<p>In Tokyo, [[chidorigafuchi]] is worth the crowds: you can rent a rowing boat under the trees along the old castle moat. [[meguro-river|Meguro River]] is lovely but packed at weekends, so go on a weekday morning. In Kyoto, the [[philosopher-s-path]] and [[daigo-ji-temple]] are the classics. [[mount-yoshino]] near Nara has thousands of trees planted up the mountainside, so the bloom climbs the slope over a few weeks in April.</p>
<p>We track {{n:cherry-blossom}} cherry blossom spots across Japan, each with its usual peak and how to get there. <a href="/flowers/cherry-blossom">See them all</a>.</p>
`,
  },
];
