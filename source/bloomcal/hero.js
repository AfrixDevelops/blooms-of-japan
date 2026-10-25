/* Seasonal hero, botanical-print style: two large watercolour flowers per season
   framed by gold rings, kanji labels and drifting petals, all on washi paper.
   Season comes from today's date; /?season=spring etc. previews another. */
(function () {
  const FLOWERS = {
    sakura:  { kanji: '桜',     name: 'Sakura',  en: 'Cherry blossom', jp: '春の訪れ・はかなさの美しさ', mean: 'New beginnings, and the beauty of things that don’t last' },
    ume:     { kanji: '梅',     name: 'Ume',     en: 'Plum blossom',   jp: '忍耐・生命力・吉祥',         mean: 'Perseverance, resilience and good fortune' },
    ajisai:  { kanji: '紫陽花', name: 'Ajisai',  en: 'Hydrangea',      jp: '移ろい・辛抱強い愛',         mean: 'Colour that shifts with the rainy season' },
    asagao:  { kanji: '朝顔',   name: 'Asagao',  en: 'Morning glory',  jp: '結束・愛情の絆',             mean: 'Bonds and affection — open only at dawn' },
    momiji:  { kanji: '紅葉',   name: 'Momiji',  en: 'Autumn maple',   jp: '大切な思い出・美しい変化',   mean: 'Precious memories and beautiful change' },
    kiku:    { kanji: '菊',     name: 'Kiku',    en: 'Chrysanthemum',  jp: '高貴・長寿',                 mean: 'Nobility and a long life' },
    tsubaki: { kanji: '椿',     name: 'Tsubaki', en: 'Camellia',       jp: '控えめな素晴らしさ',         mean: 'Quiet excellence through the cold months' },
    suisen:  { kanji: '水仙',   name: 'Suisen',  en: 'Narcissus',      jp: '神秘・雪中花',               mean: 'Mystery — “the flower that blooms in snow”' },
  };

  const SEASONS = {
    spring: { label: 'Spring in Japan', kanji: '春', dot: '#C9637A', acc: '#B4506A', pair: ['sakura', 'ume'],     petal: 'sakura' },
    summer: { label: 'Summer in Japan', kanji: '夏', dot: '#5F78B8', acc: '#4F66A6', pair: ['ajisai', 'asagao'],  petal: 'floret' },
    autumn: { label: 'Autumn in Japan', kanji: '秋', dot: '#C0502E', acc: '#A8442A', pair: ['momiji', 'kiku'],    petal: 'maple'  },
    winter: { label: 'Winter in Japan', kanji: '冬', dot: '#9B2D42', acc: '#8E2A40', pair: ['tsubaki', 'suisen'], petal: 'snow'   },
  };

  const PETAL = {
    sakura: '<svg viewBox="-12 -14 24 26"><path d="M0 11C-6 6-10 0-6-8-4-12-1-12 0-9 1-12 4-12 6-8 10 0 6 6 0 11Z" fill="#F2BCC7"/><path d="M0 11C-2 4-1-3 0-8" stroke="#E08CA0" stroke-width="1" fill="none" opacity=".6"/></svg>',
    floret: '<svg viewBox="-12 -12 24 24"><g fill="#97A6DD" opacity=".9"><ellipse cy="-6" rx="4.6" ry="6"/><ellipse cy="6" rx="4.6" ry="6"/><ellipse cx="-6" rx="6" ry="4.6"/><ellipse cx="6" rx="6" ry="4.6"/></g><circle r="1.6" fill="#F7F3EA"/></svg>',
    maple:  '<svg viewBox="-14 -14 28 28"><path d="M0 12L0 4M0 4-11-2-6-3-10-9-4-7-3-13 0-8 3-13 4-7 10-9 6-3 11-2Z" fill="#D2502C" stroke="#D2502C" stroke-width="1.2" stroke-linejoin="round"/></svg>',
    snow:   '<svg viewBox="-10 -10 20 20"><circle r="6" fill="#FFFFFF" opacity=".95"/><circle r="6" fill="none" stroke="#C9C2B4" stroke-width=".8" opacity=".7"/></svg>',
  };

  // deterministic scatter so a season always looks the same
  const rnd = s => () => (s = s * 16807 % 2147483647) / 2147483647;
  const RING = '<svg class="ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49" pathLength="1"/><circle class="in" cx="50" cy="50" r="45.5" pathLength="1"/></svg>';

  function petals(key, count) {
    const r = rnd(key.length * 977 + 13);
    return Array.from({ length: count }, () => {
      const x = (r() * 100).toFixed(1), s = Math.round(12 + r() * 16), d = (11 + r() * 10).toFixed(1),
            dl = (-r() * 20).toFixed(1), dx = Math.round(-80 + r() * 200), rot = Math.round(180 + r() * 540);
      return `<i class="pt" style="--x:${x}%;--s:${s}px;--d:${d}s;--dl:${dl}s;--dx:${dx}px;--r:${rot}deg">${PETAL[SEASONS[key].petal]}</i>`;
    }).join('');
  }

  // phones get the 800px files; the same sizes are used by the preload in the page head
  // phone sizes are understated on purpose: those flowers sit faded behind the text, so 800px is plenty even at 3x
  const SIZES = { l: '(max-width:880px) 60vw, 56vw', r: '(max-width:880px) 60vw, 50vw' };
  const srcset = f => `/art/${f}-sm.webp 800w, /art/${f}.webp 1200w`;
  function bloom(side, flower) {
    return `<div class="bloom ${side}" data-par="${side === 'l' ? '-0.16' : '0.1'}">${RING}
      <div class="sway"><div class="flip"><img src="/art/${flower}.webp" srcset="${srcset(flower)}" sizes="${SIZES[side]}" alt="" draggable="false" fetchpriority="high"></div></div></div>`;
  }
  function tag(side, flower) {
    const f = FLOWERS[flower];
    return `<div class="tagk ${side}"><span class="kbox">${f.kanji}</span>
      <div><b>${f.name}</b><i>${f.en}</i><span class="jl">${f.jp}</span></div></div>`;
  }

  // mode 'hero' fills the page top; 'card' is the smaller panel on the seasons page
  function build(key, mode) {
    const sc = SEASONS[key], [a, b] = sc.pair;
    const centre = mode === 'card' ? `<div class="pair">
        ${[a, b].map(k => `<div><span class="kbox">${FLOWERS[k].kanji}</span><b>${FLOWERS[k].name}</b><i>${FLOWERS[k].mean}</i></div>`).join('')}
      </div>` : tag('l', a) + tag('r', b);
    return `<div class="bscene ${mode || 'hero'}" style="--acc:${sc.acc}">
      ${bloom('l', a)}${bloom('r', b)}${centre}
      <div class="petals" aria-hidden="true">${petals(key, mode === 'card' ? 10 : 18)}</div></div>`;
  }

  const ART = Object.fromEntries(Object.entries(SEASONS).map(([k, v]) =>
    [k, { label: v.label, dot: v.dot, dark: false }]));

  const m = new Date().getMonth() + 1;
  const auto = (m >= 3 && m <= 5) ? 'spring' : (m >= 6 && m <= 8) ? 'summer'
             : (m >= 9 && m <= 11) ? 'autumn' : 'winter';
  let current = null;

  function render(key) {
    if (!SEASONS[key]) key = auto;
    if (key === current) return;
    current = key;
    const host = document.getElementById('heroart');
    if (!host) return;
    host.innerHTML = build(key, 'hero');
    const hero = host.closest ? host.closest('.hero') : null;
    if (hero && hero.style) hero.style.setProperty && hero.style.setProperty('--acc', SEASONS[key].acc);

    const tagEl = document.getElementById('seasontag');
    if (tagEl) tagEl.innerHTML = `<i></i>${ART[key].label}${key === auto ? ' · right now' : ' · preview'}<i></i>`;

    const pick = document.getElementById('seasonpick');
    if (pick) pick.innerHTML = Object.entries(SEASONS).map(([k, v]) =>
      `<a href="/${k === auto ? '' : '?season=' + k}" class="${k === key ? 'on' : ''}" aria-label="${v.label}"${k === key ? ' aria-current="true"' : ''}>
        <span class="kbox">${v.kanji}</span><small>${k}</small></a>`).join('');
  }

  window.HeroArt = { build, render, ART, SEASONS, FLOWERS, auto, srcset };
  render(auto);
})();
