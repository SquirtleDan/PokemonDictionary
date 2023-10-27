const accountModel = require("./account-model");
const crypto = require("crypto");

//helperFunction
function generateSessionToken() {
  return crypto.randomBytes(16).toString("hex");
}

module.exports = {
  // LOG IN
  async login(req, res) {
    try {
      // Destructuring req.body data
      const { username: inputUsername, password: inputPassword } = req.body;
  
      // Retrive account data based on username
      const accountData = await accountModel.getDataByUsername(inputUsername);
      
      // Throw error if username is wrong
      if (!accountData) {
        console.log("username wrong");
        throw new Error ();
      }
  
      // Create hash password
      const saltedInputPassword = accountData.salt + inputPassword ;
      console.log(saltedInputPassword);
      const hash = crypto.createHash("sha256");
      const hashSaltedInputPassword = hash.update(saltedInputPassword).digest("hex");
  
      // Throw error if password is wrong
      if (hashSaltedInputPassword !== accountData.hash_salted_password) {
        console.log(hashSaltedInputPassword);
        console.log(accountData.hash_salted_password);
        console.log("wrong password");
        throw new Error ();
      }
      // If password match, send session token
      const sessionToken = generateSessionToken();
      res.cookie("token", sessionToken);
      console.log("success");
      console.log(sessionToken);
      res.status(200).send('Cookie added!');
    } catch (err) {
      res.status(404).send("Invalid Username or Password");
    }
  },

  // CREATE ACCOUNT
  async createNewAccount(req, res) {
    try {
      // Destructuring req.body data
      const { username, password, email, firstName, lastName } = req.body;
      console.log(username);
      
      // Create salt
      const salt = crypto.randomBytes(6).toString("hex");
      const saltedPassword = salt + password;
      console.log(saltedPassword);

      // Hash-ing password
      const hash = crypto.createHash("sha256");
      const hashSaltedPassword = hash.update(saltedPassword).digest("hex");
      console.log(hashSaltedPassword);

      // Create new account data
      const newAccountData = {
        username: username,
        hashSaltedPassword: hashSaltedPassword,
        salt: salt,
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      console.log(newAccountData);

      await accountModel.createNewAccount(newAccountData);
      res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
      res.status(500).json({ error: "failed to create Account" });
    }
  },
};