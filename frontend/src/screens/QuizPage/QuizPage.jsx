import React, { useEffect, useState } from "react";
import { AdminHero } from "../../components/AdminHero/AdminHero";
import { useParams } from "react-router-dom";
import { FlippingCard } from "../../components/FlippingCard/FlippingCard";
import { QuestionList } from "../../components/Data/QuizData";
import { useUser } from "../../context/UserContext";
import io from "socket.io-client";
import "./QuizPage.css";
var socket;

// creating a list of timer values
var timerValues = QuestionList.map((question) => {
  return question.time;
});

const QuizPage = ({ quiz }) => {
  localStorage.clear();
  const StoredTimerValues = localStorage.getItem("timerValues");
  if (StoredTimerValues) {
    timerValues = JSON.parse(StoredTimerValues);
    console.log("from storage" + timerValues);
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("timerValues", JSON.stringify(timerValues));
      console.log("from unload" + timerValues);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const ENDPOINT = "http://localhost:8000";
  //! NOTE: this list is for rubens question card
  const questions = [
    {
      question: "Capital Of India?",
      options: ["Delhi", "Pune", "Calicut", "Italy"],
      correctOption: 0,
    },
    {
      question: "How are you?",
      options: ["Fine", "Sad"],
      correctOption: 1,
    },
  ];

  const { quizId } = useParams();
  const [searchTerm, setSearchTerm] = React.useState("");
  const { user } = useUser();
  const [socketConnected, setSocketConnected] = useState(false);
  const [textValue, setTextValue] = useState("");

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

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join quiz", quizId);
    console.log("joined from user side");
    socket.on("receive message", ({ user, message, senderType }) => {
      console.log(
        `${senderType === "admin" ? "Admin" : "User"} ${user} says: ${message}`
      );
      setTextValue(message);
    });
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
      <div className="question-list">
        {QuestionList.map((question, index) => {
          return (
            <FlippingCard
              key={index}
              question={question}
              timerValues={timerValues}
              index={index}
              // percentages={[0.2, 0.3, 0.4, 0.1]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuizPage;
