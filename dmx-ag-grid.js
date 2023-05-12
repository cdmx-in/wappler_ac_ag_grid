dmx.Component('ag-grid', {
    initialData: {
      id: null,
      rowData: [],
      columnDefs: [],
      gridOptions: {},
      gridInstance: null
    },
  
    attributes: {
      id: {
        default: null
      },
      rowData: {
        default: []
      },
      columnDefs: {
        default: []
      },
      gridOptions: {
        default: {}
      }
    },
  
    methods: {
      setData: function(rowData, columnDefs) {
        this.set('rowData', rowData);
        this.set('columnDefs', columnDefs);
        this.refreshGrid();
      }
    },
  
      refreshGrid: function() {
        const gridId = this.data.id;
        const rowData = this.data.rowData;
        const columnDefs = this.data.columnDefs;
        const gridOptions = this.data.gridOptions;
        console.log(this.data)
        const gridDiv = document.querySelector(`#${gridId}`);
  
        if (this.data.gridInstance) {
          this.data.gridInstance.destroy(); // Destroy the previous grid instance if exists
        }
  
        const gridConfig = {
          columnDefs: columnDefs,
          rowData: rowData,
          ...gridOptions
        };
  
        this.data.gridInstance = new agGrid.Grid(gridDiv, gridConfig);
        this.dispatchEvent('dmx-ag-grid-row-data-updated'); // Trigger row data updated event
      },
  
    events: {
      'dmx-ag-grid-row-data-updated': Event
    },
  
    render: function() {
      this.refreshGrid();
    },
  
    update: function(props, fields) {
      if (fields.has('rowData') || fields.has('columnDefs')) {
        this.refreshGrid();
      }
    }
  });