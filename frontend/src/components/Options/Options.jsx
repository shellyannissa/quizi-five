import React from "react";
import { useState } from "react";
import { Button } from "../Button/Button";
import "./Options.css";

export const Options = ({
  options,
  timerComplete,
  clickedOption,
  setClickedOption,
}) => {
  const optionId = ["A", "B", "C", "D", "E", "F", "G"];

  const clickHandler = (i) => {
    if (timerComplete) {
      return;
    } else {
      setClickedOption(i + 1);
    }
  };

  const handleClick = () => {
    if (clickedOption == -1) {
      return;
    } else {
      console.log("submitting answer");
    }
  };

  return (
    <div className="options-component">
      <div className="option-container">
        {options.map((option, i) => {
          return (
            <div
              className={`answer ${clickedOption == i + 1 ? "checked" : null}`}
              key={i}
              onClick={() => clickHandler(i)}
            >
              <div className="answer-letter">{optionId[i]}</div>
              <div className="answer-text">{option.description}</div>
            </div>
          );
        })}
      </div>
      <Button text="Submit" onClick={handleClick} />
    </div>
  );
};

export default Options;
