// IMPORTING POKEMON DATA FUNCTION
const fetchFunction = require("../../src/pokemon-api/pokemon-api-controller")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('pokemon').del()
  const pokemonData = await fetchFunction.insertPokemonDataToDatabase();
  // console.log(pokemonData);
  await knex("pokemon").insert(pokemonData);
};
