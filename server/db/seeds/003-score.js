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
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  // console.log(currentMonth);
    // note that javascript read month 0-11, not 0-12
  // console.log(currentDate);
  await knex("score").insert([
    { 
      account_id: 1,
      game_mode_id: 1,
      value: 5,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 1,
      value: 8,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 1,
      value: 17,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 1,
      value: 22,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 1,
      value: 30,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 2,
      value: currentMonth,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 2,
      value: 15,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 2,
      value: 12,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 2,
      value: 16,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 1,
      game_mode_id: 2,
      value: 51,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 1,
      value: 3,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 1,
      value: 2,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 1,
      value: 20,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 1,
      value: 22,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 1,
      value: 13,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 2,
      value: 15,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 2,
      value: 5,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 2,
      value: 15,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 2,
      value: 21,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 2,
      game_mode_id: 2,
      value: 27,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 1,
      value: 19,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 1,
      value: 18,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 1,
      value: 25,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 1,
      value: 8,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 1,
      value: 12,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    {
      account_id: 3,
      game_mode_id: 2,
      value: 16,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 2,
      value: 4,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 2,
      value: 12,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 2,
      value: 15,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
    { 
      account_id: 3,
      game_mode_id: 2,
      value: 21,
      session_date_time: generateRandomDate(new Date(2023, currentMonth, 1), new Date()),
    },
  ]);
};
