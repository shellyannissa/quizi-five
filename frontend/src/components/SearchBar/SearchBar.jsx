import PropTypes from "prop-types";
import React from "react";
import "./SearchBar.css";

export const SearchBar = ({ property, searchTerm, handleSearch }) => {
  return (
    <div className="search-bar">
      <div className="frame">
        <img
          className="vector"
          alt="search"
          src="../../assets/icons/search.svg"
        />
        <input
          htmlFor="searchTerm"
          placeholder="Search For Quizzes"
          className="hint-text"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  vector: PropTypes.string,
};
