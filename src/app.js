const express = require("express");
const connectDB = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser"); // it is a middleware to read cookies
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cookieParser()); //
app.post("/signup", async (req, res) => {
  try {
    //validation of data

    validateSignUpData(req);
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, "devConnect@2002");
      console.log(token);
      res.cookie("token", token);
      res.send("user login successfull");
    } else {
      throw new Error("Invalid Creditials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// app.get("/user", async (req, res) => {
//   const email = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: email });
//     if (users.length === 0) {
//       res.status(404).send("user not found");
//     } else {
//       res.send(users);
//       console.log(users);
//     }
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

app.get("/profile", async (req, res) => {
  const cookies = req.cookies;
  const { token } = cookies;
  try {
    if (!token) {
      throw new Error("Invalid token");
    }
    //verify my token
    const decodeToken = await jwt.verify(token, "devConnect@2002");

    const { _id } = decodeToken;
    console.log("Looged in user is: " + _id);
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user does not exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: email });
    if (user) {
      res.send(user);
    } else {
      res.send("user not found");
    }
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

/* getting all the users from the db bcz it is feed api */
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

/* finding the particular user requested id and deleting from the db */
app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    // const user = await User.findByIdAndDelete(userId); // shorthand
    const user = await User.findByIdAndDelete({ _id: userId });
    if (user) {
      res.send("user deleted successfully");
    } else {
      res.send("user id not found");
    }
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

/* updating the existing data which is present in the db*/

app.patch("/user/:id", async (req, res) => {
  const userId = req.params?.id;
  const updateData = req.body;

  try {
    const allowUpdates = [
      "firstName",
      "lastName",
      "userId",
      "gender",
      "skills",
      "password",
      "age",
    ];

    const isUpdatedAllowed = Object.keys(updateData).every((k) =>
      allowUpdates.includes(k)
    );

    if (!isUpdatedAllowed) {
      throw new Error("update now allowed");
    }
    // const user = await User.findByIdAndUpdate(userId, { lastName: "babu" });
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: updateData,
      },
      { runValidators: true, returnDocument: "after" } // mongoose by default validators is off even you define validation in schema , it is not updated so we define runValidators and returnDocument is for to return the updated document
    );
    res.send("updated successfully");
  } catch (err) {
    res.status(404).send("something went wrong" + err.message);
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
