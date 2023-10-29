function generateRandomDate(from, to) {
  return new Date(
    from.getTime() +
      Math.random() * (to.getTime() - from.getTime()),
  ).toISOString();
}

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
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 1,
      value: 8,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 1,
      value: 19,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 1,
      value: 22,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 1,
      value: 30,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 2,
      value: 9,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 2,
      value: 15,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 2,
      value: 12,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 2,
      value: 19,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 2,
      value: 51,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 1,
      value: 3,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 1,
      value: 2,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 1,
      value: 20,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 1,
      value: 22,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 1,
      value: 13,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 2,
      value: 15,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 2,
      value: 5,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 2,
      value: 15,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 2,
      value: 21,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 2,
      value: 27,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 1,
      value: 9,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 1,
      value: 18,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 1,
      value: 25,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 1,
      value: 8,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 1,
      value: 12,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    {
      account_id: 3,
      game_mode_id: 2,
      value: 16,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 2,
      value: 4,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 2,
      value: 12,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 2,
      value: 15,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 2,
      value: 21,
      session_date_time: generateRandomDate(new Date(2000, 3, 20), new Date()),
    },
  ]);
};
