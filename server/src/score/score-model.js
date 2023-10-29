const knex = require("../knex");

//for scoreBoard
module.exports = {
  // Get all score data(for leaderBoard)
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

  // Get score history
  getScoreHistory(accountId, gameModeId, sessionDateTimeOldest) {
    return knex 
      .select({
        accountId: "account_id",
        value: "value", 
        gameModeId: "game_mode_id",
        sessionDateTime: "session_date_time"
      })
      .from("score")
      .where({
        account_id: accountId,
        game_mode_id: gameModeId
      })
      .where("session_date_time", ">=", sessionDateTimeOldest)
      .orderBy("session_date_time", "desc")
      ;
  },

  // Save score data
  saveScore: (accountId, gameModeId, value, sessionDateTime) => {
    return knex("score").insert({
      account_id: accountId,
      game_mode_id: gameModeId,
      value: value,
      session_date_time: sessionDateTime
    });
  },

  // Get Ranking
  getRanking: (gameModeId) => {
    return knex("score")
      .join("account", "account.id", "=", "score.account_id")
      .select({
        accountId: "account_id",
        gameModeId: "game_mode_id",
        value: "value",
        username: "username",
        sessionDateTime: "session_date_time"
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
