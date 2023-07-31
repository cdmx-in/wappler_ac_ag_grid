dmx.Component('ag-grid', {
  initialData: {
    id: null,
    data: {},
    fields: {}
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
    hide_id_field: { type: Boolean, default: false },
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
    row_status_event: {type: Boolean, default: false },
    enable_actions: {type: Boolean, default: false },
    pin_actions: {type: String, default: 'right' },
    edit_action_btn: { type: Boolean, default: false },
    edit_action_title: {type: String, default: '' },
    edit_action_tooltip: {type: String, default: 'Edit' },
    view_action_btn: { type: Boolean, default: false },
    view_action_title: {type: String, default: '' },
    view_action_tooltip: {type: String, default: 'View' },
    edit_action_icon_class: {type: String, default: 'fas fa-pencil-alt' },
    edit_action_btn_class: {type: String, default: 'btn-primary btn-xs' },
    view_action_icon_class: {type: String, default: 'fas fa-eye' },
    view_action_btn_class: {type: String, default: 'btn-info btn-xs' },
    
  },

  methods: {
    setValue: function (rowData, columnDefs) {
      this.set('rowData', rowData);
      this.set('columnDefs', columnDefs);
      this.refreshGrid();
    },
    reloadGrid: function () {
      this.refreshGrid()
      console.log('reloadGrid');
    }
  },

  refreshGrid: function () {
    const options = this.props
    const rowData = this.props.data;
    const timezone = this.props.timezone || false;
    const dataChanges = this.props.data_changes;

    let columnDefs = [];
    let exportToCSV = this.props.exportToCSV;
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
        let filterParams;
        let minWidth;
        let hide;


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
        const cname = cnames[key]
        headerName = cname ? cname.custom_name : humanize(key);
        }
        else {
          headerName = humanize(key);
        }
        if (key =='status' && options.row_status_event) {
          cellRenderer = 'checkboxCellRenderer';
          filter = null;
        }
        else {
          cellRenderer = undefined;
        }
        if (options.hide_id_field && key == 'id') {
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
          filterValueGetter: filterValueGetter,
          filterParams: filterParams,
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
        filter: null,
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
    
      columnDefs.push(actionsColumn);
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
      suppressRowDeselection: this.props.suppressRowDeselection,
      columnHoverHighlight: this.props.columnHoverHighlight,
      localeText: this.props.localeText,
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
    if (options.fixedHeader) {
      window.addEventListener('scroll', function () {
        const header = document.querySelector('.ag-header');
        const topbar = document.querySelector('.' + options.topbarClass);
        const topbarHeight = (topbar ? topbar.getBoundingClientRect().height : 0) + options.fixedTopOffset;
        const headerPos = (topbar ? topbar.getBoundingClientRect().bottom : 0) + options.fixedHeaderOffset;

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
    row_action_edit: Event,
    row_action_view: Event
  },

  render: function(node) {
    if (this.$node) {
      this.$parse();
    }
  },

  update: function (props) {
    if (!dmx.equal(this.props.data, props.data)) {
      this.refreshGrid();
    }
  },
});