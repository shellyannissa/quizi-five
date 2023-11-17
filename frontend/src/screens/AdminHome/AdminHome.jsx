import React from "react";
import { QuizCard } from "../../components/QuizCard/QuizCard";
import { useState } from "react";
import "../UserHome/UserHome.css";
import "./AdminHome.css";
import { AdminHero } from "../../components/AdminHero/AdminHero";

const created = [
  {
    quizType: "Sports Quiz",
    quizName: "Sports is cool",
    image: "https://img.freepik.com/free-vector/quiz-night-concept-illustration_114360-1334.jpg?size=626&ext=jpg",
    time: "09:00 PM",
    month: "JUN",
    day: "23",
  },
  {
    quizType: "Entertainment Quiz",
    quizName: "Entertainment is cool",
    image: "https://img.freepik.com/free-vector/quiz-night-concept-illustration_114360-1334.jpg?size=626&ext=jpg",
    time: "09:00 PM",
    month: "JUN",
    day: "23",
  },
  {
    quizType: "Science Quiz",
    quizName: "Science is super cool",
    image: "https://img.freepik.com/free-vector/quiz-night-concept-illustration_114360-1334.jpg?size=626&ext=jpg",
    time: "09:00 AM",
    month: "APR",
    day: "01",
  },
  {
    quizType: "Science Quiz",
    quizName: "Science is not cool",
    image: "https://img.freepik.com/free-vector/quiz-night-concept-illustration_114360-1334.jpg?size=626&ext=jpg",
    time: "09:00 AM",
    month: "APR",
    day: "01",
  },
  {
    quizType: "Science Quiz",
    quizName: "Science is cool",
    image: "https://img.freepik.com/free-vector/quiz-night-concept-illustration_114360-1334.jpg?size=626&ext=jpg",
    time: "09:00 AM",
    month: "APR",
    day: "01",
  },
];

export const AdminHome = () => {

  const [quizList, setQuizList] = useState(created);
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const newList = created;
    const filtered = newList.filter((quiz) => {
      console.log(quiz.quizName.toLowerCase().includes(term.toLowerCase()));
      return quiz.quizName.toLowerCase().includes(term.toLowerCase());
    });
    setQuizList(filtered);
  }

  return (
    <div className="user-home">
      <AdminHero searchTerm={searchTerm} handleSearch={handleSearch}/>
      <div className={`quiz-list`}>
        <div className="list-of-quizzes">
        {quizList.map((quiz) => (
            <QuizCard
            key={quiz.quizName}
            quizType={quiz.quizType}
            quizName={quiz.quizName}
            image={quiz.image}
            time={quiz.time}
            month={quiz.month}
            day={quiz.day}
            buttonContent="Edit"
            />))}
        </div>
      </div>
    </div>
  );
};
