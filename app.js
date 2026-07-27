/* =========================================================
   RANKUP SPORTS 2026 SUMMER — campaign LP

   キービジュアルは1枚だけ。ページ上の全ての写真は styles.css の
   `.ph` が読む assets/cora.png を、--bp / --bs でスプライト的に
   切り出したもの。座標は ITEMS[].crop で管理する。
   ========================================================= */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---- catalogue ------------------------------------------------
     crop = [background-position-x%, -y%, background-size%]
     ---------------------------------------------------------------- */
  const ITEMS = {
    barrel:   { name: 'SHOE BARREL BAG',     yen: '¥6,600', crop: [32, 62, 300] },
    rope:     { name: 'ROPE STRAP',          yen: '¥2,420', crop: [ 2, 84, 300] },
    ropeBlue: { name: 'ROPE STRAP (BLUE)',   yen: '¥2,420', crop: [ 2, 78, 340] },
    ropePink: { name: 'ROPE STRAP (PINK)',   yen: '¥2,420', crop: [ 2, 96, 340] },
    ropeGray: { name: 'ROPE STRAP (GRAY)',   yen: '¥2,420', crop: [20, 95, 340] },
    ballBag:  { name: 'DRAWSTRING BALL BAG', yen: '¥4,950', crop: [92, 94, 300] },
    bottle:   { name: 'VACUUM BOTTLE 500ml', yen: '¥3,630', crop: [98, 76, 320] },
    towel:    { name: 'CHECK HANDKERCHIEF',  yen: '¥990',   crop: [70, 11, 320] },
    pouch:    { name: 'FIRST AID POUCH',     yen: '¥1,760', crop: [95, 43, 300] },
    tee:      { name: 'DRY TEE',             yen: '¥3,300', crop: [53, 40, 300] },
    shorts:   { name: 'COURT SHORTS',        yen: '¥4,400', crop: [50, 68, 300] },
    socks:    { name: 'CREW SOCKS',          yen: '¥770',   crop: [46, 99, 380] },
    shoes:    { name: 'COURT SNEAKERS',      soon: '8/1 ON SALE', crop: [40,  6, 300] },
    cap:      { name: 'MESH CAP',            soon: '8/1 ON SALE', crop: [50, 23, 320] },
    keyring:  { name: 'ROPE KEYRING',        yen: '¥1,320', crop: [ 6, 86, 380] },
    band:     { name: 'HAIR BAND',           yen: '¥880',   crop: [20, 92, 380] }
  };

  /* ---- look sections -------------------------------------------- */
  const LOOKS = {
    1: [
      { who:'MODEL A', at:'GYM', items:['barrel','rope','shoes','socks'],
        chat:[{s:'l',t:'今日の荷物、これで全部'},{s:'r',t:'全部って何が入ってるの'},{s:'l',ph:1},{s:'r',t:'多すぎでは？？'}] },
      { who:'MODEL A', at:'AFTER SCHOOL', items:['ballBag','bottle','tee','shorts','towel'],
        chat:[{s:'l',t:'水筒、横に寝かせて入るのが good'},{s:'r',t:'たしかに立てると倒れるんだよね'},{s:'l',t:'これは正解だった'}] },
      { who:'MODEL A', at:'LOCKER ROOM', items:['pouch','towel','keyring'],
        chat:[{s:'l',t:'絆創膏どこやった'},{s:'r',t:'外ポケット'},{s:'r',t:'いつもそこ'},{s:'l',t:'あった ありがと'}] },
      { who:'MODEL A', at:'MY DESK', items:['ropeBlue','ropePink','ropeGray','band'],
        chat:[{s:'l',t:'3色そろえちゃった'},{s:'r',t:'えっ全部買ったの'},{s:'l',t:'シューズに合わせる用'},{s:'r',t:'そこまで考えてるの強い'}] },
      { who:'MODEL A', at:'COURT', items:['shoes','socks','cap'],
        chat:[{s:'l',ph:1},{s:'l',t:'新しいシューズおろした'},{s:'r',t:'まだ白い'},{s:'r',t:'来週には終わってる'}] },
      { who:'MODEL A', at:'STATION', items:['barrel','ballBag','bottle','pouch'],
        chat:[{s:'l',t:'まとめるとこんな感じ'},{s:'r',t:'意外とすっきりして見える'},{s:'l',t:'中身は詰まってる'}] }
    ],
    2: [
      { who:'MODEL B', at:'ON THE WAY', items:['ballBag','cap'],
        chat:[{s:'l',t:'ボール入れ、肩から掛けられるの助かる'},{s:'r',t:'両手あくのでかい'},{s:'l',t:'自転車のときこれ一択'}] },
      { who:'MODEL B', at:'MY ROOM', items:['rope','socks','tee','shorts','keyring','band'],
        chat:[{s:'l',t:"today's color はブルー"},{s:'r',ph:1},{s:'r',t:'昨日ピンクじゃなかった？'},{s:'l',t:'毎日変えてます'}] },
      { who:'MODEL B', at:'CAFE', items:['bottle','towel'],
        chat:[{s:'l',t:'氷入れすぎて重い'},{s:'r',t:'夏だししょうがない'},{s:'l',t:'3限で溶けてた'}] },
      { who:'MODEL B', at:'ENTRANCE', items:['barrel','ropeBlue','ropePink'],
        chat:[{s:'l',t:'ストラップ付け替えた'},{s:'r',t:'同じバッグに見えない'},{s:'l',t:'それが狙い'}] },
      { who:'MODEL B', at:'BENCH', items:['pouch','keyring','cap','socks'],
        chat:[{s:'l',t:'小物、全部この中'},{s:'r',ph:1},{s:'r',t:'鍵もそこ入れてるの？'},{s:'l',t:'なくすので'}] },
      { who:'MODEL B', at:'HOME', items:['barrel','ballBag','shoes'],
        chat:[{s:'l',t:'これで練習も寄り道もいける'},{s:'r',t:'荷物ひとつで済むのはえらい'},{s:'l',t:'そこがいちばん大事'}] }
    ]
  };

  const cropStyle = (key, scale = 1) => {
    const [x, y, s] = ITEMS[key].crop;
    return `--bp:${x}% ${y}%;--bs:${Math.round(s * scale)}%`;
  };

  /* =========================================================
     LOADER
     ========================================================= */
  const loader = $('#loader');
  const hideLoader = () => loader && loader.classList.add('is-done');
  addEventListener('load', () => setTimeout(hideLoader, 1200));
  setTimeout(hideLoader, 3500); // 重い素材でページを人質に取らない

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
  addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });

  /* =========================================================
     LEAD の浮遊アイコン — 画面の縁を不規則に巡回する
     ========================================================= */
  // 参照サイトの lead__icon と同じ挙動：172px 級のアイコンが画面の縁を
  // 35s で無限に周回する（leadIcon キーフレーム）。emoji ではなく画像。
  // ball-icon.svg は暫定。バスケットボールの PNG に差し替える場合はこのパスを変更。
  const LEAD_ICON = 'assets/ball-icon.svg';
  const orbit = (host, n) => {
    if (!host) return;
    host.innerHTML = Array.from({ length: n }, (_, i) =>
      `<div class="lead__icon" style="--dl:${-i * (35 / n)}s"><img src="${LEAD_ICON}" alt="" /></div>`).join('');
  };
  orbit($('#leadIcons'), 3);   // lead（intro）の周回

  /* =========================================================
     ハート — 参照サイトの実装をそのまま採取
       ・カクカクした独自SVG（viewBox 0 0 42.04 35.49・2本の polyline）
       ・四隅のフレーム（各45度回転）
       ・下から昇って途中で消える heart キーフレームを
         ずらしたディレイで無限ループ
     ========================================================= */
  // 角ばったハート（emoji ではなく参照サイトと同じ形）
  const HEART_SVG = '<svg class="hsvg" viewBox="0 0 42.04 35.49" aria-hidden="true">'
    + '<polyline points="21.02 5.14 14.65 0 5.5 0 0 5.5 0 14.8 21.02 35.49"/>'
    + '<polyline points="21.02 5.14 27.39 0 36.54 0 42.04 5.5 42.04 14.8 21.02 35.49"/></svg>';

  // 四隅のフレーム。参照サイトは 45度回転で内向きに置いている
  const cornerFrame = (host) => {
    if (!host) return;
    host.innerHTML = [1, 2, 3, 4].map(i => `<span class="frameHeart frameHeart--${i}">${HEART_SVG}</span>`).join('');
  };

  // 参照サイトの stagger（0/150/300/800/950/1100/1600/1750/1900ms …）を踏襲
  const FLOAT_DELAYS = [0, 150, 300, 800, 950, 1100, 1600, 1750, 1900, 2200, 2700, 3000, 3300];
  const fillHearts = (host, n, dur = 3000) => {
    if (!host) return;
    host.innerHTML = Array.from({ length: n }, (_, i) => {
      const left = Math.round(4 + (i * 92 / n) + (Math.random() * 6 - 3));   // 横位置を均等に散らす
      const size = 20 + Math.round(Math.random() * 20);
      const dl   = FLOAT_DELAYS[i % FLOAT_DELAYS.length] + Math.round(Math.random() * 400);
      const d    = dur + Math.round(Math.random() * 900);                    // 2700–4500ms 相当
      return `<span class="floatHeart" style="left:${left}%;--s:${size}px;--dur:${d}ms;--dl:${dl}ms">${HEART_SVG}</span>`;
    }).join('');
  };

  cornerFrame($('#mvFrame'));
  cornerFrame($('#staffFrame'));
  fillHearts($('#mvHearts'), 11, 3000);
  fillHearts($('#staffHearts'), 14, 3200);

  /* =========================================================
     投稿カード
     ========================================================= */
  const ICON_HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-8.6-5.3-11-10.2C-.6 6.9 1.9 3 5.7 3 8 3 10 4.3 11 6.3 12 4.3 14 3 16.3 3c3.8 0 6.3 3.9 6.7 7.8C20.6 15.7 12 21 12 21z"/></svg>';
  const ICON_CHAT  = '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.5-.7L3 21l1.9-5A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/></svg>';
  const ICON_SEND  = '<svg viewBox="0 0 24 24"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';

  const creditRow = (key) => {
    const it = ITEMS[key];
    const soon = !!it.soon;
    return `
      <li class="credits__item">
        <a class="credits__link${soon ? ' credits__link--soon' : ''}" href="#">
          <span class="credits__thumb ph" style="${cropStyle(key)}" aria-hidden="true"></span>
          <span class="credits__name">${it.name}</span>
          <span class="credits__yen">${it.yen || ''}</span>
          <span class="credits__buy">${soon ? it.soon : 'BUY'}</span>
        </a>
      </li>`;
  };

  const chatRow = (m) => `
    <div class="chat__row ${m.s === 'r' ? 'chat__row--r' : ''}">
      <span class="chat__face ph" aria-hidden="true"></span>
      ${m.ph ? '<span class="chat__ph ph" role="img" aria-label="投稿写真"></span>'
             : `<p class="chat__msg">${m.t}</p>`}
    </div>`;

  const postCard = (d, i) => {
    // 1枚目は全体、2〜3枚目は登場アイテムの寄り
    const views = [
      '--bp:50% 34%;--bs:cover',
      ...d.items.slice(0, 2).map(k => cropStyle(k, .72))
    ];
    return `
      <article class="post">
        <header class="post__head">
          <span class="post__avatar ph" aria-hidden="true"></span>
          <span class="post__who">
            <span class="post__name">${d.who}</span><br />
            <span class="post__place">${d.at}</span>
          </span>
          <span class="post__dots" aria-hidden="true">•••</span>
        </header>

        <div class="slider" data-slider>
          <div class="slider__box">
            ${views.map((v, n) => `<div class="slider__slide ph${n === 0 ? ' is-now' : ''}" style="${v}" role="img" aria-label="${d.who} look ${i + 1}-${n + 1}"></div>`).join('')}
            <button class="slider__arrow slider__arrow--prev" type="button" aria-label="前の写真">‹</button>
            <button class="slider__arrow slider__arrow--next" type="button" aria-label="次の写真">›</button>
            <div class="slider__dots"></div>
          </div>
        </div>

        <div class="post__nav">
          <button class="post__like" type="button" aria-label="いいね" aria-pressed="false">${ICON_HEART}</button>
          <span aria-hidden="true">${ICON_CHAT}</span>
          <span aria-hidden="true">${ICON_SEND}</span>
          <span class="post__popHeart" aria-hidden="true"></span>
          <span class="post__likes" data-likes>${120 + i * 37} likes</span>
        </div>

        <div class="post__credit">
          <p class="post__creditName">${d.who}</p>
          <ul class="credits">${d.items.map(creditRow).join('')}</ul>
        </div>
      </article>

      <div class="chat">${d.chat.map(chatRow).join('')}</div>`;
  };

  $$('.look__items').forEach(host => {
    host.innerHTML = (LOOKS[host.dataset.look] || []).map(postCard).join('');
  });

  /* =========================================================
     ALL ITEMS
     ========================================================= */
  // グリッドから所有セクションを辿る（.allitems / .sns--shop どちらでも拾えるように）
  $$('.allitems__grid').forEach(grid => {
    const scope = grid.closest('[data-look]')?.dataset.look;
    if (!scope) return;
    const keys = scope === 'all'
      ? Object.keys(ITEMS)
      : [...new Set((LOOKS[scope] || []).flatMap(l => l.items))];
    grid.innerHTML = keys.map(k => {
      const it = ITEMS[k];
      return `
        <div class="allitems__item">
          <div class="allitems__ph ph" style="${cropStyle(k)}" role="img" aria-label="${it.name}"></div>
          <p class="allitems__name">${it.name}</p>
          <p class="allitems__yen">${it.yen || ''}</p>
          <span class="allitems__buy">${it.soon || 'BUY'}</span>
        </div>`;
    }).join('');
  });

  /* =========================================================
     スライダー
     ========================================================= */
  $$('[data-slider]').forEach(sl => {
    const slides = $$('.slider__slide', sl);
    const dots = $('.slider__dots', sl);
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
     いいね — ハートが数個ぱらぱら飛ぶ
     ========================================================= */
  $$('.post__like').forEach(btn => {
    const nav = btn.closest('.post__nav');
    const pop = $('.post__popHeart', nav);
    const label = $('[data-likes]', nav);
    btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!on));
      btn.classList.toggle('is-liked', !on);
      const n = parseInt(label.textContent, 10);
      label.textContent = `${on ? n - 1 : n + 1} likes`;
      if (on) return;
      // popHeart（ぱっと弾けて出る）→ そのまま昇って消える
      pop.innerHTML = Array.from({ length: 5 }, (_, i) =>
        `<span class="floatHeart floatHeart--pop" style="left:${-8 + i * 8}px;--s:16px;--dur:1100ms;--dl:${i * 80}ms">${HEART_SVG}</span>`).join('');
      setTimeout(() => { pop.innerHTML = ''; }, 1600);
    });
  });

  const bigHeart = $('#likeHeart');
  if (bigHeart) {
    const count = $('#likeCount');
    // ボタン内にバースト用のレイヤーを差し込む
    const burst = document.createElement('span');
    burst.className = 'staff__burst';
    bigHeart.appendChild(burst);
    bigHeart.addEventListener('click', () => {
      const on = bigHeart.getAttribute('aria-pressed') === 'true';
      bigHeart.setAttribute('aria-pressed', String(!on));
      count.textContent = on ? 0 : 1;
      if (on) return;
      burst.innerHTML = Array.from({ length: 7 }, (_, i) =>
        `<span class="floatHeart floatHeart--pop" style="left:${-24 + i * 8}px;--s:${14 + (i % 3) * 4}px;--dur:1200ms;--dl:${i * 70}ms">${HEART_SVG}</span>`).join('');
      setTimeout(() => { burst.innerHTML = ''; }, 1700);
    });
  }

  /* =========================================================
     HERO — 透明度で写真をクロスフェード
     data-hero にカンマ区切りで並べた写真を順に表示する。
     ========================================================= */
  const heroPh = $('#mvPh');
  if (heroPh) {
    const imgs = $$('.mv__phImg', heroPh);
    if (imgs.length > 1) {
      let cur = 0;
      setInterval(() => {
        const next = (cur + 1) % imgs.length;
        imgs[cur].classList.remove('is-show');
        imgs[next].classList.add('is-show');
        cur = next;
      }, 3800);
    }
  }

  /* =========================================================
     STAFF — sticky ステージ。スクロール量で写真とコピーが切り替わる
     ========================================================= */
  const SEQ = [
    { crop: '--bp:50% 20%;--bs:190%', cap: '詰めて、' },
    { crop: '--bp:46% 60%;--bs:170%', cap: '担いで、' },
    { crop: '--bp:50% 92%;--bs:210%', cap: 'そのまま寄り道。' }
  ];
  const seq = $('#staff');
  if (seq) {
    $('#staffPhs').innerHTML = SEQ.map((s, i) =>
      `<div class="staff__ph ph${i === 0 ? ' is-show' : ''}" style="${s.crop}" aria-hidden="true"></div>`).join('');
    $('#staffCap').innerHTML = SEQ.map((s, i) =>
      `<span${i === 0 ? ' class="is-show"' : ''}>${s.cap}</span>`).join('');
    // ステップ数 = 写真の枚数。1枚あたり 100vh スクロールさせる
    $('#staffSteps').innerHTML = SEQ.map(() => '<div class="staff__step"></div>').join('');

    const phs  = $$('.staff__ph', seq);
    const caps = $$('#staffCap span');
    let cur = -1;
    const onScroll = () => {
      const r = $('.staff__steps', seq).getBoundingClientRect();
      const total = r.height;                    // sticky が効いている距離
      if (total <= 0) return;
      const p = Math.min(Math.max(-r.top / total, 0), 0.999);
      const i = Math.floor(p * SEQ.length);
      if (i === cur) return;
      cur = i;
      phs.forEach((e, n) => e.classList.toggle('is-show', n === i));
      caps.forEach((e, n) => e.classList.toggle('is-show', n === i));
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =========================================================
     INVIEW — .post / .reveal / .ttlPop / .ttlPopQ
     ========================================================= */
  const io = new IntersectionObserver((es) => {
    es.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  $$('.post, .reveal, .ttlPop, .ttlPopQ, .cast__item').forEach(el => io.observe(el));

  /* =========================================================
     HEADER — 下方向で隠し、上方向で戻す
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
     カラーベッド — 参照サイトと同じく、スクロール量に応じて背面色を
     パレット間で「連続補間」する（離散的な切替ではなく滑らかに変化）。
     パレットは支給されたカラーコード。グレー(#8E909D)を先頭に置くことで
     直前のグレー地(greyZone/lead)からなめらかに繋がる。
     ========================================================= */
  const bed = $('#looksBg');
  const looks = $('.looks');
  if (bed && looks) {
    const PALETTE = ['#8E909D', '#CCFF63', '#3BFF65', '#05277A', '#FF0050', '#F99BA2'];
    const toRGB = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const stops = PALETTE.map(toRGB);
    const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
    const easeInOut = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = looks.getBoundingClientRect();
      const total = r.height - innerHeight;
      if (total <= 0) return;
      const p = Math.min(Math.max(-r.top / total, 0), 1);
      // 各区間の境目をなめらかに（イーズ）繋いで、参照サイトの質感に寄せる
      const seg = p * (stops.length - 1);
      const i = Math.min(Math.floor(seg), stops.length - 2);
      const c = mix(stops[i], stops[i + 1], easeInOut(seg - i));
      bed.style.background = `rgb(${c[0]},${c[1]},${c[2]})`;
    };
    const onScrollBed = () => { if (!raf) raf = requestAnimationFrame(paint); };
    addEventListener('scroll', onScrollBed, { passive: true });
    addEventListener('resize', onScrollBed, { passive: true });
    paint();
  }
})();
