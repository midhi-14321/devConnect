const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken"); // generate the JWT token

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email id" + value);
        }
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("enter a strong password");
        }
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        // validate function is run when new document is created only , it is not work for existing data
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },

    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "This is a default about of the User",
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "devConnect@2002", {
    expiresIn: "1d", // token is expires after 1 day
  });
  return token;
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
