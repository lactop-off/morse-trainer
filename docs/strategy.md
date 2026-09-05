# 方針

2026年9月時点の調査にもとづく、このサイトの立ち位置と進め方。
根拠のある事実と、まだ不確かなことを分けて書く。

## 立ち位置

**狙いは「練習」。翻訳は取りに行かない。**

`morse code translator` は月29万検索あり、最大手の morsecode.world はこの1語だけで
月28.8万訪問を得ている。だが取りに行かない。理由は3つ。

1. 既存サイトが占有していて、無料サブドメインから追いつくのは現実的でない
2. AIが直接答えられる形の検索なので、今後さらに食われる
3. **この収益モデルでは1円にもならない。** 1回変換して離脱する人は広告の発火条件に届かない

差別化は**符号樹**。他所がやっていない教え方であり、ここだけは一番良い答えになれる。

## 収益モデルと、そこから決まる指標

無料で使えて、一定回数ごとに邪魔にならない広告が出る形（iLovePDF / ギガファイル便型）。

**収益 ∝ 再訪率 × 1セッションあたりの問題数。閲覧数ではない。**

したがって**継続してもらうことが、そのまま収益機能**になる。進捗の保存・連続日数・
段階的に広がる出題範囲は、装飾ではなく収益の中核。

### 広告の実装制約（公式ポリシー確認済み）

- **自前のオーバーレイに広告タグを入れるのは規約違反。** インタースティシャル等は
  Google が提供する仕組み（Google Publisher Tags）を使う必要がある
- ブログでよく見るオーバーレイは AdSense の **Overlay formats**（アンカー／ビネット／
  サイドレール）。Google 側が描画・頻度制御まで行う
- **ビネットはページ遷移で発火**するため、単一ページのこのアプリでは出ない
- 「N回使ったら自分のタイミングで出す」をやるなら **AdSense H5 Games Ads**（申請制）
- **Better Ads Standards**：モバイルは prestitial が全面的にアウト、デスクトップは
  **即座に閉じられるものはセーフ**。カウントダウンを付けないこと
- リワード広告は「本人の明確な同意」と「スキップ可能」が公式要件

**始め方**：まず AdSense のアンカー広告（画面下端の細い帯）。通常審査だけで済み、
計器盤をほぼ隠さず、閉じられる。`ADSENSE_CLIENT` を渡してビルドすると、広告タグ・
`ads.txt`・盤面下端の余地（`--ad-reserve`）が自動で入る。

### AdSense の公式要件（俗説との区別）

公式に書かれているのは「独自で興味を引く、高品質でオリジナルなコンテンツ」
「プログラムポリシー遵守」「18歳以上」「HTMLソースにアクセスできること」だけ。

**語数・ページ数・トラフィック・サイト年齢・サブドメインの規定は公式には存在しない。**
「500語未満は却下」「20〜30記事必要」「独自ドメイン必須」はいずれも公式文書にない。

実務上必要なもの：プライバシーポリシー、About、EU向けの同意管理（AdSense に無料の
認定CMPが同梱）、`ads.txt`。`pages.dev` は Public Suffix List に載っているため、
`<プロジェクト>.pages.dev/ads.txt` に置けば正しく機能する。

## 検索環境（2026年9月）

### 効かないと確認できたもの

- **llms.txt** — Ahrefs の137,000サイト調査で97%が流入ゼロ。30万ドメインの調査で
  設置率10.13%、AIに最も引用される上位50ドメインのうち設置は1つだけ。
  OpenAI・Google・Anthropic・Meta のいずれも本番採用を表明していない。
  Google の John Mueller は「廃止されたキーワードメタタグと同じ」と評価
- **AI向けの特別な schema / マークアップ** — Google が公式に不要と明記

> 「Google 検索（生成AI機能を含む）に表示されるために、新しい機械可読ファイル、
> AI用テキストファイル、マークアップ、Markdown を作る必要はありません」
> — Google Search Central

