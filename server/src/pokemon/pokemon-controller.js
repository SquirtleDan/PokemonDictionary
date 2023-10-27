const pokemonModel = require('./pokemon-model');

module.exports = {
  async getAllPokemon(req, res) {
    try {
      const amount = req.query.amount ? Number(req.query.amount) : 100;
      const allPokemon = await pokemonModel.getAllPokemon(amount);
      // console.log(allPokemon);
      res.status(200).send(JSON.stringify(allPokemon));
    } catch (error) {
      // console.error(error);
      res.status(500).send({ error: "Failed to get pokemon" });
    }
  }
}
