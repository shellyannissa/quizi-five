import React from "react";
import { BlueBall } from "../../components/BlueBall/BlueBall";
import { PurpleBall } from "../../components/PurpleBall/PurpleBall";
import AuthContainer from "../../components/AuthContainer/AuthContainer";
import "./LoginSignup.css";
import { TextInputBar } from "../../components/TextInputBar/TextInputBar";

export const LoginSignup = () => {
  return (
    <div className="login-signup">
      <div className="main">
        <AuthContainer />
        <div className="question">
          <img alt="Questions" src="../../assets/illustrations/questions.svg" />
        </div>
      </div>
    </div>
  );
};
