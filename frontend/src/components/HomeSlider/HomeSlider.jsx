
import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./HomeSlider.css";

export const HomeSlider = ({ property1 }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className= "auth-slider"
      onClick={() => {
        dispatch("click_144");
      }}
    >
      <div
        className="group"
        onClick={() => {
          dispatch("click");
        }}
      >
        <div className={`rectangle ${state.property1}`} />
      </div>
      <div className="div">Registered</div>
      <div className="text-wrapper-2">Available</div>
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "click":
      return {
        ...state,
        property1: "variant-2",
      };

    case "click_144":
      return {
        ...state,
        property1: "default",
      };
  }

  return state;
}

HomeSlider.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};
