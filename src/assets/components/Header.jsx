import React from 'react';
import logoImg from '../quiz-logo.png';

const Header = () => {
  return (
    <header>
      <img src={logoImg} alt='the logo'/>
      <h1>Quiz</h1>

    </header>
  )
}

export default Header
