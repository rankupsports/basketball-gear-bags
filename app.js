/* =========================================================
   RANKUP SPORTS 2026 SUMMER — campaign LP
   Every photo slot points at the one supplied key visual;
   swap PHOTO (or the per-item `ph`) when real shots land.
   ========================================================= */
(() => {
  'use strict';

  // The one supplied key visual lives in styles.css (`.ph`); every
  // photo on the page is a sprite crop of it.

  /* ---- catalogue ------------------------------------------------
     `crop` = [background-position-x%, -y%, background-size%] into
     the single key visual, so each thumbnail frames its own product
     instead of repeating the whole collage.
     ---------------------------------------------------------------- */
  const ITEMS = {
    barrel:   { name: 'SHOE BARREL BAG',    yen: '¥6,600', crop: [32, 62, 300] },
    rope:     { name: 'ROPE STRAP',         yen: '¥2,420', crop: [ 2, 84, 300] },
    ropeBlue: { name: 'ROPE STRAP (BLUE)',  yen: '¥2,420', crop: [ 2, 78, 340] },
    ropePink: { name: 'ROPE STRAP (PINK)',  yen: '¥2,420', crop: [ 2, 96, 340] },
    ropeGray: { name: 'ROPE STRAP (GRAY)',  yen: '¥2,420', crop: [20, 95, 340] },
    ballBag:  { name: 'DRAWSTRING BALL BAG',yen: '¥4,950', crop: [92, 94, 300] },
    bottle:   { name: 'VACUUM BOTTLE 500ml',yen: '¥3,630', crop: [98, 76, 320] },
    towel:    { name: 'CHECK HANDKERCHIEF', yen: '¥990',   crop: [70, 11, 320] },
    pouch:    { name: 'FIRST AID POUCH',    yen: '¥1,760', crop: [95, 43, 300] },
    tee:      { name: 'DRY TEE',            yen: '¥3,300', crop: [53, 40, 300] },
    shorts:   { name: 'COURT SHORTS',       yen: '¥4,400', crop: [50, 68, 300] },
    socks:    { name: 'CREW SOCKS',         yen: '¥770',   crop: [46, 99, 380] },
    shoes:    { name: 'COURT SNEAKERS',     soon: '8/1 ON SALE', crop: [40,  6, 300] },
    cap:      { name: 'MESH CAP',           soon: '8/1 ON SALE', crop: [50, 23, 320] },
    keyring:  { name: 'ROPE KEYRING',       yen: '¥1,320', crop: [ 6, 86, 380] },
    band:     { name: 'HAIR BAND',          yen: '¥880',   crop: [20, 92, 380] }
  };

  /* ---- look sections -------------------------------------------- */
  const LOOKS = {
    1: [
      { credit: 'MODEL A', items: ['barrel','rope','shoes','socks'],
        chat: [
          { s:'l', t:'今日の荷物、これで全部' },
          { s:'r', t:'全部って何が入ってるの' },
          { s:'l', ph:true },
          { s:'r', t:'多すぎでは？？' } ] },
      { credit: 'MODEL A', items: ['ballBag','bottle','tee','shorts','towel'],
        chat: [
          { s:'l', t:'水筒、横に寝かせて入るのが good' },
          { s:'r', t:'たしかに立てると倒れるんだよね' },
          { s:'l', t:'これは正解だった' } ] },
      { credit: 'MODEL A', items: ['pouch','towel','keyring'],
        chat: [
          { s:'l', t:'絆創膏どこやった' },
          { s:'r', t:'外ポケット' },
          { s:'r', t:'いつもそこ' },
          { s:'l', t:'あった ありがと' } ] },
      { credit: 'MODEL A', items: ['ropeBlue','ropePink','ropeGray','band'],
        chat: [
          { s:'l', t:'3色そろえちゃった' },
          { s:'r', t:'えっ全部買ったの' },
          { s:'l', t:'シューズに合わせる用' },
          { s:'r', t:'そこまで考えてるの強い' } ] },
      { credit: 'MODEL A', items: ['shoes','socks','cap'],
        chat: [
          { s:'l', ph:true },
          { s:'l', t:'新しいシューズおろした' },
          { s:'r', t:'まだ白い' },
          { s:'r', t:'来週には終わってる' } ] },
      { credit: 'MODEL A', items: ['barrel','ballBag','bottle','pouch'],
        chat: [
          { s:'l', t:'まとめるとこんな感じ' },
          { s:'r', t:'意外とすっきりして見える' },
          { s:'l', t:'中身は詰まってる' } ] }
    ],
    2: [
      { credit: 'MODEL B', items: ['ballBag','cap'],
        chat: [
          { s:'l', t:'ボール入れ、肩から掛けられるの助かる' },
          { s:'r', t:'両手あくのでかい' },
          { s:'l', t:'自転車のときこれ一択' } ] },
      { credit: 'MODEL B', items: ['rope','socks','tee','shorts','keyring','band'],
        chat: [
          { s:'l', t:'today\'s color はブルー' },
          { s:'r', ph:true },
          { s:'r', t:'昨日ピンクじゃなかった？' },
          { s:'l', t:'毎日変えてます' } ] },
      { credit: 'MODEL B', items: ['bottle','towel'],
        chat: [
          { s:'l', t:'氷入れすぎて重い' },
          { s:'r', t:'夏だししょうがない' },
          { s:'l', t:'3限で溶けてた' } ] },
      { credit: 'MODEL B', items: ['barrel','ropeBlue','ropePink'],
        chat: [
          { s:'l', t:'ストラップ付け替えた' },
          { s:'r', t:'同じバッグに見えない' },
          { s:'l', t:'それが狙い' } ] },
      { credit: 'MODEL B', items: ['pouch','keyring','cap','socks'],
        chat: [
          { s:'l', t:'小物、全部この中' },
          { s:'r', ph:true },
          { s:'r', t:'鍵もそこ入れてるの？' },
          { s:'l', t:'なくすので' } ] },
      { credit: 'MODEL B', items: ['barrel','ballBag','shoes'],
        chat: [
          { s:'l', t:'これで練習も寄り道もいける' },
          { s:'r', t:'荷物ひとつで済むのはえらい' },
          { s:'l', t:'そこがいちばん大事' } ] }
    ]
  };

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* =========================================================
     LOADER
     ========================================================= */
  const loader = $('#loader');
  const hideLoader = () => loader && loader.classList.add('is-done');
  window.addEventListener('load', () => setTimeout(hideLoader, 1200));
  setTimeout(hideLoader, 3500); // never trap the page behind a slow asset

  /* =========================================================
     NAV
     ========================================================= */
  const navBtn = $('#navBtn');
  const drawer = $('#navDrawer');
  const setNav = (open) => {
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    navBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  navBtn.addEventListener('click', () => setNav(!drawer.classList.contains('is-open')));
  $$('a', drawer).forEach(a => a.addEventListener('click', () => setNav(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });

  /* =========================================================
     TICKER
     ========================================================= */
  const ticker = $('#ticker1');
  if (ticker) {
    const words = ['PACK LIGHT', 'PLAY LOUD', '2026 SUMMER', 'RANKUP SPORTS'];
    // duplicated once so the -50% keyframe loops seamlessly
    ticker.innerHTML = [...words, ...words]
      .map(w => `<span>${w}</span>`).join('');
  }

  /* =========================================================
     LOOK ITEMS
     ========================================================= */
  const productCard = (key) => {
    const it = ITEMS[key];
    if (!it) return '';
    const action = it.soon
      ? `<span class="credits__buy credits__buy--soon">${it.soon}</span>`
      : `<a class="credits__buy" href="#">BUY</a>`;
    const [x, y, s] = it.crop;
    return `
      <div class="credits__item">
        <div class="credits__ph ph" role="img" aria-label="${it.name}"
             style="--bp:${x}% ${y}%;--bs:${s}%"></div>
        <p class="credits__name">${it.name}</p>
        <p class="credits__yen">${it.yen || ''}</p>
        ${action}
      </div>`;
  };

  const chatRow = (m) => {
    const side = m.s === 'r' ? 'chat__row--r' : '';
    const body = m.ph
      ? `<span class="chat__ph ph" role="img" aria-label="投稿写真"></span>`
      : `<p class="chat__msg">${m.t}</p>`;
    return `
      <div class="chat__row ${side}">
        <span class="chat__face ph" aria-hidden="true"></span>
        ${body}
      </div>`;
  };

  const lookItem = (data, i) => {
    // slide 1 = the full look, slides 2-3 = detail crops of its items
    const views = [
      '--bp:50% 34%;--bs:cover',
      ...data.items.slice(0, 2).map(k => {
        const [x, y, s] = ITEMS[k].crop;
        return `--bp:${x}% ${y}%;--bs:${Math.round(s * 0.72)}%`;
      })
    ];
    return `
    <article class="lookItem">
      <div class="slider" data-slider>
        <div class="slider__box">
          ${views.map((v, n) => `
            <div class="slider__slide ph${n === 0 ? ' is-now' : ''}" style="${v}"
                 role="img" aria-label="${data.credit} look ${i + 1}-${n + 1}"></div>`).join('')}
          <span class="slider__credit">${data.credit}</span>
          <button class="slider__arrow slider__arrow--prev" type="button" aria-label="前へ">‹</button>
          <button class="slider__arrow slider__arrow--next" type="button" aria-label="次へ">›</button>
          <div class="slider__dots"></div>
        </div>
      </div>

      <div class="lookNav">
        <button class="lookNav__heart" type="button" aria-label="いいね" aria-pressed="false">
          <span class="lookNav__pop" aria-hidden="true">🧡</span>
          <svg viewBox="0 0 24 24"><path d="M12 21s-8.6-5.3-11-10.2C-.6 6.9 1.9 3 5.7 3 8 3 10 4.3 11 6.3 12 4.3 14 3 16.3 3c3.8 0 6.3 3.9 6.7 7.8C20.6 15.7 12 21 12 21z"/></svg>
        </button>
        <span class="lookNav__likes" data-likes>${120 + i * 37} likes</span>
        <span class="tag lookNav__tag">${data.items.length} items</span>
      </div>

      <div class="credits">${data.items.map(productCard).join('')}</div>
      <div class="chat">${data.chat.map(chatRow).join('')}</div>
    </article>`;
  };

  $$('.look__items').forEach(host => {
    const set = LOOKS[host.dataset.look] || [];
    host.innerHTML = set.map(lookItem).join('');
  });

  /* =========================================================
     ALL ITEMS grids
     ========================================================= */
  $$('.allitems').forEach(sec => {
    const scope = sec.dataset.look;
    const keys = scope === 'all'
      ? Object.keys(ITEMS)
      : [...new Set((LOOKS[scope] || []).flatMap(l => l.items))];
    $('.allitems__grid', sec).innerHTML = keys.map(productCard).join('');
  });

  /* =========================================================
     SLIDERS
     ========================================================= */
  $$('[data-slider]').forEach(sl => {
    const slides = $$('.slider__slide', sl);
    const dots   = $('.slider__dots', sl);
    let now = 0;

    dots.innerHTML = slides.map((_, i) =>
      `<button type="button" aria-label="${i + 1}枚目"${i === 0 ? ' class="is-now"' : ''}></button>`).join('');
    const dotBtns = $$('button', dots);

    const go = (i) => {
      now = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('is-now', n === now));
      dotBtns.forEach((d, n) => d.classList.toggle('is-now', n === now));
    };

    $('.slider__arrow--prev', sl).addEventListener('click', () => go(now - 1));
    $('.slider__arrow--next', sl).addEventListener('click', () => go(now + 1));
    dotBtns.forEach((d, i) => d.addEventListener('click', () => go(i)));

    // swipe
    let x0 = null;
    sl.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    sl.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(now + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  });

  /* =========================================================
     LIKES
     ========================================================= */
  $$('.lookNav__heart').forEach(btn => {
    btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!on));
      btn.classList.toggle('is-liked', !on);
      const label = btn.parentElement.querySelector('[data-likes]');
      const n = parseInt(label.textContent, 10);
      label.textContent = `${on ? n - 1 : n + 1} likes`;
    });
  });

  const bigHeart = $('#likeHeart');
  if (bigHeart) {
    const count = $('#likeCount');
    bigHeart.addEventListener('click', () => {
      const on = bigHeart.getAttribute('aria-pressed') === 'true';
      bigHeart.setAttribute('aria-pressed', String(!on));
      count.textContent = on ? 0 : 1;
    });
  }

  /* =========================================================
     SCROLL REVEAL — .lookItem / .reveal / .pop all opt in by
     class; `.pop` staggers its own children via --d.
     ========================================================= */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.lookItem, .reveal, .pop, .cast__item').forEach(el => io.observe(el));

  /* =========================================================
     HEADER — hide going down, show coming back up
     ========================================================= */
  const head = $('#head');
  let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    head.classList.toggle('is-solid', y > 80);
    head.classList.toggle('is-hidden', y > 320 && y > lastY && !drawer.classList.contains('is-open'));
    lastY = y;
  }, { passive: true });

  /* =========================================================
     SECTION BACKGROUND — the sticky colour layer behind the
     look sections cross-fades as each one takes the viewport.
     ========================================================= */
  const bgLayer = document.createElement('div');
  bgLayer.className = 'looksBg';
  const sideCont = $('.sideCont');
  if (sideCont) {
    sideCont.prepend(bgLayer);
    const zones = $$('[data-bg]');
    const bgIo = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) bgLayer.style.background = en.target.dataset.bg;
      });
    }, { threshold: 0.35 });
    zones.forEach(z => bgIo.observe(z));
  }
})();
