import React from "react";
import { QuizCard } from "../../components/QuizCard/QuizCard";
import { Hero } from "../../components/Hero/Hero";
import "./UserHome.css";

export const UserHome = () => {
  return (
    <div className="user-home">
      <Hero />
      <div className="quiz-list">
        <QuizCard quizName="Quiz1"/>
        <QuizCard quizName="Quiz2"/>
        <QuizCard quizName="Quiz3"/>
      </div>
    </div>
  );
};
