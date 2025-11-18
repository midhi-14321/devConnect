const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("error saving the data" + err.message);
  }
  console.log(req.body);
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

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

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
