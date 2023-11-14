import React from "react";
import { AuthSlider } from "../AuthSlider/AuthSlider";
import { useReducer } from "react";
import { Button } from "../Button/Button";
import "./AuthFrame.css";
import { TextInputBar } from "../TextInputBar/TextInputBar";

export const AuthFrame = ({ property1 }) => {
    const [state, dispatch] = useReducer(reducer, {
        property1 : property1 || "default",
    });

    return (
        <div 
        className={`auth-frame ${property1}`}
        onClick={() => { dispatch("click"); }}
        >
            <AuthSlider 
            property1={state.property1 === "variant-2" ? "varaint-2" : "default"}
            />
            <TextInputBar id="email-id" placeholder="Enter email" inputType="email" iconPath="../../../assets/icons/user.svg"/>
            <TextInputBar id="password" placeholder="Enter password" inputType="password" iconPath="../../../assets/icons/lock.svg"/>
            {state.property1 === "variant-2" ? <TextInputBar id="confirm-password" placeholder="Confirm password" inputType="password" iconPath="../../../assets/icons/key.svg"/> : null}
            <Button />
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