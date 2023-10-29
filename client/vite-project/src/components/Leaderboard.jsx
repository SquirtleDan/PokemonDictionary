import React, { useState, useEffect, useContext } from "react";
import './Leaderboard.css'
import axios from 'axios';
import { Link } from 'react-router-dom'

import { playerInfo } from "./LoginForm";

export default function Leaderboard() {
    const [rankings, setRankings] = useState({ 1: [], 2: [] });
    const [gameMode, setGameMode] = useState(1);

    // let accountId = useContext(playerInfo);
  
  const createRanking = (data) => {
    const wholeData = data.filter(score => score.value !== null);
    while (wholeData.length < 12) {
      wholeData.push({ value: 0, username: '-------' });
    }
    return wholeData.slice(0, 12);
  };
  
    useEffect(() => {
      const fetchRankings = async () => {
        try {
          const response = await axios.get(`https://pokedictionarygamedev.onrender.com/score/getAllRanking`);
          const rankingsData = {
            1: createRanking(response.data[0]),
            2: createRanking(response.data[1])
          };
          setRankings(rankingsData);
        } catch (error) {
          console.error('Failed to get ranking data:', error);
        }
      };
  
      fetchRankings();
    }, []);
  
  
    return (
      <div> 
  
        <h2 className="leadBanner">Leaderboard (Game Mode {gameMode})</h2>
        <button className="game-mode-button" onClick={() => setGameMode(1)}>Timer</button>
        <button className="game-mode-button" onClick={() => setGameMode(2)}>Stock</button>
        <Link to="/home"><button className="leader-back-home"> Home</button></Link>
        <table className="score-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rankings[gameMode].map((score, index) => (
              <tr key={index} className={`rank-${index + 1}`}>
                <td>{index + 1}</td>
                <td>{score.username}</td>
                <td>{score.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
 
    );
}