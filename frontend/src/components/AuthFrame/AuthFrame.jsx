import React from "react";
import { useReducer } from "react";
import { Button } from "../Button/Button";
import "./AuthFrame.css";
import "../AuthSlider/AuthSlider.css";
import { TextInputBar } from "../TextInputBar/TextInputBar";

export const AuthFrame = ({ property1 }) => {
    const [state, dispatch] = useReducer(reducer, {
        property1 : property1 || "default",
    });

    return (
        // Auth Slider jsx is now in AuthFrame.jsx but css is still in AuthSlider.css
        <div 
        className={`auth-frame ${state.property1}`}
        >
            <div id="auth-slider"
            className="auth-slider"
            onClick={() => {
                dispatch("click");
            }}
            >
                <div className="group">
                    <div className={`rectangle ${state.property1}`} />
                    <div className="left">LOGIN</div>
                    <div className="right">SIGNUP</div>
                </div>
            </div>
            <TextInputBar id="email-id" placeholder="Enter email" inputType="email" iconPath="../../../assets/icons/user.svg"/>
            <TextInputBar id="password" placeholder="Enter password" inputType="password" iconPath="../../../assets/icons/lock.svg"/>
            {state.property1 === "variant-2" ? <TextInputBar id="confirm-password" placeholder="Confirm password" inputType="password" iconPath="../../../assets/icons/key.svg"/> : null}
            <Button clickHandler={()=>{console.log("Clicked")}} text="SUBMIT"/>
        </div>
    )
}

function reducer(state, action) {
    if (state.property1 === "default") {
        switch (action) {
            case "click":
                return {
                    property1 : "variant-2",
                };
        }
    }

    if (state.property1 === "variant-2") {
        switch (action) {
            case "click":
                return {
                    property1 : "default",
                };
        }
    }

    return state;
}