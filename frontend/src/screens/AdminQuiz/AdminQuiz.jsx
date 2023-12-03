import React, { useEffect, useState } from "react";
import { AdminHero } from "../../components/AdminHero/AdminHero";
import "./AdminQuiz.css";
import { useParams } from "react-router-dom";
import DynamicTextComponent from "../../components/DynamicText/DynamicTextComponent";


const AdminQuiz = ({ quiz }) => {
  const ENDPOINT = "http://localhost:8000";
  const questions = [  ];

  const { quizId } = useParams();
  const [searchTerm, setSearchTerm] = React.useState("");

  const [trigger, setTrigger] = React.useState(false);
  const clickHandler = () => {
    setTrigger(true);
  };
  const triggerHandler = () => {
    setTrigger(false);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };



  return (
    <div className="quiz-page">
      <AdminHero
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        isQuestion={true}
        trigger={trigger}
        triggerHandler={triggerHandler}
        clickHandler={clickHandler}
      />
        <DynamicTextComponent quizId={quizId}/>
    </div>
  );
};

export default AdminQuiz;
