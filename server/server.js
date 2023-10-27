const express = require("express");
const app = express();
const cors = require("cors")

const cookieParser = require('cookie-parser');

// IMPORTING DATABASE CONTROLLER
const userController = require("./userController/userController");
const scoreController = require("./src/score/score-controller");
const pokemonController = require("./src/pokemon/pokemon-controller");


const PORT = process.env.PORT || 8080;
app.use(express.json())
app.use(cookieParser())

app.use(cors())


app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))

//Login
app.post("/login", userController.checkUser)


//Create New Account
app.post("/createNewAccount", userController.createNewAccout)




//save Score

//get Rankings
app.get("/score/ranking", scoreController.getRanking)


//Create New Account
app.post("/createNewAccount", userController.createNewAccout)

// SCORE CONTROLLER
app.get("/score/highestScore/:id", scoreController.getHighestScore)
app.post("/score/save", scoreController.saveScore)
  // to access: localhost:8080/score/save
  // body, raw, json: {accountId, gameModeId, value: value}

// POKEMON CONTROLLER
app.get("/getAllPokemon", pokemonController.getAllPokemon);
  // to access: localhost:8080/getAllPokemon?amount=3