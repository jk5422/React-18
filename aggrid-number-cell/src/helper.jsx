// Helper function to fix precision
const fixPrecision = (value, precision = 3) => {
    return parseFloat(value).toFixed(precision);
};

// Centralized valueParser
const centralizedValueParser = (params) => {
    return fixPrecision(params.newValue); // Ensures the new value has 3 decimal places
};

// Centralized valueSetter
const centralizedValueSetter = (params) => {
    const fixedValue = fixPrecision(params.newValue); // Fix precision before setting
    params.data[params.colDef.field] = fixedValue;  // Update the row data with the fixed value
    return true;
};
// --------------------------------------------------------------------------------

const columnDefs = [
    { field: "name", headerName: "Name", editable: true },
    {
        field: "weight",
        headerName: "Weight",
        editable: true,
        cellEditor: "agNumberCellEditor",  // Use built-in number editor
        valueFormatter: (params) => `${parseFloat(params.value).toFixed(3)} kg`,  // Display value with 3 decimal places
        valueParser: centralizedValueParser, // Apply centralized value parser
        valueSetter: centralizedValueSetter, // Apply centralized value setter
    },
    // You can apply the same logic to other columns
    {
        field: "height",
        headerName: "Height",
        editable: true,
        valueFormatter: (params) => `${parseFloat(params.value).toFixed(3)} cm`, // Display value with 3 decimal places
        valueParser: centralizedValueParser, // Apply centralized value parser
        valueSetter: centralizedValueSetter, // Apply centralized value setter
    },
    // Add other columns similarly
];
