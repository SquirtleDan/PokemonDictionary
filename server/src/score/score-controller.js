const { all } = require("axios");
const scoreModel = require("./score-model");

module.exports = {
  //get all scores
  async getHighestScore(req, res) {
    try {
      const accountId = Number(req.params.id);
      const retrievedScoreObject = await scoreModel.getHighestScore(accountId);
      const sendScoreObject = retrievedScoreObject.map(object => {
        return {
          gameModeId: object.game_mode_id,
          highestScore: object.max
        }
      })
      res.status(200).send(sendScoreObject);
    } catch (error) {
      res.status(500).send("Failed to get Scores");
    }
  },
  //save scores
  async saveScore(req, res) {
    try {
      await scoreModel.saveScore(
        req.body.accountId,
        req.body.gameModeId,
        req.body.value
      );
      res.send("Score Submitted!");
    } catch (error) {
      res.status(500).send("Failed to save score");
    }
  },
  //get rankings
  async getAllRanking(req, res) {
    try {
      const allRanking = await Promise.all([
        scoreModel.getRanking(1),
        scoreModel.getRanking(2)
      ]);
      res.send(allRanking);
    } catch (error) {
      res.status(500).send("Failed to Get your Ranking");
    }
  },
};
