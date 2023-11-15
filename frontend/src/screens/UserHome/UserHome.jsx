import React from "react";
import { useReducer } from "react";
import PropTypes from "prop-types";
import { QuizCard } from "../../components/QuizCard/QuizCard";
import { Hero } from "../../components/Hero/Hero";
import "./UserHome.css";

export const UserHome = ({property}) => {
  const [state, dispatch] = useReducer(reducer, {
    property: property || "registered",
  });

  const updateState = () => {
    dispatch("click");
  };

  return (
    <div className="user-home">
      <Hero property={state.property} updateState={updateState}/>
      <div className={`quiz-list ${state.property}`}>
        {state.property === "available" ? (
          <div  className="quiz-list">
            <QuizCard quizName="Quiz1"/>
            <QuizCard quizName="Quiz2"/>
            <QuizCard quizName="Quiz3"/>
          </div>
        ):(
          <div className="quiz-list">
            <QuizCard quizName="Quiz4"/>
            <QuizCard quizName="Quiz5"/>
            <QuizCard quizName="Quiz6"/>
          </div>
        )}
      </div>
    </div>
  );
};

const reducer = ( state, action ) => {
  if (state.property === "registered") {
    switch (action) {
      case "click":
        return {
          property: "available",
        };
    }
  }

  if (state.property === "available") {
    switch (action) {
      case "click":
        return {
          property: "registered",
        };
    }
  }

  return state;
}

UserHome.propTypes = {
  property: PropTypes.oneOf(["available", "registered"]),
};
