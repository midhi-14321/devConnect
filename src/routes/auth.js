const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt"); // to encrypt/decript the password i.e secerly storing in the DB



//signup API
authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    const { password } = req.body; // getting password from the user entered
    const passwordHash = await bcrypt.hash(password, 10); // hash the password means it is not visible in the db like user entered
    console.log(passwordHash);
    req.body.password = passwordHash;

    const user = new User(req.body); // creating the new user
    await user.save(); // saving the created user on th DB
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
  console.log(req.body);
});

//login API
/* the flow is --> when user is login with emailId and password then first checking the emailId is present in the Database or not . if emailId is present in the DB then checking the password is matching with database then respond in sending to user with login successfull . otherwise respond is Invalid creditials */
authRouter.post("/login", async (req, res) => {
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

module.exports = authRouter;
