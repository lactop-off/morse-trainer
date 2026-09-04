/** public/ を _headers のヘッダ付きで配る、確認用の小さなサーバ */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const ROOT = "public";
const PORT = Number(process.env.PORT || 8788);
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".txt": "text/plain; charset=utf-8", ".json": "application/json" };

/** _headers を読み、パターン → ヘッダの一覧にする */
async function rules() {
  let txt = "";
  try { txt = await readFile(join(ROOT, "_headers"), "utf8"); } catch { return []; }
  const out = []; let cur = null;
  for (const line of txt.split("\n")) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    if (!/^\s/.test(line)) { cur = { pattern: line.trim(), headers: {} }; out.push(cur); }
    else if (cur) { const i = line.indexOf(":"); if (i > 0) cur.headers[line.slice(0, i).trim()] = line.slice(i + 1).trim(); }
  }
  return out;
}
const match = (p, pat) => pat === "/*" || (pat.endsWith("/*") ? p.startsWith(pat.slice(0, -1)) : p === pat);

const RULES = await rules();
createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  let path = decodeURIComponent(url.pathname);
  if (path.endsWith("/")) path += "index.html";
  const file = join(ROOT, normalize(path).replace(/^(\.\.[/\\])+/, ""));
  try {
    const body = await readFile(file);
    for (const r of RULES) if (match(path, r.pattern)) for (const [k, v] of Object.entries(r.headers)) res.setHeader(k, v);
    res.setHeader("Content-Type", TYPES[extname(file)] || "application/octet-stream");
    res.end(body);
  } catch { res.statusCode = 404; res.end("not found"); }
}).listen(PORT, "127.0.0.1", () => console.log(`http://127.0.0.1:${PORT}/`));
