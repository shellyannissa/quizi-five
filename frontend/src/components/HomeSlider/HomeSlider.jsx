
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
      <div className="home-group">
        <div className={`home-rectangle ${property}`} />
        <div className="home-left">Registered</div>
        <div className="home-right">Available</div>
      </div>
    </div>
  );
};

