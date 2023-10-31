const pokemonModel = require("./pokemon-model");

module.exports = {
  async getAllPokemon(req, res) {
    try {
      // Process the amount query
      let amount;
      if (req.query.amount) {
        const specifiedAmount = Number(req.query.amount);

        // If query is invalid throw error
        if (isNaN(specifiedAmount)) throw new Error("Invalid query");
        amount = specifiedAmount;
      } else amount = 400;
      // assign 100 pokemon if no amount is specified

      // Fetch pokemon data
      const allPokemon = await pokemonModel.getAllPokemon(amount);

      res.status(200).send(JSON.stringify(allPokemon));
    } catch (error) {
      res.status(500).send(`Failed to get pokemon: ${error.message}`);
    }
  },
};
