import { Link } from 'react-router-dom'
import './Homepage.css'
import { useState } from 'react'
import Avatar from './Avatar';

export default function Homepage() {
  const [hamburger, setHamburger] = useState(false);

  function handleClick() {
    setHamburger((prev) => !prev)
  }
  
return (
    <>
    
    <div className='homedesign'>
    <br />
    <br />
    <Avatar></Avatar>
    <br />
    <Link to="/dictionary"><button className='homelink'>Dictionary</button></Link>
    <img className='home-pic' src="https://i.ibb.co/bN1GVf7/pokedic.png" alt="pokedictionary" />
    </div>
    <br />
    <br />
    <br />
    <br />
    <div className='homedesign'>

    

    <Link to='/quiztime' ><button className='homelink'>Timed Quiz</button>
    <img className='home-pic' src="https://i.ibb.co/ZV0zg0k/for-upload.png" alt="pokedictionary" />
    </Link>
    </div>
    <br />
    <br />
    <br />
    <br />

    {!hamburger ?
    <div className='homedesign'>
    <button className='homelink'onClick={handleClick}>Language Quiz</button>
    <img className='home-pic' src="https://i.ibb.co/ZV0zg0k/for-upload.png" alt="pokedictionary" />
    </div>
    :
    <div className='homedesign'>
    <Link to='/quizJ-E' ><button className='homelink'>Japanese to English</button></Link>
    <Link to='/quizE-Kor' ><button className='homelink'>English to Korean</button></Link>
    <Link to='/quizE-J' ><button className='homelink'>English to Japanese</button></Link>
    <Link to='/quizE-Chinese' ><button className='homelink'>English to Chinese</button></Link>
    <Link to='/quizE-Fre' ><button className='homelink'>English to French</button></Link>
    <Link to='/quizE-Germ' ><button className='homelink'>English to German</button></Link>
    <Link to='/quizE-Span' ><button className='homelink'>English to Spanish</button></Link>
    <Link to='/quizE-Ital' ><button className='homelink'>English to Italian</button></Link>
    <button className='homelink' onClick={handleClick}>Back to Home</button>
    </div>
    }


    <br />
    <br />
    <Link to="/graph"><button className='homelink'>Personal Tracker</button></Link>

    <br />
    <br />
    <div className='homedesign'>
    <Link to="/leaderboard"><button className='homelink'>Leaderboard</button></Link>
    <img className='home-pic' src="https://i.ibb.co/72wCKVs/highscoreupdated.png" alt="pokedictionary" />
    </div>
    </>
    )
}