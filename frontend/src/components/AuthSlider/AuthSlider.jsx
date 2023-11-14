import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./AuthSlider.css";


export const AuthSlider = ({ property1 }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`auth-slider`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="group">
        <div className={`rectangle ${state.property1}`} />
        <div className="left">LOGIN</div>
        <div className="right">SIGNUP</div>
      </div>
    </div>
  );
};

function reducer(state, action) {
  if (state.property1 === "default") {
    switch (action) {
      case "click":
        return {
          property1: "variant-2",
        };
    }
  }

  if (state.property1 === "variant-2") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  return state;
}

AuthSlider.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};