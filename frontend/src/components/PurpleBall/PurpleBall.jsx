
import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./PurpleBall.css";

export const PurpleBall = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`purple-ball ${state.property1} ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    />
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

PurpleBall.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "variant-3", "default"]),
};
