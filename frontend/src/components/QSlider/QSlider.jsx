import React from "react";
import { useState } from "react";
import Options from "../Options/Options";
import { Timer } from "../Timer/Timer";
import Correct from "../CorrectOrNot/Correct";
import "./QSlider.css";

export const QSlider = ({ index, question, timerValues }) => {
  const [timerComplete, setTimerComplete] = useState(false);
  const [clickedOption, setClickedOption] = useState(-1);

  const handleTimerComplete = () => {
    setTimerComplete(true);
  };

  const evaluateAnswer = () => {
    if (clickedOption == -1) {
      return false;
    }
    if (clickedOption == question.answer) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="app_container">
      {!timerComplete && (
        <div className="question-active">
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
              clickedOption={clickedOption}
              setClickedOption={setClickedOption}
            />
          </div>
        </div>
      )}
      {timerComplete && <Correct correct={evaluateAnswer()} />}
    </div>
  );
};
