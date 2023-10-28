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


function App() {
 

  return (
    <Router>
      <Routes>
      <Route path='/' element={ <LoginForm /> } />
      <Route path="registration" element={ <RegistrationForm/> } />
      <Route path="home" element={ <Homepage/> }/>
      <Route path="/dictionary" element= { <Dictionary /> } />
      <Route path="/quiz" element= {<Quiz/>}  />
      <Route path="gameover" element= {<Gameover />}/>
      <Route path='graph' element={ <Graph/>}/>
      <Route path='leaderboard' element={ <Leaderboard/>}/>
      <Route path='timer' element= { <Timer/>}/>
      </Routes>
  </Router>
  );
  
}

export default App
