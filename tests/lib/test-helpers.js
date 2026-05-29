// Test helpers — exposed as both an AppConnect component and a console-friendly API.
//
// <dmx-test-data id="rows" source="employees"></dmx-test-data>
//   → exposes rows.value = window.SampleData.employees
//
// <dmx-event-log id="log"></dmx-event-log>
//   → use dmx-on:event_name="log.add(event)" on a grid to record event names.
//
// Both load before dmxAppConnect.js auto-parse, so they are available
// when the page is first parsed by AppConnect.

(function () {
  if (typeof dmx === 'undefined') {
    console.error('[test-helpers] dmx is not loaded yet — load dmxAppConnect.js before this file.');
    return;
  }

  dmx.Component('test-data', {
    initialData: {
      value: [],
      ready: false
    },
    attributes: {
      source: { type: String, default: null },
      data: { type: Array, default: null }
    },
    init: function () {
      // Defer to next tick so the grid (or any consumer) sees a [] -> [...] transition,
      // which is the only way dmx-ag-grid's requestUpdate('data', oldValue) fires.
      const self = this;
      const apply = function () { self._apply(); };
      if (typeof dmx !== 'undefined' && typeof dmx.nextTick === 'function') {
        dmx.nextTick(apply, self);
      } else {
        setTimeout(apply, 0);
      }
    },
    requestUpdate: function () {
      // If `data` or `source` attribute changes later, re-apply.
      this._apply();
    },
    methods: {
      reload: function () { this._apply(); },
      mutate: function (mutator) {
        if (typeof mutator === 'function') {
          const next = mutator((this.data.value || []).slice());
          this.set('value', next);
        }
      }
    },
    _apply: function () {
      let next = [];
      if (Array.isArray(this.props.data) && this.props.data.length) {
        next = this.props.data;
      } else if (this.props.source && window.SampleData && window.SampleData[this.props.source]) {
        next = window.SampleData[this.props.source].slice();
      }
      this.set('value', next);
      this.set('ready', true);
    }
  });

  dmx.Component('event-log', {
    initialData: {
      events: [],
      last: null,
      count: 0
    },
    attributes: {
      max: { type: Number, default: 100 }
    },
    methods: {
      add: function (entry) {
        const events = this.data.events.slice();
        const stamp = new Date().toISOString();
        const record = typeof entry === 'string'
          ? { name: entry, at: stamp }
          : { name: (entry && entry.type) || 'unknown', at: stamp, detail: entry };
        events.unshift(record);
        if (events.length > this.props.max) events.length = this.props.max;
        this.set('events', events);
        this.set('last', record);
        this.set('count', events.length);
      },
      clear: function () {
        this.set('events', []);
        this.set('last', null);
        this.set('count', 0);
      }
    }
  });

  // Console / agent helper: window.TestKit
  // dmx.app.get(id) returns the reactive-data proxy, with state on .state and
  // public methods exposed as __methodName (e.g. __reloadGrid).
  window.TestKit = {
    grid: function (id) {
      return dmx.app && typeof dmx.app.get === 'function' ? dmx.app.get(id) : null;
    },
    waitForGrid: function (id, timeout) {
      timeout = timeout || 5000;
      return new Promise((resolve, reject) => {
        const start = Date.now();
        const tick = () => {
          const g = window.TestKit.grid(id);
          if (g && g.state && g.state.gridReady) return resolve(g);
          if (Date.now() - start > timeout) return reject(new Error('grid ' + id + ' did not become ready'));
          setTimeout(tick, 50);
        };
        tick();
      });
    },
    snapshot: function (id) {
      const g = window.TestKit.grid(id);
      if (!g) return null;
      return {
        count: g.count,
        state: g.state,
        selectedRows: g.selectedRows,
        filterState: g.filterState,
        columnState: g.columnState,
        fields: g.fields,
        rowId: g.id
      };
    },
    callMethod: function (id, method) {
      const args = Array.prototype.slice.call(arguments, 2);
      const g = window.TestKit.grid(id);
      const key = '__' + method;
      if (!g || typeof g[key] !== 'function') {
        console.error('[TestKit] no method', method, 'on', id);
        return null;
      }
      return g[key].apply(g, args);
    },
    list: function () {
      // Find dmx-ag-grid elements in the DOM and return their dmx ids — more reliable
      // than poking at internal component metadata, which AppConnect doesn't expose
      // consistently across versions.
      return Array.from(document.querySelectorAll('dmx-ag-grid'))
        .map(el => el.id)
        .filter(Boolean);
    }
  };
})();
