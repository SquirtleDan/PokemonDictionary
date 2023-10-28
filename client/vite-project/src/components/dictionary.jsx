import React, { useState, useEffect, useRef } from 'react';  
import './dictionary.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dictionary() {
  const [pokemons, setPokemons] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const inputRef = useRef(null);  

  
  useEffect(() => {
    const getName = async () => {
        const response = await axios.get('https://pokedictionarygamedev.onrender.com/getAllPokemon');
        setPokemons(response.data);

      };
    getName();
}, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }}, [searchWord]);  

  const handleClearSearch = () => {
    setSearchWord('');
    setSelectedPokemon(null);
  }

  const SearchBar = ({ value, onChange, onClear }) => {
    return (
      <div>
        <input ref={inputRef} type="text" value={value} placeholder="Search Pokemon" onChange={(event) => onChange(event.target.value)} />
        <button onClick={onClear}>Clear</button>
      </div>
    );
  };

  const PokemonList = ({ pokemons, onClick }) => {
    return (
      <div>
        {pokemons.map((pokemon) => (
          <img
            key={pokemon.id}
            src={pokemon.frontPicture}
            alt={pokemon.nameJapaneseRomaji}
            onClick={() => onClick(pokemon)}
          />
        ))}
      </div>
    );
  };

  const PokemonDetail = ({ pokemon, back }) => {
    return (
      <div>
        <img src={pokemon.frontPicture} alt={pokemon.nameJapaneseRomaji} />
        <p>No.{String(pokemon.id).padStart(4, '0')}</p>
        <p>JapaneseName: {pokemon.nameJapaneseHrkt}</p>
        <p>Pronounce: {pokemon.nameJapaneseRomaji}</p>
        <p>EnglishName: {pokemon.nameEnglish}</p>
        <button onClick={back}>Back</button>
      </div>
    );
  };
//Accessibility is not perfect  if we have time Fix this
  return (
    <div className="Dictionary">
      <Link to="/home"><button>Home</button></Link>
      <SearchBar value={searchWord} onChange={setSearchWord} onClear={handleClearSearch} />
      {selectedPokemon ? (
        <PokemonDetail pokemon={selectedPokemon} back={() => setSelectedPokemon(null)} />
      ) : (
        <PokemonList pokemons={pokemons.filter(pokemon => 
          
          String(pokemon.id).includes(searchWord) ||
          pokemon.nameJapaneseRomaji.toLowerCase().includes(searchWord.toLowerCase())||
          pokemon.nameEnglish.toLowerCase().includes(searchWord.toLowerCase())
        )} onClick={setSelectedPokemon} />
      )}
    </div>

    
  );
}

export default Dictionary;