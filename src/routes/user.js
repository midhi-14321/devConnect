const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    res.json({
      message: "data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    req.status(400).send("ERROR: " + err.message);
  }
});

// get all the connections from different users
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    }).populate("fromUserId", ["firstName", "lastName"]);

    const data = connectionRequests.map((row) => row.fromUserId);
    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
module.exports = userRouter;









// const express = require("express");
// const userRouter = express.Router();
// const { userAuth } = require("../middlewares/auth");
// const ConnectionRequest = require("../models/connectionRequest");

// // Get all the pending connection request for the loggedIn user
// userRouter.get("/user/requests", userAuth, async (req, res) => {
//   try {
//     const loggedInUser = req.user;
//     const connectionRequests = await ConnectionRequest.find({
//       toUserId: loggedInUser._id,
//       status: "interested",
//     }).populate("fromUserId", ["firstName", "lastName"]);

//     res.json({
//       message: "data fetched successfully",
//       data: connectionRequests,
//     });
//   } catch (err) {
//     res.status(400).send("ERROR: " + err.message);
//   }
// });

// // Get all accepted connections for loggedIn user
// userRouter.get("/user/connections", userAuth, async (req, res) => {
//   try {
//     const loggedInUser = req.user;
//     const connectionRequests = await ConnectionRequest.find({
//       $or: [
//         { toUserId: loggedInUser._id, status: "accepted" },
//         { fromUserId: loggedInUser._id, status: "accepted" },
//       ],
//     })
//       .populate("fromUserId", ["firstName", "lastName"])
//       .populate("toUserId", ["firstName", "lastName"]);

//     // Return the connected users
//     const data = connectionRequests.map((row) =>
//       row.fromUserId._id.toString() === loggedInUser._id.toString()
//         ? row.toUserId
//         : row.fromUserId
//     );

//     res.json({ message: "Connections fetched", data });
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// });

// module.exports = userRouter;
