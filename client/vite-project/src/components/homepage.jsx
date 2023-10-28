import { Link } from 'react-router-dom'
import './Homepage.css'

export default function Homepage() {

  
  
return (
    <>
    <div></div>
    <Link to="/dictionary"><button>Dictionary</button></Link>
    <Link to="/quiz"><button>Quiz</button></Link>
    <Link to="/leaderboard"><button>Leaderboard</button></Link>
    </>
    )
}