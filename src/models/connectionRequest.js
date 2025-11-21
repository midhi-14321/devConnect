const mongoose = require("mongoose");
const { connect } = require("../routes/auth");

const connectionRequest = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user", // reference to the user collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["accepted", "rejected", "interested", "ignored"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

//This middleware prevents a user from sending a connection request to themselves by validating the document before it is saved to the database.
connectionRequest.pre("save", function (next) {
  const connectionRequest = this; // current object

  //check if the fromUserId is same as toUserId . if not save the data in db and sending the user request
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("cannot send the connection to yourself");
  }
  next();
});

const connectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequest
);

module.exports = connectionRequestModel;
