import React, { useEffect } from "react";
import { useReducer } from "react";
import PropTypes from "prop-types";
import { QuizCard } from "../../components/QuizCard/QuizCard";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { Hero } from "../../components/Hero/Hero";
import "./UserHome.css";

// const registered = [
//   {
//     quizType: "General Quiz",
//     quizName: "Generally a quiz",
//     image: "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/63fd90f31203c_json_image_1677562099.webp",
//     time: "10:00 AM",
//     month: "JAN",
//     day: "12",
//   },
//   {
//     quizType: "Bussiness Quiz",
//     quizName: "Busssy Busincess",
//     image: "https://img.freepik.com/premium-vector/brain-teasers-quiz-night-event-flyer-template-vector-v2_351449-1155.jpg",
//     time: "08:00 AM",
//     month: "DEC",
//     day: "20",
//   }
// ];


export const UserHome = ({property}) => {
  const [state, dispatch] = useReducer(reducer, {
    property: property || "registered",
  });

  const { user, setUser } = useUser();

  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [registeredQuizzes, setRegisteredQuizzes] = useState([]);

  const getAvailableQuizzes = async () => {
  const availableResponse = await fetch("http://localhost:8000/api/quiz/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  setAvailableQuizzes(await availableResponse.json());
  };
  console.log("registered",registeredQuizzes);

  const getRegisteredQuizzes = async () => {
  const registeredResponse = await fetch("http://localhost:8000/api/user/regquizzes", {
    method: "PUT",
    body: JSON.stringify({uid: user._id}),
    headers: {
      "Content-Type": "application/json",
    },
  });
  setRegisteredQuizzes(await registeredResponse.json());
  };

  console.log("availbale",availableQuizzes);
  
  useEffect(() => {
    getAvailableQuizzes();
    getRegisteredQuizzes();
  }, []);

  // const [quizList, setQuizList] = useState(registered);
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const newList = state.property === "registered" ? registeredQuizzes : availableQuizzes;
    const filtered = newList.filter((quiz) => {
      console.log(quiz.quizName.toLowerCase().includes(term.toLowerCase()));
      return quiz.quizName.toLowerCase().includes(term.toLowerCase());
    });
    setQuizList(filtered);
  }

  const updateState = () => {
    dispatch("click");
    if (state.property === "registered") {
      setQuizList(registered);
    } else {
      setQuizList(availableQuizzes);
    }
  };

  return (
    <div className="user-home">zdfvalmdf lmf la 
      <Hero property={state.property} updateState={updateState} searchTerm={searchTerm} handleSearch={handleSearch}/>
      <div className={`quiz-list ${state.property}`}>
        {state.property === "registered" ? (
          <div  className="list-of-quizzes">
            {registeredQuizzes.map((quiz) => (
              <QuizCard
                quizType={quiz.quizType}
                quizName={quiz.quizName}
                image={quiz.image}
                time={quiz.time}
                month={quiz.month}
                day={quiz.day}
              />
            ))}
          </div>
        ):(
          <div className="list-of-quizzes">
            {availableQuizzes.map((quiz) => (
              <QuizCard
                quizId={quiz.quizid}
                quizType={quiz.quizType}
                quizName={quiz.quizName}
                image={quiz.image}
                time={quiz.time}
                month={quiz.month}
                day={quiz.day}
                buttonContent="Register"
              />
            ))}
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
