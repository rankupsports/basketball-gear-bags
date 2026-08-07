# 商品ページへの埋め込み

Wix の商品ページ（[basketball-gear-bags](https://www.rankup-sports.com/product-page/basketball-gear-bags)）の
**レビューブロックのすぐ上**に、この LP を iframe で載せるための一式です。

商品ページはクラシック Wix（`--site-width: 980px` / レスポンシブ版ではない）。
GitHub Pages 側は `X-Frame-Options` も CSP も返していないので、iframe 埋め込みはブロックされません。

## 枠のサイズ（どちらのモードでも共通）

Wix の「HTML コードを埋め込む」要素は中身の高さに追従しないので、**エディタ側で枠のサイズを指定**します。
中身は指定した枠いっぱいに広がります。

| | 幅 | 高さ |
|---|---|---|
| PC | 980px（サイト幅いっぱい） | 820px |
| モバイル | 320px（モバイル canvas いっぱい） | 560px |

- 980px にしているのは、ブロック03/04 が **968px 基準の固定レイアウト**で組まれているため。
  980px なら拡大率がほぼ 1.0 倍 ＝ デザインの実寸で出る。
- 高さは1画面ぶんに近い 820px。控えめにしたいときは 980 x 620 でも成立する（下限 420px まで自動追従）。

## モード別

### A. コードモード → [`wix-product-page.html`](wix-product-page.html)

追加(+) → 埋め込み＆ソーシャル → 「HTML コードを埋め込む」→ **「コードを入力」** に貼る。
角丸・影・「全画面で見る」ボタンまで込みで完結する。

### B. URL 指定モード → [`index.html`](index.html)

同じ要素の **「ウェブサイトのアドレス」** に下の URL を貼る。
URL モードはコードを差し込めないので、装飾はこのラッパーページ側に持たせている。

```
https://rankupsports.github.io/basketball-gear-bags/embed/
```

装飾が不要なら LP を直接指定してもよい（iframe が1枚減って軽い）。

```
https://rankupsports.github.io/basketball-gear-bags/
```

## メモ

- どちらも `loading="lazy"`。レビュー位置までスクロールされるまで LP 内の動画（合計 60MB 超）は読み込まれない。
- LP 内の BUY NOW はリンクを切ってあるので、商品ページ → LP → 商品ページ のループにはならない。
  復活させるときはルートの `index.html` の `BUY_LINK` を `true` に戻す。
- PC では iframe 上にカーソルがあるとホイールが LP 側に効く。気になる場合は枠の高さを 620px 前後に抑えるか、
  「全画面で見る」を主導線にする。
