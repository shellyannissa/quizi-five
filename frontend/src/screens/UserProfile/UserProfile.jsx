import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { QuizCard } from "../../components/QuizCard/QuizCard";
import "./UserProfile.css";
import { useUser } from "../../context/UserContext";

const UserProfile = () => {
  const { user } = useUser();
  const logoutHandler = () => {
    console.log("logout handler");
  };
  const userName = "Pikachu";
  const [listQuiz, setListQuiz] = useState([]);

  console.log(user);

  const getQuizHistory = async () => {
    const history = await fetch("http://localhost:8000/api/user/history", {
      method: "PUT",
      body: JSON.stringify({ uid: "8cb7d644-9170-42b1-a8b2-93449f6a90d1" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setListQuiz(await history.json());
    console.log(listQuiz);
  };

  useEffect(() => {
    getQuizHistory();
  }, []);
  return (
    <div className="user-profile">
      <div className="profile-section">
        <div className="hero-left">
          <h1>{userName}</h1>
          <Button text="Logout" clickHandler={logoutHandler} />
          <h2>Quiz History</h2>
        </div>
        <div className="hero-right">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Avatar"
            className="avatar"
          />
        </div>
      </div>
      <div className={"quiz-list"}>
        <div className="list-of-quizzes">
          {listQuiz.map((quiz, index) => {
            return (
              <QuizCard
                key={index}
                quizName={quiz.quizName}
                image={quiz.image}
                month="POS"
                day={quiz.points}
                time={quiz.time}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
