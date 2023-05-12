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
    filter: true,
    floatingFilter: true,
    columnHoverHighlight: true
  },
  
  attributes: {
    id: { default: null },
    rowData: { type: Array,  default: [] },
    column_defs: { type: Array,  default: [] },
    data: { type: Array, default: [] },
    domLayout: { default: 'autoHeight' },
    enableCellTextSelection: { type: Boolean, default: true },
    rowSelection: { type: Boolean, default: false },
    suppressRowDeselection: { type: Boolean, default: false },
    pagination: { type: Boolean, default: false },
    paginationPageSize: { default: 10 },
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
    resizable: { type: Boolean, default: true },
    filter: { type: Boolean, default: true },
    floatingFilter: {  type: Boolean, default: true },
    columnHoverHighlight: { type: Boolean, default: true }
  },

  methods: {
    setData: function(rowData, columnDefs) {
      this.set('rowData', rowData);
      this.set('columnDefs', columnDefs);
      this.refreshGrid();
    }
  },

  refreshGrid: function() {
    console.log(this.props)
    const gridId = this.props.id;
    const rowData = this.props.data;
    let columnDefs = null;
    if (!rowData || rowData.length === 0) {
      console.error('No row data provided.');
      return;
    }
    if (Array.isArray(this.props.column_defs) && this.props.column_defs.length > 0) {
      columnDefs = this.props.column_defs;
    } else {
      const firstRow = rowData[0];
      columnDefs = Object.keys(firstRow).map(key => {
        return { headerName: key, field: key};
      });
    }
    const gridOptions = {
      columnDefs: columnDefs,
      defaultColDef: {
        flex: 1,
        minWidth: this.props.minWidth,
        resizable: this.props.resizable,
        filter: this.props.resizable,
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
  
    const gridDiv = document.querySelector(`#${gridId.replace('-grid','')}`);
  
    if (!gridDiv) {
      console.error(`Grid container element with ID '${gridId.replace('-grid','')}' not found.`);
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
gridReady = true;
  },

  events: {
    'dmx-ag-grid-row-data-updated': Event
  },

  render: function() {
    this.refreshGrid();
  },

  update: function(props) {
    // dmx.equal is a helper function the does a deep compare
    // which is useful when comparing arrays and objects
    if (!dmx.equal(this.props.data, props.data)) {
      this.refreshGrid();
    }
  },
});