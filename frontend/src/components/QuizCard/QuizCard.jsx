import React from "react";
import { Button } from "../Button/Button";
import { Date } from "../Date/Date";
import QuizForm from "../QuizForm/QuizForm";
import { useNavigate } from "react-router-dom";
import "./QuizCard.css";

export const QuizCard = ({ quizId, quizType, quizName, image, month, day, time, buttonContent, clickHandler }) => {
  // for quiz edit button in admin page
  const [trigger, setTrigger] = React.useState(false);

  const triggerHandler = () => {
    setTrigger(false);
  }

  const navigate = useNavigate();

  const routeToQuizPage = () => {
    navigate(`/quizpage/${quizId}`);
  }
  
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
        <div className="timing">
          <div className="time">{time}</div>
          {buttonContent && <Button text={buttonContent} clickHandler={clickHandler ? clickHandler : () => {setTrigger(true)}}/>}
        </div>
      </div>
      {buttonContent==="Edit" && <QuizForm heading="Edit quiz details" trigger={trigger} triggerHandler={triggerHandler} image={image} quizName={quizName} quizType={quizType} quizDate={month} quizTime={time}/> }
    </div>
  );
};