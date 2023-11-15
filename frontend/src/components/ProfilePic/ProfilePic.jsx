import PropTypes from "prop-types";
import React from "react";
import "./ProfilePic.css";

export const ProfilePic = ({
  pic = "../../../assets/images/user.png",
}) => {
  return (
    <div className="profile-pic">
      <img className="ellipse" alt="Ellipse" src={pic} />
    </div>
  );
};

ProfilePic.propTypes = {
  ellipse: PropTypes.string,
};
