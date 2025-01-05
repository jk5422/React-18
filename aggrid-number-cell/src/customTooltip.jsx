import React from "react";

const CustomTooltip = (props) => {
    const { value } = props;
    console.log(value, "value in customTooltip")
    // Check if the value is invalid (assuming you are doing validation here)
    let isInvalid = value === null || value === undefined || value < 0;

    // Set styles based on whether the value is valid or not
    const tooltipStyle = {
        color: "red", // Red color for error
        backgroundColor: "white",           // White background
        border: "1px solid black", // Red border for errors
        padding: "5px 10px",
        fontSize: "12px",
        borderRadius: "4px",
        zIndex: 1000,
    };

    return (
        <div style={tooltipStyle}>
            {value} {/* Display error message or value */}
        </div>
    );
};

export default CustomTooltip;
