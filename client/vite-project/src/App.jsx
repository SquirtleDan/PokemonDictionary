<<<<<<< development
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
import QuizEtoJ from './components/QuizEtoJ';
import QuizEtoKorean from './components/QuizEtoKorean';
import QuizEtoChinese from './components/QuizEtoChinese';
import QuizEtoFrench from './components/QuizEtoFrench';
import QuizEtoGerman from './components/QuizEtoGerman';
import QuizEtoSpanish from './components/QuiztoSpanish';
import QuizEtoItalian from './components/QuiztoItallian';


function App() {
 

  return (

    <Router>
      <Routes>
  
      <Route path='/' element={ <LoginForm /> } />
      <Route path="registration" element={ <RegistrationForm/> } />
      <Route path="home" element={ <Homepage/> }/>
      <Route path="/dictionary" element= { <Dictionary /> } />
      <Route path="/quizJ-E" element= {<Quiz/>}  />
      <Route path="/quizE-J" element= {<QuizEtoJ/>}  />
      <Route path="/quizE-Kor" element= {<QuizEtoKorean/>}  />
      <Route path="/quizE-Chinese" element= {<QuizEtoChinese/>}  />
      <Route path="/quizE-Fre" element= {<QuizEtoFrench/>}  />
      <Route path="/quizE-Germ" element= {<QuizEtoGerman/>}  />
      <Route path="/quizE-Span" element= {<QuizEtoSpanish/>}  />
      <Route path="/quizE-Ital" element= {<QuizEtoItalian/>}  />
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
