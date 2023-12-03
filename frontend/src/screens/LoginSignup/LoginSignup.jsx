import React from "react";
import AuthContainer from "../../components/AuthContainer/AuthContainer";
import "./LoginSignup.css";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8000";
var socket;

export const LoginSignup = () => {
  return (
    <div className="login-signup">
      <div className="main">
        <div className="left-side">
          <AuthContainer className="auth-container" />
        </div>
        <div className="question">
          <img alt="Questions" src="../../assets/illustrations/questions.svg" />
        </div>
      </div>
    </div>
  );
};
