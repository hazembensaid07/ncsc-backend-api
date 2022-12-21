//including express to our project
const express = require("express");
const connectDB = require("./config/ConnectDB");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const api = require("./helpers/apiUri");
//requiring dotenv to access environment varaibles
require("dotenv").config();
const cors = require("cors");
//instanciating express
const app = express();
//connecting to DB
connectDB();
//OpenApi and swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for NCSC",
    version: "1.0.0",
    description:
      "This is an express rest api created for managing booking in ncsc event",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

// middleware global to work with json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// router
app.use(`${api()}`, require("./routes/user"));
app.use(`${api()}`, require("./routes/booking"));

app.use(`${api()}`, require("./routes/request"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT;
// linkin the server to the port
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log("server is running", PORT)
);
