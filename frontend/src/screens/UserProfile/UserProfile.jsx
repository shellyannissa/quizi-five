import React from 'react'
import { Button } from '../../components/Button/Button'
import { QuizCard } from '../../components/QuizCard/QuizCard'
import './UserProfile.css'

const UserProfile = () => {
    
    const logoutHandler = () => {
        console.log('logout handler');
    }
    const userName = 'Pikachu';
    const listQuiz = [
        {
            quizType: "General Quiz",
            quizName: "Generally a quiz",
            image: "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/63fd90f31203c_json_image_1677562099.webp",
            time: "10:00 AM",
            month: "JAN",
            day: "12",
        },
        {
            quizType: "Sports Quiz",
            quizName: "Sports is cool",
            image: "https://img.freepik.com/free-vector/quiz-night-concept-illustration_114360-1334.jpg?size=626&ext=jpg",
            time: "09:00 PM",
            month: "JUN",
            day: "23",
        },
        {
            quizType: "Entertainment Quiz",
            quizName: "Entertainment is cool",
            image: "https://img.freepik.com/free-vector/quiz-night-concept-illustration_114360-1334.jpg?size=626&ext=jpg",
            time: "09:00 PM",
            month: "JUN",
            day: "23",
        },
        {
            quizType: "Science Quiz",
            quizName: "Science is cool",
            image: "https://img.freepik.com/free-vector/quiz-night-concept-illustration_114360-1334.jpg?size=626&ext=jpg",
            time: "09:00 AM",
            month: "APR",
            day: "01",
        },
        {
            quizType: "Science Quiz",
            quizName: "Science is cool",
            image: "https://img.freepik.com/free-vector/quiz-night-concept-illustration_114360-1334.jpg?size=626&ext=jpg",
            time: "09:00 AM",
            month: "APR",
            day: "01",
        }
    ];

    return (
        <div className='user-profile'>
            <div className="profile-section">
                <div className="hero-left">
                    <h1>{userName}</h1>
                    <Button text='Logout' clickHandler={logoutHandler} />
                    <h2>Quiz History</h2>
                </div>
                <div className="hero-right">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="avatar"/>
                </div>
            </div>
            <div className={'quiz-list'}>
                <div className="list-of-quizzes">
                    {
                        listQuiz.map((quiz, index) => {
                            return (
                                <QuizCard key={index} quizType={quiz.quizType} quizName={quiz.quizName} image={quiz.image} month={quiz.month} day={quiz.day} time={quiz.time} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default UserProfile