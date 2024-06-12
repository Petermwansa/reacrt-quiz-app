import React, { useEffect, useState } from 'react'

const QuestionTimer = ({ timeout, onTimeout, mode}) => {
    const [remainingTime, setremainingTime] = useState(timeout)

    useEffect(() => {
        console.log('set timeout');
        const timer = setTimeout(onTimeout, timeout)

        // this clean up func will be run by react before it runs this comp again 
        return () => {
            clearTimeout(timer)
        }
    }, [timeout, onTimeout])


    useEffect(() => {
        console.log('set interval');
        const interval = setInterval(() => {
            setremainingTime((prevRemainingTime) => prevRemainingTime - 100)
        }, 100);

        // this clean up func will be run by react before it runs this comp again 
        return () => {
            clearInterval(interval)
        }
    }, [])


  return (
    <progress 
        id='question-time' 
        max={timeout} 
        value={remainingTime}
        className={mode}
    />

  )
}

export default QuestionTimer;
