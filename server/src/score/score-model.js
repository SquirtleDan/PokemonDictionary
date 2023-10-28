const knex = require("../knex");

//for scoreBoard
module.exports = {
  //get all score data(for leaderBoard)
  getHighestScore(accountId) {
    return knex
      .select(
        knex.raw("MAX(value)"),
        "game_mode_id"
      )
      .from("score")
      .where({
        account_id: accountId,
      })
      .groupByRaw('game_mode_id')
      ;
  },
  //save score data
  saveScore: (accountId, gameModeId, value) => {
    return knex("score").insert({
      account_id: accountId,
      game_mode_id: gameModeId,
      value: value
    });
  },
  //get Ranking(get all data=> sort => get Arr[indexnum]), not yet verifed
  getRanking: async (gameModeId) => {
    return knex
      .select(

      )
      .from("score")
      .where({
        game_mode_id: gameModeId
      })

    // const allScoreData = await knex("score").select("value");
    // const allScoreDataArr = allScoreData.map((eachData) => eachData.value);
    // const ranking = allScoreDataArr.sort((a, b) => b - a);
    // return ranking.indexOf(value) + 1;
  },
};
