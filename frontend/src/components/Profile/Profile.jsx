import React from "react";
import "./Profile.css";

export const Profile = ({userName='Pikachu', profilePic = "../../../assets/images/user.png"}) => {
  return (
    <div className= "profile">
      <div className="profile-pic">
        <img src={profilePic} className="ellipse" />
      </div>
      <div className="text-wrapper">Hy, {userName}</div>
    </div>
  );
};
