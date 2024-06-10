import React, { useCallback, useState } from 'react';
import QUESTIONS from '../../questions.js'
import completeImg from '../quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';

const Quiz = () => {

    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionsIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;


    // tostop the quiz from breaking 
    const quizComplete = activeQuestionsIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer (selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers((prevAnswers => {
            return [...prevAnswers, selectedAnswer]
        }));

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionsIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            // we reset the answe state back to an empty string.
            setTimeout(() => {
                setAnswerState('')
            }, 2000)
        }, 1000)
        // we add activeQuestionsIndex to  the dependencies array because the vlaue should be recreated so that we do not use an outdated value
    }, [activeQuestionsIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(quizComplete) {
        return <div id='summary'>
            <img src={completeImg}  alt='the trophy'/>
            <h2>The Quiz is Completed</h2>
        </div>
    }


    // this shuffles the answers 
    const shuffledAnswers = [...QUESTIONS[activeQuestionsIndex].answers];
    shuffledAnswers.sort((a, b) => Math.random() - 0.5);
    

  return (
    <div id='quiz'>
        <div id='question'>
            <QuestionTimer 
                // the key prop(it can be added to any comp/element) is used here to re-render this comp as it it is not being rerendered since nothing is changing here 
                key={activeQuestionsIndex}
                timeout={10000} 
                onTimeout={handleSkipAnswer}
            />
            <h2>{QUESTIONS[activeQuestionsIndex].text}</h2>
            <ul id='answers'>
                {shuffledAnswers.map((answer) => {
                    const isSelected = userAnswers[userAnswers.length - 1] === answer;
                    let cssClass = '';

                    if(answerState === 'answered' && isSelected) {
                        cssClass = 'selected';
                    } 
                    if(answerState === 'correct' || answerState === 'wrong') {
                        cssClass = answerState;
                    }

                    return (<li key={answer} className='answer'>
                        <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>{answer}</button>
                    </li>
                    )
                })}
            </ul>
        </div>
    </div>
  )
}

export default Quiz
