// Minimal static server for the AG Grid test suite.
// Serves the repo root on http://localhost:8765 with no caching.
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.AG_TEST_PORT || 8765);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.cjs':  'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map':  'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.gif':  'image/gif',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.eot':  'application/vnd.ms-fontobject',
  '.csv':  'text/csv; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  let rel = decodeURIComponent(parsed.pathname || '/');
  if (rel === '/' || rel === '') rel = '/tests/index.html';
  const abs = path.join(ROOT, rel);
  if (!abs.startsWith(ROOT)) {
    res.writeHead(403); res.end('forbidden'); return;
  }
  fs.stat(abs, (err, st) => {
    if (err) { res.writeHead(404); res.end('not found: ' + rel); return; }
    if (st.isDirectory()) {
      const idx = path.join(abs, 'index.html');
      if (fs.existsSync(idx)) {
        sendFile(idx, res);
      } else {
        res.writeHead(404); res.end('directory listing disabled');
      }
      return;
    }
    sendFile(abs, res);
  });
});

function sendFile(abs, res) {
  const ext = path.extname(abs).toLowerCase();
  res.writeHead(200, {
    'content-type': MIME[ext] || 'application/octet-stream',
    'cache-control': 'no-store',
    'access-control-allow-origin': '*'
  });
  fs.createReadStream(abs).pipe(res);
}

server.listen(PORT, '127.0.0.1', () => {
  console.log('ag-grid test suite serving on http://localhost:' + PORT + '/tests/index.html');
});
