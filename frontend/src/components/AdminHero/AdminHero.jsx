import React from "react";
import { Profile } from "../Profile/Profile";
import { SearchBar } from "../SearchBar/SearchBar";
import CreateButton from "../CreateButton/CreateButton";
import QuizForm from "../QuizForm/QuizForm";
import QuestionForm from "../QuestionForm/QuestionForm";
import "../Hero/Hero.css";
import "./AdminHero.css";
import { useParams } from "react-router-dom";

export const AdminHero = ({
  heading,
  image,
  searchTerm,
  handleSearch,
  isQuestion,
  trigger,
  triggerHandler,
  clickHandler,
  callBack,
}) => {
  if (!image) {
    image = "../../assets/images/quiz-hero.avif";
  }

  return (
    <div className="hero-section">
      <div className="top-part">
        <Profile className="profile" />
      </div>
      <div className="bottom-part">
        <div className="hero-left">
          {!heading ? (
            <p className="QUIZZES-for-you">
              <span className="quiz">QUIZZES</span>
              <span>&nbsp;</span>
              <span className="for-you">By You</span>
            </p>
          ) : (
            <p className="heading">{heading}</p>
          )}
          <div className="quiz-type-admin">
            <SearchBar
              property="registerd"
              searchTerm={searchTerm}
              handleSearch={handleSearch}
            />
            <CreateButton textContent="New" clickHandler={clickHandler} />
          </div>
        </div>
        <div className="hero-right">
          <img src={image} alt="poster" />
        </div>
        {!isQuestion ? (
          <QuizForm
            heading="Enter quiz details"
            trigger={trigger}
            triggerHandler={triggerHandler}
          />
        ) : (
          <QuestionForm
            heading="Enter question details"
            trigger={trigger}
            triggerHandler={triggerHandler}
            quizId={useParams().quizId}
            callBack={callBack}
          />
        )}
      </div>
    </div>
  );
};
