import React from "react";
import "./Options.css";
import { QuizData } from "../Data/QuizData";
import { useState } from "react";

// function Options() {
export const Options = (props) => {
  //   const [isActive, setIsActive] = useState(false);

  //   const handleClick = () => {
  //     // 👇️ toggle
  //     setIsActive((current) => !current);

  //     // 👇️ or set to true
  //     // setIsActive(true);
  //   };

  const optionId = ["A", "B", "C", "D", "E"];
  let test = props.qno;

  const [clickedOption, setClickedOption] = useState(0);
  const clickHandler = (i) => {
    setClickedOption(i + 1);
  };

  return (
    <div>
      {/* <p className="heading-text">QUESTION TEST</p> */}
      <div className="container">
        <div className="question">
          {/* <span id="question-number">3. </span> */}
          <span id="question-txt">{QuizData[2].question}</span>
        </div>

        {/*use one of option-container or answers*/}
        <div className="option-container">
          {QuizData[2].options.map((option, i) => {
            return (
              <div
                className={`answer ${
                  clickedOption == i + 1 && props.timerComplete == false ? "checked" : null
                  // props.timerComplete == true ? "checked" : null
                }`}
                key={i}
                onClick={() => {
                  setClickedOption(i + 1);
                  props.clickedOption(i);
                }}
              >
                <div className="answer-letter">{optionId[i]}</div>
                <div className="answer-text">{option}</div>
              </div>
            );
          })}
        </div>

        {/* <input type="button" value="next" id="next-button" /> */}
      </div>
    </div>
  );
};

export default Options;
