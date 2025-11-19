const express = require("express");
const connectDB = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const app = express();
const User = require("./models/user");

const { userAuth } = require("../src/middlewares/auth");
const bcrypt = require("bcrypt"); // to encrypt/decript the password i.e secerly storing in the DB
const cookieParser = require("cookie-parser"); // it is a middleware to read cookies
const jwt = require("jsonwebtoken"); // generate the JWT token
app.use(express.json()); // will do read the JSON data and convert the data to js object and add the data to (req).body
app.use(cookieParser()); // It adds a middleware to the Express app that automatically reads cookies from every incoming request and puts them inside cookies

app.post("/signup", async (req, res) => {
  try {
    //validation of data

    validateSignUpData(req);
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10); // hash the password means it is not visible in the db like user entered
    console.log(passwordHash);
    req.body.password = passwordHash;

    const user = new User(req.body);
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
  console.log(req.body);
});

/* the flow is --> when user is login with emailId and password then first checking the emailId is present in the Database or not . if emailId is present in the DB then checking the password is matching with database then respond in sending to user with login successfull . otherwise respond is Invalid creditials */
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("emaiid is not present in DB");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password); // compare the user requested password and db password

    if (isPasswordValid) {
      //create a JWT token
      const token = await user.getJWT();
      console.log(token);
      // add the token to cookies and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // cookies will expire after 8 hours
      });
      res.send("user login successfull");
    } else {
      throw new Error("Invalid Creditials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// profile API
app.get("/profile", userAuth, async (req, res) => {
  // here going to auth.js file to verify() the token
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/sendconnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("sending the connection request");
  res.send(user.firstName + "connection request sent");
});

connectDB()
  .then(() => {
    app.listen(2000, () => {
      console.log("server running on the port 2000");
    });
  })
  .catch((err) => {
    console.error("database cannot be established");
  });

/*token process

=> user logs in => server verify email and password => if both are valid =>
creates a unique JWT token => server sends the token to user inside cookies => so browser stores the token in cookies => next time user is requested any api like /profile API => server receives the token through browser => server verify the token through secret key while token is creating initial => if it is valid => user allowed to navigate to requested API => otherwise not allowed  

=> token is divided three parts like ex:- aaa.bbb.ccc

1)header -> algorithm and type of token
2)payload -> userID(user data)
3)signature -> cryptographic function , token is created by server , not modified by anyone

server uses the same single secret key to verify the signature 

working of signature in token 
	|
verify() takes the header and payload from the received token 

it uses secret key to recalculate the signature

the recalculated signature matches the existing signature in the token

verification passes and the decoded payload is returned

signature contains ---> algo(header+payload+secret)

when it verify another time decoding the server sended token with exisiting signature 


how data user data is storing in the database?

user data -> frontend send the request to backend -> express server receive 

the request -> mongoose creates a new instance for data -> mongoose saves 

the data to mongoDB -> mongoDB stores the data


*/
