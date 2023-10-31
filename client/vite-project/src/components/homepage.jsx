import { Link, useNavigate } from 'react-router-dom'
import './Homepage.css'
import { useState, useRef } from 'react'
import Avatar from './Avatar';
import React from 'react'

export default function Homepage(props) {
  const { setLanguageCallback } = props;

  const [hamburger, setHamburger] = useState(false);
  const answerRef = useRef(null);
  const quizRef = useRef(null);

  const navigate = useNavigate();

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
       <label>
      Select quiz language:
      <select name="selectedQuiz" ref={quizRef}>
        <option value="nameJapaneseHrkt">Japanese</option>
        <option value="nameEnglish">English</option>
        <option value="nameChineseTraditional">Chinese</option>
        <option value="nameFrench">French</option>
        <option value="nameGerman">German</option>
        <option value="nameSpanish">Spanish</option>
        <option value="nameItalian">Italian</option>
      </select>
    </label>
    <label>
      Select answers language:
      <select name="selectedAnswers" ref={answerRef}>
        <option value="nameJapaneseHrkt">Japanese</option>
        <option value="nameEnglish">English</option>
        <option value="nameChineseTraditional">Chinese</option>
        <option value="nameFrench">French</option>
        <option value="nameGerman">German</option>
        <option value="nameSpanish">Spanish</option>
        <option value="nameItalian">Italian</option>
      </select>
    </label>
    <button className='homelink' onClick={() => {
      console.log(setLanguageCallback)
      setLanguageCallback([quizRef.current.value, answerRef.current.value])
     // navigate('/quizJ-E');
      }}>Start</button>
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