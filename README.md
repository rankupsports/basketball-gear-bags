# RANKUP SPORTS 2026 SUMMER — campaign LP

niko and ... の [FISHS EDDY 2024SS 特設ページ](https://www.dot-st.com/nikoand/cp/fishseddy_2024ss/) を
**構成・演出のリファレンス**として組んだ、1ページ完結のキャンペーンサイト。

> **参照範囲について**
> セクション構成、スクロール演出（sticky の背景ベッド／縦組みサイドレール／inview リビール／
> タイトルのポップアップ／マーキー／ハートのインタラクション）といった**設計・実装パターン**を
> 参考にしています。
> 本文コピー・キャスト名・店舗名・商品名は**すべて本サイト独自のもの**で、
> 参照元のテキストは使用していません。ブランド名・ロゴも別物です。

素材が 1 枚しかないため、**ページ上のすべての写真は `assets/cora.png`（添付のキービジュアル）** です。
サムネイル・アバター・商品カットは、CSS の `background-position` / `background-size` で
その 1 枚から必要な部分だけを切り出しています（スプライト方式）。

## リファレンスから採寸した値

参照ページを実測し、以下のメトリクスとモーションを実装に反映しています。

| 項目 | 値 |
|---|---|
| 投稿カード | 幅 480px / radius 25px / 下余白 35px |
| スライダー | 480 × 535（= 96/107） |
| カード内枠 | 430px（左右 25px） |
| アクション行 | アイコン 25px / 上マージン 15px |
| クレジット行 | 上マージン 40px / 各行 38px |
| チャット | 幅 630px / 顔 35px / 吹き出し radius 50px |

モーションは `ttlPop` / `ttlPopQ` / `shakeMv` / `shake` / `heartFloat` / `leadIcon` /
`noiseShift` を採取して `styles.css` に再実装しています。

## 構成

| セクション | 内容 |
|---|---|
| KV | キービジュアル + キャッチコピー |
| Ticker | 横スクロールのマーキー |
| Introduction | コンセプト文 + キャスト 2 人 |
| LOOK 01 | 6 ブロック（スライダー / いいね / 商品リスト / チャット） |
| ALL ITEMS | LOOK 01 の登場アイテム一覧 |
| Our Story | ブランドストーリー |
| LOOK 02 | 6 ブロック |
| ALL ITEMS | LOOK 02 の登場アイテム一覧 / 全アイテム |
| Like? or Not? | いいねインタラクション |
| CAST | クレジット |
| Footer | SNS / SHOP LIST / ブランド紹介 |

## 差し替えかた

- **写真** — `assets/cora.png` を置き換えるか、`styles.css` の `.ph { background-image }` を変更。
  個別カットを用意する場合は `app.js` の `ITEMS[].crop`（`[x%, y%, size%]`）を捨てて `<img>` に戻すのが早いです。
- **商品** — `app.js` の `ITEMS`（名前・価格・発売予告・切り出し位置）。
- **ブロック構成 / チャット** — `app.js` の `LOOKS`。
- **配色** — `styles.css` 冒頭の `:root`（キービジュアルから抽出した beige / orange / teal / pink）。

## ローカルで見る

このマシンに node / python が無かったため、PowerShell だけで動く静的サーバを同梱しています。

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1
```

http://localhost:5178 で開きます。

> `file://` で直接開くとブラウザによっては JS が動かず、LOOK セクションが空になります。
