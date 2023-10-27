import './App.css'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
 

  return (
    <Router>
      <Routes>
      <Route path='/' element={ <LoginForm /> } />
      <Route path="registration" element={ <RegistrationForm/> } />
      </Routes>
  </Router>
  );
  
}

export default App
