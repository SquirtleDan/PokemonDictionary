const express = require("express");
const app = express();
const cors = require("cors")

const cookieParser = require('cookie-parser');


const userController = require("./userController/userController");
const scoreController = require("./scoreController/scoreController");


const PORT = process.env.PORT || 8080;
app.use(express.json())
app.use(cookieParser())

app.use(cors())


app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))

//Login
app.post("/login", userController.checkUser)


//Create New Account
app.post("/createNewAccount", userController.createNewAccout)


//get all scores
app.get("/score/all", scoreController.getAllScores)

//save Score
app.post("/score/save", scoreController.saveScore)

//get Rankings
app.get("/score/ranking", scoreController.getRanking)


//Create New Account
app.post("/createNewAccount", userController.createNewAccout)

