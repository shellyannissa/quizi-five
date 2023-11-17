import React from "react";
import { useReducer } from "react";
import { Button } from "../Button/Button";
import { TextInputBar } from "../TextInputBar/TextInputBar";
import { AuthSlider } from "../AuthSlider/AuthSlider";
import "./AuthFrame.css";

export const AuthFrame = ({ property }) => {
    const [state, dispatch] = useReducer(reducer, {
        property : property || "login",
    });

    const updateState = () => {
        dispatch("click");
    }

    const handleSubmit = () => {
        const email = document.getElementById("email-id").value;
        const password = document.getElementById("password").value;

        const userDetails = 
            {
                email: email,
                password: password,
            };
        
        console.log(userDetails);

        let endpoint;

        if(state.property === "login") {
            endpoint = "http://localhost:8000/api/user/login"
        }
        else {
            endpoint = "http://localhost:8000/api/user/register"
            const confirmPassword = document.getElementById("confirm-password").value;
            userDetails.name = "Ruben";
            userDetails.image = ""
        }

        fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error('Login failed.');
            })
            .then(data => {
              console.log('User details:', data);
            })
            .catch(error => {
              // Handle errors
              console.error('Error:', error.message);
            })
    };

    return (
        <div className={`auth-frame`}>
            <AuthSlider property={state.property} updateState={updateState}/>
            <div className={`inputs ${state.property}`}>
                <TextInputBar id="email-id" placeholder="Enter email" inputType="email" iconPath="../../../assets/icons/user.svg"/>
                <TextInputBar id="password" placeholder="Enter password" inputType="password" iconPath="../../../assets/icons/lock.svg"/>
                {state.property === "signup" ? <TextInputBar id="confirm-password" placeholder="Confirm password" inputType="password" iconPath="../../../assets/icons/key.svg"/> : null}
            </div>
            <Button clickHandler={handleSubmit} text="SUBMIT"/>
        </div>
    )
}

const reducer = (state, action) => {
    if (state.property === "login") {
        switch (action) {
            case "click":
                return {
                    property : "signup",
                };
        }
    }

    if (state.property === "signup") {
        switch (action) {
            case "click":
                return {
                    property : "login",
                };
        }
    }

    return state;
}