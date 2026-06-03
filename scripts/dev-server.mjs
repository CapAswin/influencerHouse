import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT) || 5502;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

function safeFilePath(urlPathname) {
  const decoded = decodeURIComponent(urlPathname);
  const joined = path.normalize(path.join(ROOT, decoded));
  if (!joined.startsWith(ROOT)) return null;
  return joined;
}

function resolveRequest(urlPathname) {
  if (urlPathname === '/' || urlPathname === '') {
    return path.join(ROOT, 'index.html');
  }

  let filePath = safeFilePath(urlPathname);
  if (!filePath) return { type: 'forbidden' };

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) filePath = indexPath;
  }

  if (!path.extname(filePath) && !fs.existsSync(filePath)) {
    const htmlCandidate = filePath + '.html';
    if (fs.existsSync(htmlCandidate)) filePath = htmlCandidate;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return { type: 'file', filePath };
  }

  const notFound = path.join(ROOT, '404.html');
  if (fs.existsSync(notFound)) {
    return { type: 'file', filePath: notFound, status: 404 };
  }

  return { type: 'missing' };
}

function sendFile(res, filePath, status = 200) {
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(status, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = url.pathname;

  if (pathname.endsWith('/') && pathname.length > 1) {
    pathname = pathname.slice(0, -1);
  }

  const resolved = resolveRequest(pathname);

  if (resolved.type === 'forbidden') {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (resolved.type === 'missing') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  sendFile(res, resolved.filePath, resolved.status || 200);
});

server.listen(PORT, () => {
  console.log(`CREOVA dev server: http://127.0.0.1:${PORT}`);
  console.log('Serving .html pages directly (no extensionless redirects).');
  console.log('Stop Live Server if port 5502 is already in use.');
});
