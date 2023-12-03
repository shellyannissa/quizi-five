import React from "react";
import { useState } from "react";
import Options from "../Options/Options";
import { Timer } from "../Timer/Timer";
import "./QSlider.css";

export const QSlider = ({ index, question, timerValues }) => {
  const [timerComplete, setTimerComplete] = useState(false);
  console.log(timerValues);
  const handleTimerComplete = () => {
    setTimerComplete(true);
    console.log(timerComplete);
  };

  return (
    <div className="app_container">
      <div className="timer">
        <Timer
          timerValues={timerValues}
          index={index}
          onTimerComplete={handleTimerComplete}
        />
      </div>
      <div className="question-sam">
        <span id="question-txt">{question.question}</span>
      </div>
      <div className="options-sam">
        <Options
          options={question.options}
          timerComplete={timerComplete}
          // clickedOption={question.options}
        />
      </div>
    </div>
  );
};
