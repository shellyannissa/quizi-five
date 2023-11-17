import React from 'react'
import { AdminHero } from '../../components/AdminHero/AdminHero'
import './QuizPage.css'
import { useParams } from 'react-router-dom'

const QuizPage = ({quiz}) => {

    const { quizId } = useParams();
    const [searchTerm, setSearchTerm] = React.useState("");
  
    const handleSearch = (event) => {
      const term = event.target.value;
      setSearchTerm(term);
    }

    return (
        <div className='quiz-page'>
            <AdminHero searchTerm={searchTerm} handleSearch={handleSearch}/>
        </div>
    )
}

export default QuizPage