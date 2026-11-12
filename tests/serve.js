const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.cwd(), "_site");
const port = Number(process.env.PORT || 8080);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf"
};

function resolveFile(pathname) {
  const decoded = decodeURIComponent(pathname.split("?")[0]);
  const relative = decoded.replace(/^\/+/, "");
  const base = path.resolve(root, relative);
  if (base !== root && !base.startsWith(root + path.sep)) return null;

  const candidates = [];
  if (!relative) candidates.push(path.join(root, "index.html"));
  else {
    candidates.push(base);
    candidates.push(path.join(base, "index.html"));
    if (!path.extname(base)) candidates.push(base + ".html");
  }
  return candidates.find(file => {
    try { return fs.statSync(file).isFile(); } catch { return false; }
  }) || null;
}

http.createServer((req, res) => {
  let file;
  try { file = resolveFile(new URL(req.url, "http://localhost").pathname); }
  catch { file = null; }
  if (!file) {
    file = path.join(root, "404.html");
    if (!fs.existsSync(file)) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    res.statusCode = 404;
  }
  res.setHeader("Content-Type", mime[path.extname(file).toLowerCase()] || "application/octet-stream");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "HEAD") { res.end(); return; }
  fs.createReadStream(file).on("error", () => {
    if (!res.headersSent) res.writeHead(500);
    res.end();
  }).pipe(res);
}).listen(port, "127.0.0.1", () => {
  process.stdout.write("Static test server ready on http://127.0.0.1:" + port + "\n");
});
