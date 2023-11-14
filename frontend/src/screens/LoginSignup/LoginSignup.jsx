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
        {/* <PurpleBall className="purple-ball-instance" property1="default" /> */}
        {/* <PurpleBall className="design-component-instance-node" property1="default" /> */}
        {/* <BlueBall className="blue-ball" property1="default" /> */}
        {/* <PurpleBall className="purple-ball-2" property1="default" /> */}
        {/* <PurpleBall className="ellipse-2" property1="default" /> */}
        {/* <BlueBall className="blue-ball-instance" property1="default" /> */}
        {/* <BlueBall className="ellipse-3" property1="default" /> */}
        {/* <BlueBall className="ellipse-4" property1="default" /> */}
        <AuthContainer />
        <img className="questions" alt="Questions" src="../../assets/illustrations/questions.svg" />
      </div>
    </div>
  );
};
