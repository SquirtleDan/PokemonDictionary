import React, { useEffect, useState } from 'react'
import './Quiz.css'
import axios from 'axios'
'use strict';

export const Quiz = () => {
    //State Variables
    const [data, setData] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [singlePokemon, setSinglePokemon] = useState(null);
    const [singlePokeData, setSinglePokeData] = useState(false);
    const [englishNames, setEnglishNames] = useState(null);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3)
    const [imageUrl, setImageUrl] = useState(null);
 
    //Use Effects
    useEffect(() => {
        getName();
    }, []);

    useEffect(() => {
        if (data){
            setDataFetched(true);
            
        }
       
        
    }, [data]);

    useEffect(() => {
        if (dataFetched) {
            let randPoke = getRandomPokemon();
            
            setSinglePokemon(randPoke[Math.floor(Math.random() * randPoke.length)]);
            setEnglishNames(randPoke);
            // newData= data.filter(element => element.id !== 1);
            // setData(newData);
            console.log(data)
          }
          
        
    }, [dataFetched, score, lives]);

    useEffect(() => {
        if (singlePokemon) {
            let newData = [];
            setSinglePokeData(true);
            newData= data.filter(element => element.id !== singlePokemon.id);
            setData(newData);
        }
    }, [singlePokemon]);

    useEffect(() => {
        
        if(singlePokeData){
            
        setImageUrl(singlePokemon.frontPicture)
        }  
    }, [singlePokeData, lives, score, singlePokemon])

    
   


    //helper function
    const getName = async function () {
        const pokemonData = await axios.get("https://pokedictionarygamedev.onrender.com/GetAllPokemon");
        setData(pokemonData.data);
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
                console.log(randomIndex)
    
            }
            
        }
      
        return array
    }
        
     
    //Handler Functions
    function handleClick(event) {
        console.log("event:",event)
        if(lives > 0 && event === singlePokemon.id){
            setScore((prev)=> prev = prev + 1)
        }
        else if(lives > 0 && event !== singlePokemon.id){
            setLives((prev)=> prev = prev - 1)
        }
        else if(lives === 0){
            axios.post("https://pokedictionarygamedev.onrender.com/")
        }
        //if lives = 0 >>>redirect to game over component
    }
   
      
      
    return (
        <>
        {/* Header */}
        <h1>Quiz</h1>

        {/* Current Score */}
        <h2>Current Score: {score}</h2>
        <h3>HP: {lives}</h3>

        {/* Final Results */}
        {/* <div className='final-results'>
            <h1>Final Results</h1>
            <button>Restart Game?</button>
        </div> */}

        {/* Question Card */}
        <div className='question-card'>
            {/* Get Pokemon Image */}
            {singlePokeData? 
            <div>
                <img src={imageUrl} alt=""/>
                <br />
                {singlePokemon.nameJapaneseHrkt}
                <br />
                {singlePokemon.nameJapaneseRomaji}
            </div> 
            : <div>Loading</div>}

            {/* Pokemon English Names Buttons */}
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
    );
}