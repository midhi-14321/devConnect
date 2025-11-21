const express = require("express");
const connectDB = require("./config/database");
const app = express();

const cookieParser = require("cookie-parser"); // it is a middleware to read cookies
app.use(express.json()); // will do read the JSON data and convert the data to js object and add the data to (req).body
app.use(cookieParser()); // It adds a middleware to the Express app that automatically reads cookies from every incoming request and puts them inside cookies

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
connectDB()
  .then(() => {
    app.listen(2000, () => {
      console.log("server running on the port 2000");
    });
  })
  .catch((err) => {
    console.error("database cannot be established");
  });
