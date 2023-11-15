
import React from "react";
import "./HomeSlider.css";

export const HomeSlider = ({ property, updateState}) => {
  return (
    <div
      className= "home-slider"
      onClick={() => {
        updateState();
      }}
    >
      <div className="group">
        <div className={`rectangle ${property}`} />
        <div className="left">Registered</div>
        <div className="right">Available</div>
      </div>
    </div>
  );
};

