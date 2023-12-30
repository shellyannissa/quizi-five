import React from "react";
import { Profile } from "../Profile/Profile";
import { SearchBar } from "../SearchBar/SearchBar";
import { HomeSlider } from "../HomeSlider/HomeSlider";
import "./Hero.css";

export const Hero = ({ property, updateState, searchTerm, handleSearch }) => {
  return (
    <div className="hero-section">
      <div className="top-part">
        <Profile className="profile" />
      </div>
      <div className="bottom-part">
        <div className="hero-left">
          <p className="QUIZZES-for-you">
            <span className="quiz">QUIZZES</span>
            <span>&nbsp;</span>
            <span className="for-you">For You</span>
          </p>
          <div className="quiz-type">
            <HomeSlider property={property} updateState={updateState} />
            <SearchBar
              property={property}
              searchTerm={searchTerm}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        <div className="hero-right">
          <img src="../../assets/images/quiz-hero.avif" alt="poster" />
        </div>
      </div>
    </div>
  );
};
