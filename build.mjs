/**
 * src/ の原本から、Cloudflare Pages が配信する public/ を組み立てる。
 *
 *  - 言語ごとの静的ページを出す（/ , /ja/ , /de/ …）。検索に9言語すべて載せるため
 *  - 各ページに hreflang・canonical・OGP・JSON-LD を入れる
 *  - sitemap.xml / robots.txt / 404.html を作る
 *  - React を自前配信に切り替える（外部 CDN に依存しない）
 *
 * 使い方: node build.mjs      公開URL指定: SITE_URL=https://example.com node build.mjs
 */
import { readFile, writeFile, mkdir, rm, cp, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { PAGES } from "./src/content.mjs";

const SRC = "src/Morse Trainer.dc.html";
const OUT = "public";
const SITE = (process.env.SITE_URL || "https://morse-trainer-e7x.pages.dev").replace(/\/+$/, "");

const src = await readFile(SRC, "utf8");

/* ── 原本の文言表をそのまま使う（題名と説明を二重管理しないため）── */
const s0 = src.indexOf("/* @str-start */"), s1 = src.indexOf("/* @str-end */");
if (s0 < 0 || s1 < 0) throw new Error("build: 文言表の目印が見つからない");
const STR = new Function(src.slice(s0 + 16, s1) + "; return STR;")();

/* 符号表も原本から取り出す（対応表を二重に持たないため）*/
const c0 = src.indexOf("/* @codes-start */"), c1 = src.indexOf("/* @codes-end */");
if (c0 < 0 || c1 < 0) throw new Error("build: 符号表の目印が見つからない");
const { INTL, WABUN } = new Function(src.slice(c0 + 18, c1) + "; return { INTL, WABUN };")();

/* 既定言語は / に置き、ほかは /xx/ に置く */
const BASE = "en";
const LOCALES = Object.keys(STR);
const pathOf = (l) => (l === BASE ? "/" : `/${l}/`);
/* 付属ページ。足りない言語は英語で埋める */
const SUB = ["chart", "learn", "about", "privacy"];
const subPath = (l, name) => pathOf(l) + name + "/";
const P = (l) => Object.assign({}, PAGES.en, PAGES[l] || {});
const REPO = "https://github.com/lactop-off/morse-trainer";

/* 広告。ADSENSE_CLIENT（例: ca-pub-0000000000000000）を渡したときだけ組み込む。
   アンカー広告は画面下端に重なるので、盤面の高さをその分だけ削る。 */
const ADS = process.env.ADSENSE_CLIENT || "";
const AD_RESERVE = process.env.AD_RESERVE || "62px";
const adScript = ADS
  ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS}" crossorigin="anonymous"></script>`
  : "";
const adStyle = ADS ? `<style>:root{--ad-reserve:${AD_RESERVE}}</style>` : "";
const OG_LOCALE = { en: "en_US", ja: "ja_JP", es: "es_ES", fr: "fr_FR", de: "de_DE",
                    pt: "pt_BR", ru: "ru_RU", zh: "zh_CN", ko: "ko_KR" };

