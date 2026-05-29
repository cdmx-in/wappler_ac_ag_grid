# AG Grid · Wappler Module · Browser Test Suite

End-to-end UI tests for `<dmx-ag-grid>` driven by the
[agent-browser](https://www.npmjs.com/package/agent-browser) CLI. Works on Windows
and Linux/macOS.

## Quick run

From the repo root:

```bash
# 1. start the static server (project root must be served; tests/* uses relative
#    paths to ../node_modules and ../dmx-ag-grid.js)
node tests/serve.cjs                 # http://localhost:8765/tests/index.html

# 2. drive every scenario, capture findings.json
#    recommended — headless Chrome via puppeteer-core (faster, more reliable):
node tests/run-all-puppeteer.cjs
#    alternative — drives the agent-browser CLI (Windows + Linux):
node tests/run-all.cjs
```

Both produce the same `tests/findings.json` and per-page status table.
See `FINDINGS.md` for the last run's results and the bugs that were patched
along the way.

A human can also open `http://localhost:8765/tests/index.html` to click through
scenarios manually.

## Layout

```
tests/
├── README.md                    ← this file
├── VERSIONS.json                ← pinned dependency versions
├── FINDINGS.md                  ← last run's results + bugs/fixes
├── findings.json                ← machine-readable last run output
├── index.html                   ← scenario directory
├── 01-basic-render.html         ← default columns, sort, filter, pagination
├── 02-themes-locale.html        ← all 5 themes + dark + RTL + locale
├── 03-editing.html              ← cell + row + static-select editors
├── 04-selection.html            ← single/multi selection + checkbox + status
├── 05-action-buttons.html       ← edit/view/delete + button1..5 + conditions
├── 06-export.html               ← CSV / XLSX / PDF
├── 07-import.html               ← importFileData (CSV + XLSX)
├── 08-formatting.html           ← amount, date, ctypes, cnames, cwidths
├── 09-grouping.html             ← group_config + columns_to_sum/count
├── 10-state-persistence.html    ← saveColumnState + applyFilters
├── 11-layout.html               ← autoHeight, fixed_header, scroll
├── 12-methods.html              ← every imperative method as a button
├── 13-flags-styles.html         ← suppress_*, rstyles, cstyles, data_changes
├── 14-compact-view.html         ← compact_view + buttons 6–15
├── serve.cjs                    ← cross-platform static server
├── run-all.cjs                  ← agent-browser CLI driver (cross-platform)
├── run-all-puppeteer.cjs        ← headless Chrome driver (recommended)
├── data/
│   └── sample-data.js           ← employees + orders fixtures
├── dmxAppConnect/
│   ├── dmxAppConnect.js         ← AppConnect runtime (pinned: 2.2.4)
│   └── dmxAppConnect.js.map
└── lib/
    ├── test-suite.css           ← page chrome styling
    ├── version-banner.js        ← detects + warns on AppConnect drift
    ├── test-helpers.js          ← <dmx-test-data>, <dmx-event-log>, TestKit
    ├── page-template.js         ← header + body.dataset.gridsReady
    ├── run-collector.js         ← injected via --init-script for headless runs
    └── common-head.html         ← reference snippet of the vendor load order
```

## Readiness signal

`page-template.js` sets `document.body.dataset.gridsReady = 'true'` once every
`<dmx-ag-grid>` on the page has fired `onGridReady` or `onFirstDataRendered`.
Agents (or the `run-all.cjs` driver) wait on that flag instead of guessing
timings.

## Console helpers

Loaded by every scenario:

```js
TestKit.list()                            // ['basicGrid', ...]
TestKit.grid('basicGrid')                 // reactive data proxy
TestKit.snapshot('basicGrid')             // { count, state, selectedRows, … }
TestKit.callMethod('basicGrid', 'reloadGrid', true)   // -> grid.__reloadGrid(true)
TestKit.waitForGrid('basicGrid')          // promise resolving on gridReady
```

Note: `dmx.app.get(id)` in AppConnect 2.2.4 returns a reactive data **proxy**
(direct field access, methods exposed as `__method`), not the component instance.
`TestKit.callMethod` translates the friendly name automatically.

## What's covered

| #  | Feature group         | Notable attrs / methods                                                                       |
|----|------------------------|-----------------------------------------------------------------------------------------------|
| 01 | Basic render           | inferred columnDefs, sort, filter, floating_filter, pagination, count binding, quick filter   |
| 02 | Themes & locale        | grid_theme × 5, dark_mode, enable_rtl, locale_text (EN/HE/RU/ES/PT)                           |
| 03 | Editing                | cell_editable, row_editable, editable_fields, cstatic_select_editors                          |
| 04 | Selection              | row_selection (single/multi), row_checkbox_event, row_status_event, row_clicked              |
| 05 | Action buttons         | enable_actions, edit/view/delete + button1..5 + btn_condition                                 |
| 06 | Export                 | export_to_csv/xls/pdf + trim + exclude_hidden + remove_html + custom filename                 |
| 07 | Import                 | importFileData(fieldId) for .csv and .xlsx                                                    |
| 08 | Formatting             | amount_fields + precision, date_format, ctypes, cnames, cwidths, wrap_header_text             |
| 09 | Grouping & aggregation | group_config, columns_to_sum, columns_to_count, footer_sum_precision                          |
| 10 | State persistence      | column_state_storage_key, save/reset, applyFilters/getAppliedFilters                          |
| 11 | Layout                 | dom_layout, fixed_header, fixed_footer, fixed_horizontal_scroll, hide_id_field                |
| 12 | Methods                | loadGrid, reloadGrid, destroyGrid, pinColumns, hideColumns, getSelectedRows, getFilteredData  |
| 13 | Flags & styles         | suppress_*, hide_filters, hide_sort, rstyles, cstyles, data_changes, custom_tooltip, ci_sort  |
| 14 | Compact + ext buttons  | compact_view, action_button_class_toggles, buttons 6–15, cell_click_event                     |

## What's intentionally NOT covered

- Server-side data sources (`serverConnect`) — substituted by `<dmx-test-data>`
  for static fixtures
- The 30 Wappler IDE input panels in `app_connect/components.hjson`
- `dmxS3Upload`, `dmxFormatter`, etc. — those modules were removed from
  `dmxAppConnect/`

## Version manifest

`VERSIONS.json` records the AppConnect build (currently **2.2.4**, built
2026-01-19) plus every vendor library. `lib/version-banner.js` logs a warning
to the console if a different AppConnect drops in.

Upgrade flow:

1. Replace `tests/dmxAppConnect/dmxAppConnect.js`
2. Run `node tests/run-all.cjs`
3. If `tests/findings.json` still shows all PASS, bump `appConnect.expected` in
   `VERSIONS.json`. Otherwise file the regressions in `FINDINGS.md`.

## Cross-platform notes

- `run-all.cjs` invokes `agent-browser` via `shell:true`. On Windows that picks
  up `agent-browser.cmd`; on Linux/macOS it finds `agent-browser` from `$PATH`.
  Override the binary via `AGENT_BROWSER_BIN=…`
- `serve.cjs` is plain Node http — no Windows-only paths
- Test pages use `/` paths everywhere

## Known limitations of the run-all driver

- agent-browser maintains a single Chrome session; navigating between 14 pages
  can occasionally trip a CDP timeout. The driver retries each scenario once
  after a daemon close. If a scenario still fails, run it in isolation by
  opening the URL directly.
