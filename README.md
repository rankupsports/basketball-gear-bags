# RANKUP SPORTS 2026 SUMMER — campaign LP

niko and ... の [FISHS EDDY 2024SS 特設ページ](https://www.dot-st.com/nikoand/cp/fishseddy_2024ss/) を
**レイアウト・順序・配色・アニメーションのリファレンス**として実測し、再現した1ページ完結のLP。

> **参照範囲について**
> 再現しているのは構成・順序・配色・モーションといった**設計と実装のパターン**です。
> 本文コピー・キャスト名・店舗名・商品名・ブランド名は**すべて独自のもの**で、
> 参照元のテキストやロゴは一切使用していません。

素材写真は1枚（`assets/cora.png`）のみのため、**ページ上のすべての写真はその1枚のスプライト切り出し**です。
`.ph` クラスが背景画像を持ち、`--bp`（background-position）/ `--bs`（background-size）で領域を指定します。
商品ごとの座標は `app.js` の `ITEMS[].crop` に `[x%, y%, size%]` で定義。

## セクション順（実測して一致させたもの）

```
mv  ─ 白帯（コピー＋ロゴ）＋ ライム地の写真、浮遊ハート
sideCont
 ├ side      左右に縦組みテキストが sticky（960px以上）
 ├ lead      #8e909d / introduction・浮遊アイコン・キャスト2名
 └ looks
    ├ looks__bg   sticky のカラーベッド（LOOK ごとに色が変わる）
    ├ LOOK 01     投稿カード × 6
    ├ ALL ITEMS   LOOK 01 の登場アイテム
    ├ story
    ├ LOOK 02     投稿カード × 6
    ├ ALL ITEMS   LOOK 02 の登場アイテム
    └ story
sns  ─ ALL ITEMS（全幅の大きなリンク＋全アイテム）
staff ─ sticky ステージ。スクロール量で写真とコピーが3段階で切替 → Like? or Not? → CAST
sns  ─ FOLLOW US
shop ─ SHOP LIST / 公式WEBストア / ブランド紹介 / コピーライト
```

## 配色（実測）

| 色 | 用途 |
|---|---|
| `#ccff63` ライム | looks の sticky カラーベッド、MV 地、ローダー |
| `#8e909d` グレーパープル | lead（introduction） |
| `#1780e7` ブルー | チャット右吹き出し、BUY、LOOK 02 のベッド |
| `#f4f4f4` ライトグレー | チャット左吹き出し |
| `#fff` / `#000` | 投稿カード・shop / テキスト |

## メトリクス（実測）

| 項目 | 値 |
|---|---|
| 投稿カード | 幅 480px / radius 25px / 下余白 35px |
| スライダー | 480 × 535（= 96/107） |
| カード内枠 | 430px（左右 25px） |
| アクション行 | アイコン 25px / 上マージン 15px |
| クレジット行 | 上マージン 40px / 各行 38px |
| チャット | 幅 630px / 顔 35px / 吹き出し radius 50px・18px・padding 8px 18px |
| サイド縦組 | 20px / Jacquarda Bastarda 9 |

## アニメーション（キーフレームを採取して再実装）

| 名前 | 内容 |
|---|---|
| `ttlPop` | 下から20%せり上がり、50%地点で -2% オーバーシュート |
| `ttlPopQ` | 同上＋10deg の回転から水平に戻る |
| `shakeMv` | 0/55/100% を静止点にした ±3% の微振動（MV写真） |
| `shake` | 同型の ±7% 強版（いいね時） |
| `heartFloat` | translateY(100%)→(-20%)、10%でイン・65%でアウト |
| `leadIcon` | 画面の縁を10段階で不規則に巡回し、途中 ±360deg 回転 |
| `noiseShift` | グレインの background-position を 0 → 10% 20% |

## 差し替えかた

- **写真** — `assets/cora.png` を置換、または `styles.css` の `.ph { background-image }` を変更。
  個別カットを用意するなら `ITEMS[].crop` を捨てて `<img>` に戻すのが早いです。
- **商品** — `app.js` の `ITEMS`（名前・価格・発売予告・切り出し座標）
- **投稿・チャット** — `app.js` の `LOOKS`
- **配色** — `styles.css` 冒頭の `:root`

> `.ph` を使う要素に背景色を足すときは **`background-color`** で指定してください。
> `background` ショートハンドだと `background-image` ごとリセットされ、写真が消えます。

## ローカルで見る

node / python が無い環境向けに、PowerShell だけで動く静的サーバを同梱しています。

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1
```

http://localhost:5178 で開きます。

> `file://` で直接開くとブラウザによっては JS が動かず、LOOK セクションが空になります。
