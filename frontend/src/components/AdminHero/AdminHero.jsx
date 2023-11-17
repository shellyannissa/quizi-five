import React from 'react'
import { Profile } from '../Profile/Profile'
import { SearchBar } from '../SearchBar/SearchBar'
import CreateButton from '../CreateButton/CreateButton'
import QuizForm from '../QuizForm/QuizForm'
import '../Hero/Hero.css'
import './AdminHero.css'

export const AdminHero = ({ searchTerm, handleSearch}) => {
  const [trigger, setTrigger] = React.useState(false);
  const clickHandler = () => {
    setTrigger(true);
  }

  const triggerHandler = () => {
    setTrigger(false);
  }

  return (
    <div className="hero-section">
      <div className="top-part">
        <Profile className="profile"/>
      </div>
      <div className="bottom-part">
        <div className="hero-left">
          <p className="QUIZZES-for-you">
            <span className="quiz">QUIZZES</span>
            <span>&nbsp;</span>
            <span className="for-you">By You</span>
          </p>
          <div className="quiz-type-admin">
            <SearchBar property='registerd' searchTerm={searchTerm} handleSearch={handleSearch}/>
            <CreateButton textContent="New" clickHandler={clickHandler} />
          </div>
        </div>
        <div className="hero-right-admin">
          <img src="../../assets/images/quiz-hero.avif" alt="poster" />
        </div>
        <QuizForm trigger={trigger} triggerHandler={triggerHandler}/>
      </div>
    </div>
  )
}
