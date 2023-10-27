import React, { useEffect, useState } from 'React'
import './Quiz.css'
'use strict';

export const Quiz = () => {
    const [data, setData] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [singlePokemon, setSinglePokemon] = useState(null);
    const [singlePokeData, setSinglePokeData] = useState(false);
    const [englishNames, setEnglishNames] = useState(null);

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
            setSinglePokemon(randPoke[0]);
            setEnglishNames(randPoke);
            console.log("randPoke",randPoke)
            console.log("singlePokemon", singlePokemon)
        }
    }, [dataFetched]);

    useEffect(() => {
        if (singlePokemon) {
            setSinglePokeData(true);
        }
    }, [singlePokemon]);

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
      

    function getRandomPokemon () {
        const array = [];

        for(let i = 0; i < 4; i++) {
            array.push(data[Math.floor(Math.random() * data.length)]);
        }
        console.log("random array", array)
        return array;
      }
      
      
    return (
        <>
        <h1>Quiz</h1>
        {singlePokeData? 
        <div>
            <img src={`${URL.createObjectURL(singlePokemon.frontPicture)}`} />
            <br />
            {singlePokemon.nameJapaneseNormal}
            <br />
            {singlePokemon.nameJapaneseRomaji}
        </div> : <div>No Pic</div>}
        {singlePokeData?
        <div className='english'>
            {englishNames[0].nameEnglish}
            <br />
            {englishNames[1].nameEnglish}
            <br />
            {englishNames[2].nameEnglish}
            <br />
            {englishNames[3].nameEnglish}
        </div> : <div>No Names</div>}
        </>
    );
}