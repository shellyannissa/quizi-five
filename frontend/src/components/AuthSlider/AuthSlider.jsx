import React from "react";
import "./AuthSlider.css";

export const AuthSlider = ({ property, updateState }) => {

  return (
    <div
      className={`auth-slider`}
      onClick={() => {
        updateState();
      }}
    >
      <div className="group">
        <div className={`rectangle ${property}`} />
        <div className="left">LOGIN</div>
        <div className="right">SIGNUP</div>
      </div>
    </div>
  );
};
