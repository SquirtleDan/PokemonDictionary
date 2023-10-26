const knex = require("../knex");

//for scoreBoard
module.exports = {
  //get all score data(for leaderBoard)
  getAllScores: () => {
    return knex("score").select("value");
  },
  //save score data
  saveScore: (account_id, game_mode_id, value) => {
    return knex("score").insert({
      account_id: account_id,
      game_mode_id: game_mode_id,
      value: value,
    });
  },
  //get Ranking(get all data=> sort => get Arr[indexnum])
  getRanking: async (value) => {
    const allScoreData = await knex("score").select("value");
    const allScoreDataArr = allScoreData.map((eachData) => eachData.value);
    const ranking = allScoreDataArr.sort((a, b) => b - a);
    return ranking.indexOf(value) + 1;
  },
};