function page(lang) {
  const t = STR[lang];
  const url = SITE + pathOf(lang);
  const alt = LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${pathOf(l)}">`).join("\n")
            + `\n<link rel="alternate" hreflang="x-default" href="${SITE}/">`;
  const jsonld = JSON.stringify({
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Morse Practice Set", alternateName: t.title,
    description: t.desc, url, applicationCategory: "EducationalApplication",
    operatingSystem: "Any web browser", browserRequirements: "Requires JavaScript",
    inLanguage: LOCALES, isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: "lactop" }
  });
  const head = `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0c0b09">
<meta name="color-scheme" content="dark">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="canonical" href="${url}">
${alt}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Morse Practice Set">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="A code tree with every Morse character laid out on one panel">
<meta property="og:locale" content="${OG_LOCALE[lang] || "en_US"}">
${LOCALES.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}">`).join("\n")}
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${jsonld}</script>
${adStyle}${adScript}
<script src="/vendor/react.production.min.js" defer></script>
<script src="/vendor/react-dom.production.min.js" defer></script>
<script src="/support.js" defer></script>
</head>`;

  let html = src.replace(/<html>/, `<html lang="${lang}">`);
  if (!html.includes(`<html lang="${lang}">`)) throw new Error("build: <html> が見つからない");
  html = html.replace(/<head>[\s\S]*?<\/head>/, head);
  /* JS を切っている閲覧者と、JS を実行しない収集に本文を渡す。
     ほかの言語版への導線もここに置く（sitemap と hreflang に加えての発見経路）*/
  const links = LOCALES.filter((l) => l !== lang)
    .map((l) => `<a href="${pathOf(l)}" hreflang="${l}" style="color:#ff9a2e">${esc(STR[l].langName)}</a>`)
    .join(" &middot; ");
  html = html.replace("<x-dc hidden>",
    `<noscript><div style="max-width:46rem;margin:10vh auto;padding:0 6vw;color:#cfc7b6;`
    + `font:16px/1.85 system-ui,sans-serif;background:#0c0b09">`
    + `<p style="font:700 26px/1.3 system-ui,sans-serif;letter-spacing:.14em;margin:0 0 .2em">MORSE PRACTICE SET</p>`
    + `<p style="color:#8f887a;margin:0 0 1.4em">${esc(t.sub)}</p>`
    + `<p>${esc(t.desc)}</p>`
    + `<p style="color:#8f887a">${esc(t.nojs)}</p>`
    + `<p style="margin-top:2em;color:#8f887a">${SUB.map((n) => `<a href="${subPath(lang, n)}" style="color:#ff9a2e">${esc(P(lang).nav[n])}</a>`).join(" &middot; ")}</p>`
    + `<p style="margin-top:.6em;color:#8f887a">${links}</p>`
    + `</div></noscript>\n<x-dc hidden>`);
  return html;
}

/* ══════════ 付属ページ（符号表・解説・About・プライバシー）══════════
   アプリはブラウザで描くため、AIのクローラーには中身が届かない。
   こちらは素のHTMLなので、検索にも収集にもそのまま読まれる。 */
const SUB_CSS = `
:root{color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;background:#0c0b09;color:#d5cec1;
  font:16px/1.85 system-ui,-apple-system,"Segoe UI",Roboto,"BIZ UDPGothic",sans-serif}
a{color:#ff9a2e}
.wrap{max-width:52rem;margin:0 auto;padding:0 5vw 6rem}
header.top{border-bottom:1px solid #221f1a;background:linear-gradient(180deg,#2a2620,#151310)}
header.top .wrap{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1.4rem;padding-top:1rem;padding-bottom:1rem}
.brand{font-weight:700;letter-spacing:.16em;font-size:15px;color:#e6dcc6;text-decoration:none}
nav{display:flex;flex-wrap:wrap;gap:.4rem 1.1rem;font-size:14px}
nav a{color:#a49b8c;text-decoration:none}
nav a:hover,nav a[aria-current]{color:#ff9a2e}
h1{font-size:clamp(26px,4.4vw,38px);line-height:1.25;margin:2.4rem 0 .6rem;letter-spacing:.01em}
h2{font-size:clamp(19px,2.6vw,23px);line-height:1.35;margin:2.4rem 0 .5rem;color:#efe7d8}
p{margin:.7rem 0}
.lead{color:#b3aa9a}
.cta{display:inline-block;margin:1.6rem 0 .6rem;padding:.7rem 1.4rem;border-radius:4px;
  background:linear-gradient(180deg,#c8912f,#8a5f18);color:#1c1305;font-weight:700;
  text-decoration:none;border:1px solid #4a3814}
table{width:100%;border-collapse:collapse;margin:1rem 0 2rem;font-size:15px}
th,td{text-align:left;padding:.42rem .6rem;border-bottom:1px solid #221f1a}
th{color:#a49b8c;font-weight:600;font-size:13px;letter-spacing:.08em;text-transform:uppercase}
td.ch{font-weight:700;font-size:18px;color:#fff;width:22%}
td.cd{font-family:"Share Tech Mono",ui-monospace,monospace;font-size:19px;letter-spacing:.22em;color:#ff9a2e;width:52%}
td.n{color:#8f887a;font-variant-numeric:tabular-nums}
tbody tr:nth-child(odd){background:#131110}
.note{color:#8f887a;font-size:14.5px}
.tip{border-left:3px solid #ff9a2e;padding:.2rem 0 .2rem 1rem;margin:1.6rem 0;color:#c8bfae}
footer{border-top:1px solid #221f1a;margin-top:4rem;padding:1.6rem 0 3rem;color:#8f887a;font-size:14px}
footer .wrap{padding-bottom:0}
footer a{color:#a49b8c}
`;

