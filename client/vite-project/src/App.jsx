import { useState } from 'react'
import './App.css'
import { LoginForm } from './components/LoginForm'
import { RegistrationForm } from './components/RegistrationForm'
import { Quiz } from './components/Quiz'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Quiz />
    </div>
  )
}

export default App
