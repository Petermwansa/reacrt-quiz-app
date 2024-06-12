import React, { useState } from 'react';
import QuestionTimer from './QuestionTimer';
import Answer from './Answer';
import QUESTIONS from '../../questions';

const Questions = ({index, onSelectAnswer, onSkipAnswer}) => {

    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000;

    // if the answer was clicked and true, we set the timer to 1000 it will be revielled after that 
    if (answer.selectedAnswer) {
        timer = 1000
    }

    // if we have the info if tyhe answer is correct or not
    if(answer.isCorrect !== null) {
        timer = 2000;
    }

    const handleSelectAnswer = (answer) => {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer)
            }, 2000);
        }, 1000);
    }

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer){
        answerState = 'answered';
    }

  return (
    <div id='question'>
        <QuestionTimer
            key={timer}
            timeout={timer} 
            onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
            mode={answerState}
        />
        <h2>{QUESTIONS[index].text}</h2>
        <Answer
            answers={QUESTIONS[index].answers} 
            selectedAnswer={answer.selectedAnswer}
            answerState={answerState}
            onSelect={handleSelectAnswer}
        />
    </div>
  )
}

export default Questions;
