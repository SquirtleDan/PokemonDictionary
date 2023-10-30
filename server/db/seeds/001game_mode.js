/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex("game_mode").insert([
    { id: 1,
      name: "Sudden Death",
    },
    { id: 2,
      name: "Timer",
    }
  ]);
};
Collapse














