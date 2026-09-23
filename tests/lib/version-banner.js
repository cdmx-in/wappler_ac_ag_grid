// Detects the running AppConnect build and exposes it for the page header + console.
// Logs a warning if it drifts from the version pinned in VERSIONS.json.
window.__AG_GRID_TEST_SUITE__ = window.__AG_GRID_TEST_SUITE__ || {};

(function () {
  const EXPECTED_APP_CONNECT = '2.2.4';
  const MODULE_VERSION = '2.1.3';

  const detect = () => {
    if (!window.dmx) return null;
    return {
      version: dmx.version || null,
      hasComponentApi: typeof dmx.Component === 'function',
      hasAppContext: !!(dmx.app && typeof dmx.app.get === 'function')
    };
  };

  const log = (level, msg) => {
    const fn = console[level] || console.log;
    fn('[ag-grid-test-suite] ' + msg);
  };

  const apply = () => {
    const info = detect();
    if (!info) {
      setTimeout(apply, 50);
      return;
    }
    window.__AG_GRID_TEST_SUITE__.appConnect = info.version;
    window.__AG_GRID_TEST_SUITE__.module = MODULE_VERSION;
    window.__AG_GRID_TEST_SUITE__.expectedAppConnect = EXPECTED_APP_CONNECT;
    window.__AG_GRID_TEST_SUITE__.driftFromExpected = info.version !== EXPECTED_APP_CONNECT;

    if (info.version !== EXPECTED_APP_CONNECT) {
      log('warn',
        'AppConnect version drift: expected ' + EXPECTED_APP_CONNECT +
        ', running ' + info.version + '. Update tests/VERSIONS.json if intentional.');
    } else {
      log('log', 'AppConnect ' + info.version + ' matches pinned version.');
    }
    if (!info.hasComponentApi) {
      log('error', 'dmx.Component API missing — grid will not register.');
    }
  };
  apply();
})();
