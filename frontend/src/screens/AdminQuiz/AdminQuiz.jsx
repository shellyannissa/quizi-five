import React, { useEffect, useState } from "react";
import { AdminHero } from "../../components/AdminHero/AdminHero";
import "./AdminQuiz.css";
import { useParams } from "react-router-dom";
import QuestionEditor from "../../components/QuestionEditor/QuestionEditor";

const AdminQuiz = () => {
  const ENDPOINT = "http://localhost:8000";
  const [questions, setQuestions] = useState([]);

  const { quizId } = useParams();
  const [searchTerm, setSearchTerm] = React.useState("");

  const [trigger, setTrigger] = React.useState(false);
  const clickHandler = () => {
    setTrigger(true);
  };
  const triggerHandler = () => {
    setTrigger(false);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const getQuestions = async () => {
    const body = {
      quizId,
    };
    const response = await fetch("http://localhost:8000/api/quiz/getqns", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setQuestions(data);
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="quiz-page">
      <AdminHero
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        isQuestion={true}
        trigger={trigger}
        triggerHandler={triggerHandler}
        clickHandler={clickHandler}
      />
      {questions.map((question, index) => (
        <QuestionEditor question={question} qno={index + 1} />
      ))}
    </div>
  );
};

export default AdminQuiz;
