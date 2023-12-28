
import React from "react";
import "./CustomInput.css";

export const CustomInput = ({ design, type, name, placeholder, value, disabled, functionBlur, functionProp }) => {

    return (
        <input
            disabled={disabled}
            className={design}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value||undefined}
            onChange={(e)=>functionProp(e)}
            onBlur={(e)=>functionBlur(e)}
        />
    )
}