import React, { useState } from "react";
import { useReducer } from "react";
import { Button } from "../Button/Button";
import { TextInputBar } from "../TextInputBar/TextInputBar";
import { AuthSlider } from "../AuthSlider/AuthSlider";
import { useUser } from "../../context/UserContext";
import "./AuthFrame.css";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../../backend/controllers/firebaseController";

export const AuthFrame = ({ property }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    property: property || "login",
  });

  const { user, setUser } = useUser();

  const updateState = () => {
    dispatch("click");
  };

  const handleSubmit = async () => {
    const email = document.getElementById("email-id").value;
    const password = document.getElementById("password").value;

    const userDetails = {
      email: email,
      password: password,
    };

    console.log(userDetails);

    let endpoint;

    if (state.property === "login") {
      endpoint = "http://localhost:8000/api/user/login";
    } else {
      endpoint = "http://localhost:8000/api/user/register";
      const confirmPassword = document.getElementById("confirm-password").value;
      userDetails.name = "Ruben";
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      setUser(data);
      if (data) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);
  if (user) console.log(user.token);
  else console.log("no user");

  return (
    <div className={`auth-frame`}>
      <AuthSlider property={state.property} updateState={updateState} />
      <div className={`inputs ${state.property}`}>
        <TextInputBar
          id="email-id"
          placeholder="Enter email"
          inputType="email"
          iconPath="../../../assets/icons/user.svg"
        />
        <TextInputBar
          id="password"
          placeholder="Enter password"
          inputType="password"
          iconPath="../../../assets/icons/lock.svg"
        />
        {state.property === "signup" ? (
          <TextInputBar
            id="confirm-password"
            placeholder="Confirm password"
            inputType="password"
            iconPath="../../../assets/icons/key.svg"
          />
        ) : null}
      </div>
      <Button
        clickHandler={(e) => {
          const email = document.getElementById("email-id").value;
          createUser(email).then((userId) => {
            console.log(userId);
          });
        }}
        text="SUBMIT"
      />
    </div>
  );
};

const reducer = (state, action) => {
  if (state.property === "login") {
    switch (action) {
      case "click":
        return {
          property: "signup",
        };
    }
  }

  if (state.property === "signup") {
    switch (action) {
      case "click":
        return {
          property: "login",
        };
    }
  }

  return state;
};
