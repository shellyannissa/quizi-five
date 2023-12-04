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
  // localStorage.clear();
  // const StoredTimerValues = localStorage.getItem("timerValues");
  // if (StoredTimerValues) {
  //   timerValues = JSON.parse(StoredTimerValues);
  //   console.log("from storage" + timerValues);
  // }

  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const getQuestions = async () => {
    const body = {
      quizId,
    };
    const response = await fetch("http://localhost:8000/api/quiz/activeqns", {
      method: "PATCH",
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

  const [searchTerm, setSearchTerm] = React.useState("");
  const { user } = useUser();
  const [socketConnected, setSocketConnected] = useState(false);

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
    socket.on("question recieved", (newQnRecieved) => {
      console.log(newQnRecieved);
      setQuestions([...questions, newQnRecieved]);
    });
  }, []);

  useEffect(() => {});
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
        {questions.map((question, index) => {
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
