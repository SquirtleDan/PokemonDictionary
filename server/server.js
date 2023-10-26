const express = require("express");
const app = express();
const cors = require("cors")

const userController = require("./userController/userController");


const PORT = process.env.PORT || 8080;
app.use(express.json())
app.use(cookieParser())

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))

//Login
app.post("/login", userController.checkUser)

//Create New Account
app.post("/createNewAccount", userController.createNewAccout)