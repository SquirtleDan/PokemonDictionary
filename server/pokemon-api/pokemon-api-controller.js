const fetch = require("node-fetch");

module.exports = {
  async insertPokemonDataToDatabase() {

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
      id: i + 1,
      poke_api_id: pokemonApiFetchName[i].id,
      name_japanese_hrkt: pokemonApiFetchName[i].names[0].name,
      name_japanese_romaji: pokemonApiFetchName[i].names[1].name,
      name_korean: pokemonApiFetchName[i].names[2].name,
      name_chinese_traditional: pokemonApiFetchName[i].names[3].name,
      name_french: pokemonApiFetchName[i].names[4].name,
      name_german: pokemonApiFetchName[i].names[5].name,
      name_spanish: pokemonApiFetchName[i].names[6].name,
      name_italian: pokemonApiFetchName[i].names[7].name,
      name_english: pokemonApiFetchName[i].names[8].name,
      name_japanese_normal: pokemonApiFetchName[i].names[9].name,
      name_chinese_simplified: pokemonApiFetchName[i].names[10].name,
      front_picture: pokemonApiFetchPicture[i], 
    });
    return pokemonData;
    // console.log(pokemonData);
  
    // HOW TO USE BLOB PICTURE ON HTML 
    // const pokemonBody = document.querySelector('.pokemon');
    // console.log(pokemonBody);
    // const test = document.createElement('img');
    // const pictureData = URL.createObjectURL(pokemonData[0].frontPicture)
    // test.src = pictureData;
    // pokemonBody.append(test);
  
    // insertPokemonDataToDatabase();
  }
};



