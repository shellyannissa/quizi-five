import React from 'react'

export const Answers = ( { handleOptionClick, selectedOption, index, isCorrect, option } ) => {
  return (
    <div>
        <button key={index} onClick={() => handleOptionClick(index)} className={`option ${selectedOption === index ? "selected" : ""} ${isCorrect(index) ? "correct" : (selectedOption === index) ? "incorrect" : ""}`}>
        {option}
        </button>
    </div>
  )
}
