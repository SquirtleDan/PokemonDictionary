const userModel = require("../userModel/userModel");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const cors = require("cors")

function generateSessionToken() {
  return crypto.randomBytes(16).toString("hex");
}

module.exports = {
  async checkUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userData = await userModel.getDataByUsername(username);
    //if username is wrong
    if (!userData) {
      res.status(404).json({ message: "Invalid Username or Password" });
    }

    //if password is wrong
    const saltAndEnteredPassword = password + userData.salt;
    const hash = crypto.createHash("sha256");
    const hashedEnteredPassword = hash.update(saltAndEnteredPassword).digest("hex");

    if (hashedEnteredPassword !== userData.hash_salted_password) {
      return res.status(404).json({ message: "Invalit Username or Password" });
    }

    const sessionToken = generateSessionToken();
    res.cookie("token", sessionToken).json({ message: "Successful Log-in" });
  },

  //create account
  async createNewAccout(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;

    const salt = crypto.randomBytes(6).toString("hex");
    const saltAndPassword = salt + password;
    const hash = crypto.createHash("sha256");
    const hashedPassword = hash.update(saltAndPassword).digest("hex");

    const newAccount = {
      username: username,
      hash_salted_password: hashedPassword,
      salt: salt,
      email: email,
      first_name: first_name,
      last_name: last_name,
    };

    try {
      await userModel.createUser(newAccount);
      res.json({ message: "Account created successfully" });
    } catch (error) {
      res.status(500).json({ error: "failed to create Account" });
    }
  },
};
