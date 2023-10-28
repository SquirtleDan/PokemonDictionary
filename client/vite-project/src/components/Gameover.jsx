import React from "react";
import { Link } from "react-router-dom";
import './Gameover.css'

export default function Gameover(props) {
    const score = props.score

    return(
        <>
        <div>Game Over</div>
        <div>Final Score: {score}</div>
        <Link to="/home"><button>Home</button></Link>
        <Link to="/leaderboard"><button>Leaderboard</button></Link>
        </>
    )
}