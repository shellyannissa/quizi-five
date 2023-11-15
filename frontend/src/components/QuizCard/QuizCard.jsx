import React from "react";
import { Button } from "../Button/Button";
import { Date } from "../Date/Date";
import "./QuizCard.css";

export const QuizCard = ({ quizName }) => {
  return (
    <div className="quiz-card">
      <div className="frame-wrapper">
        <div className="frame-3">
          <img className="img" alt="Rectangle" src="https://c.animaapp.com/fWGxq1VK/img/rectangle-1182-3@2x.png" />
          <div className="frame-4">
            <div className="frame-5">
              <div className="frame-6">
                <div className="text-wrapper-6">General Quiz</div>
                <div className="did-you-know-quiz">
                  {quizName}
                </div>
              </div>
              <Date month="DEC" day="25"/>
            </div>
            <div className="frame-7">
              <div className="text-wrapper-7">10 : 00 AM</div>
              <Button text="Register" clickHandler={() => console.log("Register for quiz Clicked")}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
