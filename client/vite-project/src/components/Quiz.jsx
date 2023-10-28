import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Quiz.css'
import axios from 'axios'
import Gameover from './Gameover';
'use strict';

export default function Quiz() {
    //State Variables
    const [data, setData] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [singlePokemon, setSinglePokemon] = useState(null);
    const [singlePokeData, setSinglePokeData] = useState(false);
    const [englishNames, setEnglishNames] = useState(null);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3)
    const [imageUrl, setImageUrl] = useState(null);
    const [finalScore, setFinalScore] = useState(null);
    const [quizResults, setQuizResults] = useState(null);
    const [quizResultsSent, setQuizResultsSent] = useState(false);

    //Navigation
    const navigate = useNavigate();
 
    //Use Effects

    //Get Data
    useEffect(() => {
        getName();
    }, []);

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
        if(finalScore) {
            const obj = {
                accountId: 1,
                gameModeId: 1,
                value: finalScore
            }
            setQuizResults(obj);
        }
    }, [finalScore])

    //send quiz result back to server
    useEffect(() => {
        if (quizResults) {
            sendResults();
            setQuizResultsSent(true)
        }
    }, [quizResults]);

    // useEffect(() => {
    //     if (quizResultsSent) {
    //         navigate("/gameover", {state:{score: finalScore}});
    //     }
    // }, [quizResultsSent]);
   


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
        // else if(lives === 0){
        //     axios.post("https://pokedictionarygamedev.onrender.com/")
        // }
        //if lives = 0 >>>redirect to game over component
    }
   
      
      
    return (
        <>
        {!quizResultsSent ?
         <>
     
        <h1>Quiz</h1>

        
        <h2>Current Score: {score}</h2>
        <h3>HP: {lives}</h3>


        
        <div className='question-card'>
           
            {singlePokeData? 
            <div>
                <img src={imageUrl} alt=""/>
                <br />
                {singlePokemon.nameJapaneseHrkt}
                <br />
                {singlePokemon.nameJapaneseRomaji}
            </div> 
            : <div>Loading</div>}

          
            {singlePokeData?
            <>
                <button className='english' id='button1' key="1" onClick={() => handleClick(englishNames[0].id)}>{englishNames[0].nameEnglish}</button>
                <button className='english' id='button2' key="2" onClick={() => handleClick(englishNames[1].id)}>{englishNames[1].nameEnglish}</button>
                <button className='english' id='button3' key="3" onClick={() => handleClick(englishNames[2].id)}>{englishNames[2].nameEnglish}</button>
                <button className='english' id='button4' key="4" onClick={() => handleClick(englishNames[3].id)}>{englishNames[3].nameEnglish}</button>
            </> 
            : <div>Loading</div>}
        </div> 
        </>
        : <Gameover score={finalScore}/>}

            
        
        </>
    );
}