import React from "react";
import "./QuestionEditor.css";
import { Button } from "../Button/Button";
import {
  activateQuestion,
  questionStats,
  evaluate,
  getLeaderBoard,
  extendPoints,
} from "../../../../backend/controllers/firebaseController";

const QuestionEditor = ({ question, qno, callBack }) => {
  const triggerHandler = () => {};
  return (
    <div className="box">
      <div className="qno">
        <h4>Q{qno}</h4>
      </div>
      <div className="qname">
        <h4>{question.description}</h4>
      </div>
      <div className="btn-group">
        <Button
          text="STAT"
          clickHandler={() => {
            extendPoints(question.quizId).then((res) => {
              console.log(res);
            });
          }}
        />
        <Button
          text="ACTIVATE"
          clickHandler={() => {
            activateQuestion(question.qnId);
          }}
        />
      </div>
    </div>
  );
};

export default QuestionEditor;
