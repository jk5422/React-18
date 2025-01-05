import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, ClientSideRowModelModule, TextEditorModule, TooltipModule, NumberEditorModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Alpine theme CSS

// Register the necessary AG Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule, TextEditorModule, TooltipModule, NumberEditorModule]);

const App = () => {
  const [rowData, setRowData] = useState([
    { name: 'John', age: 25, percentage: 90 },
    { name: 'Doe', age: 22, percentage: 85 },
  ]);

  // Column Definitions
  const columnDefs = [
    { field: 'name', tooltipField: 'name', editable: true },
    {
      field: 'age', tooltipField: 'age', editable: true,
      tooltipValueGetter: (params) => {
        // Dynamically show error message based on input value
        if (params.value < 18) {
          return 'Not eligible'; // Show "Not eligible" if age is less than 18
        }
        if (!params.value) {
          return 'Field is required'; // Show "Field is required" if the cell is blank
        }
        return null; // No tooltip if no issues
      },
      cellEditorParams: {
        // Use a custom validator for real-time validation during typing
        validator: (params) => {
          if (params.newValue < 0) {
            return {
              valid: false,
              errorMessage: 'Age cannot be negative', // Show real-time error message
            };
          }
          if (params.newValue === '') {
            return {
              valid: false,
              errorMessage: 'Field is required', // Show error if the field is empty
            };
          }
          return { valid: true }; // Allow valid values
        },
      },
    },
    { field: 'percentage', tooltipField: 'percentage', editable: true },
  ];

  // Handle cell value change
  const onCellValueChanged = (params) => {
    console.log('Cell value changed:', params.data);
  };

  return (
    <div
      className="ag-theme-quartz"
      style={{ height: 400, width: 600 }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          flex: 1,
          resizable: true,
          editable: true, // Allow editing by default
          tooltipShowDelay: 0, // Show tooltip immediately
          tooltipHideDelay: 2000, // Hide after 2 seconds
        }}
        onCellValueChanged={onCellValueChanged} // Log updated data
      />
    </div>
  );
};

export default App;
