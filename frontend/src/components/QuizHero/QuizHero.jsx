import React from "react";
import { Profile } from "../Profile/Profile";
import "../Hero/Hero.css";

export const QuizHero = ({ image, quizName }) => {
  if (!image) {
    image = "../../assets/images/quiz-hero.avif";
  }
  if (!quizName) {
    quizName = "Quiz Name";
  }
  return (
    <div className="hero-section">
      <div className="top-part">
        <Profile className="profile" />
      </div>
      <div className="bottom-part">
        <div className="hero-left">
          <p className="QUIZZES-for-you">
            <span className="quiz">{quizName}</span>
          </p>
        </div>
        <div className="hero-right">
          <img src={image} alt="poster" />
        </div>
      </div>
    </div>
  );
};
