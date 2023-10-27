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
      res.status(500).json({ error: "Failed to get Scores" });
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
      res.json({ message: "Score Submitted!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save score" });
    }
  },
  //get rankings, not yet verified
  async getRanking(req, res) {
    try {
      const ranking = await scoreModel.getRanking(req.body.value);
      res.json({ ranking: ranking });
    } catch (error) {
      res.status(500).json({ error: "Failed to Get your Ranking" });
    }
  },
};
