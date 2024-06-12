import React, { useCallback, useState } from 'react';
import QUESTIONS from '../../questions.js';
import Questions from './Questions.jsx';
import Summary from './Summary.jsx';


const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionsIndex = userAnswers.length;

    // tostop the quiz from breaking 
    const quizComplete = activeQuestionsIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer (selectedAnswer) {
        setUserAnswers((prevAnswers => {
            return [...prevAnswers, selectedAnswer]
        }));

        // we add activeQuestionsIndex to  the dependencies array because the vlaue should be recreated so that we do not use an outdated value
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(quizComplete) {
        return <Summary userAnswers={userAnswers} />
    }

  return (
    <div id='quiz'>
        <Questions
            // the key prop(it can be added to any comp/element) is used here to re-render this comp as it it is not being rerendered since nothing is changing here 
            key={activeQuestionsIndex}
            index={activeQuestionsIndex}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
        />
    </div>
  );
}

export default Quiz;
