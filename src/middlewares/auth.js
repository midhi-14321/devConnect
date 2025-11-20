const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("Token from cookies:", req.cookies.token);
    if (!token) {
      throw new Error("token is not valid...");
    }
    const decodeObj = await jwt.verify(token, "devConnect@2002");
    console.log("Decoded:", decodeObj);
    const { _id } = decodeObj;
    const user = await User.findById(_id);
    console.log("User:", user);
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { userAuth };
