import React, { useEffect, useState } from "react";
import { AdminHero } from "../../components/AdminHero/AdminHero";
import { useParams } from "react-router-dom";
import { FlippingCard } from "../../components/FlippingCard/FlippingCard";
import { QuestionList } from "../../components/Data/QuizData";
import { useUser } from "../../context/UserContext";
import io from "socket.io-client";
import "./QuizPage.css";
var socket;

const QuizPage = ({ quiz }) => {
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
              // percentages={[0.2, 0.3, 0.4, 0.1]}
            />
          );
        })}
      </div>
      {/* <FlippingCard
        title="RoboWars"
        description="Nov 15, 6:00PM"
        imgSrc="https://picsum.photos/330/320"
        percentages={[0.2, 0.3, 0.4, 0.1]}
      /> */}
    </div>
  );
};

export default QuizPage;
