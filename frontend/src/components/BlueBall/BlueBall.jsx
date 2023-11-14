import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./BlueBall.css";

export const BlueBall = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`blue-ball property-1-${state.property1} ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      {state.property1 === "variant-3" && <div className="ellipse" />}
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "click":
      return {
        ...state,
        property1: "variant-3",
      };
  }

  return state;
}

BlueBall.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "variant-3", "default"]),
};
