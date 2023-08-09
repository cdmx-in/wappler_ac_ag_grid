dmx.Component('ag-grid', {
  initialData: {
    id: null,
    data: {},
    count: Number,
    fields: {}
  },

  attributes: {
    id: { default: null },
    noload: { type: Boolean, default: false },
    grid_theme: { type: String, default: 'ag-theme-alpine' },
    column_defs: { type: Array, default: [] },
    tooltip_config: { type: Array, default: [] },
    custom_tooltip: { type: String, default: null },
    cstyles: { type: Array, default: [] },
    cnames: { type: Object, default: {} },
    cwidths: { type: Object, default: {} },
    ctypes: { type: Array, default: [] },
    data_changes: { type: Array, default: [] },
    data: { type: Array, default: [] },
    dom_layout: { type: String, default: 'autoHeight' },
    enable_cell_text_selection: { type: Boolean, default: true },
    row_selection: { type: String, default: 'multiple' },
    suppress_row_deselection: { type: Boolean, default: false },
    pagination: { type: Boolean, default: true },
    pagination_page_size: { type: Number, default: 20 },
    row_height: { type: Number, default: null },
    header_height: { type: Number, default: null },
    suppress_row_click_selection: { type: Boolean, default: false },
    suppress_menu_hide: { type: Boolean, default: false },
    suppress_movable_columns: { type: Boolean, default: false },
    enable_cell_expressions: { type: Boolean, default: false },
    animate_rows: { type: Boolean, default: false },
    suppress_agg_func_in_header: { type: Boolean, default: false },
    suppress_agg_at_root_level: { type: Boolean, default: false },
    suppress_clipboard_paste: { type: Boolean, default: false },
    suppress_scroll_on_new_data: { type: Boolean, default: false },
    suppress_property_names_check: { type: Boolean, default: false },
    hide_id_field: { type: Boolean, default: false },
    enable_rtl: { type: Boolean, default: false },
    locale_text: { type: String, default: null },
    date_locale: { type: String, default: 'en-IN' },
    date_format: { type: String, default: 'dd/MM/yyyy hh:mm A' },
    amount_fields: { type: Array, default: [] },
    min_width: { type: Number, default: 150 },
    sortable: { type: Boolean, default: true },
    resizable: { type: Boolean, default: true },
    filter: { type: Boolean, default: true },
    floating_filter: { type: Boolean, default: true },
    column_hover_highlight: { type: Boolean, default: true },
    export_to_csv: { type: Boolean, default: true },
    fixed_header: { type: Boolean, default: false },
    topbar_class: { type: String, default: 'topbar' },
    fixed_header_offset: { type: Number, default: 100 },
    fixed_top_offset: { type: Number, default: 80 },
    fixed_horizontal_scroll: { type: Boolean, default: false },
    fixed_horizontal_scroll_width: { type: Number, default: 80 },
    timezone: {type: String, default: '' },
    cell_click_event: {type: Boolean, default: false },
    row_click_event: {type: Boolean, default: false },
    row_checkbox_event: {type: Boolean, default: false },
    row_status_event: {type: Boolean, default: false },
    enable_actions: {type: Boolean, default: false },
    pin_actions: {type: String, default: 'right' },
    edit_action_btn: { type: Boolean, default: false },
    edit_action_title: {type: String, default: '' },
    edit_action_tooltip: {type: String, default: 'Edit' },
    edit_action_icon_class: {type: String, default: 'fas fa-pencil-alt' },
    edit_action_btn_class: {type: String, default: 'btn-primary btn-xs' },
    view_action_btn: { type: Boolean, default: false },
    view_action_title: {type: String, default: '' },
    view_action_tooltip: {type: String, default: 'View' },
    view_action_icon_class: {type: String, default: 'fas fa-eye' },
    view_action_btn_class: {type: String, default: 'btn-info btn-xs' },
    delete_action_btn: { type: Boolean, default: false },
    delete_action_title: {type: String, default: '' },
    delete_action_tooltip: {type: String, default: 'Delete' },
    delete_action_icon_class: {type: String, default: 'fas fa-trash' },
    delete_action_btn_class: {type: String, default: 'btn-danger btn-xs' },
    data_binded_changes: {type: Array, default: [] },
    hide_fields: {type: Array, default: [] },
    hide_filters: {type: Array, default: [] },
    hide_sort: {type: Array, default: [] }
  },

  methods: {
    setValue: function (rowData, columnDefs) {
      this.set('rowData', rowData);
      this.set('columnDefs', columnDefs);
      this.refreshGrid();
    },
    reloadGrid: function () {
      dmx.nextTick(function() {
        this.refreshGrid();
      }, this);
    },
    loadGrid: function () {
      dmx.nextTick(function() {
        this.refreshGrid();
      }, this);
    }
  },

  refreshGrid: function () {
    const options = this.props
    const rowData = this.props.data;
    const timezone = this.props.timezone || false;
    const cnames = this.props.cnames
    const cwidths = this.props.cwidths
    const ctypes = this.props.ctypes
    const enableRowClickEvent = this.props.row_click_event && !this.props.enable_actions && !this.props.row_checkbox_event;
    const enableCellClickEvent = this.props.row_click_event && (this.props.enable_actions || this.props.row_checkbox_event); 
    let localeText;
    let columnDefs = [];
    let exportToCSV = this.props.export_to_csv;
    let gridInstance = null; 
    this.$node.innerHTML = `<div id=${options.id}-grid class="${options.grid_theme}"></div>`;
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

    function checkboxCellRenderer(params) {
      const idValue = params.data.id;
      const columnName = params.colDef.field;
      const value = params.value;
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
      // Default button configurations (Edit and View)
      const defaultButtons = [
        { action: 'Edit', classNames: 'btn-primary btn-xs', tooltip: 'Edit', icon: 'fas fa-pencil-alt' },
        { action: 'View', classNames: 'btn-info btn-xs', tooltip: 'View', icon: 'fas fa-eye' },
        { action: 'Delete', classNames: 'btn-danger btn-xs', tooltip: 'Delete', icon: 'fas fa-trash' },
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
          button.setAttribute('title', buttonConfig.tooltip);
          button.innerHTML = `<i class="${buttonConfig.icon}"></i> ${buttonConfig.action}`;
          container.appendChild(button);
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

      return params.value;
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
      const date = new Date(params.value);
      if (!timezone) {
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      }
      const options = {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      };
    
      const formatter = new Intl.DateTimeFormat(undefined, options);
      const formattedDateTime = formatter.format(date);
      return formatDate(formattedDateTime)

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
        if (value === null || value === undefined || value === '') {
          hasText = true;
        } else if (!isNaN(Number(value))) {
          hasNumber = true;
        } else if (!isNaN(Date.parse(value))) {
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
    createCombinedValueGetter = (key, dataChanges, dataBindedChanges) => {
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
        if (options.amount_fields && options.amount_fields.includes(key)) {
              return parseFloat(value)
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
        if (options.amount_fields && options.amount_fields.includes(key)) {
              return parseFloat(value)
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
        let colId;
        
        if (dataType === 'number') {
          filter = 'agNumberColumnFilter';
          if (options.amount_fields && options.amount_fields.includes(key)) {
            valueFormatter = function (params) {
              if (params.value != null) {
                return Number(params.value).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
              }
              return '-';
            };
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
          valueGetter = createCombinedValueGetter(key, options.data_changes, options.data_binded_changes);
          filterValueGetter = createCombinedFilterValueGetter(key, options.data_changes, options.data_binded_changes);
          tooltipValueGetter = createCombinedTooltipValueGetter(key, options.data_changes, options.data_binded_changes);

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
        
        function evaluateCondition(left, operator, right) {
          switch (operator) {
            case '===':
              return left.toString() === right.toString();
            case '==':
              return left.toString() == right.toString();
            case '!=':
              return left.toString() != right.toString();
            case '>':
              return left.toNumber() > right.toNumber();
            case '<':
              return left.toNumber() < right.toNumber();
            case '>=':
              return left.toNumber() >= right.toNumber();
            case '<=':
              return left.toNumber() <= right.toNumber();
            default:
              return false;
          }
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
                return { color: customColor, fontStyle: font };
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
        if (key =='status' && options.row_status_event) {
          cellRenderer = 'checkboxCellRenderer';
          colId = 'statusColumn';
          filter = null;
        }
        else if (options.hide_filters && options.hide_filters.includes(key)) {
          filter = null;
        }
        else {
          cellRenderer = undefined;
          colId = undefined;
        }
        if (options.hide_sort && options.hide_sort.includes(key)) {
          sortable = false;
        }
        else {
          sortable = true;
        }
        if (options.hide_id_field && key == 'id') {
          hide = true;
        }
        else if (options.hide_fields && options.hide_fields.includes(key)) {
          hide = true;
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
    }
    window.onRowClicked = (event) => {
      const rowData = event.data;
      this.set('data', rowData);
      this.set('id', rowData.id);
      this.dispatchEvent('row_clicked')
    }
    let checkboxColumn;
    if (options.row_checkbox_event) {
        checkboxColumn = {
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: false,
          headerName: '',
          colId: 'checkboxColumn',
          field: 'id', 
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
        cellRenderer: actionsRenderer,
        pinned: options.pin_actions,
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
        });
      }
    
      columnDefs.push(actionsColumn);
    }
    if (options.locale_text == 'HE') {
      localeText = AG_GRID_LOCALE_HE
    }
    const gridOptions = {
      columnDefs: columnDefs,
      localeText: localeText,
      enableRtl: options.enable_rtl,
      noRowsOverlayComponent: '<div>No Records Found.</div>',
      onRowClicked: enableRowClickEvent ? onRowClicked : undefined,
      onCellClicked: enableCellClickEvent ? onCellClicked : undefined,
      rowStyle: enableRowClickEvent || enableCellClickEvent ? { cursor: 'pointer' } : undefined,
      defaultColDef: {
        flex: 1,
        minWidth: this.props.min_width,
        resizable: this.props.resizable,
        filter: this.props.filter,
        sortable: this.props.sortable,
        floatingFilter: this.props.floating_filter
      },
      domLayout: this.props.dom_layout,
      enableCellTextSelection: true,
      rowSelection: this.props.row_selection,
      suppressRowDeselection: this.props.suppress_row_deselection,
      pagination: this.props.pagination,
      paginationPageSize: this.props.pagination_page_size,
      rowHeight: this.props.row_height,
      headerHeight: this.props.header_height,
      suppressRowClickSelection: this.props.suppress_row_click_selection,
      suppressMenuHide: this.props.suppress_menu_hide,
      suppressMovableColumns: this.props.suppress_movable_columns,
      enableCellExpressions: this.props.enable_cell_expressions,
      animateRows: this.props.animate_rows,
      suppressAggFuncInHeader: this.props.suppress_agg_func_in_header,
      suppressAggAtRootLevel: this.props.suppress_agg_at_root_level,
      suppressClipboardPaste: this.props.suppress_clipboard_paste,
      suppressScrollOnNewData: this.props.suppress_scroll_on_new_data,
      suppressPropertyNamesCheck: this.props.suppress_property_names_check,
      suppressRowDeselection: this.props.suppress_row_deselection,
      columnHoverHighlight: this.props.column_hover_highlight,
      components: {
        clickCellRenderer: clickCellRenderer,
        checkboxCellRenderer: checkboxCellRenderer,
        actionsRenderer: actionsRenderer
      }
    };
    const gridDiv = document.getElementById(options.id+'-grid');
    

    if (!gridDiv) {
      console.error(`Grid container element with ID '${options.id}' not found.`);
      return;
    }

    if (gridInstance) {
        gridInstance.destroy();
        gridInstance = null;
    }
    const gridConfig = {
      columnDefs: columnDefs,
      rowData: rowData,
      ...gridOptions
    };
    // Create ag-Grid instance
    gridInstance = new agGrid.Grid(gridDiv, gridConfig);
    const gridElement = document.getElementById(options.id+'-grid');
    const gridContainer = gridElement.parentNode;
    // Add an event listener to the grid
    if (options.row_checkbox_event) {
      gridConfig.api.addEventListener('rowSelected', (event) => {
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
    if (options.fixed_header) {
      window.addEventListener('scroll', function () {
        const header = document.querySelector('.ag-header');
        const topbar = document.querySelector('.' + options.topbar_class);
        const topbarHeight = (topbar ? topbar.getBoundingClientRect().height : 0) + options.fixed_top_offset;
        const headerPos = (topbar ? topbar.getBoundingClientRect().bottom : 0) + options.fixed_header_offset;
        if (window.pageYOffset > headerPos) {
          header.style.position = 'fixed';
          header.style.top = `${topbarHeight}px`;
          header.style.zIndex = '1';
          document.body.style.marginBottom = `${header.offsetHeight}px`; // Add margin to the bottom of the page
        } else {
          header.style.position = 'static';
          document.body.style.marginBottom = '0'; // Reset the margin
        }
      });
    }
    const gridId = `${options.id}-grid`;
    const agGridElement = document.getElementById(gridId);
    function updateHoveringBarStyles() {
      const existingStyle = document.getElementById('hovering-bar-style');
      if (options.fixed_horizontal_scroll) {
        // Create a new style element
        const styleElement = document.createElement('style');
        styleElement.id = 'hovering-bar-style';
        const barWidthPercentage = options.fixed_horizontal_scroll_width;
        const barWidth = `calc(${barWidthPercentage}vw - 10px)`; 
        // Add the styles for the hovering horizontal bottom bar
        styleElement.innerHTML = `
          .ag-body-horizontal-scroll {
            width: ${barWidth};
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
    window.addEventListener('resize', updateHoveringBarStyles);

    // Create the export button
    if (exportToCSV) {
      const existingExportButton = document.getElementById('exportButton');
      // If it already exists, just exit the function
      if (existingExportButton) {
        return;
      }
      const exportButton = document.createElement('button');
      exportButton.id = 'exportButton'; 

        // Add the icon
      const icon = document.createElement('i');
      icon.classList.add('fas', 'fa-file-csv'); // Use the Font Awesome icon class here
      exportButton.appendChild(icon);

      // Add the button text
      const buttonText = document.createElement('span');
      buttonText.innerText = ' Export to CSV';
      exportButton.appendChild(buttonText);
      // Add some fancy styles to the button
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
        const excludedColumnIds = ['checkboxColumn', 'actionsColumn']; 
        // Extracting fields and colIds from columnDefs
        const fieldsAndColIds = gridConfig.columnDefs.map((column) => ({
          field: column.field,
          colId: column.colId,
        }));
        // Filtering out fields based on excludedColumnIds
        const fieldsToExport = fieldsAndColIds.filter(
          (column) => !excludedColumnIds.includes(column.colId)
        ).map((column) => column.field);
        const params = {
          fileName: 'export.csv', // Set the desired file name here
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
        gridConfig.api.exportDataAsCsv(params);
      });
      
      // Append the export button to the grid container
      gridContainer.parentNode.insertBefore(exportButton, gridContainer);
      exportButton.style.marginBottom = '10px';
    }
    return gridInstance;
    
  },

  events: {
    row_clicked: Event,
    cell_clicked: Event,
    row_checkbox_checked: Event,
    row_checkbox_unchecked: Event,
    row_status_enabled: Event,
    row_status_disabled: Event,
    row_action_edit: Event,
    row_action_view: Event,
    row_action_delete: Event
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
  },
});