import React, { useEffect } from "react";
import { useReducer } from "react";
import PropTypes from "prop-types";
import { QuizCard } from "../../components/QuizCard/QuizCard";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { Hero } from "../../components/Hero/Hero";
import "./UserHome.css";

export const UserHome = ({ property }) => {
  const [state, dispatch] = useReducer(reducer, {
    property: property || "registered",
  });

  const { user, setUser } = useUser();

  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [registeredQuizzes, setRegisteredQuizzes] = useState([]);

  const getAvailableQuizzes = async () => {
    const availableResponse = await fetch(
      "http://localhost:8000/api/user/unregquizzes",
      {
        method: "PUT",
        body: JSON.stringify({ uid: user._id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAvailableQuizzes(await availableResponse.json());
  };

  const getRegisteredQuizzes = async () => {
    const registeredResponse = await fetch(
      "http://localhost:8000/api/user/regquizzes",
      {
        method: "PUT",
        body: JSON.stringify({ uid: user._id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setRegisteredQuizzes(await registeredResponse.json());
  };

  const registerHandler = async (quizId) => {
    const registeredResponse = await fetch(
      "http://localhost:8000/api/reg/register",
      {
        method: "POST",
        body: JSON.stringify({ uid: user._id, quizId: quizId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    getAvailableQuizzes();
    getRegisteredQuizzes();
  };
  const unRegisterHandler = async (quizId) => {
    const registeredResponse = await fetch(
      "http://localhost:8000/api/reg/unregister",
      {
        method: "DELETE",
        body: JSON.stringify({ uid: user._id, quizId: quizId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    getAvailableQuizzes();
    getRegisteredQuizzes();
  };

  console.log("registered ", registeredQuizzes);
  console.log("available", availableQuizzes);

  useEffect(() => {
    if (user) {
      getAvailableQuizzes();
      getRegisteredQuizzes();
    }
  }, [registeredQuizzes.length]);

  const [quizList, setQuizList] = useState(registeredQuizzes);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    let filteredRegistered = [];
    let filteredAvailable = [];

    if (term.trim() !== "") {
      filteredRegistered = registeredQuizzes.filter((quiz) =>
        quiz.quizName.toLowerCase().includes(term)
      );

      filteredAvailable = availableQuizzes.filter((quiz) =>
        quiz.quizName.toLowerCase().includes(term)
      );
    } else {
      // If the search term is empty, set both filtered lists to the original lists
      filteredRegistered = registeredQuizzes;
      filteredAvailable = availableQuizzes;
    }

    setQuizList(
      state.property === "registered" ? filteredRegistered : filteredAvailable
    );
  };

  const updateState = () => {
    dispatch("click");
    if (state.property === "registered") {
      setQuizList(availableQuizzes);
    } else {
      setQuizList(registeredQuizzes);
    }
  };

  return (
    <div className="user-home">
      <Hero
        property={state.property}
        updateState={updateState}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <div className={`quiz-list ${state.property}`}>
        {state.property === "registered" ? (
          <div className="list-of-quizzes">
            {quizList.map((quiz) => (
              <QuizCard
                quizId={quiz.quizId}
                quizType={quiz.quizType}
                quizName={quiz.quizName}
                image={quiz.image}
                time={quiz.time}
                month={quiz.month}
                day={quiz.day}
                buttonContent="Unregister"
                clickHandler={() => {
                  unRegisterHandler(quiz.quizId);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="list-of-quizzes">
            {quizList.map((quiz) => (
              <QuizCard
                quizId={quiz.quizId}
                quizType={quiz.quizType}
                quizName={quiz.quizName}
                image={quiz.image}
                time={quiz.time}
                month={quiz.month}
                day={quiz.day}
                buttonContent="Register"
                clickHandler={() => {
                  registerHandler(quiz.quizId);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const reducer = (state, action) => {
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
};

UserHome.propTypes = {
  property: PropTypes.oneOf(["available", "registered"]),
};
