import React from "react";
import "./Date.css";

export const Date = ( { month, day}) => {
  return (
    <div className="date">
      <div className="overlap">
        <div className="frame-2">
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <div className="text-wrapper-4">{month}</div>
            </div>
          </div>
          <div className="text-wrapper-5">{day}</div>
        </div>
      </div>
    </div>
  );
};
