import PropTypes from "prop-types";
import React from "react";
import "./AuthSlider.css";

export const AuthSlider = ({ property1, className, onClick }) => {
  return (
    <div className={`auth-slider ${className}`} onClick={onClick}>
      <div className="group">
        <div className={`rectangle property-1-0-${property1}`} />
      </div>
      <div className="text-wrapper">LOGIN</div>
      <div className="div">SIGNUP</div>
    </div>
  );
};

AuthSlider.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};
