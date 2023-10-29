const knex = require("../knex");

module.exports = {
  getAllPokemon(limit) {
    return knex 
      .select({
        id: "id",
        nameJapaneseHrkt: "name_japanese_hrkt",
        nameJapaneseRomaji: "name_japanese_romaji",
        nameKorean: "name_korean",
        nameChineseTraditional: "name_chinese_traditional",
        nameFrench: "name_french",
        nameGerman: "name_german",
        nameSpanish: "name_spanish",
        nameItalian: "name_italian",
        nameEnglish: "name_english",
        nameJapaneseNormal: "name_japanese_normal",
        nameChineseSimplified: "name_chinese_simplified",
        frontPicture: "front_picture"
      })
      .from("pokemon")
      .limit(limit)
      // .then(res => console.log(res))
      ;
  }
}