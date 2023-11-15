import React from 'react'
import { Profile } from '../Profile/Profile'
import { SearchBar } from '../SearchBar/SearchBar'
import './Hero.css'

export const Hero = () => {
  return (
    <div className="hero-section">
      <div className="top-part">
        <Profile className="profile"/>
      </div>
      <div className="bottom-part">
          <p className="QUIZZES-for-you">
            <span className="quiz">QUIZZES</span>
            <span>&nbsp;</span>
            <span className="for-you">For You</span>
          </p>
          <div className="sea">
          <SearchBar />
          </div>
      </div>
    </div>
  )
}
