//including express to our project
const express = require("express");
const connectDB = require("./config/ConnectDB");
//requiring dotenv to access environment varaibles
require("dotenv").config();
const cors = require("cors");
//instanciating express
const app = express();
//connecting to DB
connectDB();

// middleware global to work with json format
app.use(express.json());

app.use(cors());
// router
app.use("/api/user", require("./routes/user"));

const PORT = process.env.PORT;
// linkin the server to the port
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log("server is running", PORT)
);
