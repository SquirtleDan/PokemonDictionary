import { Link } from 'react-router-dom'
import './Homepage.css'
import { useState } from 'react'

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
    <br />
    <br />
    <br />
    <br />
    <br />
    <Link to="/dictionary"><button className='homelink'>Dictionary</button></Link>
    <img src="https://i.ibb.co/bN1GVf7/pokedic.png" alt="pokedictionary" />
    </div>
    <br />
    <br />
    <br />
    <br />
    <div className='homedesign'>
    <Link to='/quiztime' ><button className='homelink'>Timed Quiz</button>
    <img src="https://i.ibb.co/CBBZfW5/eveehuh.png" alt="pokedictionary" />
    </Link>
    </div>
    <br />
    <br />
    <br />
    <br />



    {hamburger ?
    <div className='homedesign'>
    <Link to='/quizJ-E' ><button className='homelink'>Japanese to English</button></Link>
    <Link to='/quizE-Kor' ><button className='homelink'>English to Korean</button></Link>
    <Link to='/quizE-J' ><button className='homelink'>English to Japanese</button></Link>
    <Link to='/quizE-Chinese' ><button className='homelink'>English to Chinese</button></Link>
    <Link to='/quizE-Fre' ><button className='homelink'>English to French</button></Link>
    <Link to='/quizE-Germ' ><button className='homelink'>English to German</button></Link>
    <button className='homelink' onClick={handleClick}>Back to Home</button>
    </div> :
    
    <div>
        <button className='homelink' onClick={handleClick}>Quiz: Language</button>
    <img src="https://i.ibb.co/CBBZfW5/eveehuh.png" alt="pokedictionary" /></div>
    }

    <br />
    <br />
    <br />
    <br />
    <div className='homedesign'>
    <Link to="/leaderboard"><button className='homelink'>Leaderboard</button></Link>
    <img src="https://i.ibb.co/72wCKVs/highscoreupdated.png" alt="pokedictionary" />
    </div>
    </>
    )
}