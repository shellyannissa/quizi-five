import React from 'react'
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import "./Quiz.css"

const Quiz = () => {
  
    const questions = [
        {
            question: "Capital Of India?",
            options: ["Delhi", "Pune", "Calicut", "Italy"],
            correctOption: 0
        }
        ,
        {
            question: "How are you?",
            options: ["Fine", "Sad"],
            correctOption: 1
        }
    ];

    return (
    <div>
        <QuestionCard questions={questions} />
    </div>
  )
}

export default Quiz