/** 1文字ぶんの行 */
const row = (ch, code, dotG, dashG) =>
  `<tr><td class="ch">${esc(ch === " " ? "␣" : ch)}</td>`
  + `<td class="cd">${code.split("").map((x) => (x === "." ? dotG : dashG)).join(" ")}</td>`
  + `<td class="n">${code.length}</td></tr>`;

function table(map, t, dotG, dashG) {
  const keys = Object.keys(map).sort((a, b) => map[a].length - map[b].length || (map[a] < map[b] ? -1 : 1));
  return `<table><thead><tr><th>${esc(t.colChar)}</th><th>${esc(t.colCode)}</th><th>${esc(t.colDepth)}</th></tr></thead>`
    + `<tbody>${keys.map((k) => row(k, map[k], dotG, dashG)).join("")}</tbody></table>`;
}

function shell(lang, name, headExtra, bodyHtml) {
  const t = STR[lang], c = P(lang), url = SITE + subPath(lang, name);
  const meta = c[name];
  const alt = LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${subPath(l, name)}">`).join("\n")
            + `
<link rel="alternate" hreflang="x-default" href="${SITE}${subPath(BASE, name)}">`;
  const nav = SUB.map((n) =>
    `<a href="${subPath(lang, n)}"${n === name ? ' aria-current="page"' : ""}>${esc(c.nav[n])}</a>`).join("");
  const langLinks = LOCALES.filter((l) => l !== lang)
    .map((l) => `<a href="${subPath(l, name)}" hreflang="${l}">${esc(P(l).langName)}</a>`).join(" · ");
  const jsonld = JSON.stringify({
    "@context": "https://schema.org", "@type": name === "chart" ? "Article" : "WebPage",
    headline: meta.h1, name: meta.title, description: meta.desc, url, inLanguage: lang,
    isPartOf: { "@type": "WebSite", name: "Morse Practice Set", url: SITE + "/" }
  });
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0c0b09">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="canonical" href="${url}">
${alt}
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${jsonld}</script>
<style>${SUB_CSS}</style>
${adScript}
${headExtra || ""}
</head>
<body>
<header class="top"><div class="wrap">
  <a class="brand" href="${pathOf(lang)}">MORSE PRACTICE SET</a>
  <nav><a href="${pathOf(lang)}">${esc(c.nav.tool)}</a>${nav}</nav>
</div></header>
<main class="wrap">
${bodyHtml}
<p><a class="cta" href="${pathOf(lang)}">${esc(c.backToTool)} →</a></p>
</main>
<footer><div class="wrap">
  <p>${esc(c.otherLangs)}: ${langLinks}</p>
  <p><a href="${pathOf(lang)}">${esc(c.nav.tool)}</a> · <a href="${subPath(lang, "about")}">${esc(c.nav.about)}</a>
   · <a href="${subPath(lang, "privacy")}">${esc(c.nav.privacy)}</a> · <a href="${REPO}" rel="noopener">GitHub</a></p>
</div></footer>
</body></html>`;
}

function chartPage(lang) {
  const t = STR[lang], c = P(lang).chart;
  return shell(lang, "chart", "", `
<h1>${esc(c.h1)}</h1>
<p class="lead">${esc(c.intro)}</p>
<h2>${esc(c.secLatin)}</h2>
<p class="note">${esc(c.secLatinNote)}</p>
${table(INTL, c, t.dotG, t.dashG)}
<h2>${esc(c.secWabun)}</h2>
<p class="note">${esc(c.secWabunNote)}</p>
${table(WABUN, c, t.dotG, t.dashG)}
<p class="tip">${esc(c.tip)}</p>`);
}

function learnPage(lang) {
  const c = P(lang).learn;
  return shell(lang, "learn", "", `
<h1>${esc(c.h1)}</h1>
<p class="lead">${esc(c.desc)}</p>
${c.secs.map((s) => `<h2>${esc(s.h)}</h2>\n<p>${esc(s.p)}</p>`).join("\n")}`);
}

function prosePage(lang, name) {
  const c = P(lang)[name];
  return shell(lang, name, name === "privacy" ? '<meta name="robots" content="index, follow">' : "",
    `<h1>${esc(c.h1)}</h1>\n` + c.body.map((x) => `<p>${esc(x)}</p>`).join("\n"));
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ── 書き出し ── */
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const lang of LOCALES) {
  const dir = lang === BASE ? OUT : join(OUT, lang);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), page(lang));
}

for (const lang of LOCALES) {
  for (const name of SUB) {
    const dir = join(OUT, ...(lang === BASE ? [name] : [lang, name]));
    await mkdir(dir, { recursive: true });
    const html = name === "chart" ? chartPage(lang)
               : name === "learn" ? learnPage(lang)
               : prosePage(lang, name);
    await writeFile(join(dir, "index.html"), html);
  }
}

/* 見つからないURLは 404 を返す（Pages は 404.html を 404 で配る）*/
await writeFile(join(OUT, "404.html"), `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Not found — Morse Practice Set</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<style>html,body{height:100%}body{margin:0;display:grid;place-items:center;background:#0c0b09;
color:#cfc7b6;font:16px/1.8 system-ui,sans-serif;text-align:center}
a{color:#ff9a2e}code{color:#8f887a}</style></head>
<body><div><p style="font:600 20px/1.4 system-ui,sans-serif;letter-spacing:.14em">404</p>
<p>No signal on this frequency.</p><p><a href="/">Back to the practice set</a></p></div></body></html>`);

await writeFile(join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n`
  + `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`
  + [null, ...SUB].flatMap((name) => LOCALES.map((l) => {
      const loc = name ? subPath(l, name) : pathOf(l);
      const alt = (a) => (name ? subPath(a, name) : pathOf(a));
      return `  <url>\n    <loc>${SITE}${loc}</loc>\n`
        + LOCALES.map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${SITE}${alt(a)}"/>\n`).join("")
        + `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${alt(BASE)}"/>\n`
        + `    <changefreq>monthly</changefreq>\n  </url>`;
    })).join("\n")
  + `\n</urlset>\n`);

if (ADS) {
  const pub = ADS.replace(/^ca-/, "");
  await writeFile(join(OUT, "ads.txt"), `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`);
}

await cp("src/support.js", join(OUT, "support.js"));
await cp("src/vendor", join(OUT, "vendor"), { recursive: true });
for (const f of await readdir("static")) {
  const body = f === "robots.txt"
    ? (await readFile(join("static", f), "utf8")).replace(/\{SITE\}/g, SITE)
    : null;
  if (body !== null) await writeFile(join(OUT, f), body);
  else await cp(join("static", f), join(OUT, f), { recursive: true });
}

/* ── 結果 ── */
const kb = async (p) => Math.round((await stat(p)).size / 1024) + " KB";
console.log(`site : ${SITE}`);
console.log(`ads  : ${ADS ? ADS + " （余地 " + AD_RESERVE + "）" : "未設定（ADSENSE_CLIENT で有効化）"}`);
console.log(`pages: ${LOCALES.length} 言語 × (本体 + ${SUB.length} ページ) = ${LOCALES.length * (1 + SUB.length)} ページ`);
for (const f of ["index.html", "ja/index.html", "chart/index.html", "learn/index.html",
                 "ja/chart/index.html", "about/index.html", "privacy/index.html",
                 "404.html", "sitemap.xml", "robots.txt", "support.js", "og.png"]) {
  try { console.log(`  ${f.padEnd(38)} ${await kb(join(OUT, f))}`); } catch { console.log(`  ${f.padEnd(38)} (なし)`); }
}
