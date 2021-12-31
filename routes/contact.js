const express = require("express");
const router = express.Router();
const {  isAuth } = require("../middlewares/SignIn");
const {
    sendMessage
  } = require("../controllers/contact");
const {
    contactValidator 
  } = require("../validators/contact");
  const { runValidation } = require("../validators");
  router.post("/contact/add",   contactValidator , runValidation, sendMessage);


  module.exports = router;