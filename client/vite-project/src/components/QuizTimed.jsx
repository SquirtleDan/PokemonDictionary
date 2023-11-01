import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Gameover from "./Gameover";
import Timer from "./Timer";
import { playerInfo, username } from "./LoginForm";
import "./QuizTimed.css";
("use strict");
export default function QuizTimed() {
  //State Variables
  const [data, setData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [singlePokemon, setSinglePokemon] = useState(null);
  const [singlePokeData, setSinglePokeData] = useState(false);
  const [names, setNames] = useState(null);
  const [score, setScore] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [quizResultsSent, setQuizResultsSent] = useState(false);
  const [time, setTime] = useState(10);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeCount, setTimeCount] = useState(0);
  const [finalSendScore, setFinalSendScore] = useState(null);
  const [answerResult, setAnswerResult] = useState("");
  const [answer, setAnswer] = useState(false);
  //Use Effects
  const playerId = useContext(playerInfo);
  // const playerUsername = useContext(username)
  useEffect(() => {
    getName();
    setScore(null);
    setQuizResults(null);
    setFinalScore(null);
    setAnswer(false);
  }, [quizResultsSent]);
  //Check check if data is fetched
  useEffect(() => {
    if (data) {
      setDataFetched(true);
    }
  }, [data]);
  //get random pokemon
  useEffect(() => {
    if (dataFetched) {
      let randPoke = getRandomPokemon();
      setSinglePokemon(randPoke[Math.floor(Math.random() * randPoke.length)]);
      setNames(randPoke);
    }
  }, [dataFetched, score, wrongCount]);
  //get single pokemon
  useEffect(() => {
    if (singlePokemon) {
      let newData = [];
      setSinglePokeData(true);
      newData = data.filter((element) => element.id !== singlePokemon.id);
      setData(newData);
    }
  }, [singlePokemon]);
  //get image
  useEffect(() => {
    if (singlePokeData) {
      setImageUrl(singlePokemon.frontPicture);
    }
  }, [singlePokeData, score, singlePokemon]);
  //set final score
  useEffect(() => {
    if (timeCount === 0) {
      setFinalScore(score);
    }
  }, [timeCount]);
  //create quiz result object
  useEffect(() => {
    if (finalScore || timeCount === 1) {
      let date = new Date().toISOString();
      setFinalSendScore(score);
      const obj = {
        accountId: playerId,
        gameModeId: 1,
        value: score,
        sessionDateTime: date,
      };
      setQuizResults(obj);
    }
  }, [finalScore, timeCount]);
  //send quiz result back to server
  useEffect(() => {
    if (quizResults) {
      sendResults();
      setQuizResultsSent(true);
    }
  }, [quizResults]);
  useEffect(() => {}, [quizResultsSent]);
  //helper function
  const getName = async function () {
    const pokemonData = await axios.get(
      "https://pokedictionarygamedev.onrender.com/GetAllPokemon?amount=721"
    );
    setData(pokemonData.data);
  };
  //helper function to send data to server
  const sendResults = async () => {
    console.log(quizResults)
    const url = "https://pokedictionarygamedev.onrender.com/score/save";
    const returnedData = await axios.post(url, quizResults);
  };
  //Makes random array of 4 pokemon
  function getRandomPokemon() {
    const array = [];
    const dict = {};
    let count = 0;
    for (let j = 0; j < data.length; j++) {
      dict[data[j].id] = false;
    }
    while (count < 4) {
      let randomIndex = Math.floor(Math.random() * data.length);
      if (!dict[data[randomIndex]]) {
        array.push(data[randomIndex]);
        dict[data[randomIndex].id] = true;
        count++;
      }
    }
    return array;
  }
  //Handler Functions
  function handleClick(event) {
    if (event === singlePokemon.id) {
      setScore((prev) => (prev = prev + 1));
      setAnswerResult("Correct!");
      setAnswer(true);
    }
    if (event !== singlePokemon.id) {
      setWrongCount((prev) => (prev += 1));
      setAnswerResult("Good Try");
      setAnswer(true);
    }
  }
  //if timer is up
  function handleTimeIsUp() {
    setTimeCount((prev) => prev + 1);
  }
  return (
    <>
      {!quizResultsSent ? (
        <>
          <h1 className="quiztext">Quiz</h1>
          <h2 className="quiztext">Current Score: {score}</h2>
          <div className="question-card">
            {singlePokeData ? (
              <div className="quiztext">
                <img src={imageUrl} alt="" />
                <br />
                {singlePokemon.nameJapaneseHrkt}
                <br />
                {singlePokemon.nameJapaneseRomaji}
              </div>
            ) : (
              <div>Loading</div>
            )}
            <br />
            <br />
            {singlePokeData ? (
              <>
                <button
                  className="english"
                  id="button1"
                  key="first"
                  onClick={() => handleClick(names[0].id)}
                >
                  {names[0].nameEnglish}
                </button>
                <button
                  className="english"
                  id="button2"
                  key="second"
                  onClick={() => handleClick(names[1].id)}
                >
                  {names[1].nameEnglish}
                </button>
                <button
                  className="english"
                  id="button3"
                  key="third"
                  onClick={() => handleClick(names[2].id)}
                >
                  {names[2].nameEnglish}
                </button>
                <button
                  className="english"
                  id="button4"
                  key="fourth"
                  onClick={() => handleClick(names[3].id)}
                >
                  {names[3].nameEnglish}
                </button>
                <br />
              </>
            ) : (
              <div>Loading</div>
            )}
          </div>
          <br />
          <Timer time={time} onTimeUp={handleTimeIsUp} key="timerforthis" />
          <br />
          <br />
          <Link to="/home">
            <button className="english">Give Up?</button>
          </Link>
          {answer ? (
            <>
              <div className="quiztext">{answerResult}</div>
            </>
          ) : (
            <div className="quiztext"></div>
          )}
        </>
      ) : (
        <Gameover score={finalSendScore} quizResultsSent={setQuizResultsSent} />
      )}
    </>
  );
}