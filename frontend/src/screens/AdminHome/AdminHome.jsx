import React, { useEffect } from "react";
import { QuizCard } from "../../components/QuizCard/QuizCard";
import { useState } from "react";
import { AdminHero } from "../../components/AdminHero/AdminHero";
import "../UserHome/UserHome.css";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css";
import { useUser } from "../../context/UserContext";
import { Button } from "../../components/Button/Button";
import { db } from "../../../shared/firebase_config";

import { ref, set, get, push, onValue } from "firebase/database";

export const AdminHome = () => {
  const { user, setUser } = useUser();
  const [created, setCreated] = useState([]);

  const navigate = useNavigate();

  //* realtime firebase function
  const getAllQuizzes = async () => {
    const quizRef = ref(db, "quiz");
    onValue(quizRef, (snapshot) => {
      if (snapshot.exists()) {
        const quizzes = [];
        snapshot.forEach((childSnapshot) => {
          const quiz = childSnapshot.val();
          quiz.quizId = childSnapshot.key;
          quizzes.push(quiz);
        });
        setQuizList(quizzes);
      } else {
        console.log("No data available");
      }
    });
  };
  console.log(created);

  useEffect(() => {
    getAllQuizzes();
  }, []);

  const [quizList, setQuizList] = useState(created);

  const [searchTerm, setSearchTerm] = useState("");

  const [trigger, setTrigger] = React.useState(false);

  const clickHandler = () => {
    setTrigger(true);
  };
  const triggerHandler = () => {
    setTrigger(false);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    let filtered = [];

    if (term.trim() !== "") {
      filtered = created.filter((quiz) =>
        quiz.quizName.toLowerCase().includes(term)
      );
    } else {
      // If the search term is empty, set both filtered lists to the original lists
      filtered = created;
    }
    console.log("FILTERED", filtered);
    setQuizList(filtered);
  };

  console.log("QUIZLIST", quizList);

  const deleteQuiz = async (quizId) => {
    const registeredResponse = await fetch(
      "http://localhost:8000/api/quiz/delete",
      {
        method: "DELETE",
        body: JSON.stringify({ quizId: quizId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    getAllQuizzes();
  };

  const goToQuiz = (quizId) => {
    navigate(`/admin/${quizId}`);
  };

  return (
    <div className="user-home">
      <AdminHero
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        trigger={trigger}
        triggerHandler={triggerHandler}
        clickHandler={clickHandler}
      />
      <div className={`quiz-list`}>
        <div className="list-of-quizzes">
          {quizList.map((quiz, index) => (
            <div key={index}>
              {/* <Button text="EDIT" clickHandler={() => goToQuiz(quiz.quizId)} /> */}
              <Button
                text="Begin"
                clickHandler={() => {
                  console.log("quizId", quiz.quizId);
                  goToQuiz(quiz.quizId);
                }}
              />
              <QuizCard
                quizId={quiz.quizId}
                key={quiz.quizName}
                quizName={quiz.quizName}
                quizType={quiz.description}
                image={quiz.image}
                quizDate={quiz.date}
                time={quiz.time}
                timeInput={quiz.timeInput}
                month={quiz.month}
                day={quiz.day}
                buttonContent="Edit"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
