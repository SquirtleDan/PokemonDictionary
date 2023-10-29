import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Quiz.css'
import axios from 'axios'
import Gameover from './Gameover';
import Timer from './Timer';
import { playerInfo, username } from './LoginForm';
'use strict';

export default function Quiz() {
    //State Variables
    const [data, setData] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [singlePokemon, setSinglePokemon] = useState(null);
    const [singlePokeData, setSinglePokeData] = useState(false);
    const [englishNames, setEnglishNames] = useState(null);
    const [score, setScore] = useState(null);
    const [lives, setLives] = useState(3)
    const [imageUrl, setImageUrl] = useState(null);
    const [finalScore, setFinalScore] = useState(null);
    const [quizResults, setQuizResults] = useState(null);
    const [quizResultsSent, setQuizResultsSent] = useState(false);
    const [time, setTime] = useState(10);
    const [timeCount, setTimeCount] = useState(0);
    const [finalSendScore, setFinalSendScore] = useState(null);
   

    //Use Effects
    const playerId = useContext(playerInfo)
    // const playerUsername = useContext(username)
    
   
    //Get Data
    useEffect(() => {
        getName();
        setLives(3)
        setScore(null)
        setQuizResults(null)
        setFinalScore(null);
    }, [quizResultsSent]);

    //Check check if data is fetched
    useEffect(() => {
        if (data){
            setDataFetched(true);
            
        }
       
        
    }, [data]);

    //get random pokemon
    useEffect(() => {
        if (dataFetched) {
            let randPoke = getRandomPokemon();
            setSinglePokemon(randPoke[Math.floor(Math.random() * randPoke.length)]);
            setEnglishNames(randPoke)
          }
        
    }, [dataFetched, score, lives]);

    //get single pokemon
    useEffect(() => {
        if (singlePokemon) {
            let newData = [];
            setSinglePokeData(true);
            newData= data.filter(element => element.id !== singlePokemon.id);
            setData(newData);
        }
    }, [singlePokemon]);

    //get image
    useEffect(() => {
        
        if(singlePokeData){
            
        setImageUrl(singlePokemon.frontPicture)
        }  
    }, [singlePokeData, lives, score, singlePokemon])

    //set final score
    useEffect(() => {
        if(lives === 0) {
            setFinalScore(score);
        }
    }, [lives]);

    //create quiz result object
    useEffect(() => {
        if(!finalScore) {
            setFinalSendScore(0);
        }
        if(finalScore || timeCount === 3 || lives === 0) {
            let date = new Date().toISOString();
            setFinalSendScore(finalScore);
            const obj = {
                accountId: playerId,
                gameModeId: 1,
                value: finalScore,
                sessionDateTime: date
            }
            setQuizResults(obj);
        }
        
    }, [finalScore, timeCount, lives])

    //send quiz result back to server
    useEffect(() => {
        if (quizResults) {
            sendResults();
            setQuizResultsSent(true)
        }
        
    }, [quizResults]);

    useEffect(() =>{
        
    }, [quizResultsSent])

   
    //helper function
    const getName = async function () {
        const pokemonData = await axios.get("https://pokedictionarygamedev.onrender.com/GetAllPokemon");
        setData(pokemonData.data);
    }

    //helper function to send data to server
    const sendResults = async () => {
        const url = "https://pokedictionarygamedev.onrender.com/score/save";
            const returnedData = await axios.post(url, quizResults);
    }

    //Makes random array of 4 pokemon
    function getRandomPokemon () {
        const array = [];
        const dict = {};
        let count = 0;
       
        
        for(let j = 0; j < data.length; j++) {
            dict[data[j].id] = false;
        }


        while(count < 4){
            let randomIndex = Math.floor(Math.random()* data.length);
            if(!dict[data[randomIndex]]){
                array.push(data[randomIndex]);
                dict[data[randomIndex].id] = true;
                count ++
            }
            
        }
      
        return array
    }
        
     
    //Handler Functions
    function handleClick(event) {
        if(lives > 0 && event === singlePokemon.id){
            setScore((prev)=> prev = prev + 1)
        }
        else if(lives > 0 && event !== singlePokemon.id){
            setLives((prev)=> prev = prev - 1)
        }
        
    }
    
    //if timer is up
    function handleTimeIsUp() {
        if (lives > 0) {
            setLives((prev) => prev -1);
            setTimeCount((prev) => prev + 1)
        }
    }

    
    return (
        <>
        {!quizResultsSent ?
         <>
     
        <h1 className='quiztext'>Quiz</h1>

        
        <h2 className='quiztext'>Current Score: {score}</h2>
        <h3 className='quiztext'>HP: {lives}</h3>


        
        <div className='question-card'>
           
            {singlePokeData? 
            <div className='quiztext'>
                <img src={imageUrl} alt=""/>
                <br />
                {singlePokemon.nameJapaneseHrkt}
                <br />
                {singlePokemon.nameJapaneseRomaji}
            </div> 
            : <div>Loading</div>}

          
            {singlePokeData?
            <>
                <button className='english' id='button1' key="first" onClick={() => handleClick(englishNames[0].id)}>{englishNames[0].nameEnglish}</button>
                <button className='english' id='button2' key="second" onClick={() => handleClick(englishNames[1].id)}>{englishNames[1].nameEnglish}</button>
                <button className='english' id='button3' key="third" onClick={() => handleClick(englishNames[2].id)}>{englishNames[2].nameEnglish}</button>
                <button className='english' id='button4' key="fourth" onClick={() => handleClick(englishNames[3].id)}>{englishNames[3].nameEnglish}</button>
                <br/>
                <Link to="/home"><button>Give Up?</button></Link>
                <Timer time={time} onTimeUp={handleTimeIsUp} key={singlePokemon?.id} />
            </> 


            : <div>Loading</div>}
        </div> 
        
        </>
        : <Gameover score={finalSendScore} quizResultsSent={setQuizResultsSent}/>}

            
        
        </>
    );
}