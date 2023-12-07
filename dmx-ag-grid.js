dmx.Component('ag-grid', {
  initialData: {
    id: null,
    data: {},
    count: Number,
    fields: {},
    fileData: [],
    selectedRows: [],
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
    cnames: { type: Object, default: {} },
    cwidths: { type: Object, default: {} },
    ctypes: { type: Array, default: [] },
    cfilters: { type: Array, default: [] },
    wrap_header_text: { type: Boolean, default: true },
    auto_header_height: { type: Boolean, default: true },
    wrap_text: { type: Boolean, default: false },
    data_changes: { type: Array, default: [] },
    display_data_changes: { type: Array, default: [] },
    js_data_changes: { type: Array, default: [] },
    data: { type: Array, default: [] },
    dom_layout: { type: String, default: 'autoHeight' },
    enable_cell_text_selection: { type: Boolean, default: true },
    row_selection: { type: String, default: 'multiple' },
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
    suppress_property_names_check: { type: Boolean, default: false },
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
    resizable: { type: Boolean, default: true },
    filter: { type: Boolean, default: true },
    floating_filter: { type: Boolean, default: true },
    column_hover_highlight: { type: Boolean, default: true },
    export_to_csv: { type: Boolean, default: true },
    export_csv_filename: { type: String, default: 'export.csv' },
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
    data_binded_changes: {type: Array, default: [] },
    hide_fields: {type: String, default: null },
    hide_filters: {type: String, default: null },
    hide_sort: {type: String, default: null },
    compact_view: { type: Boolean, default: false },
    compact_view_grid_size: { type: Number, default: 3 },
    compact_view_item_height: { type: Number, default: 20 },
    group_config: { type: Array, default: [] },
    columns_to_count: { type: Array, default: [] },
    columns_to_sum: { type: String, default: null }
  },

  methods: {
    setValue: function (rowData, columnDefs) {
      this.set('rowData', rowData);
      this.set('columnDefs', columnDefs);
      this.refreshGrid();
    },
    reloadGrid: function () {
      dmx.nextTick(function() {
        this.transactionUpdate();
      }, this);
    },
    loadGrid: function () {
      dmx.nextTick(function() {
      let gridInstance = this.refreshGrid();
      this.set('gridInstance', gridInstance);
      }, this);
    },
    exportGrid: function () {
      dmx.nextTick(function() {
        if (typeof exportGridData === 'function') {
          exportGridData();
        } else {
          console.error('Grid not loaded to perform export');
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
        const currentPageUrl = window.location.origin + window.location.pathname;
        const uniqueId = `${currentPageUrl}_${idValue}`;
        localStorage.removeItem(`columnState_${uniqueId}`);
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
    }
  },

  transactionUpdate: function () {
    // const oldRowData = this.get('oldData');
    const gridInstance = this.get('gridInstance');
    //const oldRowData = gridInstance.getModel().rowsToDisplay.map(row => row.data);
      // Retrieve old row data from the grid instance directly
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
      gridInstance.refreshCells();
    } else {
      console.error('AG Grid instance or transaction not found.');
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
  
    const parseExcel = (excelData) => {
      return new Promise((resolve, reject) => {
        const workbook = new ExcelJS.Workbook();
        workbook.xlsx.load(excelData)
          .then(() => {
            const worksheet = workbook.getWorksheet(1);
            const data = [];
            const headers = [];
  
            worksheet.eachRow((row, rowNumber) => {
              if (rowNumber === 1) {
                row.eachCell((cell) => {
                  headers.push(cell.value);
                });
              } else {
                const rowData = {};
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                  rowData[headers[colNumber - 1]] = cell.value;
                });
                data.push(rowData);
              }
            });
  
            resolve(data);
          })
          .catch((error) => {
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
          parsedData = await parseExcel(fileData);
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
    const enableRowClickEvent = this.props.row_click_event && !this.props.enable_actions && !this.props.row_checkbox_event;
    const enableRowDoubleClickEvent = this.props.row_double_click_event && !this.props.enable_actions && !this.props.row_checkbox_event;
    const enableCellClickEvent = this.props.row_click_event && (this.props.enable_actions || this.props.row_checkbox_event);
    const enableCellDoubleClickEvent = this.props.row_double_click_event && (this.props.enable_actions || this.props.row_checkbox_event);
    let localeText;
    let columnDefs = [];
    let groupedColumnDefs = [];
    let exportToCSV = this.props.export_to_csv;
    let gridInstance = null; 
    let cellRenderer;
    const gridThemeClass = options.dark_mode ? `${options.grid_theme}-dark` : options.grid_theme;
    this.$node.innerHTML = `<div id=${options.id}-grid class="${gridThemeClass}"></div>`;
    if (!rowData || rowData.length === 0) {
      console.error('No row data provided.');
      return;
    }
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
        { action: 'Button10', classNames: 'btn-danger btn-sm', tooltip: 'Button10', icon: 'fas fa-trash-alt' }
      ];
      // User-defined button configurations (if any)
      const buttons = params.buttons || defaultButtons;
      // Create a new container element to hold the buttons
      const container = document.createElement('div');
      
      buttons.forEach((buttonConfig) => {
          const button = document.createElement('button');
          button.classList.add('btn');
          const classNames = buttonConfig.classNames.split(' ');
          classNames.forEach((className) => button.classList.add(className));
          button.setAttribute('data-toggle', 'tooltip');
          // Call a function to get the dynamic tooltip content
          if (buttonConfig.tooltip.endsWith('()')) {
            const tooltipFunction = buttonConfig.tooltip.slice(0, -2); // Remove the trailing '()'
            const tooltipText = window[tooltipFunction](params.data)
            button.setAttribute('title', tooltipText);
          } else {
            button.setAttribute('title', buttonConfig.tooltip);
          }
          button.innerHTML = `<i class="${buttonConfig.icon}"></i> ${buttonConfig.action}`;
          container.appendChild(button);
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
              const [left, operator, right] = extractConditionParts(part);
              const result = evaluateCondition(params.data[left], operator, right);
              results.push(result);
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
    function formatTime(params, timezone) {
      if (params.value) {
        const date = new Date(params.value)
        if (timezone) {
          const options = {
            timeZone: timezone,
          };

          const convertedTimestamp = date.toLocaleString(options.date_locale, options);
          dateTimezone = new Date(convertedTimestamp).getTime();
          return formatDate(dateTimezone)
        } else {
          return formatDate(date);
        }
      }
      else {
        return '-'
      }
    }
    dateFilterParams = {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var cellDate = new Date(cellValue);
          var filterDate = new Date(filterLocalDateAtMidnight);

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
        } else if ((new Date(value)).getTime() > 0) {
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
          this.$addBinding(data_source, (function (e) {
            dataArray = e;
          }));
          keyLookup[change.field] = { dataArray, property, output, area };
        }
      });
    
      return function (params) {
        const value = params.data[key];

        if ((displayDataChanges.length > 0) && displayDataChanges.some(change => change.field === params.colDef.field)) {
          const placeholderMap = Object.fromEntries(
            Object.entries(params.data).map(([field, fieldValue]) => [`%${field}%`, fieldValue])
          );
          return displayDataChanges.reduce((cellData, change) => {
            if (change.field === params.colDef.field) {
              const placeholders = Object.keys(placeholderMap).join('|');
              const regex = new RegExp(placeholders, 'g');
              cellData = change.data.replace(regex, match => placeholderMap[match]);
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
    createCombinedTooltipValueGetter = (key, dataChanges, dataBindedChanges) => {
      const keyLookup = {};
      dataBindedChanges.forEach(change => {
        if (!keyLookup[change.field]) {
          const data_source = change.data_source;
          const property = change.property;
          const output = change.output;
          const area = change.area;
          let dataArray;
          this.$addBinding(data_source, (function (e) {
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
    createCombinedFilterValueGetter = (key, dataChanges, dataBindedChanges) => {
      const keyLookup = {};
    
      dataBindedChanges.forEach(change => {
        if (!keyLookup[change.field]) {
          const data_source = change.data_source;
          const property = change.property;
          const output = change.output;
          let dataArray;
          this.$addBinding(data_source, (function (e) {
            dataArray = e;
          }));
          keyLookup[change.field] = { dataArray, property, output };
        }
      });
    
      return function (params) {
        const value = params.data[key];
    
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
      columnDefs = Object.keys(firstRow).map(key => {
        // Assuming rowData is an array of objects
        const values = rowData.map(row => row[key]);
        const nonNullValues = values.filter(value => value !== null);
        const dataType = (ctypes.length>0 ? getCustomDataTypes(key) : detectDataType(nonNullValues));
        let filter;
        let valueGetter;
        let filterValueGetter;
        let valueFormatter;
        let filterParams;
        let minWidth;
        let hide;
        let type;
        let colId;
        let sortable;

        if (dataType === 'number') {
          filter = 'agNumberColumnFilter';
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
          filterValueGetter = createCombinedFilterValueGetter(key, options.data_changes, options.data_binded_changes);
          tooltipValueGetter = createCombinedTooltipValueGetter(key, options.data_changes, options.data_binded_changes);

        }
        
        const cstyles = this.props.cstyles
        // Check if custom color exists for the current field and condition
        function applyCellStyle(params) {
          const field = params.colDef.field.toString();
          const styles = cstyles.filter((cs) => cs.field === field);
        
          for (const style of styles) {
            const condition = style.condition;
            const customColor = style.customColor;
            const font = style.font || 'normal';
            const area = style.area || 'text'; 
            const [left, operator, right] = extractConditionParts(condition);
            if (
              params.data.hasOwnProperty(left) &&
              evaluateCondition(params.data[left], operator, right)
            ) {
              if (area === 'text') {
                return { color: customColor, fontStyle: font, fontWeight: (font==='bold'?'bold':null) };
              } else if (area === 'cell') {
                return { backgroundColor: customColor, fontStyle: font };
              }
            }
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
        
        if (options.js_data_changes.length > 0 && Array.isArray(options.js_data_changes)) {
            // Check if there's a matching change in jsDataChanges
            const matchingJsChange = options.js_data_changes.find(change => change.field === key);
            if (matchingJsChange) {
              cellRenderer = function (params) {
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
        return {
          headerName: headerName,
          field: key,
          filter: filter,
          valueFormatter: valueFormatter,
          valueGetter: valueGetter,
          minWidth: minWidth,
          hide: hide,
          type: type,
          sortable: sortable,
          filterValueGetter: filterValueGetter,
          filterParams: filterParams,
          tooltipValueGetter: tooltipValueGetter,
          cellStyle: applyCellStyle,
          ...(cwidths.hasOwnProperty(key) && {
            minWidth: parseInt(cwidths[key].min_width),
            maxWidth: parseInt(cwidths[key].max_width),
          }),
          cellRenderer: cellRenderer
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
    let checkboxColumn;
    if (options.row_checkbox_event) {
        checkboxColumn = {
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: false,
          headerName: '',
          colId: 'checkboxColumn',
          field: null,
          filter: '',
          checkboxSelection: true,
          showDisabledCheckboxes: true,
          resizable: false,
          width: 50,
          maxWidth: 50, 
          suppressMenu: true
      };
      columnDefs.unshift(checkboxColumn);
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
        pinned: (options.pin_actions ? options.actions_column_position: undefined),
        cellRendererParams: {
          buttons: [],
        },
      };
    
      if (options.edit_action_btn) {
        actionsColumn.cellRendererParams.buttons.push({
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
        for (let i = 1; i <= 10; i++) {
          const buttonActionKey = `button${i}_action_btn`;
          const buttonTitleKey = `button${i}_action_title`;
          const buttonClassKey = `button${i}_action_btn_class`;
          const buttonTooltipKey = `button${i}_action_tooltip`;
          const buttonIconClassKey = `button${i}_action_icon_class`;
          const buttonConditionKey = `button${i}_action_btn_condition`; 
        
          if (options[buttonActionKey]) {
            actionsColumn.cellRendererParams.buttons.push({
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
      localeText = AG_GRID_LOCALE_HE
    }
    else if (options.locale_text == 'RU') {
      localeText = AG_GRID_LOCALE_RU
    }
    const gridOptions = {
      columnDefs: (groupedColumnDefs && groupedColumnDefs.length > 0) ? groupedColumnDefs : columnDefs,
      localeText: localeText,
      enableRtl: options.enable_rtl,
      noRowsOverlayComponent: '<div>No Records Found.</div>',
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
        wrapText: options.wrap_text,
        filter: options.filter,
        sortable: options.sortable,
        floatingFilter: options.floating_filter
      },
      domLayout: this.props.dom_layout,
      enableCellTextSelection: true,
      rowSelection: this.props.row_selection,
      suppressRowDeselection: this.props.suppress_row_deselection,
      pagination: this.props.pagination,
      paginationAutoPageSize: this.props.pagination_auto_page_size,
      paginationPageSize: this.props.pagination_page_size,
      paginationPageSizeSelector: options.pagination_page_size_selector,
      rowHeight: this.props.row_height,
      headerHeight: this.props.header_height,
      suppressRowClickSelection: this.props.suppress_row_click_selection,
      suppressMenuHide: this.props.suppress_menu_hide,
      suppressMovableColumns: this.props.suppress_movable_columns,
      enableCellExpressions: this.props.enable_cell_expressions,
      animateRows: this.props.animate_rows,
      suppressAggFuncInHeader: this.props.suppress_agg_func_in_header,
      suppressClipboardPaste: this.props.suppress_clipboard_paste,
      suppressScrollOnNewData: this.props.suppress_scroll_on_new_data,
      suppressPropertyNamesCheck: this.props.suppress_property_names_check,
      suppressRowDeselection: this.props.suppress_row_deselection,
      columnHoverHighlight: this.props.column_hover_highlight,
      onGridReady: (params) => {
        const columnApi = params.columnApi.api;
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
          localStorage.setItem(`columnState_${pageId}`, JSON.stringify(columnState));    
        }
        function restoreColumnState() {
          const pageId = getPageId();
          const savedColumnState = JSON.parse(localStorage.getItem(`columnState_${pageId}`));
          if (savedColumnState) {
            columnApi.applyColumnState({
              state: savedColumnState,
              applyOrder: true,
              applyVisibility: true,
            });
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
      components: {
        clickCellRenderer: clickCellRenderer,
        checkboxCellRenderer: checkboxCellRenderer,
        actionsRenderer: actionsRenderer
      }
    };
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
            if (line.index < rowData.length) {
              result[0][col] += parseFloat(line.data[col]) || line.data[col];
            }
          });
        });
      }
    
      if (columnsToCount) {
        columnsToCount.forEach(function (colObj) {
          const col = colObj.field;
          const uniqueValuesToCount = colObj.unique_values.split(',');
          
          result[0][col] = 0;
          let uniqueValues = new Set();
          
          rowData.forEach(function (line) {
            if (line.index < rowData.length) {
              const value = line.data[col];
              if (!isNaN(value) && uniqueValuesToCount.includes(value.toString()) && !uniqueValues.has(value)) {
                uniqueValues.add(value);
                result[0][col]++;
              } else if (typeof value === 'string' && uniqueValuesToCount.includes(value) && !uniqueValues.has(value)) {
                uniqueValues.add(value);
                result[0][col]++;
              }
            }
          });
          
          result[0][col + '_unique_count'] = uniqueValues.size;
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
      const currentPageUrl = window.location.origin + window.location.pathname;
      const optionsId = options.id+'-grid';
      const uniqueId = `${currentPageUrl}_${optionsId}`;
      return uniqueId;
    };
    const gridConfig = {
      columnDefs: columnDefs,
      rowData: rowData,
      ...gridOptions
    };
    // Conditionally add event listeners based on whether columnsToSum or columnsToCount are defined
    if ((options.columns_to_sum && options.columns_to_sum.split(',').length > 0) || (options.columns_to_count.length > 0)) {
      let columnsToSum = options.columns_to_sum ? options.columns_to_sum.split(',') : [];
      let columnsToCount = options.columns_to_count;
      
      gridConfig.onFilterChanged = function (e) {
        totalRow(e.api, columnsToSum, columnsToCount);
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
    if (options.compact_view) {
      gridElement.style.setProperty('--ag-grid-size', `${options.compact_view_grid_size}`+'px');
      gridElement.style.setProperty('--ag-list-item-height', `${options.compact_view_item_height}`+'px');
    }
    const gridContainer = gridElement.parentNode;
    // Add an event listener to the grid
    if (options.row_checkbox_event) {
      gridInstance.addEventListener('rowSelected', (event) => {
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
      });
  }
    if (!gridContainer) {
      console.error('Grid container not found.');
      return;
    }
    const agHeader = gridElement.querySelector('.ag-header');
    const agRootWrapper = gridElement.querySelector('.ag-root-wrapper');

    // Function to adjust the header width
    function adjustHeaderWidth() {
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
    function updateHoveringBarStyles() {
      const existingStyle = document.getElementById('hovering-bar-style');
      if (options.fixed_horizontal_scroll) {
        // Create a new style element
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
        `;
        if (existingStyle) {
          existingStyle.parentNode.replaceChild(styleElement, existingStyle);
        } else {
          document.head.appendChild(styleElement);
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
            }));
          }
      // Filtering out fields based on excludedColumnIds
      const fieldsToExport = fieldsAndColIds.filter(
        (column) => !excludedColumnIds.includes(column.colId)
      ).map((column) => column.field);
      const params = {
        fileName: options.export_csv_filename,
        allColumns: true,
        columnKeys: fieldsToExport,
        processCellCallback: function (params) {
          const columnDef = params.column.getColDef();
          const valueFormatter = columnDef.valueFormatter;
          if (valueFormatter && typeof valueFormatter === "function") {
            const formattedValue = valueFormatter(params);
            if (formattedValue !== null && formattedValue !== undefined) {
              return formattedValue;
            }
          }
          return params.value;
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
    return gridInstance;
    
  },

  events: {
    row_clicked: Event,
    row_double_clicked: Event,
    cell_clicked: Event,
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
    row_action_button10: Event
  },
  
  render: function(node) {
    if (this.$node) {
      this.$parse();
    }
  },

  update: function (props) {
    this.set('count', this.props.data.length);
    if (!dmx.equal(this.props.data, props.data) && !this.props.noload) {
      let gridInstance = this.refreshGrid();
      this.set('gridInstance', gridInstance);
    }
    if (!dmx.equal(this.props.dark_mode, props.dark_mode)) {
      let gridInstance = this.refreshGrid();
      this.set('gridInstance', gridInstance);
    }
  },
});