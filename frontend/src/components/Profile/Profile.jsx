import React from "react";
import { Button } from "../Button/Button";
import { ProfilePic } from "../ProfilePic/ProfilePic";
import "./Profile.css";

export const Profile = () => {
  return (
    <div className= "profile design-component-instance-node">
      <Button text="LOGOUT" clickHandler={() => console.log("Logout clicked")}/>
      <div className="text-wrapper">Hi, Pikachu</div>
      <ProfilePic /> {/*  ADD pic prop */}
    </div>
  );
};
