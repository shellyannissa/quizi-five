import PropTypes from "prop-types";
import React from "react";
import "./Button.css";

export const Button = ({ text = "SUBMIT", clickHandler}) => {
  return (
    <button className="button" onClick={clickHandler}>
      <div className="submit" >{text}</div>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
};
