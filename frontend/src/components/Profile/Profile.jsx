import React from "react";
import { ProfilePic } from "../ProfilePic/ProfilePic";
import "./Profile.css";

export const Profile = ({userName='Pikachu', profilePic}) => {
  return (
    <div className= "profile">
      <div className="text-wrapper">Hy, {userName}</div>
      <ProfilePic pic={profilePic}/>
    </div>
  );
};
