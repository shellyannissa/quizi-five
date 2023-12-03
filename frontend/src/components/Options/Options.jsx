import React from "react";
import { useState } from "react";
import "./Options.css";

// function Options() {
export const Options = ({ options, timerComplete }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // 👇️ toggle
    setIsActive((current) => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };

  const optionId = ["A", "B", "C", "D", "E", "F", "G"];

  const [clickedOption, setClickedOption] = useState(0);
  const clickHandler = (i) => {
    setClickedOption(i + 1);
  };

  return (
    <div className="option-container">
      {options.map((option, i) => {
        return (
          <div
            className={`answer ${
              clickedOption == i + 1 && timerComplete == false
                ? "checked"
                : null
              // timerComplete == true ? "checked" : null
            }`}
            key={i}
            onClick={() => {
              setClickedOption(i + 1);
              clickedOption(i);
            }}
          >
            <div className="answer-letter">{optionId[i]}</div>
            <div className="answer-text">{option}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Options;
