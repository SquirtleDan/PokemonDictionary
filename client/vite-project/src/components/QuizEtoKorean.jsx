import React, { useEffect, useState, useContext } from 'react'
import { Link} from 'react-router-dom';
import './QuizEtoJ.css'
import axios from 'axios'
import Gameover from './Gameover';
import Timer from './Timer';
import { playerInfo, username } from './LoginForm';
'use strict';

export default function QuizEtoKorean() {
    //State Variables
    const [data, setData] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [singlePokemon, setSinglePokemon] = useState(null);
    const [singlePokeData, setSinglePokeData] = useState(false);
    const [names, setNames] = useState(null);
    const [score, setScore] = useState(null);
    const [lives, setLives] = useState(3)
    const [imageUrl, setImageUrl] = useState(null);
    const [finalScore, setFinalScore] = useState(null);
    const [quizResults, setQuizResults] = useState(null);
    const [quizResultsSent, setQuizResultsSent] = useState(false);
    const [time, setTime] = useState(10);
    const [timeCount, setTimeCount] = useState(0);
    const [finalSendScore, setFinalSendScore] = useState(null);
    const [answerResult, setAnswerResult] = useState("");
    const [answer, setAnswer] = useState(false)

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
        setAnswer(false);
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
            setNames(randPoke)
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
            setAnswer(true)
            setAnswerResult("Correct!")
        }
        else if(lives > 0 && event !== singlePokemon.id){
            setLives((prev)=> prev = prev - 1)
            setAnswerResult("Good Try!")
            setAnswer(true)
        }
        
    }
    
    //if timer is up
    function handleTimeIsUp() {
        if (lives > 0) {
            setLives((prev) => prev -1);
            setTimeCount((prev) => prev + 1)
            setAnswerResult("Too slow")
        }
    }

    
    return (
        <>
        {!quizResultsSent ?
         <>
     
        <h1 className='quiztext'>Quiz</h1>
        <br/>
        
        <h2 className='quiztext'>Current Score: {score}</h2>
        <h3 className='quiztext'>HP: {lives}</h3>


        
        <div className='question-card'>
           
            {singlePokeData? 
            <div className='quiztext'>
                <img src={imageUrl} alt=""/>
                <br />
                {singlePokemon.nameEnglish}
                <br />
            </div> 
            : <div>Loading</div>}

            <br/>
            <br/>

          
            {singlePokeData?
            <>
                <button className='language' id='button1' key="first" onClick={() => handleClick(names[0].id)}>{names[0].nameKorean}</button>
                <button className='language' id='button2' key="second" onClick={() => handleClick(names[1].id)}>{names[1].nameKorean}</button>
                <button className='language' id='button3' key="third" onClick={() => handleClick(names[2].id)}>{names[2].nameKorean}</button>
                <button className='language' id='button4' key="fourth" onClick={() => handleClick(names[3].id)}>{names[3].nameKorean}</button>
                <br/>
                <br/>

                <Timer time={time} onTimeUp={handleTimeIsUp} key={singlePokemon?.id} />
            </> 
            

            : <div>Loading</div>}
            <br/>
            <br/>
          
        </div> 
        <Link to="/home"><button className='language'>Give Up?</button></Link>
            {answer ?
            <>
            <div className='quiztext'>{answerResult}</div>
            </> 
            : <div></div>}
        </>
        : <Gameover score={finalSendScore} quizResultsSent={setQuizResultsSent}/>}

            
        
        </>
    );
}