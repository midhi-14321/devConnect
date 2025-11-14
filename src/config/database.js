const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sankamidhilesh:Midhi%402002@cluster0.pww5hda.mongodb.net/devConnect"
  );
  console.log("database connected successfully");
};

module.exports = connectDB;
