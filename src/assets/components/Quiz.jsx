import React, { useState } from 'react';
import QUESTIONS from '../../questions.js'

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionsIndex = userAnswers.length;

    function handleSelectAnswer (selectedAnswer) {
        setUserAnswers((prevAnswers => {
            return [...prevAnswers, selectedAnswer]
        }));
    }

  return (
    <div id='quiz'>
        <div className='question'>
            <h2>{QUESTIONS[activeQuestionsIndex].text}</h2>
            <ul id='answers'>
                {QUESTIONS[activeQuestionsIndex].answers.map((answer) => {
                    <li key={answer} className='answer'>
                        <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                    </li>
                })}
            </ul>
        </div>
    </div>
  )
}

export default Quiz
