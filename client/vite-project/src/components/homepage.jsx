import { Link, useNavigate } from "react-router-dom";
import "./Homepage.css";
import { useState, useRef, useContext } from "react";
import Avatar from "./Avatar";
import React from "react";

export default function Homepage(props) {
  const { setLanguageCallback, setGameModeCallback } = props;

  const [hamburger, setHamburger] = useState(false);
  const [playIsClicked, setPlayIsClicked] = useState(false);
  const answerRef = useRef(null);
  const quizRef = useRef(null);
  const modeRef = useRef(null);

  const navigate = useNavigate();

  function handlePlayClick() {
    setPlayIsClicked(!playIsClicked);
  }

  function handleClick() {
    setHamburger((prev) => !prev);
  }

  return (
    <>
      <div className="homedesign">
        <Link to="/dictionary">
          <button className="homelink">Dictionary</button>
        </Link>
        <img
          className="home-pic"
          src="https://i.ibb.co/bN1GVf7/pokedic.png"
          alt="pokedictionary"
        />
      </div>
      {!playIsClicked ? (
        <div className="homedesign">
          <button className="homelink" onClick={handlePlayClick}>
            Play
          </button>
          <img
            src="https://i.ibb.co/jWSnj91/pikachu.png"
            alt="pikachu"
            className="home-pic"
          />
        </div>
      ) : (
        <div className="homedesign">
          <img
            className="home-pic"
            src="https://i.ibb.co/ZV0zg0k/for-upload.png"
            alt="pokedictionary"
          />
          <label>
            Game Mode:
            <select name="selectedMode" ref={modeRef}>
              <option value="normal">Normal</option>
              <option value="challenge">Challenge</option>
              <option value="shadow">Shadow</option>
            </select>
          </label>
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
              <option value="nameEnglish">English</option>
              <option value="nameJapaneseHrkt">Japanese</option>
              <option value="nameChineseTraditional">Chinese</option>
              <option value="nameFrench">French</option>
              <option value="nameGerman">German</option>
              <option value="nameSpanish">Spanish</option>
              <option value="nameItalian">Italian</option>
            </select>
          </label>
          <div className="homedesign" id="gameButtonContainer">
            <button
              className="homelink"
              onClick={async () => {
                await setLanguageCallback([
                  quizRef.current.value,
                  answerRef.current.value,
                ]);
                await setGameModeCallback(modeRef.current.value);
                navigate("/quizJ-E");
              }}
            >
              Timed Quiz
            </button>
            <button
              className="homelink"
              onClick={async () => {
                await setLanguageCallback([
                  quizRef.current.value,
                  answerRef.current.value,
                ]);
                await setGameModeCallback(modeRef.current.value);
                navigate("/quizJ-E");
              }}
            >
              Language Quiz
            </button>
            <button className="homelink" onClick={handlePlayClick}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="homedesign">
        <Link to="/leaderboard">
          <button className="homelink">Leaderboard</button>
        </Link>
        <img
          className="home-pic"
          src="https://i.ibb.co/W22vpm7/pokemon.png"
          alt="pokedictionary"
        />
      </div>
    </>
  );
}
