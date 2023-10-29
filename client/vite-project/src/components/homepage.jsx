import { Link } from 'react-router-dom'
import './Homepage.css'

export default function Homepage() {
  
  
return (
    <>
    <div className='homedesign'>
    <br />
    <br />
    <br />
    <Link to="/dictionary"><button className='homelink'>Dictionary</button></Link>
    <img className='home-pic' src="https://i.ibb.co/bN1GVf7/pokedic.png" alt="pokedictionary" />
    </div>
    <br />
    <br />
    <br />
    <br />
    <div className='homedesign'>
    <Link to='/quiz' ><button className='homelink'>Quiz</button>
    <img className='home-pic' src="https://i.ibb.co/CBBZfW5/eveehuh.png" alt="pokedictionary" />
    </Link>
    </div>
    <br />
    <br />
    <br />
    <br />
    <div className='homedesign'>
    <Link to='/quiztime' ><button className='homelink'>Timed Quiz</button>
    <img className='home-pic' src="https://i.ibb.co/CBBZfW5/eveehuh.png" alt="pokedictionary" />
    </Link>
    </div>
    <br />
    <br />
    <br />
    <br />
    <div className='homedesign'>
    <Link to="/leaderboard"><button className='homelink'>Leaderboard</button></Link>
    <img className='home-pic' src="https://i.ibb.co/72wCKVs/highscoreupdated.png" alt="pokedictionary" />
    </div>
    </>
    )
}