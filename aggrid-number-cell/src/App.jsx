import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import customTooltip from "./customTooltip";


// Helper function to fix precision
const fixPrecision = (value, precision = 3) => {
  return parseFloat(value).toFixed(precision);
};

// Centralized valueParser for precision handling
const centralizedValueParser = (params) => {
  return fixPrecision(params.newValue);
};

// Centralized valueSetter for precision handling and validation
const centralizedValueSetter = (params) => {
  const value = parseFloat(params.newValue);
  // Prevent negative values
  // if (value < 0) {
  //   return false; // Returning false prevents the value from being set
  // }

  // Apply the fixed precision if the value is valid
  const fixedValue = fixPrecision(value);
  params.data[params.colDef.field] = fixedValue;
  return true; // Allow the new value to be set
};


// Validation function for the weight column
const validateWeight = (value) => {
  if (value === "" || value === null || value === undefined) {
    return { valid: false, message: "Field is required" };
  }
  if (value < 0) {
    return { valid: false, message: "Value cannot be less than 0" };
  }
  return { valid: true, message: "" };
};

const App = () => {
  const [rowData, setRowData] = useState([
    { name: "Apple", weight: 10.123 },
    { name: "Banana", weight: 5.456 },
    { name: "Cherry", weight: 3.789 }
  ]);

  const columnDefs = [
    { field: "name", headerName: "Name", editable: true },
    {
      field: "weight",
      headerName: "Weight",
      editable: true,
      cellEditor: "agNumberCellEditor",
      valueFormatter: (params) => `${parseFloat(params.value).toFixed(3)} kg`,
      valueParser: centralizedValueParser,
      valueSetter: centralizedValueSetter,
      // Apply cellClassRules to highlight invalid cells with red border
      cellClassRules: {
        "invalid-cell": (params) => {
          const validation = validateWeight(params.newValue);
          return !validation.valid; // Apply red border if invalid
        }
      },

      tooltipComponent: customTooltip,
      // Remove tooltipField, use tooltipValueGetter for custom tooltip content
      tooltipValueGetter: (params) => {
        console.log("tooltipValueGetter", params);
        const validation = validateWeight(params.value);
        // Show error message in tooltip if invalid, otherwise null (no tooltip)
        if (!validation.valid) {
          return validation.message;
        }
        return null; // No tooltip if value is valid
      }
    }

  ];



  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          flex: 1,
          resizable: true,
          editable: true,
        }}
        tooltipShowDelay={0}
        tooltipHideDelay={2000}
        tooltipTrigger="focus"
      />
    </div>
  );
};

export default App;
