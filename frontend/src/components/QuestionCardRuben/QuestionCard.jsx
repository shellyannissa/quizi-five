import React, {useState} from 'react'
import "./QuestionCard.css"
import { Button } from '../Button/Button';
import { AnswerCard } from '../AnswerCard/AnswerCard';

export const QuestionCard = ({ questions }) => {
  
    const [ currentQuestion, setCurrentQuestion ] = useState(0);
    const currentQuestionData = questions[currentQuestion];
    const counts = [
        [3,4,1,2],[2,3]
    ];
    const currentQuestionCount = counts[currentQuestion];

    const handleNextQuestion = () => {
        if(currentQuestion === questions.length - 1) {
            setCurrentQuestion(0);
        }
        else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevQuestion = () => {
        if(currentQuestion === 0) {
            setCurrentQuestion(questions.length - 1);
        }
        else {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
    <div className="question-container">
        <h2 className="question-title">{currentQuestionData.question}</h2>
        <AnswerCard options={currentQuestionData.options} correctOption={currentQuestionData.correctOption} initCounts={currentQuestionCount}/>
        <div className="button-group">
            <Button clickHandler={handleNextQuestion} text="NEXT"/>
            <Button clickHandler={handlePrevQuestion} text="PREVIOUS"/>
        </div>
    </div>
  )

}

