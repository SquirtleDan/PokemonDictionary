import React, { useEffect, useState } from 'react'
import './Quiz.css'
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
    const [currentRound, setCurrentRound] = useState(0);

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
            console.log("randPoke",randPoke)
            console.log("singlePokemon", singlePokemon)
        }
    }, [dataFetched, score, lives]);

    useEffect(() => {
        if (singlePokemon) {
            setSinglePokeData(true);
        }
    }, [singlePokemon]);

   
    // useEffect(() => {
    //     console.log(score);
    //     console.log(lives)
    // }, [score, lives])

    //Gets array of Pokemon
    const getName = async function () {

        // SETTINGS
        const noOfPokemon = 20;
      
        // SETTING UP POKEMON
        const pokemonData = [];
      
        // RETRIEVING NAMES
        const urlListNames = [];
        for (let i = 1; i <= noOfPokemon; i++) urlListNames.push(`https://pokeapi.co/api/v2/pokemon-species/${i}/`);
        const pokemonApiFetchName = await Promise.all(urlListNames.map((url) => fetch(url).then(res => res.json())));
        // console.log(pokemonApiFetchName);
      
        // RETRIEVING PICTURE
        const urlListPictures = [];
        for (let i = 1; i <= noOfPokemon; i++) urlListPictures.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`);
        const pokemonApiFetchPicture = await Promise.all(urlListPictures.map((url) => fetch(url).then(res => res.blob())));
        // console.log(pokemonApiFetchPicture);
      
        // CREATING OBJECT DATA
        for (let i = 0; i < noOfPokemon; i++) pokemonData.push({
            pokeApiID: pokemonApiFetchName[i].id,
            nameJapaneseHRKT: pokemonApiFetchName[i].names[0].name,
            nameJapaneseRomaji: pokemonApiFetchName[i].names[1].name,
            nameKorean: pokemonApiFetchName[i].names[2].name,
            nameChineseTraditional: pokemonApiFetchName[i].names[3].name,
            nameFrench: pokemonApiFetchName[i].names[4].name,
            nameGerman: pokemonApiFetchName[i].names[5].name,
            nameSpanish: pokemonApiFetchName[i].names[6].name,
            nameItalian: pokemonApiFetchName[i].names[7].name,
            nameEnglish: pokemonApiFetchName[i].names[8].name,
            nameJapaneseNormal: pokemonApiFetchName[i].names[9].name,
            nameChineseSimplified: pokemonApiFetchName[i].names[10].name,
            frontPicture: pokemonApiFetchPicture[i], 
          });
        console.log(pokemonData);
        setData(pokemonData);
      
        // HOW TO USE BLOB PICTURE ON HTML 
        // for (let i = 0; i < 1; i++) {
        //   const pokemonBody = document.querySelector('.pokemon');
        //   console.log(pokemonBody);
        //   const test = document.createElement('img');
        //   const pictureData = URL.createObjectURL(pokemonData[Math.floor(Math.random() * pokemonData.length)].frontPicture)
        //   test.src = pictureData;
        //   pokemonBody.append(test);
        //   console.log("rand 1", pokemonBody)
        // }
      }
      //const pictureData = URL.createObjectURL(singlePokemon.frontPicture);
      
    //Makes random array of 4 pokemon
    function getRandomPokemon () {
        const array = [];

        for(let i = 0; i < 4; i++) {
            array.push(data[Math.floor(Math.random() * data.length)]);
        }
        console.log("random array", array)
        return array;
      }

    //Handler Functions
    function handleClick(event) {
        console.log("event:",event)
        if(lives > 0 && event === singlePokemon.pokeApiID){
            setScore((prev)=> prev = prev + 1)
        }
        else if(lives > 0 && event !== singlePokemon.pokeApiID){
            setLives((prev)=> prev = prev - 1)
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
                <img src={`${URL.createObjectURL(singlePokemon.frontPicture)}`} />
                <br />
                {singlePokemon.nameJapaneseNormal}
                <br />
                {singlePokemon.nameJapaneseRomaji}
            </div> 
            : <div>No Pic</div>}

            {/* Pokemon English Names Buttons */}
            {singlePokeData?
            <>
                <button className='english' id='button1' key="1" onClick={() => handleClick(englishNames[0].pokeApiID)}>{englishNames[0].nameEnglish}</button>
                <button className='english' id='button2' key="2" onClick={() => handleClick(englishNames[1].pokeApiID)}>{englishNames[1].nameEnglish}</button>
                <button className='english' id='button3' key="3" onClick={() => handleClick(englishNames[2].pokeApiID)}>{englishNames[2].nameEnglish}</button>
                <button className='english' id='button4' key="4" onClick={() => handleClick(englishNames[3].pokeApiID)}>{englishNames[3].nameEnglish}</button>
            </> 
            : <div>No Names</div>}
        </div>
        </>
    );
}