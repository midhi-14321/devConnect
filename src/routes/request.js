const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

//send connection request API
requestRouter.post("/sendconnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("sending the connection request");
  res.send(user.firstName + "connection request sent");
});

module.exports = requestRouter;
