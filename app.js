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
      { credit: 'Cora', items: ['barrel','rope','shoes','socks'],
        chat: [
          { s:'l', t:'Heyyyyy' },
          { s:'l', t:"What's this!?" },
          { s:'l', t:'I packed my whole gym bag!!' },
          { s:'r', ph:true },
          { s:'r', t:'Looks so heavy <3' } ] },
      { credit: 'Cora', items: ['ballBag','bottle','tee','shorts','towel'],
        chat: [
          { s:'l', t:"Guess whose water bottle" },
          { s:'r', t:'Hmmm…whose?' },
          { s:'r', t:'Looks cold!' },
          { s:'l', t:'This is the most successful packing!' } ] },
      { credit: 'Cora', items: ['pouch','towel','keyring'],
        chat: [
          { s:'l', t:"It's mine!" },
          { s:'r', t:'lol' },
          { s:'r', t:'okay' },
          { s:'l', ph:true },
          { s:'l', t:'Always shows up and takes mine' } ] },
      { credit: 'Cora', items: ['ropeBlue','ropePink','ropeGray','band'],
        chat: [
          { s:'l', t:'Three colors??' },
          { s:'r', t:"What's that?" },
          { s:'l', t:'Tell u a secret…' },
          { s:'l', t:'I match them to my shoes' } ] },
      { credit: 'Cora', items: ['shoes','socks','cap'],
        chat: [
          { s:'r', t:'Coach, you\'re so cool!' },
          { s:'l', t:'OMG' },
          { s:'l', t:'OMG!!!' } ] },
      { credit: 'Cora', items: ['barrel','ballBag','bottle','pouch'],
        chat: [
          { s:'l', t:'Court Court!' },
          { s:'r', ph:true },
          { s:'l', t:'Perfect look, right?' },
          { s:'r', t:'Amazing!' } ] }
    ],
    2: [
      { credit: 'Rio', items: ['ballBag','cap'],
        chat: [
          { s:'l', t:'Soo good!' },
          { s:'r', t:'Wait, I see three straps.' },
          { s:'r', t:"What's?" },
          { s:'l', t:'Someone hold the blue one' },
          { s:'r', t:'OMG!' } ] },
      { credit: 'Rio', items: ['rope','socks','tee','shorts','keyring','band'],
        chat: [
          { s:'l', t:'Some faves♡' },
          { s:'r', ph:true },
          { s:'r', t:'Obseeed!' } ] },
      { credit: 'Rio', items: ['bottle','towel'],
        chat: [
          { s:'l', t:'Cuteeeee!' },
          { s:'r', t:'What do you use?' },
          { s:'l', t:'Ice, obviously' },
          { s:'r', t:"No wonder it's melting." } ] },
      { credit: 'Rio', items: ['barrel','ropeBlue','ropePink'],
        chat: [
          { s:'l', t:'New' },
          { s:'r', t:'Show me your selfie!' },
          { s:'l', t:'OMG' },
          { s:'r', t:"No, you're good" } ] },
      { credit: 'Rio', items: ['pouch','keyring','cap','socks'],
        chat: [
          { s:'l', t:'A practice or something??' },
          { s:'r', ph:true },
          { s:'r', t:'Your gym.' },
          { s:'l', t:'2nd pic' } ] },
      { credit: 'Rio', items: ['barrel','ballBag','shoes'],
        chat: [
          { s:'l', t:'Woweee!' },
          { s:'r', t:"You're an icon" },
          { s:'l', t:'Who is behind?' },
          { s:'r', t:'No one' } ] }
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
    const words = ['GEAR UP', 'BASKETBALL & FASHION', '2026 SUMMER', 'RANKUP SPORTS'];
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
     SCROLL REVEAL
     ========================================================= */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  $$('.lookItem').forEach(el => io.observe(el));
})();
