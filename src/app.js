const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // creating a new instance of the user modal
  const user = new User({
    firstName: "John",
    lastName: "Dee",
    emailId: "abc@gmail.com",
    password: "abc@2025",
  });
  try {
    await user.save();
    res.send("user added successfully ");
  } catch (err) {
    req.status(400).send("error saving the data" + err.message);
  }
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

  
