// Alternative runner using puppeteer-core against the system Chrome.
// More reliable than the agent-browser CLI driver for long sequential runs.
// Works on Windows/Linux/macOS — set PUPPETEER_EXECUTABLE_PATH to override the
// browser auto-detection.
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const BASE = process.env.AG_TEST_BASE || 'http://localhost:8765/tests';
const OUT_FILE = path.join(__dirname, 'findings.json');

const PAGES = [
  { file: '01-basic-render.html',     grids: ['basicGrid'] },
  { file: '02-themes-locale.html',    grids: ['g_alpine','g_balham','g_material','g_quartz','g_custom','g_dark','g_he','g_ru','g_es'] },
  { file: '03-editing.html',          grids: ['cellEdit','rowEdit','selectEdit'] },
  { file: '04-selection.html',        grids: ['selGrid','singleSel'] },
  { file: '05-action-buttons.html',   grids: ['actGrid'] },
  { file: '06-export.html',           grids: ['expGrid','noExp'] },
  { file: '07-import.html',           grids: ['importGrid'], expectEmpty: true },
  { file: '08-formatting.html',       grids: ['fmtGrid','ctypeGrid','hdrGrid'] },
  { file: '09-grouping.html',         grids: ['grpGrid','aggGrid'] },
  { file: '10-state-persistence.html',grids: ['stateGrid'] },
  { file: '11-layout.html',           grids: ['autoH','fixedH','scrollH'] },
  { file: '12-methods.html',          grids: ['m'] },
  { file: '13-flags-styles.html',     grids: ['flagsGrid','rsFn','rsOp','rsCompound','rsShort','rsFirst','rsLegacy','csCell','transformGrid','tipGrid'], pageAssertion: '__rsCheck' },
  { file: '14-compact-view.html',     grids: ['compactGrid','extButtons','cellEvtGrid'] }
];

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

(async () => {
  const exe = findChrome();
  if (!exe) {
    console.error('No Chrome executable found — set PUPPETEER_EXECUTABLE_PATH');
    process.exit(2);
  }
  console.log('chrome:', exe);

  const browser = await puppeteer.launch({
    executablePath: exe,
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);

  const findings = { startedAt: new Date().toISOString(), base: BASE, pages: [] };
  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push({ msg: e.message }));
  page.on('console', msg => {
    if (msg.type() === 'error') pageErrors.push({ msg: msg.text() });
  });

  for (const spec of PAGES) {
    pageErrors.length = 0;
    const url = BASE + '/' + spec.file;
    console.log('\n--- ' + spec.file);
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (e) {
      console.log('  navigation failed:', e.message);
      findings.pages.push({ file: spec.file, status: 'NAV_FAIL', error: e.message });
      continue;
    }

    // Wait for gridsReady or 8s, whichever comes first.
    try {
      await page.waitForFunction(
        () => document.body.dataset.gridsReady === 'true',
        { timeout: spec.expectEmpty ? 2000 : 8000 }
      );
    } catch (_) { /* fine for expectEmpty pages */ }
    // Settle render
    await new Promise(r => setTimeout(r, 600));

    const data = await page.evaluate(() => {
      try {
        if (!window.TestKit) return { fatal: 'no-testkit' };
        const grids = TestKit.list();
        const out = { url: location.href, appConnect: window.dmx && dmx.version, ready: document.body.dataset.gridsReady === 'true', grids: {} };
        grids.forEach(id => {
          const c = TestKit.grid(id);
          if (!c) return;
          out.grids[id] = {
            count: c.count,
            state: c.state,
            dataLen: Array.isArray(c.data) ? c.data.length : null,
            selectedRowsLen: (c.selectedRows || []).length,
            filterStateKeys: c.filterState && typeof c.filterState === 'object' ? Object.keys(c.filterState) : [],
            columnStateLen: (c.columnState || []).length,
            domRows: document.querySelectorAll('#' + id + '-grid .ag-row').length
          };
        });
        return out;
      } catch (e) { return { fatal: e.message }; }
    });

    const expectedGrids = spec.grids;
    const actualGrids = data.grids ? Object.keys(data.grids) : [];
    const missing = expectedGrids.filter(g => !actualGrids.includes(g));
    const judgeReady = g => {
      const s = data.grids && data.grids[g] && data.grids[g].state;
      if (!s) return false;
      if (spec.expectEmpty) return true;
      // Any of the three event flags counts. The module overwrites state on each
      // event (so only the last-fired flag is observable), but any of them
      // appearing proves the grid mounted and at least one onGrid* event fired.
      return !!(s.gridReady || s.firstDataRendered || s.rowDataUpdated);
    };
    const judgeRows = g => spec.expectEmpty ? true : (data.grids && data.grids[g] && data.grids[g].domRows > 0);
    const allReady = data.grids && expectedGrids.every(judgeReady);
    const allHaveRows = data.grids && expectedGrids.every(judgeRows);
    // Run a page-defined assertion (e.g. scenario 13 verifies rstyles actually applied).
    let assertion = null;
    if (spec.pageAssertion) {
      try {
        assertion = await page.evaluate((key) => window[key] || null, spec.pageAssertion);
      } catch (e) { assertion = { error: e.message }; }
    }
    const assertionFailed = assertion && assertion.ok === false;

    const status = data.fatal ? 'ERROR'
                 : missing.length ? 'MISSING'
                 : !allReady ? 'NOT_READY'
                 : !allHaveRows ? 'NO_DOM_ROWS'
                 : assertionFailed ? 'ASSERTION_FAIL'
                 : 'PASS';
    console.log('  status:', status);
    if (data.fatal) console.log('  fatal:', data.fatal);
    if (missing.length) console.log('  missing:', missing.join(','));
    if (data.grids) {
      for (const g of expectedGrids) {
        const x = data.grids[g];
        if (!x) continue;
        console.log('  ' + g + ': count=' + x.count + ' domRows=' + x.domRows + ' state=' + JSON.stringify(x.state));
      }
    }
    if (pageErrors.length) {
      console.log('  page errors:', pageErrors.length);
      pageErrors.slice(0, 3).forEach(e => console.log('   ', e.msg.slice(0, 200)));
    }
    if (assertion) {
      if (assertionFailed) {
        console.log('  assertion FAILED — checks that did not match:');
        (assertion.failed || []).forEach(k => {
          const c = assertion.checks && assertion.checks[k];
          console.log('   ' + k + ' expected ' + (c && c.expect) + ' got ' + (c && c.actual));
        });
      } else if (assertion.ok) {
        const n = Object.keys(assertion.checks || {}).length;
        console.log('  page assertions passed (' + n + ' checks)');
      }
    }
    findings.pages.push({ file: spec.file, status, expectedGrids, missing, result: data, pageErrors: pageErrors.slice(), assertion });
  }

  await browser.close();
  findings.finishedAt = new Date().toISOString();
  fs.writeFileSync(OUT_FILE, JSON.stringify(findings, null, 2));
  console.log('\n=== summary ===');
  console.table(findings.pages.map(p => ({ file: p.file, status: p.status })));
  console.log('wrote ' + OUT_FILE);
})().catch(e => { console.error(e); process.exit(1); });
