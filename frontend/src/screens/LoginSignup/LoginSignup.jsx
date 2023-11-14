import React from "react";
import { AuthSlider } from "../../components/AuthSlider/AuthSlider";
import { BlueBall } from "../../components/BlueBall/BlueBall";
import { Button } from "../../components/Button/Button";
import { PurpleBall } from "../../components/PurpleBall/PurpleBall";
import "./LoginSignup.css";

export const LoginSignup = () => {
  return (
    <div className="login-signup">
      <div className="div-2">
        <PurpleBall className="purple-ball-instance" property1="default" />
        <PurpleBall className="design-component-instance-node" property1="default" />
        <BlueBall className="blue-ball" property1="default" />
        <PurpleBall className="purple-ball-2" property1="default" />
        <PurpleBall className="ellipse-2" property1="default" />
        <BlueBall className="blue-ball-instance" property1="default" />
        <BlueBall className="ellipse-3" property1="default" />
        <BlueBall className="ellipse-4" property1="default" />
        <div className="auth-container">
          <div className="overlap">
            <div className="back-box" />
            <div className="top-box" />
            <div className="auth-frame">
              <AuthSlider className="auth-slider-instance" property1="default" />
              <div className="frame">
                <div className="overlap-group-wrapper">
                  <div className="overlap-group">
                    <input className="enter-email" />
                    <img className="user" alt="User" src="../../assets/icons/user.svg" />
                  </div>
                </div>
                <div className="overlap-group-wrapper">
                  <div className="overlap-2">
                    <input className="enter-password" />
                    <img className="password" alt="Password" src="../../assets/icons/lock.svg" />
                  </div>
                </div>
              </div>
              <Button />
            </div>
          </div>
        </div>
        <img className="questions" alt="Questions" src="../../assets/illustrations/questions.svg" />
      </div>
    </div>
  );
};
