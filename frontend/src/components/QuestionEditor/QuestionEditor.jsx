import React from "react";
import "./QuestionEditor.css";
import { Button } from "../Button/Button";

const QuestionEditor = ({ question, qno, callBack }) => {
  const activateHandler = async (questionId) => {
    const body = {
      questionId,
    };
    const response = await fetch("http://localhost:8000/api/ques/activate", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      callBack(questionId);
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  };

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
        <Button text="EDIT" clickHandler={triggerHandler} />
        <Button
          text="ACTIVATE"
          clickHandler={() => {
            activateHandler(question.questionid);
          }}
        />
      </div>
    </div>
  );
};

export default QuestionEditor;
