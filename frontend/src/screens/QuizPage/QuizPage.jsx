import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FlippingCard } from "../../components/FlippingCard/FlippingCard";
import { useUser } from "../../context/UserContext";
import "./QuizPage.css";
import { QuizHero } from "../../components/QuizHero/QuizHero";
import { db } from "../../../shared/firebase_config";
import { ref, onValue } from "firebase/database";
import { QSlider } from "../../components/QSlider/QSlider";

const QuizPage = () => {
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
    const displayRef = ref(db, "display");
    onValue(displayRef, (snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val().type == "ques") {
          const questions = [];
          questions.push(snapshot.val());
          console.log(questions[0]);
          setQuestions(questions);
        }
      }
    });
  };
  useEffect(() => {
    // getQuizDetails();
    getQuestions();
  }, []);

  // timer values pre-processing
  // var timerValues = questions.map((question) => {
  //   // ending - current = time left
  //   var endingInstant = new Date(question.endingInstant).getTime();
  //   var currentInstant = new Date().getTime();
  //   var difference = endingInstant - currentInstant;
  //   console.log(difference / 1000);
  //   return -difference / 100000;
  // });

  // const ENDPOINT = "http://localhost:8000";

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

  return (
    <div className="quiz-page">
      <QuizHero image={quizDetails.image} quizName={quizDetails.name} />
      <div className="question-list">
        {questions.map((question, index) => {
          return <QSlider quizId={quizId} index={index} question={question} />;
        })}
      </div>
    </div>
  );
};

export default QuizPage;
