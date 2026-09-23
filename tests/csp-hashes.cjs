// Prints the CSP `style-src` hash allow-list that AG Grid (the with-styles UMD bundle) and
// dmx-ag-grid.js need, so a page can drop 'unsafe-inline' without touching the module.
//
//   node tests/csp-hashes.cjs            → directive + helmet array form on stdout
//   node tests/csp-hashes.cjs --verify   → also reload every scenario page under that header;
//                                          exit 1 on any AG Grid/module violation or broken grid
//
// Regenerate after ANY upgrade of ag-grid-community or dmx-ag-grid.js: the hashes are bound to
// the exact bytes of the injected CSS. Chrome auto-detection is the same as run-all-puppeteer.cjs
// (set PUPPETEER_EXECUTABLE_PATH to override).
const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const puppeteer = require('puppeteer-core');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.AG_TEST_PORT) || 8766;
const VERIFY = process.argv.includes('--verify');
// ponytail: coverage = whatever these pages (plus poke() below) make AG Grid inject. A feature
// outside the suite can need one more hash; add a scenario page for it and re-run.
const PAGES = fs.readdirSync(__dirname).filter(f => /^\d\d-.*\.html$/.test(f)).sort();
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.map': 'application/json' };
const sha = s => crypto.createHash('sha256').update(s, 'utf8').digest('base64');
const sleep = ms => new Promise(r => setTimeout(r, ms));

function findChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  const candidates = process.platform === 'win32' ? [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Users\\Roney\\.agent-browser\\browsers\\chrome-148.0.7778.97\\chrome.exe'
  ] : process.platform === 'darwin' ? [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium'
  ] : [
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium'
  ];
  return candidates.find(p => fs.existsSync(p));
}

// Static server over the repo root (serve.cjs cannot set headers). `csp` is sent on HTML responses.
let csp = null;
const server = http.createServer((req, res) => {
  const file = path.normalize(path.join(ROOT, decodeURIComponent(req.url.split('?')[0])));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); return res.end('404'); }
    const headers = { 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-store' };
    if (csp && file.endsWith('.html')) headers['content-security-policy'] = csp;
    res.writeHead(200, headers);
    res.end(buf);
  });
});

// <style> blocks written into the scenario pages themselves are the pages' business, not the list's.
const pageOwned = new Set();
for (const f of PAGES) {
  for (const m of fs.readFileSync(path.join(__dirname, f), 'utf8').matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    pageOwned.add(sha(m[1]));
    pageOwned.add(sha(m[1].replace(/\r\n/g, '\n')));
  }
}

// The module's three static blocks, hashed from source (template literals normalise CRLF to LF),
// so they are listed even when no scenario switches the option on.
function moduleBlocks() {
  const src = fs.readFileSync(path.join(ROOT, 'dmx-ag-grid.js'), 'utf8');
  const wanted = [
    ['dmx-ag-grid.js cell centering', /styleElement\.textContent \+= `([\s\S]*?)`;/],
    ['dmx-ag-grid.js sticky h-scroll', /styleElement\.innerHTML = `([\s\S]*?)`;/],
    ['dmx-ag-grid.js pagination panel', /const paginationPanelCss = `([\s\S]*?)`;/]
  ];
  const out = [];
  for (const [tag, re] of wanted) {
    const m = src.match(re);
    if (m) out.push({ hash: sha(m[1].replace(/\r\n/g, '\n')), tag, len: m[1].length });
    else console.warn('warning: "' + tag + '" block not found in dmx-ag-grid.js — the module changed; check the runtime <style> blocks');
  }
  return out;
}

// Best-effort clicks so AG Grid also injects the CSS of lazily created parts (menus, popups, editors).
async function poke(page) {
  const steps = [
    async () => { await (await page.$('.ag-header-cell')).hover(); await sleep(150); await (await page.$('.ag-header-cell-menu-button')).click(); },
    async () => { await (await page.$('.ag-floating-filter-button-button')).click(); },
    async () => { await (await page.$('.ag-cell')).click({ clickCount: 2 }); },
    async () => { await (await page.$('.ag-header-cell-label')).click(); },
    async () => { await (await page.$('.ag-paging-button[data-ref="btNext"]')).click(); }
  ];
  for (const step of steps) {
    try { await step(); await sleep(300); await page.keyboard.press('Escape'); } catch (_) { /* element absent on this page */ }
  }
}

