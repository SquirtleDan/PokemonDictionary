const scoreModel = require("../scoreModel/scoreModel");

module.exports = {
  //get all scores
  async getAllScores(req, res) {
    try {
      let scores = await scoreModel.getAllScores();
      scores = scores.sort((a, b) => b.value - a.value);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: "Failed to get Scores" });
    }
  },
  //save scores
  async saveScore(req, res) {
    try {
      await scoreModel.saveScore(
        req.body.account_id,
        req.body.game_mode_id,
        req.body.value
      );
      res.json({ message: "Score Submitted!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save score" });
    }
  },
  //get rankings
  async getRanking(req, res) {
    try {
      const ranking = await scoreModel.getRanking(req.body.value);
      res.json({ ranking: ranking });
    } catch (error) {
      res.status(500).json({ error: "Failed to Get your Ranking" });
    }
  },
};
