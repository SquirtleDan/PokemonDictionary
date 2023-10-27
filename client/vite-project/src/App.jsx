import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Homepage from './components/homepage';
import Dictionary from './components/dictionary';
import Quiz from './components/Quiz';




function App() {
 

  return (
    <Router>
      <Routes>
      <Route path='/' element={ <LoginForm /> } />
      <Route path="registration" element={ <RegistrationForm/> } />
      <Route path="home" element={ <Homepage/> }/>
      <Route path="dictionary" element= { <Dictionary /> } />
      <Route path="quiz" element= {<Quiz/>}  />
      
      </Routes>
  </Router>
  );
  
}

export default App
