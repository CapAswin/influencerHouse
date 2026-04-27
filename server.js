/**
 * Minimal dev server for this static site + API proxy.
 *
 * Why: VSCode Live Server can't serve `/api/*` routes (static only), which causes 404s.
 * This server serves the HTML/CSS/JS files AND proxies `/api/subscription-plans`.
 *
 * Run:
 *   node server.js
 * Then open:
 *   http://127.0.0.1:8000
 *   http://127.0.0.1:8000/api/subscription-plans?usertype=0
 */
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 8000);

function readEnvConfig(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const out = {};
    content.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const idx = trimmed.indexOf("=");
      if (idx === -1) return;
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
      out[key] = value;
    });
    return out;
  } catch {
    return {};
  }
}

const envConfig = readEnvConfig(path.join(ROOT, ".env"));

function sendJson(res, statusCode, body) {
  const payload = JSON.stringify(body);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml; charset=utf-8";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".ico":
      return "image/x-icon";
    case ".woff":
      return "font/woff";
    case ".woff2":
      return "font/woff2";
    case ".ttf":
      return "font/ttf";
    default:
      return "application/octet-stream";
  }
}

async function proxySubscriptionPlans(req, res, requestUrl) {
  const usertype = requestUrl.searchParams.get("usertype") || "0";
  const apiBaseUrl =
    (envConfig.OPULENT_API_BASE_URL ||
      "https://www.opulentprimeproperties.com/influencer_house/web-v2/") + "";
  const base = apiBaseUrl.replace(/\/?$/, "/");
  const remoteUrl = `${base}subscription-plans/?usertype=${encodeURIComponent(
    usertype,
  )}`;

  const envToken = envConfig.OPULENT_SUBSCRIPTION_API_TOKEN || "";
  const authHeader = req.headers.authorization || "";
  const tokenHeader = req.headers.token || req.headers["x-api-token"] || "";
  const token = tokenHeader || envToken;

  const headers = { Accept: "application/json" };
  if (authHeader) headers.Authorization = authHeader;
  else if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const upstream = await fetch(remoteUrl, { method: "GET", headers });
    const text = await upstream.text();
    res.writeHead(upstream.status, {
      "Content-Type":
        upstream.headers.get("content-type") || "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(text);
  } catch (error) {
    sendJson(res, 502, {
      success: false,
      error: "Node proxy failed to reach remote API",
      detail: error && error.message ? error.message : String(error),
    });
  }
}

function safeResolve(p) {
  const decoded = decodeURIComponent(p);
  const clean = decoded.split("?")[0].split("#")[0];
  const joined = path.join(ROOT, clean);
  const normalized = path.normalize(joined);
  if (!normalized.startsWith(ROOT)) return null;
  return normalized;
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || "/", `http://${req.headers.host}`);

  if (requestUrl.pathname === "/api/subscription-plans") {
    await proxySubscriptionPlans(req, res, requestUrl);
    return;
  }

  // Serve static files
  const pathname = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const filePath = safeResolve(pathname);
  if (!filePath) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bad request");
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentTypeFor(filePath),
      "Cache-Control": "no-cache",
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Dev server running at http://127.0.0.1:${PORT}`);
});
