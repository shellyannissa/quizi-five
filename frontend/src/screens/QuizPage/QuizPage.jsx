import React from 'react'
import { AdminHero } from '../../components/AdminHero/AdminHero'
import './QuizPage.css'
import { useParams } from 'react-router-dom'
import { QuizCard } from '../../components/QuizCard'

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
            {/* <QuizCard title="RoboWars" description="Nov 15, 6:00PM" imgSrc="https://picsum.photos/330/320" percentages={[0.1,0.3]}/> */}
        </div>
    )
}

export default QuizPage