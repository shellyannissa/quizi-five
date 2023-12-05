import React, { useEffect, useState } from "react";
import { AdminHero } from "../../components/AdminHero/AdminHero";
import "./AdminQuiz.css";
import { useParams } from "react-router-dom";
import QuestionEditor from "../../components/QuestionEditor/QuestionEditor";
const ENDPOINT = "http://localhost:8000";
import io from "socket.io-client";
import { Button } from "../../components/Button/Button";
import CreateButton from "../../components/CreateButton/CreateButton";
let socket;
let stream = {};
const AdminQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [socketConnected, setSocketConnected] = useState(false);
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
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.emit("join quiz", quizId);
  }, []);

  const sendQuestion = async (newQn, activeQn) => {
    setQuestions([...questions, newQn]);
    console.log(activeQn);
    stream[newQn.questionid] = activeQn;
  };

  const sendActiveQuestion = async (questionId) => {
    console.log(questionId);
    console.log(stream[questionId]);
    socket.emit("new question", quizId, stream[questionId]);
  };

  return (
    <div className="quiz-page">
      <AdminHero
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        isQuestion={true}
        trigger={trigger}
        triggerHandler={triggerHandler}
        clickHandler={clickHandler}
        callBack={sendQuestion}
      />
      {questions.map((question, index) => (
        <QuestionEditor
          question={question}
          qno={index + 1}
          callBack={sendActiveQuestion}
        />
      ))}
    </div>
  );
};

export default AdminQuiz;
