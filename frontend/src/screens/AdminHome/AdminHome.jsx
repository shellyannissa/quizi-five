import React, { useEffect } from "react";
import { QuizCard } from "../../components/QuizCard/QuizCard";
import { useState } from "react";
import { AdminHero } from "../../components/AdminHero/AdminHero";
import "../UserHome/UserHome.css";
import "./AdminHome.css";
import { useUser } from "../../context/UserContext";

export const AdminHome = () => {
  const { user, setUser } = useUser();
  const [created, setCreated] = useState([]);
  const getAllQuizzes = async () => {
    const availableResponse = await fetch(
      "http://localhost:8000/api/admin/quizzes",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCreated(await availableResponse.json());
    setQuizList(created);
  };
  console.log(created);

  useEffect(() => {
    getAllQuizzes();
  }, []);

  useEffect(() => {
    setQuizList(created);
  }, [created]);

  const [quizList, setQuizList] = useState(created);

  const [searchTerm, setSearchTerm] = useState("");

  const [trigger, setTrigger] = React.useState(false);

  const clickHandler = () => {
    setTrigger(true);
  };
  const triggerHandler = () => {
    setTrigger(false);
  };

  // const handleSearch = (event) => {
  //   const term = event.target.value;
  //   setSearchTerm(term);
  //   const newList = created;
  //   const filtered = newList.filter((quiz) => {
  //     console.log(quiz.quizName.toLowerCase().includes(term.toLowerCase()));
  //     return quiz.quizName.toLowerCase().includes(term.toLowerCase());
  //   });
  //   setQuizList(filtered);
  // };

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
          {quizList.map((quiz) => (
            <QuizCard
              quizId={quiz.quizId}
              key={quiz.quizName}
              quizName={quiz.quizName}
              image={quiz.image}
              time={quiz.time}
              month={quiz.month}
              day={quiz.day}
              buttonContent="Edit"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
