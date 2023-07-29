dmx.Component('ag-grid', {
  initialData: {
    id: null,
    data: {},
    fields: {},
    column_defs: [],
    cstyles: null,
    cnames: null,
    cwidths: null,
    data_changes: null,
    gridInstance: null,
    domLayout: 'autoHeight',
    enableCellTextSelection: true,
    rowSelection: null,
    suppressRowDeselection: null,
    pagination: null,
    paginationPageSize: null,
    rowHeight: null,
    headerHeight: null,
    suppressRowClickSelection: null,
    suppressMenuHide: null,
    suppressMovableColumns: null,
    enableCellExpressions: null,
    animateRows: null,
    suppressAggFuncInHeader: null,
    suppressAggAtRootLevel: null,
    suppressClipboardPaste: null,
    suppressScrollOnNewData: null,
    suppressPropertyNamesCheck: null,
    localeText: null,
    minWidth: 150,
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    columnHoverHighlight: true,
    exportToCSV: true,
    fixedHeader: false,
    topbarClass: null,
    fixedHeaderOffset: 100,
    fixedTopOffset: 80,
    fixedHorizonatalScroll: false,
    timezone: null
  },

  attributes: {
    id: { default: null },
    rowData: { type: Array, default: [] },
    grid_theme: { type: String, default: 'ag-theme-alpine' },
    column_defs: { type: Array, default: [] },
    cstyles: { type: Object, default: {} },
    cnames: { type: Object, default: {} },
    cwidths: { type: Object, default: {} },
    data_changes: { type: Object, default: {} },
    data: { type: Array, default: [] },
    domLayout: { default: 'autoHeight' },
    enableCellTextSelection: { type: Boolean, default: true },
    rowSelection: { type: String, default: 'single' },
    suppressRowDeselection: { type: Boolean, default: false },
    pagination: { type: Boolean, default: true },
    paginationPageSize: { default: 20 },
    rowHeight: { type: Number, default: null },
    headerHeight: { type: Number, default: null },
    suppressRowClickSelection: { type: Boolean, default: false },
    suppressMenuHide: { type: Boolean, default: false },
    suppressMovableColumns: { type: Boolean, default: false },
    enableCellExpressions: { type: Boolean, default: false },
    animateRows: { type: Boolean, default: false },
    suppressAggFuncInHeader: { type: Boolean, default: false },
    suppressAggAtRootLevel: { type: Boolean, default: false },
    suppressClipboardPaste: { type: Boolean, default: false },
    suppressScrollOnNewData: { type: Boolean, default: false },
    suppressPropertyNamesCheck: { type: Boolean, default: false },
    localeText: { default: null }, 
    minWidth: { type: Number, default: 150 },
    sortable: { type: Boolean, default: true },
    resizable: { type: Boolean, default: true },
    filter: { type: Boolean, default: true },
    floatingFilter: { type: Boolean, default: true },
    columnHoverHighlight: { type: Boolean, default: true },
    exportToCSV: { type: Boolean, default: true },
    fixedHeader: { type: Boolean, default: false },
    topbarClass: { type: Text, default: 'topbar' },
    fixedHeaderOffset: { type: Number, default: 100 },
    fixedTopOffset: { type: Number, default: 80 },
    fixedHorizonatalScroll: { type: Boolean, default: false },
    timezone: {type: Text, default: '' },
    cell_click_event: {type: Boolean, default: false },
    row_click_event: {type: Boolean, default: false },
    row_checkbox_event: {type: Boolean, default: false },
    row_status_event: {type: Boolean, default: false }
    
  },

  methods: {
    setValue: function (rowData, columnDefs) {
      this.set('rowData', rowData);
      this.set('columnDefs', columnDefs);
      this.refreshGrid();
    }
  },

  refreshGrid: function () {
    const gridId = this.props.id;
    const rowData = this.props.data;
    const fixedHeader = this.props.fixedHeader;
    const fixedHeaderOffset = this.props.fixedHeaderOffset;
    const topbarClass = this.props.topbarClass;
    const fixedTopOffset = this.props.fixedTopOffset;
    const timezone = this.props.timezone || false;
    const dataChanges = this.props.data_changes;
    const grid_theme = this.props.grid_theme;
    const enableCheckboxEvent = this.props.row_checkbox_event;
    const enableStatusToggle = this.props.row_status_event;
    let columnDefs = [];
    let exportToCSV = this.props.exportToCSV;


    this.$node.innerHTML = `<div id=${gridId}-grid class="${grid_theme}"></div>`;
    if (!rowData || rowData.length === 0) {
      console.error('No row data provided.');
      return;
    }
    function formatValue(value, key, dataType, timezone) {
      params = {"value":value}
      if (dataType === 'number') {
        if (/(amount|amt)$/.test(key)) {
          return Number(value).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        } else {
          return blankOrNullValueFormatter(params);
        }
      } else if (dataType === 'date') {
        return formatTime(params, timezone);
      } 
       else {
        return blankOrNullValueFormatter(params);
      }
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
      const dataType = detectDataType([params.value]);
      const value = formatValue(params.value, columnName, dataType, timezone);
      return `<div onclick="cellClickEvent('${columnName}', '${value}', '${idValue}')" style="cursor: pointer;">${value}</div>`;
    }

    function checkboxCellRenderer(params) {
      const idValue = params.data.id;
      const columnName = params.colDef.field;
      const dataType = detectDataType([params.value]);
      const value = formatValue(params.value, columnName, dataType, timezone);
    
      if (columnName == "status" && enableStatusToggle) {
        // Assuming `value` is a boolean representing the status
        const checked = value==true ? "checked" : "";
        return `
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
        `;
      } else {
        return value;
      }
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

      return str.charAt(0).toUpperCase() + str.substr(1);
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

    function formatTime(params, timezone) {
      if (params.value == null) {
        return '-';
      } else {
        const date = new Date(params.value);
        if (timezone) {
          const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: timezone
          };
          return date.toLocaleString('en-IN', options).toUpperCase();
        } else {
          const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          };
          return date.toLocaleString('en-IN', options).toUpperCase();
        }
      }
    }
    // Function to detect the data type based on the values
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
    function getValueGetter(key, dataChanges) {
      return function(params) {
        let value = params.data[key];
        if (dataChanges.hasOwnProperty(key)) {
          const change = dataChanges[key];
          value = change.new_value;
        }
        return value;
      };
    }
    if (Array.isArray(this.props.column_defs) && this.props.column_defs.length > 0) {
      columnDefs = this.props.column_defs;
    } else {
      const firstRow = rowData[0];

      columnDefs = Object.keys(firstRow).map(key => {
        // Assuming rowData is an array of objects
        const values = rowData.map(row => row[key]);
        const nonNullValues = values.filter(value => value !== null);
        const dataType = detectDataType(nonNullValues);
        let filter;
        let valueGetter;
        let filterValueGetter;
        let valueFormatter;


        if (dataType === 'number') {
          filter = 'agNumberColumnFilter';
          if (/(amount|amt)$/.test(key)) {
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
        } else {
          filter = 'agTextColumnFilter';
          valueFormatter = blankOrNullValueFormatter;
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
          valueGetter = getValueGetter(key, dataChanges);
        }
        function extractConditionParts(condition) {
          const parts = condition.match(/(.+?)(===|==|!=|>|<|>=|<=)(.+)/);
          if (parts) {
            const [, left, operator, right] = parts;
            return [left.trim(), operator.trim(), right.trim()];
          }
          return [];
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
            if (cstyles.hasOwnProperty(field)) {
              const condition = cstyles[field].condition;
              const customColor = cstyles[field].customColor;
              const [left, operator, right] = extractConditionParts(condition);
              if (params.data.hasOwnProperty(field) && evaluateCondition(params.data[left], operator, right)) {
                return { color: customColor };
              }
            }
            return null;
          }
        cnames = this.props.cnames
        cwidths = this.props.cwidths
        enableRowClickEvent = this.props.row_click_event;
        enableCellClickEvent = this.props.cell_click_event;
        if (cnames.hasOwnProperty(key)) {
        console.log(key)
        const cname = cnames[key]
        headerName = cname ? cname.custom_name : humanize(key);
        }
        else {
          headerName = humanize(key);
        }
        return {
          headerName: headerName,
          field: key,
          filter: filter,
          valueFormatter: valueFormatter,
          valueGetter: valueGetter,
          filterValueGetter: filterValueGetter,
          cellStyle: applyCellStyle,
          ...(cwidths.hasOwnProperty(key) && {
            minWidth: parseInt(cwidths[key].min_width),
            maxWidth: parseInt(cwidths[key].max_width),
          }),
          cellRenderer: enableCellClickEvent ? 'clickCellRenderer' : (enableStatusToggle ? 'checkboxCellRenderer' : undefined)
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
    if (enableCheckboxEvent) {
        checkboxColumn = {
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: false,
          headerName: '',
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
    
    const gridOptions = {
      columnDefs: columnDefs,
      onRowClicked: enableRowClickEvent ? onRowClicked : undefined,
      rowStyle: enableRowClickEvent ? { cursor: 'pointer' } : undefined,
      defaultColDef: {
        flex: 1,
        minWidth: this.props.minWidth,
        resizable: this.props.resizable,
        filter: this.props.filter,
        sortable: this.props.sortable,
        floatingFilter: this.props.floatingFilter
      },
      domLayout: 'autoHeight',
      enableCellTextSelection: true,
      rowSelection: this.props.rowSelection,
      suppressRowDeselection: this.props.suppressRowDeselection,
      pagination: this.props.pagination,
      paginationPageSize: this.props.paginationPageSize,
      rowHeight: this.props.rowHeight,
      headerHeight: this.props.headerHeight,
      suppressRowClickSelection: this.props.suppressRowClickSelection,
      suppressMenuHide: this.props.suppressMenuHide,
      suppressMovableColumns: this.props.suppressMovableColumns,
      enableCellExpressions: this.props.enableCellExpressions,
      animateRows: this.props.animateRows,
      suppressAggFuncInHeader: this.props.suppressAggFuncInHeader,
      suppressAggAtRootLevel: this.props.suppressAggAtRootLevel,
      suppressClipboardPaste: this.props.suppressClipboardPaste,
      suppressScrollOnNewData: this.props.suppressScrollOnNewData,
      suppressPropertyNamesCheck: this.props.suppressPropertyNamesCheck,
      localeText: this.props.localeText,
      components: {
        clickCellRenderer: clickCellRenderer,
        checkboxCellRenderer: checkboxCellRenderer
      }
    };

    const gridDiv = document.getElementById(gridId+'-grid');
    

    if (!gridDiv) {
      console.error(`Grid container element with ID '${gridId}' not found.`);
      return;
    }

    if (this.props.gridInstance) {
      this.props.gridInstance.destroy(); // Destroy the previous grid instance if it exists
    }
    const gridConfig = {
      columnDefs: columnDefs,
      rowData: rowData,
      ...gridOptions
    };
    // Create ag-Grid instance
    new agGrid.Grid(gridDiv, gridConfig);
    const gridElement = document.getElementById(gridId+'-grid');
    const gridContainer = gridElement.parentNode;
    // Add an event listener to the grid
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
    if (!gridContainer) {
      console.error('Grid container not found.');
      return;
    }
    if (fixedHeader) {
      window.addEventListener('scroll', function () {
        const header = document.querySelector('.ag-header');
        const topbar = document.querySelector('.' + topbarClass);
        const topbarHeight = (topbar ? topbar.getBoundingClientRect().height : 0) + fixedTopOffset;
        const headerPos = (topbar ? topbar.getBoundingClientRect().bottom : 0) + fixedHeaderOffset;

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

    // Create the export button
    if (exportToCSV) {
      const exportButton = document.createElement('button');
      exportButton.innerText = 'Export to CSV';
      exportButton.addEventListener('click', () => {
        const params = {
          fileName: 'export.csv', // Set the desired file name here
          allColumns: true,
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
  },

  events: {
    row_clicked: Event,
    cell_clicked: Event,
    row_checkbox_checked: Event,
    row_checkbox_unchecked: Event,
    row_status_enabled: Event,
    row_status_disabled: Event,
  },

  render: function(node) {
    if (this.$node) {
      this.$parse();
    }
  },

  update: function (props) {
    if (!dmx.equal(this.props.data, props.data)) {
      this.set("id", {
        status: 0,
        message: 'tedt',
        response: null
    })
      this.refreshGrid();
    }
  },
});