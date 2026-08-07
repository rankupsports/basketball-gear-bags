/* ============================================================
   Wix Velo — backend/http-functions.js に貼る
   （既に http-functions.js があるなら get_reviews / options_reviews を追記）

   ■ 方式（バージョン非依存）
     `wix-reviews.v2` などの特殊モジュールに依存すると、そのサイトで
     未提供のとき import 全体が落ちて MODULE_LOAD_ERROR になる（実測で発生）。
     そこで確実に存在する wix-fetch だけを使い、Wix REST の
     Reviews API を叩く（API キーはコード内定数・Secrets 不要）。

   ■ 事前準備（Wix 側で1回だけ）— Secrets Manager は不要
     1) https://manage.wix.com/account/api-keys で API キーを新規作成。
        権限は「Wix Reviews」の読み取り＋**作成/管理（Manage Reviews）**を付与。
        （フォーム投稿＝作成に書き込み権限が要る。読み取りだけだと POST が 403）
     2) 下の API_KEY 定数に、その値を貼る。
     3) 公開（Publish）。

     ※ バックエンド(backend/)のコードは訪問者には配信されない（サーバー側
       でのみ実行）ため、ここにキーを置いても公開ページには漏れない。
       ただし GitHub にこの実キーを push しないこと（このリポジトリの
       ファイルはプレースホルダのまま。実キーは Wix エディタ内だけに置く）。

   ■ 対象（判明済みの値）
     wix-site-id (metaSiteId) : ae41fe9c-e787-4454-b8d8-3a815a33adcd
     entityId  (商品)         : 34590dda-07a4-c952-41a2-6143331477d9
     namespace                : stores

   公開URL: https://www.rankup-sports.com/_functions/reviews
   ============================================================ */
import { ok, badRequest, serverError } from 'wix-http-functions';
import { fetch } from 'wix-fetch';

// ここに発行した API キーを貼る（Wix エディタ内のみ。GitHub には push しない）
const API_KEY = 'PASTE_YOUR_WIX_API_KEY_HERE';

const ALLOW_ORIGIN = 'https://rankupsports.github.io';
const SITE_ID   = 'ae41fe9c-e787-4454-b8d8-3a815a33adcd';
const ENTITY_ID = '34590dda-07a4-c952-41a2-6143331477d9';
const NAMESPACE = 'stores';

const cors = {
  'Access-Control-Allow-Origin': ALLOW_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json',
};

// ブラウザのプリフライト用（GET / POST 兼用）
export function options_reviews() {
  return ok({ headers: cors, body: '' });
}

