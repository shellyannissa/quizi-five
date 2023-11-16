import React from "react";
import "./Profile.css";

export const Profile = ({userName='Pikachu', profilePic}) => {
  return (
    <div className= "profile">
      <div className="text-wrapper">Hy, {userName}</div>
      <div className="profile-pic">
        <img src="../../../assets/images/user.png" className="ellipse" />
      </div>
    </div>
  );
};
