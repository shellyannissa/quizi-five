import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";
import "./TextInputBar.css";

export const TextInputBar = ({ defautlValue = '', id, placeholder, inputType, iconPath, lebel }) => {
    const [value, setValue] = useState(defautlValue);
    return (
        <div className="text-input-bar">
            <div className="overlap-group">
                {lebel && <label className="label" htmlFor={id}>{lebel}</label> }
                {iconPath && <img className="icon" alt="User" src={iconPath} />}
                <input id={id} value={value} placeholder={placeholder} type={inputType} onChange={(e) => setValue(e.target.value)} />
            </div>
        </div>
    );
};

TextInputBar.propTypes = {
    inputType: PropTypes.string,
    placeholder: PropTypes.string,
    iconPath: PropTypes.string,
    lebel: PropTypes.string,
    id: PropTypes.string,
    defautlValue: PropTypes.string,
};
