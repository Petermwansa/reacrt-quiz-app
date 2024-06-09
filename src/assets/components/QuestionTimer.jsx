import React, { useEffect, useState } from 'react'

const QuestionTimer = ({ timeout, onTimeout }) => {
    const [remainingTime, setremainingTime] = useState(timeout)

    useEffect(() => {
        console.log('set timeout');
        const timer = setTimeout(onTimeout, timeout)

        return () => {
            clearTimeout(timer)
        }
    }, [timeout, onTimeout])


    useEffect(() => {
        console.log('set interval');
        const interval = setInterval(() => {
            setremainingTime((prevRemainingTime) => prevRemainingTime - 100)
        }, 100);

        // this clean up func will be run by react beofre it rund this comp again 
        return () => {
            clearInterval(interval)
        }
    }, [])


  return (
    <progress id='question-time' max={timeout} value={remainingTime}>
      
    </progress>
  )
}

export default QuestionTimer
