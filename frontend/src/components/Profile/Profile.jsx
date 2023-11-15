import React from "react";
import { Button } from "../Button/Button";
import { ProfilePic } from "../ProfilePic/ProfilePic";
import "./Profile.css";

export const Profile = ({userName='Pikachu', profilePic}) => {
  return (
    <div className= "profile">
      <Button text="LOGOUT" clickHandler={() => console.log("Logout clicked")}/>
      <div className="text-wrapper">Hy, {userName}</div>
      <ProfilePic pic={profilePic}/>
    </div>
  );
};
