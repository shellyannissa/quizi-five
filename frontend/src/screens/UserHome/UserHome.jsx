import React from "react";
import { Profile } from "../../components/Profile/Profile";
import { QuizCard } from "../../components/QuizCard/QuizCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import "./UserHome.css";

export const UserHome = () => {
  return (
    <div className="user-home">
      <div className="div-2">
        <div className="overlap-2">
          <div className="overlap-3">
            <div className="hero">
              <div className="rectangle-2" />
              <div className="frame-8">
                <Profile />
                <div className="frame-9">
                  <p className="QUIZZES-for-you">
                    <span className="span">QUIZZES</span>
                    <span className="text-wrapper-8">&nbsp;</span>
                    <span className="text-wrapper-9">For You</span>
                  </p>
                  <div className="frame-10">
                    <SearchBar
                      vector="https://c.animaapp.com/fWGxq1VK/img/vector.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-11">
              <QuizCard quizName="Quiz1"/>
              <QuizCard quizName="Quiz2"/>
              <QuizCard quizName="Quiz3"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
