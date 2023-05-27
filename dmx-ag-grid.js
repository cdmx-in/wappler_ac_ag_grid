dmx.Component('ag-grid', {
  initialData: {
    id: null,
    rowData: [],
    column_defs: [],
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
    fixedTopOffset: 80
  },

  attributes: {
    id: { default: null },
    rowData: { type: Array, default: [] },
    column_defs: { type: Array, default: [] },
    data: { type: Array, default: [] },
    domLayout: { default: 'autoHeight' },
    enableCellTextSelection: { type: Boolean, default: true },
    rowSelection: { type: Boolean, default: false },
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
    fixedTopOffset: { type: Number, default: 80 }
  },

  methods: {
    setData: function (rowData, columnDefs) {
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
    const fixedTopOffset = this.props.fixedTopOffset
    let columnDefs = null;
    let exportToCSV = this.props.exportToCSV;
    if (!rowData || rowData.length === 0) {
      console.error('No row data provided.');
      return;
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
            timeZone: 'UTC'
          };
          return date.toLocaleString('en-GB', options).toUpperCase();
        } else {
          const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          };
          return date.toLocaleString('en-GB', options).toUpperCase();
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
          valueFormatter = (params) => formatTime(params, false);
        } else {
          filter = 'agTextColumnFilter';
          valueFormatter = blankOrNullValueFormatter;
        }
        return { headerName: humanize(key), field: key, filter: filter, valueFormatter: valueFormatter };
      });
    }
    const gridOptions = {
      columnDefs: columnDefs,
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
      localeText: this.props.localeText
    };

    const gridDiv = document.querySelector('.ag-theme-alpine');

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
    const gridElement = document.querySelector('.ag-theme-alpine');
    const gridContainer = gridElement.parentNode;

    if (!gridContainer) {
      console.error('Grid container not found.');
      return;
    }
    if (fixedHeader) {
    window.addEventListener('scroll', function() {
      const header = document.querySelector('.ag-header');
      const topbar = document.querySelector('.'+topbarClass);
      const topbarHeight = (topbar ? topbar.getBoundingClientRect().height: 0) + fixedTopOffset;
      const headerPos = (topbar ? topbar.getBoundingClientRect().bottom: 0) + fixedHeaderOffset;

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
    'dmx-ag-grid-row-data-updated': Event
  },

  render: function () {
    // this.refreshGrid();
  },

  update: function (props) {
    // dmx.equal is a helper function the does a deep compare
    // which is useful when comparing arrays and objects
    if (!dmx.equal(this.props.data, props.data)) {
      this.refreshGrid();
    }
  },
});