async function load(browser, file, policy) {
  csp = policy;
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);
  const demanded = new Set(); // hashes Chrome names in its CSP console errors
  page.on('console', m => {
    const t = m.text();
    if (/Content Security Policy/.test(t)) (t.match(/sha256-[A-Za-z0-9+/=]+/g) || []).forEach(h => demanded.add(h.slice(7)));
  });
  await page.evaluateOnNewDocument(() => {
    window.__cspv = [];
    window.__styles = new Map(); // text → origin
    document.addEventListener('securitypolicyviolation', e => window.__cspv.push({ directive: e.violatedDirective, src: (e.sourceFile || '').split('/').pop() }));
    const rec = el => {
      if (!el || el.nodeType !== 1 || el.tagName !== 'STYLE' || window.__styles.has(el.textContent)) return;
      window.__styles.set(el.textContent, el.getAttribute('data-ag-scope') ? 'ag-grid bundle (style-loader)' : el.dataset.agGlobalCss ? 'ag-grid theming api' : 'other');
    };
    new MutationObserver(ms => {
      for (const m of ms) {
        if (m.type === 'characterData') { rec(m.target.parentElement); continue; }
        rec(m.target);
        m.addedNodes.forEach(n => {
          if (n.nodeType === 1) { rec(n); n.querySelectorAll && n.querySelectorAll('style').forEach(rec); }
          else if (n.nodeType === 3) rec(n.parentElement);
        });
      }
    }).observe(document, { childList: true, subtree: true, characterData: true });
  });
  await page.goto('http://127.0.0.1:' + PORT + '/tests/' + file, { waitUntil: 'domcontentloaded' });
  try { await page.waitForFunction(() => document.body.dataset.gridsReady === 'true', { timeout: 8000 }); } catch (_) { /* empty-grid pages never set it */ }
  await sleep(500);
  await poke(page);
  await sleep(400);
  const result = await page.evaluate(() => {
    document.querySelectorAll('style').forEach(s => { if (!window.__styles.has(s.textContent)) window.__styles.set(s.textContent, s.dataset.agGlobalCss ? 'ag-grid theming api' : 'other'); });
    const grids = {};
    document.querySelectorAll('dmx-ag-grid').forEach(g => { const w = document.querySelector('#' + g.id + '-grid .ag-root-wrapper'); grids[g.id] = w ? getComputedStyle(w).display : 'n/a'; });
    return { styles: [...window.__styles.entries()], violations: window.__cspv, grids };
  });
  await page.close();
  return { ...result, demanded: [...demanded] };
}

(async () => {
  const exe = findChrome();
  if (!exe) { console.error('No Chrome executable found — set PUPPETEER_EXECUTABLE_PATH'); process.exit(2); }
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const browser = await puppeteer.launch({ executablePath: exe, headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });

  // 1. Harvest every <style> text the pages ever hold.
  const blocks = new Map(); // hash → { tag, len }
  for (const b of moduleBlocks()) blocks.set(b.hash, { tag: b.tag, len: b.len });
  blocks.set(sha(''), { tag: 'empty <style> (style-loader inserts it empty, then fills it)', len: 0 });
  for (const f of PAGES) {
    for (const [text, tag] of (await load(browser, f, null)).styles) {
      const h = sha(text);
      if (!blocks.has(h) && !pageOwned.has(h)) blocks.set(h, { tag, len: text.length });
    }
  }
  for (const [h, b] of blocks) if (b.tag === 'other') console.warn('note: allowing an unattributed <style> block of ' + b.len + ' chars: ' + h);

  const rank = t => /^dmx-ag-grid/.test(t) ? 0 : /^empty/.test(t) ? 1 : /bundle/.test(t) ? 2 : /theming/.test(t) ? 3 : 4;
  const ordered = [...blocks.entries()].sort((a, b) => rank(a[1].tag) - rank(b[1].tag) || a[0].localeCompare(b[0]));
  const sources = ordered.map(([h]) => "'sha256-" + h + "'");
  const directive = "style-src 'self' " + sources.join(' ');
  const groups = ['dmx-ag-grid.js', 'empty', 'ag-grid bundle', 'ag-grid theming api', 'other'];
  const counts = {};
  for (const [, b] of ordered) counts[groups[rank(b.tag)]] = (counts[groups[rank(b.tag)]] || 0) + 1;
  console.log('# ' + blocks.size + ' hashes ' + JSON.stringify(counts) + ' — also needed: img-src \'self\' data:; font-src \'self\' data:');
  console.log(directive + '\n');
  console.log('# helmet: styleSrc: ' + JSON.stringify(["'self'", ...sources]) + '\n');

  // 2. Verify: every page under the header, no AG Grid/module violation, every grid laid out.
  let failed = 0;
  if (VERIFY) {
    const header = directive + "; font-src 'self' data:; img-src 'self' data:";
    for (const f of PAGES) {
      const r = await load(browser, f, header);
      const ours = r.violations.filter(v => !/^\d\d-.*\.html$/.test(v.src)); // the pages' own style= / <style> are excluded
      const broken = Object.entries(r.grids).filter(([, d]) => d !== 'flex' && d !== 'n/a').map(([id]) => id);
      const ok = !ours.length && !broken.length;
      if (!ok) failed++;
      console.log((ok ? 'PASS ' : 'FAIL ') + f.padEnd(28) + ' ag-grid/module violations=' + ours.length + ' broken grids=' + JSON.stringify(broken));
      if (ours.length) console.log('     hashes Chrome asked for: ' + r.demanded.join(', '));
    }
    console.log(failed ? '\n' + failed + ' page(s) failed under the hash-only policy' : '\nall ' + PAGES.length + ' pages pass under the hash-only policy');
  }
  await browser.close();
  server.close();
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
