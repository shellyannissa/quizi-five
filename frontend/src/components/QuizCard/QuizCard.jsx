import React from "react";
import { Button } from "../Button/Button";
import { Date } from "../Date/Date";
import "./QuizCard.css";

export const QuizCard = ({ quizType, quizName, image, month, day, time }) => {
  return (
    <div className="quiz-card">
      <div className="quiz-poster">
        <img alt="Rectangle" src={image} />
      </div>
      <div className="details">
        <div className="main-details">
          <div className="data">
            <div className="quiz-type">{quizType}</div>
            <div className="quiz-name">{quizName}</div>
          </div>
          <Date month={month} day={day}/>
        </div>
        <div className="timer">
          <div className="time">{time}</div>
          <Button text="Register" clickHandler={() => console.log("Register for quiz Clicked")}/>
        </div>
      </div>
    </div>
  );
};
