const knex = require("../knex");

module.exports = {
  getAllPokemon(limit) {
    return knex 
      .select({
        id: "id",
        nameJapaneseHrkt: "name_japanese_hrkt",
        nameJapaneseRomaji: "name_japanese_romaji",
        nameEnglish: "name_english",
        frontPicture: "front_picture"
      })
      .from("pokemon")
      .limit(limit)
      // .then(res => console.log(res))
      ;
  }
}