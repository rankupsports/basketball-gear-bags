/* ============================================================
   商品ページ（店舗ページ → 商品ページ）のページコード
   ── LP の埋め込みを「特定の商品だけ」に出すための条件表示

   クラシック Wix の商品ページは全商品共通のテンプレート1枚なので、
   そのまま埋め込むと全商品ページに LP が出てしまう。
   下のスラッグに一致した商品ページだけで埋め込み要素を expand() し、
   それ以外では collapse()（領域ごと詰める）する。

   ■ 入れかた
     1) エディタ右上「…」→ 開発者ツール →「Velo を有効にする」
     2) ページ＆メニュー →「店舗ページ」→「商品ページ」を開く
     3) レビューブロックの上に「HTML コードを埋め込む」を配置し、
        embed/wix-product-page.html の中身を貼る
        （URL 指定モードなら https://rankupsports.github.io/basketball-gear-bags/embed/ ）
     4) その要素を選択 → プロパティパネルで
          ・ID を確認（既定は html1。下の EMBED_ID をそれに合わせる）
          ・「読み込み時に折りたたむ」に**チェックを入れる**
            → 他商品のページで一瞬表示されてしまうのを防ぐ
     5) 画面下のコードパネル（商品ページのページコード）に、このファイルの
        import 以降をそのまま貼る
     6) プレビューで対象商品と別商品を1つずつ開いて確認 → 公開

   ■ 元に戻したいとき
     コードを消す（または SHOW_ON を空配列にする）と、全商品で非表示になる。
     埋め込み要素ごと削除すれば完全に元通り。
   ============================================================ */

import wixLocation from 'wix-location';

/* LP を出す商品のスラッグ（URL の /product-page/ より後ろ）。
   不要な行は削除してよい。 */
const SHOW_ON = [
  'basketball-gear-bags',                                                 // Basketball Gear Bags
  'basketball-gear-bags-バスケットボール巾着バッグ-シューズバレルバッグ2',   // BASKETBALL GEAR BAGS バスケットボール巾着バッグ・シューズバレルバッグ
];

/* 埋め込み要素の ID。エディタのプロパティパネルの表示に合わせる。 */
const EMBED_ID = '#html1';

function asList(x) { return Array.isArray(x) ? x : (x ? [x] : []); }
function canToggle(e) { return e && typeof e.collapse === 'function' && typeof e.expand === 'function'; }

$w.onReady(() => {
  // 例: /product-page/basketball-gear-bags → ['product-page', 'basketball-gear-bags']
  const parts = wixLocation.path;
  const raw = parts[parts.length - 1] || '';
  let slug = raw;
  try { slug = decodeURIComponent(raw); } catch (e) { /* すでにデコード済み */ }

  // 日本語スラッグはエンコード済みで来ることがあるので、両方で照合する
  const match = SHOW_ON.indexOf(slug) !== -1 || SHOW_ON.indexOf(raw) !== -1;

  /* 対象の埋め込み要素を集める。
     まず EMBED_ID を試し、見つからなければページ内の全 HtmlComponent を対象にする。
     こうしておくと ID がズレていても、非対象ページでは確実に畳める
     （＝他商品ページに出っぱなしになる事故を防ぐ）。 */
  let targets = [];
  try { const el = $w(EMBED_ID); if (canToggle(el)) targets = [el]; } catch (e) { /* ID 無し */ }
  if (!targets.length) targets = asList($w('HtmlComponent')).filter(canToggle);

  if (!targets.length) {
    console.log('[LP埋め込み] 切り替え対象の HtmlComponent が見つかりません。'
      + '埋め込み要素の ID を EMBED_ID に設定してください。');
    return;
  }

  // 対象商品だけ表示。それ以外は高さごと畳んで隙間も残さない。
  targets.forEach((el) => { if (match) el.expand(); else el.collapse(); });
});

/* ── URL ではなく商品データで判定したい場合 ─────────────────
   商品ページ要素（既定 ID は productPage1）から商品を取れる。
   スラッグを変更しても商品 ID は変わらないので、こちらのほうが安定する。

   $w.onReady(async () => {
     const el = $w('#html1');
     const product = await $w('#productPage1').getProduct();
     const ids = ['<商品ID>'];            // ダッシュボードの商品URLの末尾で確認できる
     if (ids.indexOf(product._id) !== -1) el.expand(); else el.collapse();
   });
   ───────────────────────────────────────────────── */
