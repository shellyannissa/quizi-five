import PropTypes from "prop-types";
import React from "react";
import "./SearchBar.css";

export const SearchBar = ({ vector = "https://c.animaapp.com/fWGxq1VK/img/vector-1.svg" }) => {
  return (
    <div className="search-bar">
      <div className="frame">
        <img className="vector" alt="Vector" src={vector} />
        <input htmlFor="searchTerm" placeholder="Search For Quizzes" className="text-wrapper-3" />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  vector: PropTypes.string,
};
