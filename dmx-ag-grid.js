dmx.Component('ag-grid', {
  initialData: {
    id: null,
    data: {},
    count: Number,
    fields: {},
    fileData: [],
    selectedRows: [],
    columnState: [],
    state: {
      gridReady: !1,
      firstDataRendered: !1,
      rowDataUpdated: !1
    }
  },

  attributes: {
    id: { default: null },
    noload: { type: Boolean, default: false },
    grid_theme: { type: String, default: 'ag-theme-alpine' },
    dark_mode: { type: Boolean, default: false},
    column_defs: { type: Array, default: [] },
    tooltip_config: { type: Array, default: [] },
    custom_tooltip: { type: String, default: null },
    cstyles: { type: Array, default: [] },
    rstyles: { type: Array, default: {} },
    cnames: { type: Object, default: {} },
    cwidths: { type: Object, default: {} },
    ctypes: { type: Array, default: [] },
    cfilters: { type: Array, default: [] },
    csort: { type: Array, default: [] },
    cstatic_select_editors: { type: Object, default: {} },
    cdynamic_select_editors: { type: Object, default: {} },
    cselect_placeholder: { type: String, default: "-" },
    wrap_header_text: { type: Boolean, default: true },
    auto_header_height: { type: Boolean, default: true },
    wrap_text: { type: Boolean, default: false },
    auto_height: { type: Boolean, default: false },
    vert_center_cell_data: { type: Boolean, default: false },
    horz_center_cell_data: { type: Boolean, default: false },
    data_changes: { type: Array, default: [] },
    display_data_changes: { type: Array, default: [] },
    js_data_changes: { type: Array, default: [] },
    js_tooltip_changes: { type: Array, default: [] },
    tooltip_show_delay: { type: Number, default: 2000 },
    data: { type: Array, default: [] },
    dom_layout: { type: String, default: 'autoHeight' },
    enable_cell_text_selection: { type: Boolean, default: true },
    row_selection: { type: String, default: 'multiRow' },
    suppress_row_deselection: { type: Boolean, default: false },
    pagination: { type: Boolean, default: true },
    pagination_auto_page_size: { type: Boolean, default: false },
    pagination_page_size_selector: { type: Array, default: [20,50,100] },
    pagination_page_size: { type: Number, default: 20 },
    row_height: { type: Number, default: null },
    header_height: { type: Number, default: null },
    suppress_row_click_selection: { type: Boolean, default: false },
    suppress_menu_hide: { type: Boolean, default: false },
    suppress_movable_columns: { type: Boolean, default: false },
    enable_cell_expressions: { type: Boolean, default: false },
    animate_rows: { type: Boolean, default: false },
    always_show_horizontal_scroll: { type: Boolean, default: true },
    always_show_vertical_scroll: { type: Boolean, default: false },
    suppress_agg_func_in_header: { type: Boolean, default: false },
    suppress_agg_at_root_level: { type: Boolean, default: false },
    suppress_clipboard_paste: { type: Boolean, default: false },
    suppress_scroll_on_new_data: { type: Boolean, default: false },
    hide_id_field: { type: Boolean, default: false },
    numeric_column_align: { type: Boolean, default: false },
    enable_rtl: { type: Boolean, default: false },
    locale_text: { type: String, default: null },
    date_locale: { type: String, default: 'en-US' },
    date_format: { type: String, default: 'dd/MM/yyyy hh:mm A' },
    amount_fields: { type: String, default: null },
    amount_field_precision: { type: Number, default: 2 },
    min_width: { type: Number, default: 150 },
    sortable: { type: Boolean, default: true },
    cell_editable: { type: Boolean, default: false },
    editable_fields: { type: String, default: null },
    row_editable: { type: Boolean, default: false },
    ci_sort: { type: Boolean, default: false },
    resizable: { type: Boolean, default: true },
    filter: { type: Boolean, default: true },
    floating_filter: { type: Boolean, default: true },
    column_hover_highlight: { type: Boolean, default: true },
    quick_filter_field: { type: String, default: 'search_field' },
    export_trim_data: { type: Boolean, default: false },
    export_exclude_hidden_fields: { type: Boolean, default: false },
    export_exclude_fields: { type: String, default: null },
    export_to_csv: { type: Boolean, default: true },
    export_csv_filename: { type: String, default: 'export.csv' },
    export_to_pdf: { type: Boolean, default: false },
    export_pdf_filename: { type: String, default: 'export.pdf' },
    fixed_header: { type: Boolean, default: false },
    topbar_class: { type: String, default: 'topbar' },
    fixed_header_offset: { type: Number, default: 100 },
    fixed_top_offset: { type: Number, default: 80 },
    fixed_horizontal_scroll: { type: Boolean, default: false },
    fixed_footer: { type: Boolean, default: false },
    fixed_footer_bottom_padding: { type: Number, default: 10 },
    timezone: {type: String, default: '' },
    cell_click_event: {type: Boolean, default: false },
    row_click_event: {type: Boolean, default: false },
    row_double_click_event: {type: Boolean, default: false },
    row_checkbox_event: {type: Boolean, default: false },
    row_status_event: {type: Boolean, default: false },
    loading_overlay: { type: Boolean, default: false },
    loading_overlay_duration: { type: Number, default: 500 },
    enable_actions: {type: Boolean, default: false },
    actions_column_position: {type: String, default: 'right' },
    actions_column_min_width: {type: Number, default: null },
    actions_column_max_width: {type: Number, default: null },
    pin_actions: { type: Boolean, default: true },
    edit_action_btn: { type: Boolean, default: false },
    edit_action_title: {type: String, default: '' },
    edit_action_tooltip: {type: String, default: 'Edit' },
    edit_action_icon_class: {type: String, default: 'fas fa-pencil-alt' },
    edit_action_btn_class: {type: String, default: 'btn-primary btn-xs m-1' },
    edit_action_btn_condition: {type: String, default: null },
    view_action_btn: { type: Boolean, default: false },
    view_action_title: {type: String, default: '' },
    view_action_tooltip: {type: String, default: 'View' },
    view_action_icon_class: {type: String, default: 'fas fa-eye' },
    view_action_btn_class: {type: String, default: 'btn-info btn-xs m-1' },
    view_action_btn_condition: {type: String, default: null },
    delete_action_btn: { type: Boolean, default: false },
    delete_action_title: {type: String, default: '' },
    delete_action_tooltip: {type: String, default: 'Delete' },
    delete_action_icon_class: {type: String, default: 'fas fa-trash' },
    delete_action_btn_class: {type: String, default: 'btn-danger btn-xs m-1' },
    delete_action_btn_condition: {type: String, default: null },
    enable_custom_action_btns: { type: Boolean, default: false },
    action_button_class_toggles: { type: Array, default: [] },
    action_button_icon_class_toggles: { type: Array, default: [] },
    button1_action_btn: { type: "Boolean", default: false },
    button1_action_title: { type: "String", default: "" },
    button1_action_tooltip: { type: "String", default: "" },
    button1_action_icon_class: { type: "String", default: "fas fa-wrench" },
    button1_action_btn_class: { type: "String", default: "btn-primary btn-xs m-1" },
    button1_action_btn_condition: {type: String, default: null },
    button2_action_btn: { type: "Boolean", default: false },
    button2_action_title: { type: "String", default: "" },
    button2_action_tooltip: { type: "String", default: "" },
    button2_action_icon_class: { type: "String", default: "fas fa-search-plus" },
    button2_action_btn_class: { type: "String", default: "btn-info btn-xs m-1" },
    button2_action_btn_condition: {type: String, default: null },
    button3_action_btn: { type: "Boolean", default: false },
    button3_action_title: { type: "String", default: "" },
    button3_action_tooltip: { type: "String", default: "" },
    button3_action_icon_class: { type: "String", default: "fas fa-check-circle" },
    button3_action_btn_class: { type: "String", default: "btn-success btn-xs m-1" },
    button3_action_btn_condition: {type: String, default: null },
    button4_action_btn: { type: "Boolean", default: false },
    button4_action_title: { type: "String", default: "" },
    button4_action_tooltip: { type: "String", default: "" },
    button4_action_icon_class: { type: "String", default: "fas fa-exclamation-triangle" },
    button4_action_btn_class: { type: "String", default: "btn-warning btn-xs m-1" },
    button4_action_btn_condition: {type: String, default: null },
    button5_action_btn: { type: "Boolean", default: false },
    button5_action_title: { type: "String", default: "" },
    button5_action_tooltip: { type: "String", default: "Edit" },
    button5_action_icon_class: { type: "String", default: "fas fa-times-circle" },
    button5_action_btn_class: { type: "String", default: "btn-danger btn-xs m-1" },
    button5_action_btn_condition: {type: String, default: null },
    button6_action_btn: { type: "Boolean", default: false },
    button6_action_title: { type: "String", default: "" },
    button6_action_tooltip: { type: "String", default: "" },
    button6_action_icon_class: { type: "String", default: "fas fa-link" },
    button6_action_btn_class: { type: "String", default: "btn-secondary btn-xs m-1" },
    button6_action_btn_condition: {type: String, default: null },
    button7_action_btn: { type: "Boolean", default: false },
    button7_action_title: { type: "String", default: "" },
    button7_action_tooltip: { type: "String", default: "" },
    button7_action_icon_class: { type: "String", default: "fas fa-download" },
    button7_action_btn_class: { type: "String", default: "btn-primary btn-xm" },
    button7_action_btn_condition: {type: String, default: null },
    button8_action_btn: { type: "Boolean", default: false },
    button8_action_title: { type: "String", default: "" },
    button8_action_tooltip: { type: "String", default: "" },
    button8_action_icon_class: { type: "String", default: "fas fa-file-pdf" },
    button8_action_btn_class: { type: "String", default: "btn-info btn-xs m-1" },
    button8_action_btn_condition: {type: String, default: null },
    button9_action_btn: { type: "Boolean", default: false },
    button9_action_title: { type: "String", default: "" },
    button9_action_tooltip: { type: "String", default: "" },
    button9_action_icon_class: { type: "String", default: "fas fa-star" },
    button9_action_btn_class: { type: "String", default: "btn-success btn-xs m-1" },
    button9_action_btn_condition: {type: String, default: null },
    button10_action_btn: { type: "Boolean", default: false },
    button10_action_title: { type: "String", default: "" },
    button10_action_tooltip: { type: "String", default: "" },
    button10_action_icon_class: { type: "String", default: "fas fa-trash-alt" },
    button10_action_btn_class: { type: "String", default: "btn-danger btn-xs m-1" },
    button10_action_btn_condition: {type: String, default: null },
    button11_action_btn: { type: "Boolean", default: false },
    button11_action_title: { type: "String", default: "" },
    button11_action_tooltip: { type: "String", default: "" },
    button11_action_icon_class: { type: "String", default: "fas fa-cog" },
    button11_action_btn_class: { type: "String", default: "btn-primary btn-xs m-1" },
    button11_action_btn_condition: { type: String, default: null },
    button12_action_btn: { type: "Boolean", default: false },
    button12_action_title: { type: "String", default: "" },
    button12_action_tooltip: { type: "String", default: "" },
    button12_action_icon_class: { type: "String", default: "fas fa-search" },
    button12_action_btn_class: { type: "String", default: "btn-info btn-xs m-1" },
    button12_action_btn_condition: { type: String, default: null },
    button13_action_btn: { type: "Boolean", default: false },
    button13_action_title: { type: "String", default: "" },
    button13_action_tooltip: { type: "String", default: "" },
    button13_action_icon_class: { type: "String", default: "fas fa-thumbs-up" },
    button13_action_btn_class: { type: "String", default: "btn-success btn-xs m-1" },
    button13_action_btn_condition: { type: String, default: null },
    button14_action_btn: { type: "Boolean", default: false },
    button14_action_title: { type: "String", default: "" },
    button14_action_tooltip: { type: "String", default: "" },
    button14_action_icon_class: { type: "String", default: "fas fa-bell" },
    button14_action_btn_class: { type: "String", default: "btn-warning btn-xs m-1" },
    button14_action_btn_condition: { type: String, default: null },
    button15_action_btn: { type: "Boolean", default: false },
    button15_action_title: { type: "String", default: "" },
    button15_action_tooltip: { type: "String", default: "" },
    button15_action_icon_class: { type: "String", default: "fas fa-ban" },
    button15_action_btn_class: { type: "String", default: "btn-danger btn-xs m-1" },
    button15_action_btn_condition: { type: String, default: null },
    button16_action_btn: { type: "Boolean", default: false },
    button16_action_title: { type: "String", default: "" },
    button16_action_tooltip: { type: "String", default: "" },
    button16_action_icon_class: { type: "String", default: "fas fa-link" },
    button16_action_btn_class: { type: "String", default: "btn-secondary btn-xs m-1" },
    button16_action_btn_condition: { type: String, default: null },
    button17_action_btn: { type: "Boolean", default: false },
    button17_action_title: { type: "String", default: "" },
    button17_action_tooltip: { type: "String", default: "" },
    button17_action_icon_class: { type: "String", default: "fas fa-file" },
    button17_action_btn_class: { type: "String", default: "btn-primary btn-sm m-1" },
    button17_action_btn_condition: { type: String, default: null },
    button18_action_btn: { type: "Boolean", default: false },
    button18_action_title: { type: "String", default: "" },
    button18_action_tooltip: { type: "String", default: "" },
    button18_action_icon_class: { type: "String", default: "fas fa-print" },
    button18_action_btn_class: { type: "String", default: "btn-info btn-sm m-1" },
    button18_action_btn_condition: { type: String, default: null },
    button19_action_btn: { type: "Boolean", default: false },
    button19_action_title: { type: "String", default: "" },
    button19_action_tooltip: { type: "String", default: "" },
    button19_action_icon_class: { type: "String", default: "fas fa-heart" },
    button19_action_btn_class: { type: "String", default: "btn-success btn-sm m-1" },
    button19_action_btn_condition: { type: String, default: null },
    button20_action_btn: { type: "Boolean", default: false },
    button20_action_title: { type: "String", default: "" },
    button20_action_tooltip: { type: "String", default: "" },
    button20_action_icon_class: { type: "String", default: "fas fa-times" },
    button20_action_btn_class: { type: "String", default: "btn-danger btn-sm m-1" },
    button20_action_btn_condition: { type: String, default: null },
    button21_action_btn: { type: "Boolean", default: false },
    button21_action_title: { type: "String", default: "" },
    button21_action_tooltip: { type: "String", default: "" },
    button21_action_icon_class: { type: "String", default: "fas fa-arrow-right" },
    button21_action_btn_class: { type: "String", default: "btn-primary btn-sm m-1" },
    button21_action_btn_condition: { type: String, default: null },
    button22_action_btn: { type: "Boolean", default: false },
    button22_action_title: { type: "String", default: "" },
    button22_action_tooltip: { type: "String", default: "" },
    button22_action_icon_class: { type: "String", default: "fas fa-arrow-left" },
    button22_action_btn_class: { type: "String", default: "btn-info btn-sm m-1" },
    button22_action_btn_condition: { type: String, default: null },
    button23_action_btn: { type: "Boolean", default: false },
    button23_action_title: { type: "String", default: "" },
    button23_action_tooltip: { type: "String", default: "" },
    button23_action_icon_class: { type: "String", default: "fas fa-check" },
    button23_action_btn_class: { type: "String", default: "btn-success btn-sm m-1" },
    button23_action_btn_condition: { type: String, default: null },
    button24_action_btn: { type: "Boolean", default: false },
    button24_action_title: { type: "String", default: "" },
    button24_action_tooltip: { type: "String", default: "" },
    button24_action_icon_class: { type: "String", default: "fas fa-exclamation" },
    button24_action_btn_class: { type: "String", default: "btn-warning btn-sm m-1" },
    button24_action_btn_condition: { type: String, default: null },
    button25_action_btn: { type: "Boolean", default: false },
    button25_action_title: { type: "String", default: "" },
    button25_action_tooltip: { type: "String", default: "" },
    button25_action_icon_class: { type: "String", default: "fas fa-times" },
    button25_action_btn_class: { type: "String", default: "btn-danger btn-sm m-1" },
    button25_action_btn_condition: { type: String, default: null },
    button26_action_btn: { type: "Boolean", default: false },
    button26_action_title: { type: "String", default: "" },
    button26_action_tooltip: { type: "String", default: "" },
    button26_action_icon_class: { type: "String", default: "fas fa-refresh" },
    button26_action_btn_class: { type: "String", default: "btn-secondary btn-sm m-1" },
    button26_action_btn_condition: { type: String, default: null },
    button27_action_btn: { type: "Boolean", default: false },
    button27_action_title: { type: "String", default: "" },
    button27_action_tooltip: { type: "String", default: "" },
    button27_action_icon_class: { type: "String", default: "fas fa-plus" },
    button27_action_btn_class: { type: "String", default: "btn-primary btn-sm m-1" },
    button27_action_btn_condition: { type: String, default: null },
    button28_action_btn: { type: "Boolean", default: false },
    button28_action_title: { type: "String", default: "" },
    button28_action_tooltip: { type: "String", default: "" },
    button28_action_icon_class: { type: "String", default: "fas fa-minus" },
    button28_action_btn_class: { type: "String", default: "btn-info btn-sm m-1" },
    button28_action_btn_condition: { type: String, default: null },
    button29_action_btn: { type: "Boolean", default: false },
    button29_action_title: { type: "String", default: "" },
    button29_action_tooltip: { type: "String", default: "" },
    button29_action_icon_class: { type: "String", default: "fas fa-copy" },
    button29_action_btn_class: { type: "String", default: "btn-success btn-sm m-1" },
    button29_action_btn_condition: { type: String, default: null },
    button30_action_btn: { type: "Boolean", default: false },
    button30_action_title: { type: "String", default: "" },
    button30_action_tooltip: { type: "String", default: "" },
    button30_action_icon_class: { type: "String", default: "fas fa-share" },
    button30_action_btn_class: { type: "String", default: "btn-danger btn-sm m-1" },
    button30_action_btn_condition: { type: String, default: null },
    data_binded_changes: {type: Array, default: [] },
    hide_fields: {type: String, default: null },
    hide_filters: {type: String, default: null },
    hide_sort: {type: String, default: null },
    compact_view: { type: Boolean, default: false },
    compact_view_grid_size: { type: Number, default: 3 },
    compact_view_item_height: { type: Number, default: 20 },
    group_config: { type: Array, default: [] },
    columns_to_count: { type: Array, default: [] },
    columns_to_sum: { type: String, default: null },
    footer_sum_precision: { type: Number, default: null },
    columns_to_count_nonunique: { type: Boolean, default: false },
    column_state_storage_key: { type: String, default: null }
  },

  methods: {
    setValue: function (rowData, columnDefs) {
      this.set('rowData', rowData);
      this.set('columnDefs', columnDefs);
      this.refreshGrid();
    },
    reloadGrid: function (loadGridInstance) {
      dmx.nextTick(function() {
        this.transactionUpdate(loadGridInstance);
      }, this);
    },
    loadGrid: function () {
      dmx.nextTick(function() {
      let gridInstance = this.refreshGrid();
      this.set('gridInstance', gridInstance);
      }, this);
    },
    destroyGrid: function () {
      dmx.nextTick(function() {
      var gridInstance = this.get('gridInstance');
      if (gridInstance) gridInstance.destroy();
      }, this);
    },
    exportGrid: function (Csv, Pdf) {
      // Default Csv to true if both Csv and Pdf are false
      if (!Csv && !Pdf) {
        Csv = true;
      }
      dmx.nextTick(() => {
        const exportFunction = Csv ? exportGridData : (Pdf ? exportGridDataToPDF : null);
        if (typeof exportFunction === 'function') {
          exportFunction();
        } else {
          console.error('Grid not loaded to perform the requested export');
        }
      }, this);
    },
    saveColumnState: function () {
      dmx.nextTick(function() {
        if (typeof saveColumnStateToStorage === 'function') {
          saveColumnStateToStorage();
        } else {
          console.error('Grid not loaded to perform save column state');
        }
      }, this);
    },
    resetColumnState: function () {
      dmx.nextTick(function() {
        const idValue = this.$node.querySelector('dmx-ag-grid > div')?.getAttribute('id') ?? 'Grid not found';
        const currentPageUrl = window.location.pathname;
        const uniqueId = `${currentPageUrl}_${idValue}`;
        const storageKey = options.column_state_storage_key || uniqueId;
        localStorage.removeItem(`dmxState-${storageKey}`);
        let gridInstance = this.refreshGrid();
        this.set('gridInstance', gridInstance);
      }, this);
    },
    pinColumns: function (fieldId) {
      pinColumnToLeft(fieldId);
    },
    hideColumns: function (fieldId) {
      hideColumn(fieldId);
    },
    importFileData: async function (fieldId) {
      await this.parseFileData(fieldId);
    },
    getSelectedRows: function () {
      exportSelectedRows();
    },
    quickFilter: function () {
      onFilterTextBoxChanged();
    }
  },

  transactionUpdate: async function (loadGridInstance) {
    // const oldRowData = this.get('oldData');
    var gridInstance = this.get('gridInstance');
    if (!gridInstance) {
      if (loadGridInstance) {
       gridInstance = await this.refreshGrid();
       await this.set('gridInstance', gridInstance);
      }
      else {
        console.error('AG Grid instance not loaded.');
        return;
      }
    }
    if (!gridInstance) {
      return;
    }
    const oldRowData = [];
    gridInstance.forEachNode(node => {
      if (node.data) {
        oldRowData.push(node.data);
      }
    });
    const newRowData = this.props.data;
    let transaction;

    if (oldRowData && oldRowData.length > 0) {
      const addedRows = newRowData.filter(newRow => !oldRowData.some(oldRow => newRow.id === oldRow.id));
      const removedRows = oldRowData.filter(oldRow => !newRowData.some(newRow => oldRow.id === newRow.id));
      const updatedRows = newRowData.filter(newRow => {
        const oldRow = oldRowData.find(old => old.id === newRow.id);
        return oldRow && JSON.stringify(oldRow) !== JSON.stringify(newRow);
      });
        // Apply transactional updates to AG Grid
        transaction = {
          add: addedRows,
          remove: removedRows,
          update: updatedRows,
        };
      }
    if (gridInstance && transaction) {
      gridInstance.applyTransaction(transaction);
      // gridInstance.refreshCells();
    } 
  },
  parseFileData: async function (fieldId) {
    const parseCSV = (csvData) => {
      return new Promise((resolve, reject) => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: function (results) {
            resolve(results.data);
          },
          error: function (error) {
            reject(error.message);
          }
        });
      });
    };
  
    const parseExcel = (file) => {
      return new Promise((resolve, reject) => {
        const headers = [];
        const data = [];
        readXlsxFile(file)
          .then((rows) => {
            rows.forEach((row, rowIndex) => {
              if (rowIndex === 0) {
                // First row contains headers
                headers.push(...row);
              } else {
                // Map data rows to objects using the headers
                const rowData = {};
                row.forEach((cell, colIndex) => {
                  // Use headers to map values to the respective columns
                  rowData[headers[colIndex]] = cell;
                });
                data.push(rowData);
              }
            });
            // Resolve the promise with the parsed data
            resolve(data);
          })
          .catch((error) => {
            // Reject the promise in case of an error
            reject(error.message);
          });
      });
    };
    
    const fileInput = document.getElementById(fieldId);
    if (!fileInput) {
      console.error('Field having field Id: '+fieldId+' not found.');
      return;
    }
    const file = fileInput.files[0];
    if (!file) {
      console.error('Please select a file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileData = e.target.result;
      try {
        let parsedData;
        // Detect the file type based on the file extension or other criteria
        if (file.name.endsWith('.csv')) {
          parsedData = await parseCSV(fileData);
        } else if (file.name.endsWith('.xlsx') || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          parsedData = await parseExcel(file);
        } else {
          console.error('Unsupported file type. Please select a CSV or Excel file.');
          return;
        }
        this.set('fileData', parsedData);
      } catch (error) {
        console.error('Error parsing file:', error);
      }
    };
  
    reader.readAsBinaryString(file);
  },
  refreshGrid: function () {
    const options = this.props
    const rowData = this.props.data;
    const timezone = this.props.timezone || false;
    const cnames = this.props.cnames
    const cwidths = this.props.cwidths
    const ctypes = this.props.ctypes
    if (!this.$node || !rowData || rowData.length === 0) {
      console.debug('AG Grid loaded with no row data.')
      return;
    }
    let gridInstance = this.get('gridInstance') ? this.get('gridInstance') : null;
    let pagination_page_size = gridInstance ? gridInstance.paginationGetPageSize() : this.props.pagination_page_size
    const enableRowClickEvent = this.props.row_click_event && !this.props.enable_actions && !this.props.row_checkbox_event;
    const enableRowDoubleClickEvent = this.props.row_double_click_event && !this.props.enable_actions && !this.props.row_checkbox_event;
    const enableCellClickEvent = this.props.row_click_event && (this.props.enable_actions || this.props.row_checkbox_event);
    const enableCellDoubleClickEvent = this.props.row_double_click_event && (this.props.enable_actions || this.props.row_checkbox_event);
    const actionButtonClassToggles = options.action_button_class_toggles
    const actionButtonIconClassToggles = options.action_button_icon_class_toggles
    let localeText;
    let columnDefs = [];
    let groupedColumnDefs = [];
    let exportToCSV = this.props.export_to_csv;
    let exportToPDF = this.props.export_to_pdf;
    let cellRenderer;
    
    const gridThemeClass = options.dark_mode ? `${options.grid_theme}-dark` : options.grid_theme;
    this.$node.innerHTML = `<div id=${options.id}-grid class="${gridThemeClass}"></div>`;
    
    // Apply theme mode using data attribute
    const themeContainer = this.$node.querySelector(`#${options.id}-grid`);
    if (themeContainer) {
      themeContainer.dataset.agThemeMode = options.dark_mode ? 'dark' : 'light';
    }
    
    let idFieldPresent = false;
    window.cellClickEvent = (columnName, value, idValue) => {
      this.set('fields', {"field": columnName, "data": value});
      this.set('id', idValue);
      this.dispatchEvent('cell_clicked')
    };
    window.handleStatusToggle = (event, columnName, value, idValue) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        // Code for when the checkbox is checked
        this.set('id', idValue);
        this.set('fields', {"field": columnName, "data": value});
        this.dispatchEvent('row_status_enabled')
      } else {
        // Code for when the checkbox is unchecked
        this.set('id', idValue);
        this.set('fields', {"field": columnName, "data": value});
        this.dispatchEvent('row_status_disabled')
      }
    };
    function clickCellRenderer(params) {
      const idValue = params.data.id;
      const columnName = params.colDef.field;
      const value = params.value
      return `<div onclick="cellClickEvent('${columnName}', '${value}', '${idValue}')" style="cursor: pointer;">${value}</div>`;
    }
    onCellClicked = (event) => {
      const rowData = event.data;
      const columnId = event.column.colId
      const excludedColIds = ['checkboxColumn', 'actionsColumn', 'statusColumn'];
      if (excludedColIds.includes(columnId)) {
        return;
      }
      this.set('data', rowData);
      this.set('id', rowData.id);
      this.dispatchEvent('row_clicked')
    }
    onCellDoubleClicked = (event) => {
      const rowData = event.data;
      const columnId = event.column.colId
      const excludedColIds = ['checkboxColumn', 'actionsColumn', 'statusColumn'];
      if (excludedColIds.includes(columnId)) {
        return;
      }
      this.set('data', rowData);
      this.set('id', rowData.id);
      this.dispatchEvent('row_double_clicked')
    }

    function actionsRendererForPinnedBottom(params) {
      if (params.node && params.node.rowPinned === 'bottom') {
        return ''; // Render an empty string for bottom pinned row
      } else {
        return actionsRenderer(params);
      }
    }

    function checkboxCellRenderer(params) {
      const idValue = params.data.id;
      const columnName = params.colDef.field;
      const value = params.value;

      if (params.node.rowPinned == 'bottom') {
        // Render an empty cell for the footer row
        return '-';
      }
        // Assuming `value` is a boolean representing the status
        const checked = value==true ? "checked" : "";
        return `
        <div class="col pt-2 pb-1 ps-1 pe-1 d-flex justify-content-center">
          <label class="switch switch-success">
            <input 
              type="checkbox" class="switch-input"
              ${checked}
              onclick="handleStatusToggle(event, '${columnName}', '${value}', '${idValue}')"
            />
            <span class="switch-toggle-slider" role="status">
            </span>
            <span class="switch-on">
                <i class="bx bx-check"></i>
            </span>
            <span class="switch-off">
                <i class="bx bx-x"></i>
            </span>
        </label>
        </div>
        `;
    }
    function actionsRenderer(params) {
      // Default button configurations (Edit, View and Delete)
      const defaultButtons = [
        { action: 'Edit', classNames: 'btn-primary btn-xs', tooltip: 'Edit', icon: 'fas fa-pencil-alt' },
        { action: 'View', classNames: 'btn-info btn-xs', tooltip: 'View', icon: 'fas fa-eye' },
        { action: 'Delete', classNames: 'btn-danger btn-xs', tooltip: 'Delete', icon: 'fas fa-trash' },
        { action: 'Button1', classNames: 'btn-primary btn-xs', tooltip: 'Button1', icon: 'fas fa-wrench' },
        { action: 'Button2', classNames: 'btn-info btn-xs', tooltip: 'Button2', icon: 'fas fa-search-plus' },
        { action: 'Button3', classNames: 'btn-success btn-xs', tooltip: 'Button3', icon: 'fas fa-check-circle' },
        { action: 'Button4', classNames: 'btn-warning btn-xs', tooltip: 'Button4', icon: 'fas fa-exclamation-triangle' },
        { action: 'Button5', classNames: 'btn-danger btn-xs', tooltip: 'Button5', icon: 'fas fa-times-circle' },
        { action: 'Button6', classNames: 'btn-secondary btn-xs', tooltip: 'Button6', icon: 'fas fa-link' },
        { action: 'Button7', classNames: 'btn-primary btn-sm', tooltip: 'Button7', icon: 'fas fa-download' },
        { action: 'Button8', classNames: 'btn-info btn-sm', tooltip: 'Button8', icon: 'fas fa-file-pdf' },
        { action: 'Button9', classNames: 'btn-success btn-sm', tooltip: 'Button9', icon: 'fas fa-star' },
        { action: 'Button10', classNames: 'btn-danger btn-sm', tooltip: 'Button10', icon: 'fas fa-trash-alt' },
        { action: 'Button11', classNames: 'btn-primary btn-xs', tooltip: 'Button11', icon: 'fas fa-cog' },
        { action: 'Button12', classNames: 'btn-info btn-xs', tooltip: 'Button12', icon: 'fas fa-search' },
        { action: 'Button13', classNames: 'btn-success btn-xs', tooltip: 'Button13', icon: 'fas fa-thumbs-up' },
        { action: 'Button14', classNames: 'btn-warning btn-xs', tooltip: 'Button14', icon: 'fas fa-bell' },
        { action: 'Button15', classNames: 'btn-danger btn-xs', tooltip: 'Button15', icon: 'fas fa-ban' },
        { action: 'Button16', classNames: 'btn-secondary btn-xs', tooltip: 'Button16', icon: 'fas fa-link' },
        { action: 'Button17', classNames: 'btn-primary btn-sm', tooltip: 'Button17', icon: 'fas fa-file' },
        { action: 'Button18', classNames: 'btn-info btn-sm', tooltip: 'Button18', icon: 'fas fa-print' },
        { action: 'Button19', classNames: 'btn-success btn-sm', tooltip: 'Button19', icon: 'fas fa-heart' },
        { action: 'Button20', classNames: 'btn-danger btn-sm', tooltip: 'Button20', icon: 'fas fa-times' },
        { action: 'Button21', classNames: 'btn-primary btn-sm', tooltip: 'Button21', icon: 'fas fa-arrow-right' },
        { action: 'Button22', classNames: 'btn-info btn-sm', tooltip: 'Button22', icon: 'fas fa-arrow-left' },
        { action: 'Button23', classNames: 'btn-success btn-sm', tooltip: 'Button23', icon: 'fas fa-check' },
        { action: 'Button24', classNames: 'btn-warning btn-sm', tooltip: 'Button24', icon: 'fas fa-exclamation' },
        { action: 'Button25', classNames: 'btn-danger btn-sm', tooltip: 'Button25', icon: 'fas fa-times' },
        { action: 'Button26', classNames: 'btn-secondary btn-sm', tooltip: 'Button26', icon: 'fas fa-refresh' },
        { action: 'Button27', classNames: 'btn-primary btn-sm', tooltip: 'Button27', icon: 'fas fa-plus' },
        { action: 'Button28', classNames: 'btn-info btn-sm', tooltip: 'Button28', icon: 'fas fa-minus' },
        { action: 'Button29', classNames: 'btn-success btn-sm', tooltip: 'Button29', icon: 'fas fa-copy' },
        { action: 'Button30', classNames: 'btn-danger btn-sm', tooltip: 'Button30', icon: 'fas fa-share' }
      ];      
      // User-defined button configurations (if any)
      const buttons = params.buttons || defaultButtons;
      // Create a new container element to hold the buttons
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.flexWrap = 'wrap';
      container.style.paddingTop = '3px';
      buttons.forEach((buttonConfig) => {
          const button = document.createElement('button');
          button.classList.add('btn');
          const classNames = buttonConfig.classNames.split(' ');
          classNames.forEach((className) => button.classList.add(className));
          button.setAttribute('data-toggle', 'tooltip');
          // Call a function to get the dynamic tooltip content
          if (buttonConfig.tooltip.endsWith('()')) {
            const tooltipFunction = buttonConfig.tooltip.slice(0, -2); 
            const tooltipText = window[tooltipFunction](params.data)
            button.setAttribute('title', tooltipText);
          } else {
            button.setAttribute('title', buttonConfig.tooltip);
          }
          button.innerHTML = `<i class="${buttonConfig.icon}"></i> ${buttonConfig.action}`;
          container.appendChild(button);
          // Handle dynamic classes based on conditions and buttonConfig.id
          
          actionButtonClassToggles.forEach((toggle) => {
            if (toggle.btn_id.toLowerCase() === buttonConfig.id && evaluateConditions([toggle.condition], params)) {
                button.classList.add(...toggle.class.split(' '));
            }
          });
          actionButtonIconClassToggles.forEach((iconToggle) => {
            if (iconToggle.btn_id.toLowerCase() === buttonConfig.id && evaluateConditions([iconToggle.condition], params)) {
                const iconElement = button.querySelector('i');
                if (iconElement) {
                    iconElement.classList.add(...iconToggle.class.split(' '));
                }
            }
          });
           // Check if the button should be hidden based on the condition string and row data
          if (buttonConfig.condition) {
            const conditions = buttonConfig.condition.split(/(\|\||&&)/);
            const isConditionMet = evaluateConditions(conditions, params);
            if (!isConditionMet) {
              button.style.setProperty('display', 'none', 'important');
            }
          }
          button.addEventListener('click', function () {
            if (typeof buttonConfig.onClick === 'function') {
                buttonConfig.onClick(params.data);
            }
        });
      });
      // Add spacing between buttons (margin-right)
      const buttonSpacing = '5px'; // You can adjust the spacing as needed
      const buttonsInContainer = container.querySelectorAll('button');
      for (let i = 0; i < buttonsInContainer.length - 1; i++) {
          buttonsInContainer[i].style.marginRight = buttonSpacing;
      }
  
      return container;
  }
    function humanize(str) {
      if (str == null) return str;

      str = String(str)
        .trim()
        .replace(/([a-z\D])([A-Z]+)/g, '$1_$2')
        .replace(/[-\s]+/g, '_')
        .toLowerCase()
        .replace(/_id$/, '')
        .replace(/_/g, ' ')
        .trim();
      let words = str.split(' ');
      words = words.map(word => word.charAt(0).toUpperCase() + word.substr(1));

      return words.join(' ');
    }

    function blankOrNullValueFormatter(params) {
      if (params.value == null) {
        return "-";
      }
      if (typeof params.value === "string") {
        return params.value.trim() === "" ? "-" : params.value;
      }
      if (typeof params.value === "object") {
        try {
          return JSON.stringify(params.value);
        } catch (error) {
          return "Object cannot be stringified";
        }
      }
      return params.value;
    }

    function extractConditionParts(condition) {
          
      const operators = ['===', '==', '!=', '>', '<', '>=', '<='];
      let operator;
      let left;
      let right;
    
      for (const op of operators) {
        if (condition.includes(op)) {
          operator = op;
          const parts = condition.split(op).map(part => part.trim());
          left = parts[0];
          right = parts.slice(1).join(op).trim();
          break;
        }
      }
    
      if (!operator) {
        throw new Error('Invalid operator in the condition.');
      }
    
      return [left, operator, right];
    }
    function evaluateConditions(conditions, params) {
      let results = [];
      let operators = [];
      for (let i = 0; i < conditions.length; i++) {
          const part = conditions[i].trim();
          if (part === '||' || part === '&&') {
              operators.push(part);
          } else {
              const hasOperator = /(==|!=|<=|>=|<|>)/.test(part);
              if (!hasOperator) {
                const left = part;
                const result = params.data[left] !== null && params.data[left] !== undefined && params.data[left] !== ""; 
                results.push(result);
              } else {
                  const [left, operator, right] = extractConditionParts(part);
                  const result = params.data[left] !== null ? evaluateCondition(params.data[left], operator, right) : false;
                  results.push(result);
              }
          }
      }
      let finalResult = results[0];

      for (let i = 0; i < operators.length; i++) {
          if (operators[i] === '||') {
              finalResult = finalResult || results[i + 1];
          } else if (operators[i] === '&&') {
              finalResult = finalResult && results[i + 1];
          }
      }
      return finalResult;
  }
    
    function evaluateCondition(left, operator, right) {
      switch (operator) {
        case '===':
          return left.toString() === right.toString();
        case '==':
          return left.toString() == right.toString();
        case '!=':
          return left.toString() != right.toString();
        case '>':
          return left.toString() > parseFloat(right);
        case '<':
          return left.toString() < parseFloat(right);
        case '>=':
          return left.toString() >= parseFloat(right);
        case '<=':
          return left.toString() <= parseFloat(right);
        default:
          return false;
      }
    }
    
    function formatDate(timestamp) {
      const format = options.date_format
      const localDate = new Date(timestamp);
    
      const y = localDate.getFullYear();
      const n = localDate.getMonth();
      const d = localDate.getDate();
      const w = localDate.getDay();
      const h = localDate.getHours();
      const m = localDate.getMinutes();
      const s = localDate.getSeconds();
    
      function pad(num, length) {
        return ('0000' + num).slice(-length);
      }
    
      return format.replace(/([yMdHhmsaAv])(\1+)?/g, part => {
        switch (part) {
          case 'yyyy':
            return pad(y, 4);
          case 'yy':
            return pad(y, 2);
          case 'y':
            return y;
          case 'MMMM':
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][n];
          case 'MMM':
            return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][n];
          case 'MM':
            return pad(n + 1, 2);
          case 'M':
            return n + 1;
          case 'dddd':
            return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][w];
          case 'ddd':
            return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][w];
          case 'dd':
            return pad(d, 2);
          case 'd':
            return d;
          case 'HH':
            return pad(h, 2);
          case 'H':
            return h;
          case 'hh':
            return pad((h % 12) || 12, 2);
          case 'h':
            return (h % 12) || 12;
          case 'mm':
            return pad(m, 2);
          case 'm':
            return m;
          case 'ss':
            return pad(s, 2);
          case 's':
            return s;
          case 'a':
            return h < 12 ? 'am' : 'pm';
          case 'A':
            return h < 12 ? 'AM' : 'PM';
          default:
            return part; // Return unchanged for unknown format parts
        }
      });
    }
    function getDateForComparison(value, timezone) {
      if (value) {
        const date = new Date(value);
        if (timezone) {
          const options = {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          };
          const convertedTimestamp = date.toLocaleString('en-US', options);
          const [datePart, timePart] = convertedTimestamp.split(', ');
          const [month, day, year] = datePart.split('/');
          const [hours, minutes, seconds] = timePart.split(':');
          return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
        } else {
          return date;
        }
      } else {
        return null;
      }
    }
    function formatTime(params, timezone) {
      if (params.value) {
        const date = new Date(params.value)
        if (timezone) {
          const tzOptions = {
            timeZone: timezone
          };
          const convertedTimestamp = date.toLocaleString('en-GB', tzOptions);
          const [datePart, timePart] = convertedTimestamp.split(', ');
          const [day, month, year] = datePart.split('/');
          const [hours, minutes, seconds] = timePart.split(':');
          const dateTimezone = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`).getTime();
          return formatDate(dateTimezone)
        } else {
          return formatDate(date);
        }
      }
      else {
        return '-'
      }
    }
    // comparator for case-insensitive sorting
    const caseInsensitiveComparator = (valueA, valueB) => {
      // Check for null, undefined, or empty strings
      if (valueA === null || valueA === undefined || valueA === '') {
        return valueB === null || valueB === undefined || valueB === '' ? 0 : -1;
      }
    
      if (valueB === null || valueB === undefined || valueB === '') {
        return 1;
      }
    
      // Convert values to numbers if they are numeric
      const numA = Number(valueA);
      const numB = Number(valueB);
    
      // If both values are numbers
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
    
      // Convert non-number values to strings for case-insensitive comparison
      const strA = typeof valueA === 'string' ? valueA : String(valueA);
      const strB = typeof valueB === 'string' ? valueB : String(valueB);
    
      return strA.toLowerCase().localeCompare(strB.toLowerCase());
    };
    //Custom Row Styles
    function createRowStyleFunction(rstyles) {
      return function(params) {
        if (!rstyles || !Array.isArray(rstyles) || rstyles.length === 0) {
          return; // No styles to apply
        }
        const rowStyle = {};
        for (const style of rstyles) {
          const condition = style.condition.replace(/\(\)$/, ''); // Remove () if present at the end
          const customColor = style.customColor;
          let conditionResult;
          if (typeof window[condition] === 'function') {
            const result = window[condition](params.data);
            if (typeof result !== 'boolean') {
              console.error('Row condition function must return a boolean value.');
              return;
            }
            conditionResult = result;
          }
          if (conditionResult) {
            rowStyle.background = customColor;
          }
        }
        return rowStyle;
      };
    }
    dateFilterParams = {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          const cellDate = getDateForComparison(cellValue, timezone);
          const filterDate = new Date(filterLocalDateAtMidnight);
          // Compare the date portion of the cell value with the filter value
          var cellDateOnly = new Date(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
          var filterDateOnly = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate());

          if (cellDateOnly < filterDateOnly) {
            return -1;
          } else if (cellDateOnly > filterDateOnly) {
            return 1;
          } else {
            return 0;
          }
        },
        browserDatePicker: true,
      }
    // Function to detect the data type based on the values
    function getCustomDataTypes(key) {
      const matchingType = ctypes.find((ct) => ct.field === key);
      return matchingType ? matchingType.type : null;
    }
      function detectDataType(values) {
      let hasDate = false;
      let hasNumber = false;
      let hasText = false;

      for (const value of values) {
        if (value === null || value === undefined || value === '' || typeof value === "boolean") {
          hasText = true;
        } else if (!isNaN(Number(value)) && !(typeof value === "string")) {
          hasNumber = true;
        } else if (((new Date(value)).getTime() > 0) && (value.includes('-') || value.includes('/'))) {
                    hasDate = true;
        } else {
          hasText = true;
        }
      }

      if (hasDate && !hasNumber && !hasText) {
        return 'date';
      } else if (hasNumber && !hasText) {
        return 'number';
      } else {
        return 'text';
      }
    }
    createCombinedValueGetter = (key, dataChanges, dataBindedChanges, displayDataChanges) => {
      const keyLookup = {};
    
      dataBindedChanges.forEach(change => {
        if (!keyLookup[change.field]) {
          const data_source = change.data_source;
          const property = change.property;
          const output = change.output;
          const area = change.area;
          let dataArray;
          this.$watch(data_source, (function (e) {
            dataArray = e;
          }));
          keyLookup[change.field] = { dataArray, property, output, area };
        }
      });
    
      return function (params) {
        const value = params.data[key];

        if ((displayDataChanges.length > 0) && displayDataChanges.some(change => change.field === params.colDef.field)) {
          const placeholderMap = Object.fromEntries(
              Object.entries(params.data).map(([field, fieldValue]) => [`%${field}%`, fieldValue !== null ? fieldValue : ''])
          );
          return displayDataChanges.reduce((cellData, change) => {
              if (change.field === params.colDef.field) {
                  const placeholders = Object.keys(placeholderMap).join('|');
                  const regex = new RegExp(placeholders + '|%[^%]+%', 'g');
                  cellData = change.data.replace(regex, match => placeholderMap[match] || '');
              }
              return cellData;
          }, value);
      }      

        // Check if there's a matching change in dataChanges
        const matchingChange = dataChanges.find(change => change.field === key && change.value === String(value));
        if (matchingChange && matchingChange.area === 'cell' ) {
          return matchingChange.new_value;
        }
        // Check if there's a matching change in dataBindedChanges
        const matchingKeyData = keyLookup[key];
        if (matchingKeyData) {
          const { dataArray, property, output, area } = matchingKeyData;
          const matchingItem = dataArray.find(item => item[property] === value);
    
          if (matchingItem && area === 'cell') {
            return matchingItem[output];
          }
        }
        if (options.amount_fields) {
          const amountFieldsArray = options.amount_fields.split(',');
          if (amountFieldsArray.includes(key)) {
            return parseFloat(value);
          }
        }
    
        // Return the original value if no matching changes were found
        return value;
      };
    }
    
    
    //Tooltip Component
    function CustomTooltipComponent() {}
    CustomTooltipComponent.prototype.init = function(params) {
      const tooltipValue = params.value || params.valueFormatted || '';
      const eGui = this.eGui = document.createElement('div');
      eGui.classList.add('ag-tooltip');
      eGui.innerHTML = tooltipValue;
    };
    
    CustomTooltipComponent.prototype.getGui = function() {
      return this.eGui;
    };
    
    createCombinedTooltipValueGetter = (key, dataChanges, dataBindedChanges) => {
      const keyLookup = {};
      dataBindedChanges.forEach(change => {
        if (!keyLookup[change.field]) {
          const data_source = change.data_source;
          const property = change.property;
          const output = change.output;
          const area = change.area;
          let dataArray;
          this.$watch(data_source, (function (e) {
            dataArray = e;
          }));
          keyLookup[change.field] = { dataArray, property, output, area };
        }
      });
    
      return function (params) {
        const value = params.data[key];
        // Check if there's a matching change in dataChanges
        const matchingChange = dataChanges.find(change => change.field === key && change.value === String(value));
        if (matchingChange && matchingChange.area === 'tooltip' ) {
          return matchingChange.new_value;
        }
        // Check if there's a matching change in dataBindedChanges
        const matchingKeyData = keyLookup[key];
        if (matchingKeyData) {
          const { dataArray, property, output, area } = matchingKeyData;
          const matchingItem = dataArray.find(item => item[property] === value);
          if (matchingItem && area === 'tooltip') {
            return matchingItem[output];
          }
        }
        if (options.custom_tooltip) {
          return options.custom_tooltip;
        }
        else if (Array.isArray(options.tooltip_config)) {
          for (const config of options.tooltip_config) {
            if (config.field === key && config.tooltip === "yes") {
              return value;
            }
          }
        }
        else {
          return undefined;
        }
      };
    }
    createCombinedFilterValueGetter = (key, dataChanges, dataBindedChanges, displayDataChanges) => {
      const keyLookup = {};
    
      dataBindedChanges.forEach(change => {
        if (!keyLookup[change.field]) {
          const data_source = change.data_source;
          const property = change.property;
          const output = change.output;
          let dataArray;
          this.$watch(data_source, (function (e) {
            dataArray = e;
          }));
          keyLookup[change.field] = { dataArray, property, output };
        }
      });
    
      return function (params) {
        const value = params.data[key];
        if ((displayDataChanges.length > 0) && displayDataChanges.some(change => change.field === key)) {
          const placeholderMap = Object.fromEntries(
            Object.entries(params.data).map(([field, fieldValue]) => [`%${field}%`, fieldValue !== null ? fieldValue : ''])
          );
          return displayDataChanges.reduce((filterValue, change) => {
            if (change.field === key) {
              const placeholders = Object.keys(placeholderMap).join('|');
              // Add a default value for unknown placeholders
              const regex = new RegExp(placeholders + '|%[^%]+%', 'g');
              filterValue = change.data.replace(regex, match => placeholderMap[match] || '');
            }
            return filterValue;
          }, value);
        }
        // Check if there's a matching change in dataChanges
        const matchingChange = dataChanges.find(change => change.field === key && change.value === String(value));
        if (matchingChange) {
          return matchingChange.new_value;
        }
        // Check if there's a matching change in dataBindedChanges
        const matchingKeyData = keyLookup[key];
        if (matchingKeyData) {
          const { dataArray, property, output } = matchingKeyData;
          const matchingItem = dataArray.find(item => item[property] === value);
    
          if (matchingItem) {
            return matchingItem[output];
          }
        }
        if (options.amount_fields) {
          const amountFieldsArray = options.amount_fields.split(',');
          if (amountFieldsArray.includes(key)) {
            return parseFloat(value);
          }
        }
        // Return the original value if no matching changes were found
        return value;
      };
    };
    if (Array.isArray(this.props.column_defs) && this.props.column_defs.length > 0) {
      columnDefs = this.props.column_defs;
    } else {
      const firstRow = rowData[0];
      idFieldPresent = Object.keys(firstRow).includes('id');
      columnDefs = Object.keys(firstRow).map(key => {
        // Assuming rowData is an array of objects
        const values = rowData.map(row => row[key]);
        const nonNullValues = values.filter(value => value !== null);
        const dataType = (ctypes.length > 0 && getCustomDataTypes(key) !== null) ? getCustomDataTypes(key) : detectDataType(nonNullValues);
        let filter;
        let valueGetter;
        let filterValueGetter;
        let tooltipValueGetter;
        let tooltipComponent;
        let valueFormatter;
        let filterParams;
        let comparator;
        let minWidth;
        let hide;
        let type;
        let sortable;
        let cellEditor;
        let cellEditorParams;
        let valueParser;
        let editable;

        if (dataType === 'number') {
          filter = 'agNumberColumnFilter';
          const baseFilterOptions = [
            'equals',
            'notEqual',
            'lessThan',
            'lessThanOrEqual',
            'greaterThan',
            'greaterThanOrEqual',
            'inRange'
          ];
          
          filterParams = {
            filterOptions: [
              ...baseFilterOptions,
              {
                displayKey: 'contains',
                displayName: 'Contains',
                predicate: (filterValue, cellValue) => {
                  return cellValue.toString().includes(filterValue.toString());
                }
              },
              {
                displayKey: 'doesNotContain',
                displayName: 'Does not contain',
                predicate: (filterValue, cellValue) => {
                  return !cellValue.toString().includes(filterValue.toString());
                }
              }
            ]
          };
          if (options.numeric_column_align){
            type = 'numericColumn';
          }
          if (options.amount_fields) {
            const amountFieldsArray = options.amount_fields.split(',');
            if (amountFieldsArray.includes(key)) {
              valueFormatter = function (params) {
                if (params.value != null) {
                  return Number(params.value).toLocaleString(options.date_locale, {
                    minimumFractionDigits: options.amount_field_precision,
                    maximumFractionDigits: options.amount_field_precision
                  });
                }
                return '-';
              };
            }
          } else {
            valueFormatter = blankOrNullValueFormatter;
          }
        } else if (dataType === 'date') {
          filter = 'agDateColumnFilter';
          valueFormatter = (params) => formatTime(params, timezone);
          filterParams = dateFilterParams;
          minWidth = 200;
        } else {
          filter = 'agTextColumnFilter';
          valueFormatter = blankOrNullValueFormatter;
          filterParams = undefined;
          comparator = options.ci_sort ? caseInsensitiveComparator : undefined;
          minWidth = undefined;
        }
        // Check if custom definition exists for the current field
        if (this.props.definitions && this.props.definitions[key]) {
          const definition = this.props.definitions[key];
          if (definition.valueGetter) {
            valueGetter = eval(`(data) => ${definition.valueGetter}`);
          }
          if (definition.filterGetter) {
            filterValueGetter = eval(`(params) => ${definition.filterGetter}`);
          }
        }
        else {
          valueGetter = createCombinedValueGetter(key, options.data_changes, options.data_binded_changes, options.display_data_changes);
          filterValueGetter = createCombinedFilterValueGetter(key, options.data_changes, options.data_binded_changes, options.display_data_changes);
          tooltipValueGetter = createCombinedTooltipValueGetter(key, options.data_changes, options.data_binded_changes);

        }
        
        const cstyles = this.props.cstyles
        // Check if custom color exists for the current field and condition
        function applyCellStyle(params) {
          const field = params.colDef.field.toString();
          const styles = cstyles.filter((cs) => cs.field === field);
          const whiteSpace = options.wrap_text ? 'normal' : 'nowrap';
        
          for (const style of styles) {
            const condition = style.condition;
            const customColor = style.customColor;
            const font = style.font || 'normal';
            const area = style.area || 'text';
            let conditionResult = false;
            if (condition.endsWith('()') && typeof window[condition.replace(/\(\)$/, '')] === 'function') {
              const result = window[condition.replace(/\(\)$/, '')](params.data);
              if (typeof result !== 'boolean') {
                console.error('Custom condition function must return a boolean value.');
                return;
              }
                conditionResult = result;
            } else {
              const [left, operator, right] = extractConditionParts(condition);
              if (params.data.hasOwnProperty(left) &&
                (params.data[left] !== null ? evaluateCondition(params.data[left], operator, right) : false)
              ) {
                conditionResult = true;
              }
            }
            if (conditionResult) {
              if (area === 'text') {
                return {
                  color: customColor,
                  fontStyle: font,
                  fontWeight: (font === 'bold' ? 'bold' : null),
                  whiteSpace: whiteSpace
                };
              } else if (area === 'cell') {
                return {
                  backgroundColor: customColor,
                  fontStyle: font,
                  whiteSpace: whiteSpace
                };
              }
            }
          }
          if (options.wrap_text) {
            return { whiteSpace: 'normal' };
          }
          return null;
        }
        if (cnames.hasOwnProperty(key)) {
        const cname = cnames[key]
        headerName = cname ? cname.custom_name : humanize(key);         
        }
        else {
          headerName = humanize(key);
        }
        
        if (options.js_data_changes && Array.isArray(options.js_data_changes) && options.js_data_changes.length > 0) {
            // Check if there's a matching change in jsDataChanges
            const matchingJsChange = options.js_data_changes.find(change => change.field === key);
            if (matchingJsChange) {
              cellRenderer = function (params) {
                // Don't apply custom renderer to pinned bottom rows (totals)
                if (params.node && params.node.rowPinned === 'bottom') {
                  return "-";
                }
                if (typeof window[matchingJsChange.function] === 'function') {
                  const cellValue = window[matchingJsChange.function](params.data); 
                  return cellValue;
                }
              }
            }
            else {
              cellRenderer = undefined;
              colId = undefined;
            }
        }
        else {
          cellRenderer = undefined;
          colId = undefined;
        }
        
        // Handle JS tooltip changes
        if (options.js_tooltip_changes && Array.isArray(options.js_tooltip_changes) && options.js_tooltip_changes.length > 0) {
          const tooltipChange = options.js_tooltip_changes.find(change => change.field === key);
          if (tooltipChange) {
            tooltipValueGetter = (params) => {
              if (typeof window[tooltipChange.function] === 'function') {
                return window[tooltipChange.function](params.data);
              }
              return params.value;
            };
            
            // Use custom tooltip component for HTML rendering
            tooltipComponent = 'CustomTooltipComponent';
          }
        }
        if (key =='status' && options.row_status_event) {
          cellRenderer = 'checkboxCellRenderer';
          colId = 'statusColumn';
          filter = null;
        }
        else if (options.hide_filters) {
          const hideFiltersArray = options.hide_filters.split(',');
        
          if (hideFiltersArray.includes(key)) {
            filter = null;
          }
        }


        if (options.hide_sort) {
          const hideSortArray = options.hide_sort.split(',');
          if (hideSortArray.includes(key)) {
            sortable = false;
          }
        }
        else {
          sortable = true;
        }
        if (options.hide_id_field && key == 'id') {
          hide = true;
        }
        else if (options.hide_fields) {
          const hideFieldsArray = options.hide_fields.split(',');
        
          if (hideFieldsArray.includes(key)) {
            hide = true;
          }
        }
        else {
          hide = undefined;
        }
        if (options.editable_fields) {
          const editableCellsArray = options.editable_fields.split(',');
          if (editableCellsArray.includes(key)) {
            editable = true;
          }
        }
        function lookupKey(mappings, name) {
          const keys = Object.keys(mappings);
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (mappings[key] === name) {
              return key;
            }
          }
        }
        function lookupValue(mappings, key) {
          if (mappings === undefined || key==''||key === undefined){
            return options.cselect_placeholder
          }
          return mappings[key];
        }
        if (options.cdynamic_select_editors.hasOwnProperty(key) || options.cstatic_select_editors.hasOwnProperty(key)) {
          editable = true;
          cellEditor = 'agSelectCellEditor';
          valueFormatter = (params) => {
            if (params.api.isDestroyed()) return;
          
            const selectedNode = params.api.getSelectedNodes()[0];
            const dynamicOptions = options.cdynamic_select_editors[key];
            const staticOptions = options.cstatic_select_editors[key];
            let selectOptions;
            if (dynamicOptions && params.data) {
                selectOptions = params.data[dynamicOptions.options_field];
            } else if (staticOptions) {
                if (!staticOptions.parsedOptions) {
                    staticOptions.parsedOptions = JSON.parse(staticOptions.options);
                }
                selectOptions = staticOptions.parsedOptions;
            } else {
                selectOptions = selectedNode?.data[dynamicOptions.options_field];
            }
              return lookupValue(selectOptions, params.value);
          };
          valueParser = (params) => {
            return lookupKey(selectOptions, params.newValue);
          }
          cellEditorParams = (params) => {
            const editorOptions = options.cdynamic_select_editors[key] ? 
                params.data[options.cdynamic_select_editors[key].options_field] :
                JSON.parse(options.cstatic_select_editors[key].options);
            return {
                values: Object.keys(editorOptions)
            };
        };
      }
        return {
          headerName: headerName,
          field: key,
          filter: options.filter ? filter : null,
          valueFormatter: valueFormatter,
          valueGetter: valueGetter,
          minWidth: minWidth,
          hide: hide,
          type: type,
          editable: editable,
          sortable: sortable,
          filterValueGetter: filterValueGetter,
          filterParams: filterParams,
          comparator: comparator,
          ...(tooltipComponent ? {
            tooltipComponent: tooltipComponent,
            tooltipValueGetter: tooltipValueGetter
          } : tooltipValueGetter && typeof tooltipValueGetter === 'function' ? {
            tooltipValueGetter: tooltipValueGetter
          } : {}),
          cellStyle: applyCellStyle,
          ...(cwidths.hasOwnProperty(key) && {
            minWidth: parseInt(cwidths[key].min_width),
            maxWidth: parseInt(cwidths[key].max_width),
          }),
          cellRenderer: cellRenderer,
          cellEditor: cellEditor,
          cellEditorParams: cellEditorParams,
          valueParser: valueParser
        };
      });
      if (options.group_config && options.group_config.length > 0) {
        groupedColumnDefs = options.group_config.map(group => {
          const startFieldIndex = columnDefs.findIndex(colDef => colDef.field === group.start_field);
          const endFieldIndex = columnDefs.findIndex(colDef => colDef.field === group.end_field);
      
          if (startFieldIndex === -1 || endFieldIndex === -1 || startFieldIndex > endFieldIndex) {
              return null;
          }
      
          const groupColumns = columnDefs.slice(startFieldIndex, endFieldIndex + 1)
              .map(col => ({
                  ...col,
                  columnGroupShow: 'open'
              }));
      
          return {
              headerName: group.name,
              children: groupColumns
          };
      }).filter(group => group !== null);
    }
    }
    window.onRowClicked = (event) => {
      const rowData = event.data;
      this.set('data', rowData);
      this.set('id', rowData.id);
      this.dispatchEvent('row_clicked')
    }
    window.onRowDoubleClicked = (event) => {
      const rowData = event.data;
      this.set('data', rowData);
      this.set('id', rowData.id);
      this.dispatchEvent('row_double_clicked')
    }
    if (options.enable_actions) {
      actionsColumn = {
        headerName: 'Actions',
        field: 'action',
        colId: 'actionsColumn',
        filter: null,
        sortable: false,
        cellRenderer: actionsRendererForPinnedBottom,
        minWidth: options.actions_column_min_width,
        maxWidth: options.actions_column_max_width,
        autoHeight: true,
        editable: false,
        pinned: (options.pin_actions ? options.actions_column_position: undefined),
        cellRendererParams: {
          buttons: [],
        },
      };
    
      if (options.edit_action_btn) {
        actionsColumn.cellRendererParams.buttons.push({
          id: 'edit',
          action: options.edit_action_title,
          classNames: options.edit_action_btn_class,
          tooltip: options.edit_action_tooltip,
          icon: options.edit_action_icon_class,
          onClick: (rowData) => {
            this.set('data', rowData);
            this.set('id', rowData.id);
            this.dispatchEvent('row_action_edit');
          },
          condition: options.edit_action_btn_condition
        });
      }
    
      if (options.view_action_btn) {
        actionsColumn.cellRendererParams.buttons.push({
          id: 'view',
          action: options.view_action_title,
          classNames: options.view_action_btn_class,
          tooltip: options.view_action_tooltip,
          icon: options.view_action_icon_class,
          onClick: (rowData) => {
            this.set('data', rowData);
            this.set('id', rowData.id);
            this.dispatchEvent('row_action_view');
          },
          condition: options.view_action_btn_condition
        });
      }

      if (options.delete_action_btn) {
        actionsColumn.cellRendererParams.buttons.push({
          id: 'delete',
          action: options.delete_action_title,
          classNames: options.delete_action_btn_class,
          tooltip: options.delete_action_tooltip,
          icon: options.delete_action_icon_class,
          onClick: (rowData) => {
            this.set('data', rowData);
            this.set('id', rowData.id);
            this.dispatchEvent('row_action_delete');
          },
          condition: options.delete_action_btn_condition
        });
      }
      
      if (options.enable_custom_action_btns) {
        for (let i = 1; i <= 30; i++) {
          const buttonActionKey = `button${i}_action_btn`;
          const buttonTitleKey = `button${i}_action_title`;
          const buttonClassKey = `button${i}_action_btn_class`;
          const buttonTooltipKey = `button${i}_action_tooltip`;
          const buttonIconClassKey = `button${i}_action_icon_class`;
          const buttonConditionKey = `button${i}_action_btn_condition`; 
        
          if (options[buttonActionKey]) {
            actionsColumn.cellRendererParams.buttons.push({
              id: `button${i}`,
              action: options[buttonTitleKey],
              classNames: options[buttonClassKey],
              tooltip: options[buttonTooltipKey],
              icon: options[buttonIconClassKey],
              onClick: (rowData) => {
                this.set('data', rowData);
                this.set('id', rowData.id);
                this.dispatchEvent(`row_action_button${i}`);
              },
              condition: options[buttonConditionKey]
            });
          }
        }
    }
      options.actions_column_position=='right' ? columnDefs.push(actionsColumn):columnDefs.unshift(actionsColumn);
    }
    if (options.locale_text == 'HE') {
      localeText = AG_GRID_LOCALE_IL
    }
    else if (options.locale_text == 'RU') {
      localeText = AG_GRID_LOCALE_RU
    }
    else if (options.locale_text == 'PT') {
      localeText = AG_GRID_LOCALE_PT
    }
    else if (options.locale_text == 'ES') {
      localeText = AG_GRID_LOCALE_ES
    }
    const gridOptions = {
      ...(idFieldPresent ? { getRowId: params => String(params.data.id) } : {}),
      columnDefs: (groupedColumnDefs && groupedColumnDefs.length > 0) ? groupedColumnDefs : columnDefs,
      getRowStyle: options.rstyles ? createRowStyleFunction(options.rstyles): undefined,
      localeText: localeText,
      enableRtl: options.enable_rtl,
      context: {
        dark_mode: options.dark_mode
      },
      onRowClicked: enableRowClickEvent ? onRowClicked : undefined,
      onRowDoubleClicked: enableRowDoubleClickEvent ? onRowDoubleClicked : undefined,
      onCellClicked: enableCellClickEvent ? onCellClicked : undefined,
      onCellDoubleClicked: enableCellDoubleClickEvent ? onCellDoubleClicked : undefined,
      rowStyle: enableRowClickEvent || enableCellClickEvent || enableRowDoubleClickEvent || enableCellDoubleClickEvent  ? { cursor: 'pointer' } : undefined,
      defaultColDef: {
        flex: 1,
        minWidth: options.min_width,
        resizable: options.resizable,
        wrapHeaderText: options.wrap_header_text,
        autoHeaderHeight: options.auto_header_height,
        autoHeight: options.auto_height,
        filter: options.filter,
        sortable: options.sortable,
        editable: options.cell_editable,
        floatingFilter: options.floating_filter
      },
      rowSelection: {
          mode: options.row_selection,
          selectAll: "filtered",
          checkboxes: options.row_checkbox_event,  // To enable checkboxes
          headerCheckbox: options.row_checkbox_event, // Header checkbox for select all
          enableClickSelection: !options.suppress_row_click_selection,  // Allows row selection on click
          hideDisabledCheckboxes: false  // Show disabled checkboxes
      },
      editType: (options.row_editable ? 'fullRow': undefined),
      domLayout: this.props.dom_layout,
      enableCellTextSelection: true,
      pagination: this.props.pagination,
      paginationAutoPageSize: this.props.pagination_auto_page_size,
      paginationPageSize: pagination_page_size,
      paginationPageSizeSelector: options.pagination_page_size_selector,
      rowHeight: this.props.row_height,
      headerHeight: this.props.header_height,
      suppressMenuHide: this.props.suppress_menu_hide,
      suppressMovableColumns: this.props.suppress_movable_columns,
      enableCellExpressions: this.props.enable_cell_expressions,
      animateRows: this.props.animate_rows,
      suppressAggFuncInHeader: this.props.suppress_agg_func_in_header,
      suppressClipboardPaste: this.props.suppress_clipboard_paste,
      suppressScrollOnNewData: this.props.suppress_scroll_on_new_data,
      columnHoverHighlight: this.props.column_hover_highlight,
      tooltipShowDelay: options.tooltip_show_delay,
      onFilterModified: function (params) { 
        const columnApi = params.api;
          const rowCount = columnApi.getDisplayedRowCount();
          
          if (rowCount > 0) {
            columnApi.hideOverlay();
          } else {
            columnApi.showNoRowsOverlay();
          }

      },
      onFilterChanged: function (params) {
        const columnApi = params.api;
        setTimeout(() => {
          const rowCount = columnApi.getDisplayedRowCount();
          
          if (rowCount > 0) {
            columnApi.hideOverlay();
          } else {
            columnApi.showNoRowsOverlay();
          }
        }, 100);
      },
      onGridReady: (params) => {
        const columnApi = params.api;
        if (options.loading_overlay) {
          setTimeout(() => {
            columnApi.setGridOption("loading", false)
          }, options.loading_overlay_duration);
        }
        if (options.csort && options.csort.length > 0) {
          let sortModel = options.csort.map(function(sortItem, index) {
              return {
                  colId: sortItem.field,
                  sort: sortItem.sort,
                  sortIndex: index
              };
          });
          columnApi.applyColumnState({
              state: sortModel,
              defaultState: { sort: null }
          });
        }
        hideColumn = (fieldToHide) => {
          columnApi.setColumnsVisible([fieldToHide], false);
        }
        pinColumnToLeft = (fieldToPin) => {
          const columnState = columnApi.getColumnState();
          const columnIndex = columnState.findIndex(column => column.colId === fieldToPin);
          if (columnIndex !== -1) {
            for (let i = 0; i <= columnIndex; i++) {
              columnState[i].pinned = 'left';
            }
            columnApi.applyColumnState({ state: columnState });
          }
        }
        saveColumnStateToStorage = () => {
          const columnState = columnApi.getColumnState();
          const pageId = getPageId();
          const storageKey = options.column_state_storage_key || pageId;
          localStorage.setItem(`dmxState-${storageKey}`, JSON.stringify(columnState));
          this.set('columnState', columnState);
        }

        function restoreColumnState() {
          const pageId = getPageId();
          const storageKey = options.column_state_storage_key || pageId;
          const savedColumnState = localStorage.getItem(`dmxState-${storageKey}`);

          if (savedColumnState) {
            try {
              const parsedState = JSON.parse(savedColumnState);
              columnApi.applyColumnState({
                state: parsedState,
                applyOrder: true,
                applyVisibility: true,
              });
            } catch (err) {
              console.warn(`Failed to parse column state for key: dmxState-${storageKey}`, err);
            }
          }
        }
        restoreColumnState();
        this.set("state", { gridReady: true });
      },
      onFirstDataRendered: () => {
        this.set("state", { firstDataRendered: true });
      },
      onRowDataUpdated: (event) => {
        this.set("state", { rowDataUpdated: true });
      },
      onGridSizeChanged: function(params) {
        // This function is called whenever the grid's size changes
        adjustHeaderWidth();
        if (options.fixed_horizontal_scroll) {
          updateHoveringBarStyles();
        }
      },
      onCellValueChanged: (params) => {
        this.set('data', params.data);
        this.set('id', params.data.id);
        dmx.nextTick(function() {
          this.dispatchEvent('cell_data_edited');
        }, this);
      },
      onRowValueChanged: (params) => {
          this.set('data', params.data);
          this.set('id', params.data.id);
          dmx.nextTick(function() {
            this.dispatchEvent('row_data_edited');
          }, this);
      },
      components: {
        clickCellRenderer: clickCellRenderer,
        checkboxCellRenderer: checkboxCellRenderer,
        actionsRenderer: actionsRenderer,
        CustomTooltipComponent: CustomTooltipComponent
      }
    };
    if (options.row_checkbox_event) {
      gridOptions.onRowSelected = (event) => {
        if (event.node && event.node.isSelected()) {
          const rowData = event.node.data;
          this.set('data', rowData);
          this.set('id', rowData.id);
          this.dispatchEvent('row_checkbox_checked');
        } else {
          const rowData = event.node.data;
          this.set('data', rowData);
          this.set('id', rowData.id);
          this.dispatchEvent('row_checkbox_unchecked');
        }
      };
    }
    const totalRow = function (api, columnsToSum, columnsToCount) {
      if (!columnsToSum && !columnsToCount) {
        return;
      }
      let rowData = [];
      api.forEachNodeAfterFilter(node => {
        rowData.push({ "data": node.data, "index": node.childIndex });
      });
      let result = [{}];
    
      if (columnsToSum) {
        // Initialize and calculate sum columns
        columnsToSum.forEach(function (col) {
          result[0][col] = 0;
          rowData.forEach(function (line) {
            if (line.index < rowData.length && line.data[col] !== null && line.data[col] !== undefined) {
              // Convert to number and handle NaN
              const value = Number(line.data[col]);
              if (!isNaN(value)) {
                result[0][col] += value;
              }
            }
          });
          // Apply footer sum precision if specified
          if (options.footer_sum_precision !== null && !isNaN(result[0][col])) {
            result[0][col] = Number(result[0][col].toFixed(options.footer_sum_precision));
          }
        });
      }
      if (columnsToCount) {
        columnsToCount.forEach(function (colObj) {
          const col = colObj.field;
          const uniqueValuesToCount = new Set(colObj.unique_values.split(','));
          result[0][col] = 0;
          const uniqueValues = new Set();
          const totalValues = new Set();
        
          rowData.forEach(function (line) {
            const value = line.data[col];
            if (line.index < rowData.length && value !== undefined && value !== null) {
              const valueString = value.toString();
              if (uniqueValuesToCount.has(valueString)) {
                result[0][col]++;
                totalValues.add(valueString);
                if (!uniqueValues.has(valueString)) {
                  uniqueValues.add(valueString);
                }
              }
            }
          });
          if (options.columns_to_count_nonunique) {
          result[0][col + '_total_count'] = totalValues.size;
          }
          else {
            result[0][col] = uniqueValues.size;
          }
        });
      }
      api.setGridOption('pinnedBottomRowData', result);
    }

    const gridDiv = document.getElementById(options.id+'-grid');
    

    if (!gridDiv) {
      console.error(`Grid container element with ID '${options.id}'-grid not found.`);
      return;
    }
    if (gridInstance) {
        gridInstance.destroy();
        gridInstance = null;
    }
    const getPageId = () => {
      const currentPageUrl = window.location.pathname;
      const optionsId = options.id+'-grid';
      const uniqueId = `${currentPageUrl}_${optionsId}`;
      return uniqueId;
    };
    const gridConfig = {
      columnDefs: columnDefs,
      ...gridOptions
    };
    // Conditionally add event listeners based on whether columnsToSum or columnsToCount are defined
    if ((options.columns_to_sum && options.columns_to_sum.split(',').length > 0) || (options.columns_to_count.length > 0)) {
      let columnsToSum = options.columns_to_sum ? options.columns_to_sum.split(',') : [];
      let columnsToCount = options.columns_to_count;

   
      const originalOnFilterChanged = gridConfig.onFilterChanged;
      gridConfig.onFilterChanged = function (e) {
       
        totalRow(e.api, columnsToSum, columnsToCount);
        
        if (originalOnFilterChanged) {
          originalOnFilterChanged(e);
        }
      };
      gridConfig.onFirstDataRendered = function (e) {
        totalRow(e.api, columnsToSum, columnsToCount);
      };
      gridConfig.postSortRows = function (e) {
        totalRow(e.api, columnsToSum, columnsToCount);
      };
    }
    // Create ag-Grid instance
    gridInstance = agGrid.createGrid(gridDiv, gridConfig);
    gridInstance.setGridOption('rowData', rowData)
    if (options.loading_overlay) {
      gridInstance.setGridOption("loading", true)
    }
    if (options.cfilters && options.cfilters.length > 0) {
        var filterModel = {};
        const customFilters = options.cfilters
        customFilters.forEach(function (customFilter) {
          filterModel[customFilter.field] = {
            type: customFilter.type,
            filter: customFilter.filter
          };
        });
          gridInstance.setFilterModel(filterModel);
          gridInstance.onFilterChanged();
      }

    const gridElement = document.getElementById(options.id+'-grid');
    if (options.vert_center_cell_data) {
      const styleElement = document.createElement('style');
      if (options.vert_center_cell_data) {
          styleElement.textContent += `
            .ag-cell {
              display: flex;
              flex-direction: column;
              justify-content: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          `;
      }
      gridElement.appendChild(styleElement);
   }
    if (options.compact_view) {
      gridElement.style.setProperty('--ag-grid-size', `${options.compact_view_grid_size}`+'px');
      gridElement.style.setProperty('--ag-list-item-height', `${options.compact_view_item_height}`+'px');
    }
    const gridContainer = gridElement.parentNode;
    if (!gridContainer) {
      console.error('Grid container not found.');
      return;
    }
    // Function to adjust the header width
    function adjustHeaderWidth() {
      const agHeader = gridElement.querySelector('.ag-header');
      const agRootWrapper = gridElement.querySelector('.ag-root-wrapper');
      if (agHeader && agRootWrapper) {
        const rootWrapperWidth = agRootWrapper.clientWidth;
        const newHeaderWidth = rootWrapperWidth * 1.0;
        agHeader.style.width = `${newHeaderWidth}px`;
      }
    }
    adjustHeaderWidth();
    if (options.fixed_header) {
      window.addEventListener('scroll', function () {
        const header = gridElement.querySelector('.ag-header');
        const topbar = gridElement.querySelector('.' + options.topbar_class);
        const topbarHeight = (topbar ? topbar.getBoundingClientRect().height : 0) + options.fixed_top_offset;
        const headerPos = (topbar ? topbar.getBoundingClientRect().bottom : 0) + options.fixed_header_offset;
        if (!header) return;
        if (window.scrollY > headerPos) {
          header.style.position = 'fixed';
          header.style.top = `${topbarHeight}px`;
          header.style.zIndex = '1';
          document.body.style.marginBottom = `${header.offsetHeight}px`;
        } else {
          header.style.position = 'static';
          document.body.style.marginBottom = '0'; // Reset the margin
        }
      });
    }
    if (options.fixed_footer) {
      window.addEventListener('scroll', function () {
        if (gridDiv.scrollTop >= (gridDiv.scrollHeight - gridDiv.clientHeight)) {
          const footerRow = gridElement.querySelector('.ag-row-pinned');
          const footerRowDiv = gridElement.querySelector('.ag-floating-bottom.ag-selectable');
          if (footerRow) {
            footerRow.classList.remove('ag-row-pinned');
            footerRow.classList.add('ag-row-even');
            footerRow.style.position = 'fixed';
            footerRow.style.bottom = options.fixed_footer_bottom_padding+'px';
            footerRow.style.borderTop = '1px solid #ccc';
            footerRow.style.borderBottom = '1px solid #ccc';
            footerRowDiv.style.height = '0px';
            footerRowDiv.style.minHeight = '0px';
          }
          const bottomViewport = gridElement.querySelector('.ag-floating-bottom-viewport');
          if (bottomViewport) {
            bottomViewport.style.position = 'fixed';
            bottomViewport.style.bottom = '0';
          }
        } else {
          const footerRow = gridElement.querySelector('.fixed-footer-row');
          if (footerRow) {
            footerRow.classList.add('ag-row-pinned'); 
          }
        }
      });
    }
    exportSelectedRows = () => {
      const selectedRows = gridInstance.getSelectedRows();
      this.set('selectedRows', selectedRows);
    }
    onFilterTextBoxChanged = () => {
      if (gridInstance) {
        gridInstance.setGridOption(
          'quickFilterText',
          document.getElementById(options.quick_filter_field).value
        );
      }
    }
    function updateHoveringBarStyles() {
      const existingStyle = gridElement.querySelector('#hovering-bar-style');
      if (options.fixed_horizontal_scroll) {
        const styleElement = document.createElement('style');
        styleElement.id = 'hovering-bar-style';
        const agRootWrapper = gridElement.querySelector('.ag-root-wrapper');
        const bodyHorizontalScrollElement = gridElement.querySelector('.ag-body-horizontal-scroll');
        const rootWrapperWidth = agRootWrapper.clientWidth;
        bodyHorizontalScrollElement.style.width = rootWrapperWidth + 'px';
        // Add the styles for the hovering horizontal bottom bar
        styleElement.innerHTML = `
          .ag-body-horizontal-scroll {
            position: fixed;
            bottom: 0;
          }
          .ag-sticky-bottom {
            display: none;
          }
          .ag-paging-panel {
            border-top: none;
          }
        `;
        if (existingStyle) {
          existingStyle.parentNode.replaceChild(styleElement, existingStyle);
        } else {
          gridElement.appendChild(styleElement);
        }
      } else if (existingStyle) {
        // Remove the style element if it exists
        existingStyle.parentNode.removeChild(existingStyle);
      }
    }
    updateHoveringBarStyles();

    //CSV Export Function
    exportGridData = () => {
      const excludedColumnIds = ['checkboxColumn', 'actionsColumn'];
      const exportExcludeFieldsArray = options.export_exclude_fields ? options.export_exclude_fields.split(',') : [];
      
      let fieldsToExport = [];
      
      // Try to get saved column state from localStorage
      const pageId = getPageId();
      const storageKey = options.column_state_storage_key || pageId;
      const savedColumnState = localStorage.getItem(`dmxState-${storageKey}`);
      
      // If saved column state exists, use it
      if (savedColumnState) {
        try {
          const parsedState = JSON.parse(savedColumnState);
          // Use the saved state to determine column order and visibility
          fieldsToExport = parsedState
            .filter((col) => {
              // Skip excluded columns
              if (excludedColumnIds.includes(col.colId)) {
                return false;
              }
              // Skip hidden columns (respecting the hide property from saved state)
              if (col.hide) {
                return false;
              }
              return true;
            })
            .map((col) => {
              // Map colId to field from columnDefs
              const columnDef = findColumnDefByColId(col.colId);
              return columnDef ? columnDef.field : col.colId;
            })
            .filter((field) => !exportExcludeFieldsArray.includes(field));
        } catch (err) {
          console.warn(`Failed to parse saved column state for key: dmxState-${storageKey}`, err);
          fieldsToExport = [];
        }
      }
      
      // Helper function to find column definition by colId
      function findColumnDefByColId(colId) {
        if (options.group_config) {
          const traverseColumns = (columns) => {
            for (const column of columns) {
              if (column.children) {
                const result = traverseColumns(column.children);
                if (result) return result;
              } else if (column.colId === colId) {
                return column;
              }
            }
            return null;
          };
          return traverseColumns(gridConfig.columnDefs);
        } else {
          return gridConfig.columnDefs.find((column) => column.colId === colId);
        }
      }
      
      // Fallback to current logic if no saved state or if fieldsToExport is empty
      if (!fieldsToExport || fieldsToExport.length === 0) {
        fieldsToExport = getDefaultExportFields();
      }
      
      function getDefaultExportFields() {
        // Extracting fields and colIds from columnDefs
        let fieldsAndColIds;
        if (options.group_config) {
          // Helper function to traverse grouped column structure
          const traverseColumns = (columns) => {
            const fieldsAndColIds = [];
            columns.forEach((column) => {
              if (column.children) {
                fieldsAndColIds.push(...traverseColumns(column.children));
              } else {
                fieldsAndColIds.push({
                  field: column.field,
                  colId: column.colId,
                  hide: column.hide,
                });
              }
            });
            return fieldsAndColIds;
          };
          // Traverse columnDefs to gather fields and colIds
          fieldsAndColIds = traverseColumns(gridConfig.columnDefs);
        } else {
          fieldsAndColIds = gridConfig.columnDefs.map((column) => ({
            field: column.field,
            colId: column.colId,
            hide: column.hide,
          }));
        }
        const result = fieldsAndColIds.filter((column) => {
          return !excludedColumnIds.includes(column.colId) &&
                 (!options.export_exclude_hidden_fields || !column.hide) &&
                 !exportExcludeFieldsArray.includes(column.field);
        }).map((column) => column.field);
        return result;
      }
    
      const params = {
        fileName: options.export_csv_filename,
        allColumns: true,
        columnKeys: fieldsToExport,
        processCellCallback: function (params) {
          const columnDef = params.column.getColDef();
          const valueFormatter = columnDef.valueFormatter;
          const cellRenderer = columnDef.cellRenderer;
          let value = params.value || "-";
    
          // Apply cellRenderer if it exists
          if (cellRenderer && typeof cellRenderer === "function") {
            const cellRendererParams = {
              value: params.value,
              data: params.node.data,
              node: params.node,
              colDef: columnDef,
              column: params.column,
              api: params.api,
              context: params.context,
            };
            value = cellRenderer(cellRendererParams);
          }
          // Apply valueFormatter if it exists
          else if (valueFormatter && typeof valueFormatter === "function") {
            const formattedValue = valueFormatter(params);
            if (formattedValue !== null && formattedValue !== undefined) {
              value = formattedValue;
            }
          }
    
          // Trim value if export_trim is true
          if (options.export_trim_data && typeof value === 'string') {
            return value.trim();
          }
    
          return value;
        },
      };
      gridInstance.exportDataAsCsv(params);
    };
    // Create the export button
    if (exportToCSV) {
      const existingExportButton = document.getElementById('exportButton');
      if (existingExportButton) {
        return;
      }
      const exportButton = document.createElement('button');
      exportButton.id = 'exportButton'; 
      const icon = document.createElement('i');
      icon.classList.add('fas', 'fa-file-csv');
      exportButton.appendChild(icon);

      // Add the button text
      const buttonText = document.createElement('span');
      buttonText.innerText = ' Export to CSV';
      exportButton.appendChild(buttonText);
      exportButton.style.backgroundColor = '#4CAF50';
      exportButton.style.border = 'none';
      exportButton.style.color = 'white';
      exportButton.style.padding = '5px 10px';
      exportButton.style.textAlign = 'center';
      exportButton.style.textDecoration = 'none';
      exportButton.style.display = 'inline-block';
      exportButton.style.fontSize = '14px'; 
      exportButton.style.borderRadius = '5px';
      exportButton.style.cursor = 'pointer';
      exportButton.style.marginBottom = '10px';

      exportButton.addEventListener('click', () => {
        exportGridData()
      })
      // Append the export button to the grid container
      gridContainer.parentNode.insertBefore(exportButton, gridContainer);
      exportButton.style.marginBottom = '10px';
    }
    // Export AG Grid data to PDF
    exportGridDataToPDF = async () => {
      if (!gridInstance || gridInstance.isDestroyed()) {
        console.error('Grid API is destroyed or not initialized.');
        return;
      }
      const excludedColumnIds = ['checkboxColumn', 'actionsColumn'];
      const exportExcludeFieldsArray = options.export_exclude_fields ? options.export_exclude_fields.split(',') : [];
      let fieldsAndColIds;
      if (options.group_config) {
        // Helper function to traverse grouped column structure
        const traverseColumns = (columns) => {
          const fieldsAndColIds = [];
          columns.forEach((column) => {
            if (column.children) {
              fieldsAndColIds.push(...traverseColumns(column.children));
            } else {
              fieldsAndColIds.push({
                field: column.field,
                colId: column.colId,
                hide: column.hide,
              });
            }
          });
          return fieldsAndColIds;
        };
        // Traverse columnDefs to gather fields and colIds
        fieldsAndColIds = traverseColumns(gridConfig.columnDefs);
      } else {
        fieldsAndColIds = gridConfig.columnDefs.map((column) => ({
          field: column.field,
          colId: column.colId,
          hide: column.hide,
        }));
      }
      const fieldsToExport = fieldsAndColIds.filter((column) => {
        return !excludedColumnIds.includes(column.colId) &&
               (!options.export_exclude_hidden_fields || !column.hide) &&
               !exportExcludeFieldsArray.includes(column.field);
      }).map((column) => column.field);
    
      const applyCellStyle = (params) => {
        if (params.data == null) return '-'
        const field = params.colDef.field.toString();
        const styles = this.props.cstyles.filter((cs) => cs.field === field);
        const whiteSpace = options.wrap_text ? 'normal' : 'nowrap';
    
        for (const style of styles) {
          const condition = style.condition;
          const customColor = style.customColor;
          const font = style.font || 'normal';
          const area = style.area || 'text';
          let conditionResult = false;
          if (condition.endsWith('()') && typeof window[condition.replace(/\(\)$/, '')] === 'function') {
            const result = window[condition.replace(/\(\)$/, '')](params.data);
            if (typeof result !== 'boolean') {
              console.error('Custom condition function must return a boolean value.');
              return;
            }
            conditionResult = result;
          } else {
            const [left, operator, right] = extractConditionParts(condition);
            if (params.data.hasOwnProperty(left) &&
              (params.data[left] !== null ? evaluateCondition(params.data[left], operator, right) : false)
            ) {
              conditionResult = true;
            }
          }
          if (conditionResult) {
            const cellStyle = {
              color: customColor,
              fontStyle: font,
              fontWeight: (font === 'bold' ? 'bold' : null),
              whiteSpace: whiteSpace
            };
            return area === 'cell' ? { ...cellStyle, backgroundColor: customColor } : cellStyle;
          }
        }
        return options.wrap_text ? { whiteSpace: 'normal' } : null;
      };
    
      const getColumnData = (gridInstance, isHeader) => 
        gridInstance.getAllDisplayedColumns()
          .filter(column => fieldsToExport.includes(column.getColDef().field))
          .map(column => {
            const colDef = column.getColDef();
            const field = colDef.field;
            const params = {
              value: isHeader ? null : gridInstance.getValue(column, gridInstance.getDisplayedRowAtIndex(0)),
              data: isHeader ? null : gridInstance.getDisplayedRowAtIndex(0).data,
              node: isHeader ? null : gridInstance.getDisplayedRowAtIndex(0),
              colDef,
              column,
              api: gridInstance,
              context: params.context,
            };
            const cellStyle = applyCellStyle(params);
            // Determine the header name using cnames and humanize function
            const headerName = isHeader ? (
              cnames.hasOwnProperty(field) ? 
              cnames[field].custom_name : 
              humanize(field)
            ) : '';
            return {
              text: !isHeader ? (
                (colDef.cellRenderer && typeof colDef.cellRenderer === 'function') ? colDef.cellRenderer(params) : 
                (colDef.valueFormatter && typeof colDef.valueFormatter === 'function') ? colDef.valueFormatter(params) : 
                gridInstance.getValue(column, gridInstance.getDisplayedRowAtIndex(0)) ?? ''
              ) : headerName,
              color: cellStyle?.color ?? 'black',
              fillColor: cellStyle?.backgroundColor ? cellStyle.backgroundColor.replace('#', '') : undefined,
            };
          });
    
      const columns = gridInstance.getColumnState();
      const columnMap = new Map(columns.map(col => [col.colId, col]));
    
      const rows = [];
      gridInstance.forEachNode(node => {
        const row = fieldsToExport.map(field => {
          const col = columnMap.get(field);
          const colDef = col ? gridInstance.getColumnDefs().find(def => def.colId === col.colId) : {};
          const params = {
            value: gridInstance.getCellValue({ rowNode: node, colKey: col.colId }) ?? '-',
            data: node.data,
            node,
            colDef,
            column: gridInstance.getColumnState().find(col => col.colId === col.colId),
            api: gridInstance,
          };
          const cellStyle = applyCellStyle(params);
          const value = gridInstance.getCellValue({ rowNode: node, colKey: col.colId }) ?? '-';
          return {
            text: (colDef.cellRenderer && typeof colDef.cellRenderer === 'function') ? colDef.cellRenderer(params) : 
                  (colDef.valueFormatter && typeof colDef.valueFormatter === 'function') ? colDef.valueFormatter(params) : 
                  value,
            color: cellStyle?.color ?? 'black',
            fillColor: cellStyle?.backgroundColor ? cellStyle.backgroundColor.replace('#', '') : undefined,
          };
        });
        rows.push(row);
      });
      const documentDefinition = {
        pageOrientation: 'landscape',
        content: [{
          table: {
            headerRows: 1,
            widths: fieldsToExport.map(() => `${100 / fieldsToExport.length}%`),
            body: [getColumnData(gridInstance, true), ...rows],
            heights: (rowIndex) => (rowIndex === 0 ? 40 : 15),
            fillColor: (rowIndex, colIndex) => rows[rowIndex][colIndex].fillColor,
            color: (rowIndex, colIndex) => rows[rowIndex][colIndex].color,
          },
        }],
      };
      pdfMake.createPdf(documentDefinition).download(options.export_pdf_filename);
    };
    if (exportToPDF) {
      const existingPdfExportButton = document.getElementById('exportPdfButton');
      if (existingPdfExportButton) {
        return;
      }
      const exportPdfButton = document.createElement('button');
      exportPdfButton.id = 'exportPdfButton'; 
      const icon = document.createElement('i');
      icon.classList.add('fas', 'fa-file-pdf');
      exportPdfButton.appendChild(icon);

      // Add the button text
      const buttonText = document.createElement('span');
      buttonText.innerText = ' Export to PDF';
      exportPdfButton.appendChild(buttonText);
      exportPdfButton.style.backgroundColor = '#4CAF50';
      exportPdfButton.style.border = 'none';
      exportPdfButton.style.color = 'white';
      exportPdfButton.style.padding = '5px 10px';
      exportPdfButton.style.textAlign = 'center';
      exportPdfButton.style.textDecoration = 'none';
      exportPdfButton.style.display = 'inline-block';
      exportPdfButton.style.fontSize = '14px'; 
      exportPdfButton.style.borderRadius = '5px';
      exportPdfButton.style.cursor = 'pointer';
      exportPdfButton.style.marginBottom = '10px';

      exportPdfButton.addEventListener('click', () => {
        exportGridDataToPDF(this)
      })
    
      // Append the export button to the grid container
      gridContainer.parentNode.insertBefore(exportPdfButton, gridContainer);
      exportPdfButton.style.marginBottom = '10px';
    }
    const paginationPanelCss = `
      /* Flexbox layout for pagination panel */
      .ag-paging-panel {
        display: flex;
        flex-wrap: wrap;
      }
      
      /* Adjust layout for tablets and smaller devices */
      @media (max-width: 768px) {
        .ag-paging-panel {
          height: 100px !important;
        }
        .ag-paging-page-size {
          width: 60%; /* Ensure it takes up 60% width */
          display: flex;
          align-items: center;
          order: 2; /* Force it to be positioned after the summary panel */
          margin-top: 20px;
      }
      
        /* Ensure to/from, next/previous are visible */
        .ag-paging-row-summary-panel {
          display: inline-block;
            width: 100%; /* Ensure it takes full width */
            justify-content: space-between;
            text-align: center;
        }
        .ag-paging-page-summary-panel {
            display: flex;
            width: 100%; /* Ensure it takes full width */
            justify-content: space-between;
            text-align: center;
        }
      }
    `;

    const paginationPanelStyle = document.createElement('style');
    paginationPanelStyle.innerHTML = paginationPanelCss;
    document.head.appendChild(paginationPanelStyle);

    // Return grid instance
    return gridInstance;
    
  },

  events: {
    row_clicked: Event,
    row_double_clicked: Event,
    cell_clicked: Event,
    cell_data_edited: Event,
    row_data_edited: Event,
    row_checkbox_checked: Event,
    row_checkbox_unchecked: Event,
    row_status_enabled: Event,
    row_status_disabled: Event,
    row_action_edit: Event,
    row_action_view: Event,
    row_action_delete: Event,
    row_action_button1: Event,
    row_action_button2: Event,
    row_action_button3: Event,
    row_action_button4: Event,
    row_action_button5: Event,
    row_action_button6: Event,
    row_action_button7: Event,
    row_action_button8: Event,
    row_action_button9: Event,
    row_action_button10: Event,
    row_action_button11: Event,
    row_action_button12: Event,
    row_action_button13: Event,
    row_action_button14: Event,
    row_action_button15: Event,
    row_action_button16: Event,
    row_action_button17: Event,
    row_action_button18: Event,
    row_action_button19: Event,
    row_action_button20: Event,
    row_action_button21: Event,
    row_action_button22: Event,
    row_action_button23: Event,
    row_action_button24: Event,
    row_action_button25: Event,
    row_action_button26: Event,
    row_action_button27: Event,
    row_action_button28: Event,
    row_action_button29: Event,
    row_action_button30: Event
  },  
  
  init: function(node) {
    if (this.$node) {
      this.$parse();
    }
  },

  requestUpdate: function (props, oldValue) {
    // Check if data exists before trying to access its length
    if (this.props.data) {
      this.set('count', this.props.data.length);
    } else {
      this.set('count', 0);
    }
    if (!dmx.equal(this.props.data, oldValue?.data) && !this.props.noload) {
      let gridInstance = this.refreshGrid();
      this.set('gridInstance', gridInstance);
    }
    if (!dmx.equal(this.props.dark_mode, oldValue?.dark_mode)) {
      let gridInstance = this.refreshGrid();
      this.set('gridInstance', gridInstance);
    }
    if (!dmx.equal(this.props.cfilters, oldValue?.cfilters)){
      let gridInstance = this.get('gridInstance');
      if (gridInstance && this.props.cfilters && this.props.cfilters.length > 0) {
        var filterModel = {};
        const customFilters = this.props.cfilters;
        customFilters.forEach(function (customFilter) {
          filterModel[customFilter.field] = {
            type: customFilter.type,
            filter: customFilter.filter,
          };
        });
        gridInstance.setFilterModel(filterModel);
        gridInstance.onFilterChanged();
      }
    }
  },
});