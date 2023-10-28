// IMPORTING MODULES
const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require('cookie-parser');


// IMPORTING DATABASE CONTROLLER
const accountController = require("./src/account/account-controller");
const scoreController = require("./src/score/score-controller");
const pokemonController = require("./src/pokemon/pokemon-controller");

// USING MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// INITIATE SERVER
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))

////////////////////////////////////////////////////////////////////////////////////////

// VERIFIED END POINTS
// ACCOUNT CONTROLLER
app.post("/createNewAccount", accountController.createNewAccount);
  // to access: localhost:8080/createNewAccount
  // body, raw, json
  // ex: {"username": "usernametest1", "password": "passwordtest1", "email": "email@gmail.comtest1", "firstName": "firstnametest1", "lastName": "lastnametest1"}
app.post("/login", accountController.login);
  // to access: localhost:8080/login
  // body, raw, json
  // ex: {"username": "usernametest1", "password": "passwordtest1"}

// POKEMON CONTROLLER
app.get("/getAllPokemon", pokemonController.getAllPokemon);
  // has query. If not specified, will return 100 pokemon. If specified, 1-1200 pokemon will be returned
  // keyword for the query is amount
  // to access: localhost:8080/getAllPokemon?amount=3
  // will return an array of objects. Each object contain the pokemon data
  // ex: [{"id":1,"nameJapaneseHrkt":"フシギダネ","nameJapaneseRomaji":"Fushigidane","nameEnglish":"Bulbasaur","frontPicture":{"type":"Buffer","data":[123,125]}},{"id":2,"nameJapaneseHrkt":"フシギソウ","nameJapaneseRomaji":"Fushigisou","nameEnglish":"Ivysaur","frontPicture":{"type":"Buffer","data":[123,125]}},{"id":3,"nameJapaneseHrkt":"フシギバナ","nameJapaneseRomaji":"Fushigibana","nameEnglish":"Venusaur","frontPicture":{"type":"Buffer","data":[123,125]}},{"id":4,"nameJapaneseHrkt":"ヒトカゲ","nameJapaneseRomaji":"Hitokage","nameEnglish":"Charmander","frontPicture":{"type":"Buffer","data":[123,125]}},{"id":5,"nameJapaneseHrkt":"リザード","nameJapaneseRomaji":"Lizardo","nameEnglish":"Charmeleon","frontPicture":{"type":"Buffer","data":[123,125]}}]

// SCORE CONTROLLER
app.get("/score/highestScore/:id", scoreController.getHighestScore);
  // will return an array of objects containing the highest score of the player based on game mode
  // ex: [{"gameModeId": 1,"highestScore": 10}, {"gameModeId": 2, "highestScore": 15}]
app.post("/score/save", scoreController.saveScore);
  // to access: localhost:8080/score/save
  // body, raw, json
  // ex: {"accountId": 1, "gameModeId": 1, "value": 10}
app.get("/score/getAllRanking", scoreController.getAllRanking);
  // to access: localhost:8080/score/getAllRanking


