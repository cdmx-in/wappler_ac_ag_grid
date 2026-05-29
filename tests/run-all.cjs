// Drives agent-browser through every scenario and writes
// tests/findings.json + a console summary. One comprehensive eval per page
// keeps the WS connection short-lived and immune to daemon timeouts.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Use the npm shim (`agent-browser` / `agent-browser.cmd`) with shell:true on both
// platforms. The native .exe entry point hangs when stdout is captured, but the
// shim wraps it properly. Override via AGENT_BROWSER_BIN if needed.
const AB = process.env.AGENT_BROWSER_BIN || 'agent-browser';

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
  { file: '13-flags-styles.html',     grids: ['flagsGrid','stylesGrid','transformGrid','tipGrid'] },
  { file: '14-compact-view.html',     grids: ['compactGrid','extButtons','cellEvtGrid'] }
];

function ab(args, { allowFail = false, timeout = 60000 } = {}) {
  if (process.env.AB_DEBUG) console.error('[ab] ' + AB + ' ' + args.join(' '));
  try {
    return execFileSync(AB, args, { encoding: 'utf8', timeout, shell: true });
  } catch (e) {
    if (allowFail) return '__ERR__ ' + (e.stderr || e.message || e.stdout || '');
    throw e;
  }
}

// agent-browser --json wraps the result as
//   {"success":true,"data":{"origin":"…","result":"<stringified JS>"},"error":null}
// Pull out data.result and parse it again if it's a stringified JSON.
function decodeEval(raw) {
  let outer;
  try { outer = JSON.parse(raw); } catch (_) { return { parseError: 'outer JSON', raw: raw.slice(0,400) }; }
  if (!outer || outer.error) return { parseError: 'agent-browser error', detail: outer && outer.error };
  const r = outer.data && outer.data.result;
  if (typeof r === 'string') {
    try { return JSON.parse(r); } catch (_) { return { result: r }; }
  }
  return outer;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// The actual collector lives in tests/lib/run-collector.js and is injected via
// --init-script. Each eval call here is tiny so shell quoting stays trivial.
// Use forward slashes — Windows cmd handles them fine and avoids backslash escaping.
const COLLECTOR_SCRIPT = path.join(__dirname, 'lib', 'run-collector.js').replace(/\\/g, '/');
const COLLECT_EXPR = '__abCollect()';

(async () => {
  console.log('=== AG Grid test suite run ===');
  console.log('base:', BASE);

  // Reuse the existing session — closing forces a slow daemon restart, and
  // the same Chrome tab can navigate between scenarios just fine.

  const findings = { startedAt: new Date().toISOString(), base: BASE, pages: [] };

  function runOne(page) {
    const url = BASE + '/' + page.file;
    let opened = ab(['open', '"' + url + '"', '--init-script', '"' + COLLECTOR_SCRIPT + '"'], { allowFail: true, timeout: 45000 });
    // Disconnect → restart daemon and try once more.
    if (opened.startsWith('__ERR__') || /Failed to read|10060|timed out/i.test(opened)) {
      ab(['close', '--all'], { allowFail: true, timeout: 20000 });
      opened = ab(['open', '"' + url + '"', '--init-script', '"' + COLLECTOR_SCRIPT + '"'], { allowFail: true, timeout: 60000 });
    }
    // Page-template.js sets document.body.dataset.gridsReady once all grids are up.
    // Sleep first instead of polling — fewer round-trips means fewer chances for
    // the WS connection to time out.
    return new Promise(resolve => setTimeout(() => resolve(), Math.max(3000, page.grids.length * 800)));
  }

  for (const page of PAGES) {
    console.log('\n--- ' + page.file);
    await runOne(page);
    let raw = ab(['eval', '"' + COLLECT_EXPR + '"', '--json'], { allowFail: true, timeout: 30000 });
    let parsed = decodeEval(raw);
    if (parsed.parseError || raw.startsWith('__ERR__')) {
      ab(['close', '--all'], { allowFail: true, timeout: 20000 });
      await sleep(1500);
      await runOne(page);
      raw = ab(['eval', '"' + COLLECT_EXPR + '"', '--json'], { allowFail: true, timeout: 30000 });
      parsed = decodeEval(raw);
    }

    const expectedGrids = page.grids;
    const actualGrids = parsed.grids ? Object.keys(parsed.grids) : [];
    const missing = expectedGrids.filter(g => !actualGrids.includes(g));
    // Scenarios marked `expectEmpty` start with no data — the grid mounts but never
    // renders rows. Treat presence + empty data as a PASS for those.
    const judgeReady = (g) => {
      const s = parsed.grids && parsed.grids[g] && parsed.grids[g].state;
      if (!s) return false;
      if (page.expectEmpty) return true; // mounted, intentionally empty
      return !!(s.gridReady || s.firstDataRendered);
    };
    const judgeRows = (g) => {
      if (page.expectEmpty) return true;
      const r = parsed.grids && parsed.grids[g];
      return r && r.domRows > 0;
    };
    const allReady = parsed.grids && expectedGrids.every(judgeReady);
    const allHaveRows = parsed.grids && expectedGrids.every(judgeRows);

    const status = parsed.fatal ? 'ERROR' :
                   (missing.length ? 'MISSING' :
                   (!allReady ? 'NOT_READY' :
                   (!allHaveRows ? 'NO_DOM_ROWS' : 'PASS')));

    console.log('  status:', status);
    if (missing.length) console.log('  missing grids:', missing.join(','));
    if (parsed.grids) {
      for (const g of expectedGrids) {
        const x = parsed.grids[g];
        if (!x) continue;
        console.log('  ' + g + ': count=' + x.count + ' domRows=' + x.domRows + ' state=' + JSON.stringify(x.state));
      }
    }
    if (parsed.fatal) console.log('  fatal:', parsed.fatal);

    findings.pages.push({ file: page.file, status, expectedGrids, missing, result: parsed });
  }

  findings.finishedAt = new Date().toISOString();
  fs.writeFileSync(OUT_FILE, JSON.stringify(findings, null, 2));
  const summary = findings.pages.map(p => ({ file: p.file, status: p.status, missing: p.missing }));
  console.log('\\n=== summary ===');
  console.table(summary);
  console.log('wrote ' + OUT_FILE);
})().catch(e => { console.error(e); process.exit(1); });
