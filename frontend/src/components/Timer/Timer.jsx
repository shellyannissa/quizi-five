import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Timer.css";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Time's Up!!</div>;
  }

  return (
    <div className="timer">
      {/* <div className="text">Remaining</div> */}
      <div className="value">{remainingTime}</div>
      {/* <div className="text">seconds</div> */}
    </div>
  );
};

export const Timer = (props) => {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={props.time}
      colors={["#00FF00", "#FF6600", "#990000"]}
      colorsTime={[5, 2.5, 0]}
      size={100}
      // onComplete={() => [true, 1000]}

      onComplete={() => {
        // do your stuff here
        props.onTimerComplete();
        console.log(props.time);
        // return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
      }}
    >
      {renderTime}
      {/* {({ remainingTime }) => remainingTime} */}
    </CountdownCircleTimer>
  );
};
