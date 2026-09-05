# Morse Practice Set

**公開先 → https://morse-trainer-e7x.pages.dev/**

符号樹（モールス符号の二分木）をたどって、モールス符号を覚えるための練習器。
ブラウザだけで動き、登録も設定も要らない。9言語対応。

- **符号樹** … 全53字を1枚の木として表示。丸＝短点でたどり着いた字、角＝長点でたどり着いた字
- **電鍵** … 押している長さで短点／長点を判定。初心者向けに「2釦」方式にも切替可
- **出題モード** … 「この字を打て」と出題し、正誤を判定。間違えると木の上に正解の経路を表示
- **自動確定** … 手を止めると文字が確定（ファーンズワース間隔：符号は12 WPM、確定は1.5秒）

## ファイル構成

```
src/                        原本。ここだけを編集する
  Morse Trainer.dc.html       画面と処理の本体（デザインキャンバスで編集）
  content.mjs                 付属ページ（符号表・解説・About・privacy）の本文 9言語
  support.js                  実行基盤（自動生成物。編集しない）
  vendor/                     React 18.3.1（unpkg 版と同一。SHA-384 検証済み）
static/                     そのまま公開物に入るファイル
  _headers                    Cloudflare Pages のヘッダ設定（CSP・キャッシュ）
  icon.svg  og.png  robots.txt
build.mjs                   src + static → public を組み立てる
scripts/serve.mjs           _headers を適用して public を配る確認用サーバ
public/                     生成物。git 管理外。Cloudflare Pages はここを配信
docs/strategy.md            方針。何を狙い、何を狙わないか。調査の根拠つき
archive/                    過去版（v1・v2）
```

## 開発

```bash
npm run build     # public/ を組み立てる
npm run serve     # 本番と同じヘッダを付けて http://127.0.0.1:8788/ で確認
npm run preview   # wrangler pages dev で確認
```

画面を直す場合は `src/Morse Trainer.dc.html` を編集し、`npm run build` で反映する。
`src/` の原本はブラウザで直接開いても単体で動く。

## 公開

```bash
npm run deploy                                  # wrangler pages deploy public
SITE_URL=https://morse-trainer-e7x.pages.dev npm run build   # canonical と OG のURL
```

初回のみ Cloudflare へのログインが必要:

```bash
npx wrangler login
```

GitHub 連携で自動公開する場合は Cloudflare Pages 側で次を設定する。

| 項目 | 値 |
|---|---|
| Build command | `npm run build` |
| Build output directory | `public` |
| 環境変数 | `SITE_URL` = 公開URL（任意） |

## 広告

`ADSENSE_CLIENT` を渡してビルドすると、広告タグ・`ads.txt`・盤面下端の余地が入る。

```bash
ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx npm run build
AD_RESERVE=62px   # 盤面から削る高さ。既定 62px
```

渡さなければ広告関連は一切出力されない。まずはアンカー広告（画面下端の帯）を想定。
自前のオーバーレイに広告タグを入れるのは規約違反なので、必ず Google の形式を使うこと。
詳細と根拠は `docs/strategy.md`。

## 検索対策（SEO）

`build.mjs` が言語ごとの静的ページを吐く。1つのURLで切り替えるだけだと、
検索エンジンには1言語しか見えないため。さらに **AIのクローラーは JavaScript を
実行しない**ので、符号表と解説は素のHTMLページとして別に持っている。

| 生成物 | 内容 |
|---|---|
| `/` と `/ja/` `/es/` `/fr/` `/de/` `/pt/` `/ru/` `/zh/` `/ko/` | 9言語ぶんの静的ページ。`<html lang>`・題名・説明・OGP をその言語で出力 |
| hreflang | 各ページに9言語ぶん + `x-default`。相互に関連付ける |
| canonical | 各ページ自身を指す（`/` が既定言語で `x-default`） |
| JSON-LD | `WebApplication` として構造化データを出力 |
| `sitemap.xml` | 9URL、それぞれに hreflang 付き |
| `404.html` | 存在しないURLに 404 を返す（重複コンテンツを防ぐ） |
| `<noscript>` | JS を実行しない収集向けの本文と、他言語版への導線 |
| `/chart/` `/learn/` `/about/` `/privacy/` | 9言語 × 4ページ。素のHTML。符号表106行はテキストとして存在する |
| `og.png` | SNS カード専用の作画（1200×630・約110KB）。スクリーンショットではない |

見出しは `<h1>`（銘板）と `<h2>`（各区画）で構成。画面には出ない説明文を
`.sr` クラスで1文だけ置いている。読み込みを止めないよう、JS は3本とも `defer`。

`/ja/` のようなURLは、利用者が手動で選んだ言語の記憶より優先される（明示指定とみなす）。
画面右上の切替はページを移動せずその場で切り替わる（打鍵中の状態を失わないため）。

## 表示言語の決まり方

上から順に見て、最初に一致したものを使う。

1. `?lang=ja` などのURL引数
2. 利用者が画面右上で選んだ言語（ブラウザに記憶）
3. パスの先頭 `/ja/`
4. サブドメイン `ja.example.com`
5. **アクセスされたドメインの国別トップレベル** … `.jp`→日本語、`.de`→ドイツ語、`.br`→ポルトガル語 など
6. ブラウザの言語設定
7. 英語

対応言語は English / 日本語 / Español / Français / Deutsch / Português / Русский / 中文 / 한국어。
言語を足すには `src/Morse Trainer.dc.html` 内の `LANGS` に1行、`STR` に1ブロック追加する
（不足した項目は自動的に英語で埋まる）。ドメインと言語の対応は同ファイルの `TLD_LANG` にある。

## 技術的な注意

- **属性名はハイフン区切りで書くこと。** `strokeWidth` のようなキャメルケースは、実行基盤が
  DOM を経由してテンプレートを読む経路で小文字に潰れて無効になる。`stroke-width` と書く。
  例外は `viewBox` と `preserveAspectRatio`（HTML の仕様で保護される）。
- **符号樹の線幅は `vector-effect="non-scaling-stroke"` を付ける。** これがないと、
  表示領域が小さいときに線幅が1ピクセルを切って見えなくなる。
- **CSP に `'unsafe-eval'` が必要。** 実行基盤が `new Function` でロジックを評価するため。
- React は自前配信なので外部CDNへの接続はない。外部通信は Google Fonts のみ。
  完全に外部依存をなくしたい場合は、フォントも `static/` に置いて CSS の `@font-face` を書き換える。
