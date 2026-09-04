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

const SRC = "src/Morse Trainer.dc.html";
const OUT = "public";
const SITE = (process.env.SITE_URL || "https://morse-trainer-e7x.pages.dev").replace(/\/+$/, "");

const src = await readFile(SRC, "utf8");

/* ── 原本の文言表をそのまま使う（題名と説明を二重管理しないため）── */
const s0 = src.indexOf("/* @str-start */"), s1 = src.indexOf("/* @str-end */");
if (s0 < 0 || s1 < 0) throw new Error("build: 文言表の目印が見つからない");
const STR = new Function(src.slice(s0 + 16, s1) + "; return STR;")();

/* 既定言語は / に置き、ほかは /xx/ に置く */
const BASE = "en";
const LOCALES = Object.keys(STR);
const pathOf = (l) => (l === BASE ? "/" : `/${l}/`);
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
    + `<p style="margin-top:2em;color:#8f887a">${links}</p>`
    + `</div></noscript>\n<x-dc hidden>`);
  return html;
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
  + LOCALES.map((l) =>
      `  <url>\n    <loc>${SITE}${pathOf(l)}</loc>\n`
      + LOCALES.map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${SITE}${pathOf(a)}"/>\n`).join("")
      + `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>\n`
      + `    <changefreq>monthly</changefreq>\n  </url>`).join("\n")
  + `\n</urlset>\n`);

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
console.log(`pages: ${LOCALES.map(pathOf).join("  ")}`);
for (const f of ["index.html", "ja/index.html", "404.html", "sitemap.xml", "robots.txt",
                 "support.js", "vendor/react-dom.production.min.js", "og.png"]) {
  try { console.log(`  ${f.padEnd(38)} ${await kb(join(OUT, f))}`); } catch { console.log(`  ${f.padEnd(38)} (なし)`); }
}
