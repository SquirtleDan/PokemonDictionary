// IMPORTING MODULES
const express = require("express");
const cors = require("cors")
const session = require('express-session');
const cookieParser = require("cookie-parser");


// IMPORTING DATABASE CONTROLLER
const accountController = require("./src/account/account-controller");
const scoreController = require("./src/score/score-controller");
const pokemonController = require("./src/pokemon/pokemon-controller");

// USING MIDDLEWARE
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// app.use(session({
//   path: "/login",
//   secret: 'test',
//   resave: false,
//   saveUninitialized:true,
//   cookie: { maxAge: 6000 },
// }));

// SAMPLE CODE FOR SESSION
// const session = require('express-session');
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 6000 }}))
// Access the session as req.session
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
  console.log(req.session);
})


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




// UNVERIFIED END POINTS
// LEADERBOARD
app.get("/score/ranking", scoreController.getRanking)