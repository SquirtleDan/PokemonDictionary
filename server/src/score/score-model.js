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
  //get Ranking
  getRanking: (gameModeId) => {
    return knex("score")
      .join("account", "account.id", "=", "score.account_id")
      .select({
        value: "value",
        gameModeId: "game_mode_id",
        accountId: "account_id",
        username: "username"
      })
      .from("score")
      .where({
        game_mode_id: gameModeId
      })
      .orderBy("value", "desc")
      .limit(10);
      ;
  },
};

    // const allScoreData = await knex("score").select("value");
    // const allScoreDataArr = allScoreData.map((eachData) => eachData.value);
    // const ranking = allScoreDataArr.sort((a, b) => b - a);
    // return ranking.indexOf(value) + 1;