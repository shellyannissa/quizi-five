import React from "react";
import { useState } from "react";
import Options from "../Options/Options";
import { QuizData } from "../Data/QuizData";

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { Timer } from "../Timer/Timer";

import "./QSlider.css";

export const QSlider = (props) => {

  const [timerComplete, setTimerComplete] = useState(false);

  const handleTimerComplete = () => {
    setTimerComplete(true);
    console.log(timerComplete);
  };


  return (
    // <div className="container">
    //   <Timer time={10}/>
    //   <Options qno={1} />
    // </div>
    <div className="app_container">
      <div className="main">
        <div className="top">
          <div className="timer">
            <Timer time={props.time} onTimerComplete={handleTimerComplete} />
          </div>
        </div>
        <div className="bottom">
          {/* <div className="question">What is the full form of HTTP?</div> */}
          <div className="options">
            <Options timerComplete={timerComplete} clickedOption={props.clickedOption}/>
          </div>
        </div>
      </div>
    </div>
  );
};
