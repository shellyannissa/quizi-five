import React from 'react'
import { AdminHero } from '../../components/AdminHero/AdminHero'
import './QuizPage.css'
import { useParams } from 'react-router-dom'

const QuizPage = ({quiz}) => {

    const { quizId } = useParams();
    const [searchTerm, setSearchTerm] = React.useState("");

    const [trigger, setTrigger] = React.useState(false);
    const clickHandler = () => {
        setTrigger(true);
    }
    const triggerHandler = () => {
        setTrigger(false);
    }

    const handleSearch = (event) => {
      const term = event.target.value;
      setSearchTerm(term);
    }

    return (
        <div className='quiz-page'>
            <AdminHero searchTerm={searchTerm} handleSearch={handleSearch} isQuestion={true} trigger={trigger} triggerHandler={triggerHandler} clickHandler={clickHandler}/>
        </div>
    )
}

export default QuizPage