/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("score").del();
  await knex("game_mode").del();
  await knex("account").del();
  await knex("pokemon").del();
};
