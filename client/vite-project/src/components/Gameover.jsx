import React, {useState} from "react";
import { Link } from "react-router-dom";
import './Gameover.css'

export default function Gameover(props) {
    const score = props.score;
    const refresh = props.quizResultsSent;
    
    // handler
    function handleClick() {
        refresh(false)
    }

    return(
        <>
        <div className="gameoverContainer">

        <div className="gameover">Game Over
        <img src="https://i.ibb.co/L514Ttn/gameover.jpg" alt="GameOver" />
        </div>
        </div>

        
        <div className="gameover">Final Score: {score}
        <img src="https://i.ibb.co/7JgMBZC/xpup.jpg" alt="FinalScore" />
        </div>

        <div className="gameover">
        <Link  to="/home"><button className='link'>Home</button></Link>
        <Link  to="/leaderboard"><button className='link'>Leaderboard</button></Link>
        <button className='link'onClick={handleClick}>Play Again?</button>
        </div>

        
        </>
    )
}