/**
 * src/ の原本から、Cloudflare Pages が配信する public/ を組み立てる。
 *
 *  - <head> を公開用に差し替える（題名・説明・アイコン・OG 画像）
 *  - React を自前配信に切り替える（外部 CDN への依存をなくす）
 *  - support.js・vendor・static をそのまま複写する
 *
 * 使い方: node build.mjs      サイトのURL: SITE_URL=https://example.com node build.mjs
 */
import { readFile, writeFile, mkdir, rm, cp, readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const SRC = "src/Morse Trainer.dc.html";
const OUT = "public";
const SITE = (process.env.SITE_URL || "https://morse-trainer.pages.dev").replace(/\/+$/, "");

const TITLE = "Morse Practice Set";
const DESC =
  "Learn Morse code by tracing a signal tree. Tap a straight key or two buttons, " +
  "watch the branch light up, and practise with built-in drills. 9 languages, no sign-up.";

const head = `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${TITLE}</title>
<meta name="description" content="${DESC}">
<meta name="theme-color" content="#0c0b09">
<meta name="color-scheme" content="dark">
<link rel="icon" href="./icon.svg" type="image/svg+xml">
<link rel="canonical" href="${SITE}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${TITLE}">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${DESC}">
<meta property="og:url" content="${SITE}/">
<meta property="og:image" content="${SITE}/og.png">
<meta name="twitter:card" content="summary_large_image">
<script src="./vendor/react.production.min.js"></script>
<script src="./vendor/react-dom.production.min.js"></script>
<script src="./support.js"></script>
</head>`;

const size = async (p) => Math.round((await stat(p)).size / 1024) + " KB";

let html = await readFile(SRC, "utf8");

// 1) <head> を公開用に差し替え（React を先に読ませて外部 CDN を使わせない）
const before = html;
html = html.replace(/<head>[\s\S]*?<\/head>/, head);
if (html === before) throw new Error("build: <head> が見つからない");
if (!html.includes("./vendor/react.production.min.js")) throw new Error("build: React の差し込みに失敗");

// 2) 書き出し
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await writeFile(join(OUT, "index.html"), html);
await cp("src/support.js", join(OUT, "support.js"));
await cp("src/vendor", join(OUT, "vendor"), { recursive: true });
for (const f of await readdir("static")) await cp(join("static", f), join(OUT, f), { recursive: true });

// 3) 結果
console.log(`site : ${SITE}`);
for (const f of ["index.html", "support.js", "vendor/react.production.min.js",
                 "vendor/react-dom.production.min.js", "icon.svg", "_headers", "robots.txt"]) {
  try { console.log(`  ${f.padEnd(38)} ${await size(join(OUT, f))}`); } catch { console.log(`  ${f.padEnd(38)} (なし)`); }
}
