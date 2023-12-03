import React, { useEffect, useState } from "react";
import { AdminHero } from "../../components/AdminHero/AdminHero";
import "./QuizPage.css";
import { useParams } from "react-router-dom";
import { QuizCard } from "../../components/QuizCard";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard";
import DynamicTextComponent from "../../components/DynamicText/DynamicTextComponent";
import { useUser } from "../../context/UserContext";
import io from "socket.io-client";
var socket;

const QuizPage = ({ quiz }) => {
  const ENDPOINT = "http://localhost:8000";
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
    socket.on('receive message', ({ user, message, senderType }) => {
      console.log(`${senderType === 'admin' ? 'Admin' : 'User'} ${user} says: ${message}`);
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

<div>
      <input
        type="text"
        value={textValue}

        placeholder="Type something..."
      />
      <p>{textValue && `You entered: ${textValue}`}</p>
    </div>
      {/* <QuizCard
        title="RoboWars"
        description="Nov 15, 6:00PM"
        imgSrc="https://picsum.photos/330/320"
        percentages={[0.1, 0.3]}
      /> */}
      {/* <QuestionCard questions={questions} /> */}
    </div>
  );
};

export default QuizPage;


const DynamicTextComponentListen = ({quizId}) => {
  

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
    
  };



  return (
    <div>
      <input
        type="text"
        value={textValue}
        onChange={handleTextChange}
        placeholder="Type something..."
      />
      <p>{textValue && `You entered: ${textValue}`}</p>
    </div>
  );
};