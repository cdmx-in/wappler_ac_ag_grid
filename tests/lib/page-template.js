// Shared page chrome — renders header + breadcrumbs so each scenario stays consistent.
// Call once at the top of <body>: TestPage.header({ title: '01 - Basic', summary: '...' });
window.TestPage = (function () {
  const VERSION = window.__AG_GRID_TEST_SUITE__ || {};
  return {
    header: function (opts) {
      const wrap = document.createElement('header');
      wrap.className = 'test-header';
      wrap.innerHTML = `
        <div>
          <nav class="crumbs"><a href="./index.html">&larr; Suite</a></nav>
          <h1>${opts.title || 'AG Grid Scenario'}</h1>
          <div class="meta">${opts.summary || ''}</div>
        </div>
        <div class="meta">
          <span class="tag-status"><span class="dot" id="page-status"></span><span id="page-status-text">loading</span></span>
          <div>AppConnect <code>${VERSION.appConnect || '?'}</code> · Module <code>${VERSION.module || '?'}</code></div>
        </div>`;
      document.body.insertBefore(wrap, document.body.firstChild);

      // Update status dot when AppConnect parses and any grids report ready.
      const setStatus = (state, text) => {
        const dot = document.getElementById('page-status');
        const txt = document.getElementById('page-status-text');
        if (dot) dot.className = 'dot ' + state;
        if (txt) txt.textContent = text;
      };
      const wait = () => {
        if (!window.dmx || !dmx.app) return setTimeout(wait, 50);
        setStatus('ready', 'app parsed');
        // Best-effort: look for any registered grids and watch their state.
        const grids = Array.from(document.querySelectorAll('dmx-ag-grid'));
        if (!grids.length) return;
        const ids = grids.map(g => g.id).filter(Boolean);
        const tick = () => {
          if (!dmx.app || !dmx.app.get) return setTimeout(tick, 100);
          const allReady = ids.every(id => {
            const c = dmx.app.get(id);
            // gridReady fires first, then firstDataRendered — either is proof the grid mounted.
            return c && c.state && (c.state.gridReady || c.state.firstDataRendered);
          });
          if (allReady) {
            setStatus('ready', 'grids ready: ' + ids.join(', '));
            document.body.dataset.gridsReady = 'true';
          } else {
            setTimeout(tick, 150);
          }
        };
        tick();
      };
      wait();
    }
  };
})();
