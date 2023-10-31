import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Gameover.css";

export default function Gameover(props) {
  const score = props.score;
  const refresh = props.quizResultsSent;

  // handler
  function handleClick() {
    refresh(false);
  }

  return (
    <div className="completeContainer">
      <div className="gameoverContainer">
        <br />
        <br />
        <br />
        <div className="gameover">
          Game Over
          <br />
          <img
            className="gameover-pic"
            src="https://i.ibb.co/L514Ttn/gameover.jpg"
            alt="GameOver"
          />
        </div>
      </div>
      <br />
      <br />
      <div className="gameover">
        Final Score: {score}
        <br />
        <br />
        <img
          className="gameover-pic"
          src="https://i.ibb.co/7JgMBZC/xpup.jpg"
          alt="FinalScore"
        />
      </div>
      <br />
      <br />
      <div className="gameover">
        <Link to="/home">
          <button className="link">Home</button>
        </Link>
        <br />
        <Link to="/leaderboard">
          <button className="link">Leaderboard</button>
        </Link>
        <br />
        <button className="link" onClick={handleClick}>
          Play Again?
        </button>
      </div>
    </div>
  );
}
