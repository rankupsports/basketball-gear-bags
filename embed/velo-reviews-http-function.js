/* ============================================================
   Wix Velo — backend/http-functions.js に貼る
   （既に http-functions.js があるなら get_reviews 関数だけ追記）

   なぜこれが必要か:
     Wix Stores のレビュー読み取り API は「認証トークン必須」かつ
     「CORS 不許可」。よって GitHub Pages(rankupsports.github.io) の
     静的LPから直接は叩けない（同一オリジンでも素の fetch は 403、
     Access-Control-Allow-Origin も無い＝実測）。
     Velo はWixと同一信頼ドメインで動くので取得でき、こちらで
     CORS ヘッダを付けて外部LPに渡せる。

   公開URL（Wix 公開後）:
     https://www.rankup-sports.com/_functions/reviews
   ============================================================ */
import { ok, badRequest } from 'wix-http-functions';
import { reviews } from 'wix-reviews.v2';

// このLPを配信している GitHub Pages のオリジンだけ許可する
const ALLOW_ORIGIN = 'https://rankupsports.github.io';

// レビュー対象（商品）。レビュー用リンクの #wix-reviews-stores-XXXX の XXXX。
const NAMESPACE = 'stores';
const ENTITY_ID = '34590dda-07a4-c952-41a2-6143331477d9';

const cors = {
  'Access-Control-Allow-Origin': ALLOW_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
  'Cache-Control': 'no-store',
};

// プリフライト用（ブラウザが OPTIONS を投げる場合）
export function options_reviews(request) {
  return ok({ headers: cors, body: '' });
}

export async function get_reviews(request) {
  try {
    // 公開済みレビューを新しい順に取得
    const res = await reviews
      .queryReviews()
      .eq('namespace', NAMESPACE)
      .eq('entityId', ENTITY_ID)
      .descending('_createdDate')
      .limit(20)
      .find({ suppressAuth: true });

    // LP 側で扱いやすい最小限の形に整形
    const items = (res.items || []).map((r) => ({
      author: (r.author && r.author.authorName) || 'ゲスト',
      rating: (r.content && r.content.rating) || null,
      title: (r.content && r.content.title) || '',
      body: (r.content && r.content.body) || '',
      date: r._createdDate || null,
    }));

    return ok({
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ total: items.length, items }),
    });
  } catch (e) {
    return badRequest({
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: String(e && e.message || e) }),
    });
  }
}