export async function get_reviews() {
  try {
    const res = await fetch('https://www.wixapis.com/reviews/v1/reviews/query', {
      method: 'POST',
      headers: {
        'Authorization': API_KEY,
        'wix-site-id': SITE_ID,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {
          filter: { namespace: NAMESPACE, entityId: ENTITY_ID },
          sort: [{ fieldName: 'createdDate', order: 'DESC' }],
          paging: { limit: 100, offset: 0 },
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return serverError({ headers: cors, body: JSON.stringify({ error: `upstream ${res.status}`, detail: text.slice(0, 300) }) });
    }

    const data = await res.json();
    const items = (data.reviews || []).map((r) => ({
      author: (r.author && (r.author.authorName || r.author.contactName)) || 'ゲスト',
      rating: (r.content && r.content.rating) || null,
      title:  (r.content && r.content.title)  || '',
      body:   (r.content && r.content.body)   || '',
      date:   r.createdDate || null,
    }));

    // 総件数はページング情報から（無ければ返却件数）
    const total = (data.pagingMetadata && (data.pagingMetadata.total != null ? data.pagingMetadata.total : data.pagingMetadata.count))
      || items.length;

    return ok({ headers: cors, body: JSON.stringify({ total, items }) });
  } catch (e) {
    return badRequest({ headers: cors, body: JSON.stringify({ error: String((e && e.message) || e) }) });
  }
}

/* ============================================================
   POST /_functions/reviews — LP のフォームから受け取り、Wix に作成する。
   body(JSON): { author, email, rating, title, content }

   ■ upstream 400 だったときの原因と対処（実測・公式仕様で確認）
     1) Author に `email` を入れていた。Create Review の Author が持てるのは
        `contactId` と `authorName` だけで、未知フィールドは 400 になる。
        → email は Author から外し、Contact 作成側で使う。
     2) 「すべてのレビューには Contact が必要」（Reviews API の Before you begin）。
        Create Review は contact ID 前提のメソッドなので、先に Contacts API で
        メールから既存 Contact を探し、無ければ作って contactId を渡す。

   ■ API キーに必要な権限（足りないと 403）
     ・Wix Reviews : Manage Reviews
     ・Contacts    : Read Contacts ＋ Manage Contacts  ← 今回追加が必要
   ※ サイトのレビュー設定によっては、作成後 IN_MODERATION（承認待ち）に
     なり、ダッシュボードで承認するまで公開されない。これは正常。
   ※ 同じ Contact が同じ商品に 2 件目を書くとエラーになる（1人1件）。
   ============================================================ */

// メールから既存 Contact を探す（無ければ null）。
async function findContactId(email) {
  if (!email) return null;
  const res = await fetch('https://www.wixapis.com/contacts/v4/contacts/query', {
    method: 'POST',
    headers: { 'Authorization': API_KEY, 'wix-site-id': SITE_ID, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: { filter: { 'info.emails.email': email }, fieldsets: ['BASIC'] } }),
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => ({}));
  const list = data.contacts || [];
  return list.length ? (list[0].id || list[0]._id || null) : null;
}

// Contact を作る。重複(409)なら既存を引き直す。
async function createContactId(name, email) {
  const info = { name: { first: String(name || 'ゲスト').slice(0, 60) } };
  if (email) info.emails = { items: [{ tag: 'MAIN', email, primary: true }] };

  const res = await fetch('https://www.wixapis.com/contacts/v4/contacts', {
    method: 'POST',
    headers: { 'Authorization': API_KEY, 'wix-site-id': SITE_ID, 'Content-Type': 'application/json' },
    body: JSON.stringify({ info, allowDuplicates: false }),
  });

  if (res.status === 409) return await findContactId(email);   // 既に居る
  if (!res.ok) return null;

  const data = await res.json().catch(() => ({}));
  const c = data.contact || data;
  return c.id || c._id || null;
}

export async function post_reviews(request) {
  try {
    const b = await request.body.json();

    const rating = Math.min(5, Math.max(1, parseInt(b.rating, 10) || 0));
    const author = String(b.author || '').trim();
    const body   = String(b.content || '').trim();
    const email  = String(b.email || '').trim();
    if (!rating || !author || !body) {
      return badRequest({ headers: cors, body: JSON.stringify({ error: '評価・お名前・本文は必須です。' }) });
    }

    // レビューには Contact が必要。メールがあれば既存を優先、無ければ作る。
    let contactId = null;
    try {
      contactId = await findContactId(email);
      if (!contactId) contactId = await createContactId(author, email);
    } catch (e) { /* Contact が用意できなくても、下でそのまま試す */ }

    const review = {
      namespace: NAMESPACE,
      entityId: ENTITY_ID,
      author: { authorName: author.slice(0, 60) },
      content: {
        rating,
        title: b.title ? String(b.title).slice(0, 120) : undefined,
        body: body.slice(0, 3000),
      },
    };
    if (contactId) review.author.contactId = contactId;

    const res = await fetch('https://www.wixapis.com/reviews/v1/reviews', {
      method: 'POST',
      headers: {
        'Authorization': API_KEY,
        'wix-site-id': SITE_ID,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ review }),
    });

    const text = await res.text();
    if (!res.ok) {
      // 1人1件の制約に当たった場合だけ、来訪者に分かる文言にする
      if (res.status === 409 || /ALREADY_EXISTS|DUPLICATE/i.test(text)) {
        return badRequest({ headers: cors, body: JSON.stringify({ error: 'このメールアドレスでは、すでにこの商品のレビューを投稿済みです。' }) });
      }
      return serverError({ headers: cors, body: JSON.stringify({
        error: `upstream ${res.status}`,
        detail: text.slice(0, 400),
        sentContactId: contactId ? 'yes' : 'no',   // 400 の切り分け用
      }) });
    }

    let created = {};
    try { created = JSON.parse(text); } catch (e) { /* ignore */ }
    const status = (created.review && created.review.moderation && created.review.moderation.moderationStatus)
      || (created.review && created.review.status) || 'CREATED';

    return ok({ headers: cors, body: JSON.stringify({ ok: true, status }) });
  } catch (e) {
    return badRequest({ headers: cors, body: JSON.stringify({ error: String((e && e.message) || e) }) });
  }
}
