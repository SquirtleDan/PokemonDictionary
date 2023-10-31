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
    
    <Avatar></Avatar>
    <br />
    <Link to="/dictionary"><button className='homelink'>Dictionary</button></Link>
    <img className='home-pic' src="https://i.ibb.co/bN1GVf7/pokedic.png" alt="pokedictionary" />
    </div>
    <br />
    <br />
    
    <div className='homedesign'>

    

    <Link to='/quiztime' ><button className='homelink'>Timed Quiz</button>
    <img className='home-pic' src="https://i.ibb.co/ZV0zg0k/for-upload.png" alt="pokedictionary" />
    </Link>
    </div>
    <br />
    <br />
   

    {!hamburger ?
    <div className='homedesign'>
    <button className='homelink'onClick={handleClick}>Language Quiz</button>
    <img className='home-pic' src="https://i.ibb.co/ZV0zg0k/for-upload.png" alt="pokedictionary" />
    </div>
    :
<div className='homedesign'>
  <ul className='menu-list'>
    <li>
      <Link to='/quizJ-E'>Japanese to English</Link>
    </li>
    <li>
      <Link to='/quizE-Kor'>English to Korean</Link>
    </li>
    <li>
      <Link to='/quizE-J'>English to Japanese</Link>
    </li>
    <li>
      <Link to='/quizE-Chinese'>English to Chinese</Link>
    </li>
    <li>
      <Link to='/quizE-Fre'>English to French</Link>
    </li>
    <li>
      <Link to='/quizE-Germ'>English to German</Link>
    </li>
    <li>
      <Link to='/quizE-Span'>English to Spanish</Link>
    </li>
    <li>
      <Link to='/quizE-Ital'>English to Italian</Link>
    </li>
  </ul>
  <button className='homelinkback' onClick={handleClick}>Close Menu</button>
</div>

    }


    <br />
    <br />
    <Link to="/graph"><button className='homelink'>Tracker</button></Link>
    <br/>
    <br />
    
    <div className='homedesign'>
    <Link to="/leaderboard"><button className='homelink'>Leaderboard</button></Link>
    <img className='home-pic' src="https://i.ibb.co/72wCKVs/highscoreupdated.png" alt="pokedictionary" />
    </div>
    </>
    )
}