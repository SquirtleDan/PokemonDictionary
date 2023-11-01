import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
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
import React, { useState } from 'react'
import { set } from 'react-hook-form';


function App() {
  const [languageSelection, setLanguageSelection] = useState(["quiz", "answers"]);
  const [gameMode, setGameMode] = useState("normal");

  function languageCallback(data) {
    setLanguageSelection(data)
  }

  function gameModeCallback(data) {
    setGameMode(data);
  }

  return (
    <Router>
      <Routes>
      <Route path='/' element={ <LoginForm /> } />
      <Route path="/registration" element={ <RegistrationForm/> } />
      <Route path="/home" element={ <Homepage setLanguageCallback={languageCallback} setGameModeCallback={gameModeCallback}/> }/>
      <Route path="/dictionary" element= { <Dictionary /> } />
      <Route path="/quizJ-E" element= {<Quiz gameMode={gameMode} languageQuiz={languageSelection[0]} languageAnswers={languageSelection[1]}/>}/>
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
