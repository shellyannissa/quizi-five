import React from "react";
import "./Profile.css";
import { useUser } from "../../context/UserContext";

export const Profile = ({
  userName = "Pikachu",
  profilePic = "../../../assets/images/user.png",
}) => {
  const { user } = useUser();
  if (user) {
    userName = user.name;
    profilePic = user.image || profilePic;
  }
  const goToProfile = () => {
    navigate("/userprofile");
  };
  return (
    <div className="profile" onClick={goToProfile}>
      <div className="profile-pic">
        <img src={profilePic} className="ellipse" />
      </div>
      <div className="text-wrapper">Hy, {userName}</div>
    </div>
  );
};
