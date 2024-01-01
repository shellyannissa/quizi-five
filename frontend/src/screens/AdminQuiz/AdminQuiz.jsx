import React, { useEffect, useState } from "react";
import { AdminHero } from "../../components/AdminHero/AdminHero";
import "./AdminQuiz.css";

import QuestionEditor from "../../components/QuestionEditor/QuestionEditor";

import { db } from "../../../shared/firebase_config";
import { ref, get, onValue } from "firebase/database";

const AdminQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
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

  //* realtime database functionality
  const getQuestions = async () => {
    const qnRef = ref(db, "ques");
    onValue(qnRef, (snapshot) => {
      if (snapshot.exists()) {
        const questions = [];
        snapshot.forEach((childSnapshot) => {
          const qn = childSnapshot.val();
          qn.qnId = childSnapshot.key;
          questions.push(qn);
        });
        setQuestions(questions);
      } else {
        console.log("no questions to display");
      }
    });
  };

  // const getQuestions = async () => {
  //   const body = {
  //     quizId,
  //   };
  //   const response = await fetch("http://localhost:8000/api/quiz/getqns", {
  //     method: "PUT",
  //     body: JSON.stringify(body),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data);
  //     setQuestions(data);
  //   } else {
  //     console.error("Error:", response.status, response.statusText);
  //   }
  // };
  useEffect(() => {
    getQuestions();
  }, []);

  const sendQuestion = async (newQn, activeQn) => {
    setQuestions([...questions, newQn]);
    console.log(activeQn);
    stream[newQn.questionid] = activeQn;
  };

  const sendActiveQuestion = async (questionId) => {
    console.log(questionId);
    console.log(stream[questionId]);
    // socket.emit("new question", quizId, stream[questionId]);
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
