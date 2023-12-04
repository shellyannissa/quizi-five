import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FlippingCard } from "../../components/FlippingCard/FlippingCard";
import { QuestionList } from "../../components/Data/QuizData";
import { useUser } from "../../context/UserContext";
import io from "socket.io-client";
import "./QuizPage.css";
import { QuizHero } from "../../components/QuizHero/QuizHero";
var socket;

// creating a list of timer values
var timerValues = QuestionList.map((question) => {
  return question.time;
});

const QuizPage = () => {
  // localStorage.clear();
  // const StoredTimerValues = localStorage.getItem("timerValues");
  // if (StoredTimerValues) {
  //   timerValues = JSON.parse(StoredTimerValues);
  //   console.log("from storage" + timerValues);
  // }

  // fetching quizdetails from backend

  const [quizDetails, setQuizDetails] = useState({});

  const getQuizDetails = async () => {
    const response = await fetch(`http://localhost:8000/api/quiz/details`, {
      method: "PUT",
      body: JSON.stringify({ quizId: quizId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setQuizDetails(data);
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  };

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
    getQuizDetails();
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

  // useEffect(() => {});
  return (
    <div className="quiz-page">
      <QuizHero image={quizDetails.image} quizName={quizDetails.name} />
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
