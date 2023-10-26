/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex("score").insert([
    {
      account_id: 1,
      game_mode_id: 1,
      value: 5,
    },
    {
      account_id: 1,
      game_mode_id: 1,
      value: 8,
    },
    {
      account_id: 1,
      game_mode_id: 2,
      value: 9,
    },
    {
      account_id: 1,
      game_mode_id: 2,
      value: 15,
    },
    {
      account_id: 2,
      game_mode_id: 1,
      value: 3,
    },
    {
      account_id: 2,
      game_mode_id: 1,
      value: 2,
    },
    {
      account_id: 2,
      game_mode_id: 2,
      value: 15,
    },
    {
      account_id: 2,
      game_mode_id: 2,
      value: 5,
    },
    {
      account_id: 3,
      game_mode_id: 1,
      value: 9,
    },
    {
      account_id: 3,
      game_mode_id: 1,
      value: 18,
    },
    {
      account_id: 3,
      game_mode_id: 2,
      value: 16,
    },
    {
      account_id: 3,
      game_mode_id: 2,
      value: 4,
    },
  ]);
};
