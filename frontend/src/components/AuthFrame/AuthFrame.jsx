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

    return (
        <div className={`auth-frame`}>
            <AuthSlider property={state.property} updateState={updateState}/>
            <div className={`inputs ${state.property}`}>
                <TextInputBar id="email-id" placeholder="Enter email" inputType="email" iconPath="../../../assets/icons/user.svg"/>
                <TextInputBar id="password" placeholder="Enter password" inputType="password" iconPath="../../../assets/icons/lock.svg"/>
                {state.property === "signup" ? <TextInputBar id="confirm-password" placeholder="Confirm password" inputType="password" iconPath="../../../assets/icons/key.svg"/> : null}
            </div>
            <Button clickHandler={updateState} text="SUBMIT"/>
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