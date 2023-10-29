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
      <div className="dictionary-search-bar-container">
        <input className="dictionary-search-bar" ref={inputRef} type="text" value={value} placeholder="Search Pokemon" onChange={(event) => onChange(event.target.value)} />
        <button className="dictionary-search-clear" onClick={onClear}>Clear</button>
      </div>
    );
  };

  const PokemonList = ({ pokemons, onClick }) => {
    return (
      <div>
        {pokemons.map((pokemon) => (
          <img
            className='dictionary-poke-pic'
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
        <img className='single-poke-pic' src={pokemon.frontPicture} alt={pokemon.nameJapaneseRomaji} />
        <p className='pokePara'>No.{String(pokemon.id).padStart(4, '0')}</p>
        <p className='pokePara'>Japanese Name: {pokemon.nameJapaneseHrkt}</p>
        <p className='pokePara'>Pronunciation: {pokemon.nameJapaneseRomaji}</p>
        <p className='pokePara'>English Name: {pokemon.nameEnglish}</p>
        <p className='pokePara'>Korean Name: {pokemon.nameKorean}</p>
      <p className='pokePara'>Chinese Traditional Name: {pokemon.nameChineseTraditional}</p>
      <p className='pokePara'>French Name: {pokemon.nameFrench}</p>
      <p className='pokePara'>German Name: {pokemon.nameGerman}</p>
      <p className='pokePara'>Spanish Name: {pokemon.nameSpanish}</p>
      <p className='pokePara'>Italian Name: {pokemon.nameItalian}</p>
        <button className='link' onClick={back}>Back</button>
      </div>
    );
  };
//Accessibility is not perfect  if we have time Fix this
return (
  <div className="dictionary-container">
    <Link to="/home"><button className='dictionary-home-button'>Home</button></Link>
    <SearchBar value={searchWord} onChange={setSearchWord} onClear={handleClearSearch} />
    {selectedPokemon ? (
      <PokemonDetail pokemon={selectedPokemon} back={() => setSelectedPokemon(null)} />
    ) : (
      <PokemonList pokemons={pokemons.filter(pokemon => 
        String(pokemon.id).includes(searchWord) ||
        pokemon.nameJapaneseRomaji.toLowerCase().includes(searchWord.toLowerCase()) ||
        pokemon.nameEnglish.toLowerCase().includes(searchWord.toLowerCase())||
        pokemon.nameKorean?.toLowerCase().includes(searchWord.toLowerCase()) ||
        pokemon.nameChineseTraditional?.toLowerCase().includes(searchWord.toLowerCase()) ||
        pokemon.nameFrench?.toLowerCase().includes(searchWord.toLowerCase()) ||
        pokemon.nameGerman?.toLowerCase().includes(searchWord.toLowerCase()) ||
        pokemon.nameSpanish?.toLowerCase().includes(searchWord.toLowerCase()) ||
        pokemon.nameItalian?.toLowerCase().includes(searchWord.toLowerCase())
      )} onClick={setSelectedPokemon} />
    )}
  </div>
);
}

export default Dictionary;