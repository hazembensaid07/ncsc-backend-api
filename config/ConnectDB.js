// require mongoose DAO (Data Access Object) communicaion betweeen server and Db
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("database connected successfully");
  } catch (error) {
    console.log("database can not connect", error);
  }
};

module.exports = connectDB;
