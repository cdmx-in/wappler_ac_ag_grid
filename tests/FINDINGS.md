# AG Grid Wappler · Test Run Findings

Latest run: **2026-05-27** · all 14 scenarios PASS against the unmodified
`dmx-ag-grid.js` v2.1.4 · driven by puppeteer-core against system Chrome
(`tests/run-all-puppeteer.cjs`). Scenario 13 now performs 11 colour-pixel
assertions that verify every `rstyles` condition form added in commit
[42ec4a8](../dmx-ag-grid.js) actually applies the expected number of coloured
rows.

The suite is intentionally tolerant: it verifies that each grid mounts, gets
data, and renders rows. The state-flag observability bug below means only one
of the three `onGrid*` flags is visible at a time, so the runner accepts any of
them as proof the grid mounted.

## Summary

| # | Scenario | Status | Grids verified |
|---|---|---|---|
| 01 | basic-render          | PASS | 1 grid, 25 rows, 10 visible (paged) |
| 02 | themes-locale         | PASS | 9 grids — Alpine/Balham/Material/Quartz/Custom/Dark/HE/RU/ES |
| 03 | editing               | PASS | cell + row + static-select editors |
| 04 | selection             | PASS | multi-row + single-row, checkbox + status events |
| 05 | action-buttons        | PASS | edit/view/delete + button1..5 + condition |
| 06 | export                | PASS | CSV/XLSX/PDF + no-export fallback |
| 07 | import                | PASS | empty grid waiting for file upload (expectEmpty) |
| 08 | formatting            | PASS | amount, date, ctypes, cnames, cwidths, wrap |
| 09 | grouping              | PASS | group_config + columns_to_sum + columns_to_count |
| 10 | state-persistence     | PASS | column state save + filter apply/clear |
| 11 | layout                | PASS | autoHeight, fixed_header offset, horizontal scroll |
| 12 | methods               | PASS | every imperative method exposed as a button |
| 13 | flags-styles          | PASS | suppress_*, hide_filters, **rstyles ×6 forms (asserted)**, cstyles area:text/cell, data_changes |
| 14 | compact-view          | PASS | compact_view + buttons 6–15 + class toggles |

Full per-grid state and DOM-row counts are in `tests/findings.json`.

## rstyles coverage for 2.1.4 (commit 42ec4a8)

Scenario 13 now exercises the full condition matrix introduced by
"feat: enhance row color formatting with dynamic conditions" and asserts the
expected number of coloured rows in the DOM:

| Form | Test grid | Sample config | Hand-derived count | Asserted? |
|---|---|---|---|---|
| Function — `myFn()` | `rsFn` | `{condition:'isRowVip()'}` (window-scoped) | 3 (rating≥4.7 & active) | ✓ |
| Value/operator `>` | `rsOp` | `{condition:'salary > 90000'}` | 7 | ✓ |
| Value/operator `<=` (2.1.4 parser fix) | `rsOp` | `{condition:'salary <= 65000'}` | 5 | ✓ |
| Compound `&&` | `rsCompound` | `{condition:'active == true && department == Engineering'}` | 7 | ✓ |
| Field + plain-value shorthand | `rsShort` | `{field:'department', condition:'Marketing'}` | 5 | ✓ |
| First match wins | `rsFirst` | `[{>95000→orange}, {>90000→yellow}]` | 5 orange / 2 yellow | ✓ |
| Legacy object form (backwards compat) | `rsLegacy` | `{sales:{…}, hr:{…}}` set programmatically | 5 / 4 | ✓ |
| cstyles area:text with `>=` | `csCell` | `{field:'salary', condition:'salary >= 90000', area:'text'}` | 7 | ✓ |
| cstyles area:cell with `<=` | `csCell` | `{field:'salary', condition:'salary <= 65000', area:'cell'}` | 5 | ✓ |

### Real finding from this work

