import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Homepage from './components/homepage';
import Dictionary from './components/dictionary';
import Quiz from './components/Quiz';
import Gameover from './components/Gameover';
import Graph from './components/Graph';
import Leaderboard from './components/Leaderboard';
import Timer from './components/Timer';
import QuizTimed from './components/QuizTimed';
import React, { useState} from 'react'


function App() {
  const [languageSelection, setLanguageSelection] = useState(["quiz", "answers"]);
 
  function callback(data) {
    console.log(languageSelection)
    setLanguageSelection(data)
    
  }

  return (

    <Router>
      <Routes>
  
      <Route path='/' element={ <LoginForm /> } />
      <Route path="/registration" element={ <RegistrationForm/> } />
      <Route path="home" element={ <Homepage setLanguageCallback={callback}/> }/>
      <Route path="/dictionary" element= { <Dictionary /> } />
      <Route path="/quizJ-E" element= {<Quiz isChallengeMode={false} languageQuiz={languageSelection[0]} languageAnswers={languageSelection[1]}/>}/>
      
      <Route path="/gameover" element= {<Gameover />}/>
      <Route path='/graph' element={ <Graph/>}/>
      <Route path='/leaderboard' element={ <Leaderboard/>}/>
      <Route path='/timer' element= { <Timer/>}/>
      <Route path="/quiztime" element= {<QuizTimed/>}  />
      </Routes>
  </Router>
  );
}

export default App
