import React from 'react'
import "./QuizCard.css";

export const QuizCard = (props) => {
  return (
    <div className="quizcard-container">
        <img src={props.imgSrc} alt="Robowars Image" className='quiz-image'/>
        {props.title && <h1 className='quiz-title'>{props.title}</h1>}
        {props.description && <p className='quiz-desc'>{props.description} </p>}

        {/* <button></button> */}
        <a href="register" className='reg-link'>Register</a>
        </div>
  )
}