### 効くと確認できたもの

| 事実 | 出所 |
|---|---|
| ツール系の検索はAIに食われにくい（AI Overview 出現率：情報探索40〜50%／取引・行動系13〜14%）。ただし適用範囲は拡大中 | Semrush |
| AI引用との相関は **言及 0.664 > 被リンク 0.218** | 大規模引用データセット |
| 引用元は Wikipedia（ChatGPT上位の約半分）と Reddit（Perplexity上位の46.7%）に極端に偏る | 同上 |
| AI Overview の引用の76%は検索上位10位から。従来のSEOが土台 | Ahrefs |
| ゼロクリック率68%、AI Overview 有りで1位のCTRが -58% | SparkToro / Ahrefs |

### このサイト固有の制約

**AIのクローラーは JavaScript を実行しない。** Vercel と MERJ が数億回のクロールを
実測し、実行の形跡はゼロだった（Gemini と AppleBot は例外で実行する）。

対策として**符号表と解説を素のHTMLページとして持つ**。これがAIに中身を届ける唯一の
手段であり、同時に検索の入口と広告審査の中身を兼ねる。

**Cloudflare の 2026年9月15日の既定変更**：広告を表示するページでは学習用・
エージェント用クローラーが既定で遮断される。検索用は許可のまま。広告モデルとは
利害が一致するので問題ない。設定は Security settings で変更できる。

## やったこと / 残っていること

- [x] 進捗の保存（言語ごとの正解数・誤答数・連続日数）
- [x] 符号表ページ（9言語・素のHTMLの表・欧文53＋和文53）
- [x] 符号樹の解説ページ（9言語）
- [x] About / プライバシー（9言語）
- [x] 広告の受け皿（`ADSENSE_CLIENT` で有効化、盤面下端に余地）
- [x] `ads.txt` の自動生成
- [x] タイトルを検索語に寄せる
- [ ] Google Search Console 登録・sitemap 送信
- [ ] Bing Webmaster Tools 登録（ChatGPT検索は Bing の索引を主に使う）／IndexNow
- [ ] AdSense 申請
- [ ] Reddit（r/amateurradio、r/morse）・ham系フォーラムでの露出
- [ ] Wikipedia のモールス記事の外部リンク

## 確信していないこと

- **AIクローラーの非描画は「今の実測」**であって、各社の明言ではない。変わりうる
- **モールス練習器が H5 Games Ads の対象と認められるか**は不明。申請して確かめるしかない
- **広告審査の可否**。公式に数値基準がない以上、「これで通る」と書いてある記事は全部推測
- **pages.dev のサブドメインでどこまで戦えるか**の定量的な裏付けは見つけられなかった
- GEO/AEO と呼ばれる分野は相関しか測れておらず、因果は示されていない

## 主な出典

- [The rise of the AI crawler — Vercel](https://vercel.com/blog/the-rise-of-the-ai-crawler)
- [Google's Guide to Optimizing for Generative AI Features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [AdSense eligibility requirements](https://support.google.com/adsense/answer/9724)
- [Policies for ad units that offer rewards](https://support.google.com/adsense/answer/9121589)
- [About Auto ads（Overlay formats）](https://support.google.com/adsense/answer/9261805)
- [Display a web interstitial ad — Google Publisher Tag](https://developers.google.com/publisher-tag/samples/display-web-interstitial-ad)
- [Your site, your rules: new AI traffic options — Cloudflare](https://blog.cloudflare.com/content-independence-day-ai-options/)
- [In 2026, Less than One Third of Google Searches Still Send a Click — SparkToro](https://sparktoro.com/blog/in-2026-less-than-one-third-of-google-searches-still-send-a-click/)
- [AI Overviews are expanding across commercial intent search — Semrush](https://www.semrush.com/blog/ai-overviews-commercial-search-study/)
