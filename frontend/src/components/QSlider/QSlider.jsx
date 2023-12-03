import React from "react";
import { useState } from "react";
import Options from "../Options/Options";

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { Timer } from "../Timer/Timer";

import "./QSlider.css";

export const QSlider = ({ question, time }) => {
  const [timerComplete, setTimerComplete] = useState(false);

  const handleTimerComplete = () => {
    setTimerComplete(true);
    console.log(timerComplete);
  };

  return (
    <div className="app_container">
      <div className="timer">
        <Timer time={question.time} onTimerComplete={handleTimerComplete} />
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
