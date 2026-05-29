// Init script — injected on every page load by `agent-browser open ... --init-script`.
// Exposes window.__abCollect(), used by tests/run-all.cjs to harvest grid state
// without having to send a giant eval expression across the CLI boundary.
window.__abCollect = function () {
  try {
    if (!window.dmx) return JSON.stringify({ ready: false, reason: 'dmx-not-loaded' });
    if (!window.TestKit) return JSON.stringify({ ready: false, reason: 'testkit-not-loaded' });
    const grids = TestKit.list();
    const out = {
      url: location.href,
      appConnect: dmx.version,
      ready: document.body.dataset.gridsReady === 'true',
      grids: {}
    };
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
    return JSON.stringify(out);
  } catch (e) {
    return JSON.stringify({ fatal: e.message, stack: (e.stack || '').split('\n').slice(0, 4) });
  }
};