**`rstyles` legacy object form is unreachable via `dmx-bind:`.** The 2.1.4 rewrite
explicitly added a backwards-compat branch:
```js
const styles = Array.isArray(rstyles)
  ? rstyles
  : (rstyles && typeof rstyles === 'object' ? Object.values(rstyles) : []);
```
…but the schema is `rstyles: { type: Array, default: [] }`, and AppConnect's
type coercion drops every key of an object-shaped binding value, so the runtime
receives `[]` and the legacy branch is dead code. The branch only fires when
`rstyles` is set programmatically (e.g. `component.props.rstyles = {…}` then
`refreshGrid()`), which is what `rsLegacy` does to verify the branch still
works. Worth either changing the schema to `Object` to make the binding path
work, or removing the legacy branch.

## Bugs observed in dmx-ag-grid.js

The user reverted my proposed patches so the tests run against the production
file as-is. These are the issues the suite surfaces — listed for the maintainer
to decide whether to patch.

### 1. `set('state', ...)` overwrites previous state flags

**Where:** [dmx-ag-grid.js:1924-1930](../dmx-ag-grid.js#L1924-L1930)

```js
onGridReady:        () => this.set("state", { gridReady: true }),
onFirstDataRendered:() => this.set("state", { firstDataRendered: true }),
onRowDataUpdated:   () => this.set("state", { rowDataUpdated: true }),
```

Each call **replaces** the entire `state` object instead of merging. After all
three fire, only `{ rowDataUpdated: true }` (or whichever fired last) is
observable in the binding `grid.state.*`. The other two flags are lost.

**Visible in the test output:** every passing grid now shows
`state={"firstDataRendered":true}` — but the 09-grouping `aggGrid` shows
`state={"rowDataUpdated":true}` because its data refresh fires last. Wappler
templates that bind `dmx-show="grid.state.gridReady"` will flicker on and
disappear.

**Suggested fix (1 line × 3):**
```js
this.set("state", Object.assign({}, this.data.state, { gridReady: true }));
// …same pattern for firstDataRendered, rowDataUpdated
```

---

### 2. `cwidths[key]` with a non-object value freezes the page

**Where:** [dmx-ag-grid.js:1637-1640](../dmx-ag-grid.js#L1637-L1640)

```js
...(cwidths.hasOwnProperty(key) && {
  minWidth: parseInt(cwidths[key].min_width),   // NaN if cwidths[key] is a number
  maxWidth: parseInt(cwidths[key].max_width),
}),
```

The expected shape is `{ field: { min_width: N, max_width: M } }`. A user
naturally typing `{ first_name: 120 }` (which matches the type declaration
`Object` and feels intuitive) makes `parseInt(undefined) === NaN`. AG Grid then
enters an infinite layout loop and **hangs the entire JS thread** — no console
error, no recovery, just a frozen page.

The 08-formatting scenario originally failed this way; the test page now uses
the documented shape so it passes. But any real user typing a number will hit
this.

**Suggested fix:**
```js
...(cwidths.hasOwnProperty(key) && cwidths[key] && typeof cwidths[key] === 'object' && {
  ...(Number.isFinite(parseInt(cwidths[key].min_width)) && { minWidth: parseInt(cwidths[key].min_width) }),
  ...(Number.isFinite(parseInt(cwidths[key].max_width)) && { maxWidth: parseInt(cwidths[key].max_width) })
}),
```

---

### 3. `columns_to_count` entries assumed to be objects, crash on strings

**Where:** [dmx-ag-grid.js:2007-2009](../dmx-ag-grid.js#L2007-L2009)

```js
columnsToCount.forEach(function (colObj) {
  const col = colObj.field;
  const uniqueValuesToCount = new Set(colObj.unique_values.split(','));  // crash if colObj is a string
```

The attribute is declared `type: Array, default: []` which suggests an array of
column names — but each entry must actually be `{field, unique_values}`. Passing
`['customer']` throws "Cannot read properties of undefined (reading 'split')".

**Suggested fix:** validate + warn on malformed entries.

---

### 4. `action_button_class_toggles` entries crash on bad shape

**Where:** [dmx-ag-grid.js:782, 787](../dmx-ag-grid.js#L782)

```js
if (toggle.btn_id.toLowerCase() === buttonConfig.id && ...) // crash if btn_id missing
button.classList.add(...toggle.class.split(' '));            // crash if class missing
```

No type guards on the toggle entries. The expected shape is
`{btn_id, condition, class}` but mis-shaped entries trigger
"Cannot read properties of undefined".

**Suggested fix:** validate `btn_id` and `class` are strings before using them.

---

### 5. No initial render when bound `data` is already populated at mount time

**Where:** [dmx-ag-grid.js:2985-3015](../dmx-ag-grid.js#L2985-L3015) — `requestUpdate`

`requestUpdate('data', oldValue)` is the only path that calls `refreshGrid()`.
If `data` is already at its final value when the component mounts (i.e. the
binding resolved synchronously before init), no `data` change event fires after
mount and `refreshGrid()` never runs — the grid stays empty.

In production Wappler apps this is masked because `serverConnect` data arrives
**after** mount. Static fixtures hit it.

**Workaround in the test suite:** `<dmx-test-data>` defers its `set('value', …)`
to `dmx.nextTick` so the grid sees a transition from `[]` → `[…]`. See
[tests/lib/test-helpers.js:24-31](lib/test-helpers.js#L24-L31).

**Suggested upstream fix:** in `init(node)`, if `this.props.data?.length`, call
`this.refreshGrid()` once. One line, in one place.

## Schema-shape gotchas (worth documenting in components.hjson help text)

- `cstatic_select_editors` — `{ field: { options: '<JSON-string>' } }` where
  `options` is a **string** that parses to an object whose keys are the dropdown
  values. Not an array.
- `cdynamic_select_editors` — `{ field: { options_field: 'someRowField' } }`.
- `cwidths` — `{ field: { min_width, max_width } }`. Plain numbers freeze the page.
- `columns_to_count` — array of `{ field, unique_values: csv-string }`. Not array of strings.
- `action_button_class_toggles` — array of `{ btn_id, condition, class }`. Not `button`/`class_when_true`.

## Test-helper observation (not a module bug)

`dmx.app.get(id)` in AppConnect 2.2.4 returns a **reactive-data proxy**, not the
component instance. Direct field access (`g.state`, `g.count`) works; methods
are exposed as `__methodName` (`__loadGrid`, `__reloadGrid`); calling `g.get(...)`
throws "g.get is not a function". `tests/lib/test-helpers.js` documents this
and exposes a friendlier `TestKit.callMethod('id', 'methodName', ...args)`.

## Test infrastructure

- [tests/run-all-puppeteer.cjs](run-all-puppeteer.cjs) — headless Chrome driver
  via `puppeteer-core` against system Chrome. Recommended (~75 s for 14
  scenarios, no daemon hassles).
- [tests/run-all.cjs](run-all.cjs) — agent-browser CLI driver. Works on Windows
  + Linux but its long-lived daemon can time out after ~7 heavy pages.
- [tests/serve.cjs](serve.cjs) — static server (port 8765).

## Files touched in this session

**Test pages updated to use correct schemas:**
- `tests/03-editing.html` — `cstatic_select_editors`
- `tests/08-formatting.html` — `cwidths`
- `tests/09-grouping.html` — `columns_to_count`
- `tests/14-compact-view.html` — `action_button_class_toggles`

**Test helpers:**
- `tests/lib/test-helpers.js` — defer `<dmx-test-data>` set, TestKit uses direct field access
- `tests/lib/page-template.js` — readiness signal accepts any state flag

**Module (`dmx-ag-grid.js`):** reverted by user — runs as-shipped.
