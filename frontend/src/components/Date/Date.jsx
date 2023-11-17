import React from "react";
import "./Date.css";

export const Date = ( { month, day}) => {
  return (
    <div className="date">
      <div className="month"> {month} </div>
      <div className="month-date">{day}</div>
    </div>
  );
};
