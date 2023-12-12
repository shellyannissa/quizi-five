import React from "react";
import { useState } from "react";
import Options from "../Options/Options";
import { Timer } from "../Timer/Timer";
import Correct from "../CorrectOrNot/Correct";
import { useUser } from "../../context/UserContext";
import "./QSlider.css";

export const QSlider = ({ quizId, index, question, timerValues }) => {
  const [timerComplete, setTimerComplete] = useState(false);
  const [clickedOption, setClickedOption] = useState(-1);

  const { user } = useUser();

  const submitAnswer = async () => {
    if (clickedOption === -1 || timerComplete || submitted) {
      console.log("cant submit");
    } else {
      await fetch("http://localhost:8000/api/ans/add", {
        method: "POST",
        body: JSON.stringify({
          uid: user._id,
          quizId: quizId,
          questionId: question.questionId,
          optionId: question.options[clickedOption - 1].optionid,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      submitted = true;
      console.log("submitted");
      if (
        question.options[clickedOption - 1].optionid == question.correctOptionId
      ) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
      console.log("correct is " + isCorrect);
    }
  };

  const handleTimerComplete = async () => {
    setTimerComplete(true);
    if (submitted === true) {
      return;
    } else if (clickedOption !== -1) {
      await submitAnswer();
    }
  };

  var submitted = false;
  const [isCorrect, setIsCorrect] = useState(false);
  // const evaluateAnswer = () => {
  //   if (clickedOption == -1 || !submitted) {
  //     return false;
  //   }
  //   if (
  //     question.options[clickedOption - 1].optionid == question.correctOptionId
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <div className="app_container">
      {timerComplete === false ? (
        <div className="question-active">
          <div className="timer">
            {/* <Timer
              timerValues={timerValues}
              index={index}
              onTimerComplete={handleTimerComplete}
            /> */}
          </div>
          <div className="question-sam">
            <span id="question-txt">{question.description}</span>
          </div>
          <div className="options-sam">
            <Options
              // quizId={quizId}
              qnId={question.qnId}
              submitted={submitted}
              options={question.options}
              timerComplete={timerComplete}
              clickedOption={clickedOption}
              setClickedOption={setClickedOption}
              // isCorrect={isCorrect}
              // setIsCorrect={setIsCorrect}
              // correctOptionId={question.correctOptionId}
              handleClick={submitAnswer}
            />
          </div>
        </div>
      ) : (
        timerComplete === true && <Correct correct={isCorrect} />
      )}
    </div>
  );
};
