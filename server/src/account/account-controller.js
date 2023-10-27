const accountModel = require("./account-model");
const crypto = require("crypto");
const session = require("express-session")
const app = require("../../server")


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
      // console.log(saltedInputPassword);
      const hash = crypto.createHash("sha256");
      const hashSaltedInputPassword = hash.update(saltedInputPassword).digest("hex");
  
      // Throw error if password is wrong
      if (hashSaltedInputPassword !== accountData.hash_salted_password) {
        // console.log(hashSaltedInputPassword);
        // console.log(accountData.hash_salted_password);
        console.log("wrong password");
        throw new Error ();
      }
      // If password match, 
      console.log("success");
      res.status(200).send("success");


        app.use(session ({
        resave: false,
        saveUnitialized: false,
        secret: "session",
        cookie: {
          maxAge: 1000 * 60 * 60,
          sameSite: "none",
          secure: true,
        }
      })
      );
      // const sessionToken = generateSessionToken();
      // console.log(sessionToken);

    // const oneDay = 1000 * 60 * 60 * 24;
    // app.use(session({
    //   secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    //   saveUninitialized:true,
    //   cookie: { maxAge: oneDay },
    //   resave: false 
    // }));

    // console.log(req.session);
    // const sessionToken = generateSessionToken();
    // console.log(sessionToken);
    // res.cookie("testtoken", sessionToken, {maxAge: 360000}).status(200).send('Cookie added!');
    const username = req.body.username;
    req.session.name = username;

    res.status(200).send( {message: "saved"})

    } catch (err) {
      res.status(401).send("Invalid Username or Password");
    }
  },

  // CREATE ACCOUNT
  async createNewAccount(req, res) {
    try {
      // Destructuring req.body data
      const { username, password, email, firstName, lastName } = req.body;
      // console.log(username, password, email, firstName, lastName);
      
      // Create salt
      const salt = crypto.randomBytes(6).toString("hex");
      const saltedPassword = salt + password;
      // console.log(saltedPassword);

      // Hash-ing password
      const hash = crypto.createHash("sha256");
      const hashSaltedPassword = hash.update(saltedPassword).digest("hex");
      // console.log(hashSaltedPassword);

      // Create new account data
      const newAccountData = {
        username: username,
        hashSaltedPassword: hashSaltedPassword,
        salt: salt,
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      // console.log(newAccountData);

      await accountModel.createNewAccount(newAccountData);
      res.status(201).send("Account created");
    } catch (error) {
      res.status(401).send("failed to create Account");
    }
  },
};
