// the work that should be done when sending a request to this url
const express = require("express");
const router = express.Router();
const { Receive, signup } = require("../controllers/user");
//import validators
const { userSignupValidator } = require("../validators/user");
const { runValidation } = require("../validators");

router.post("/user/post", Receive);
router.post("/user/signup", userSignupValidator, runValidation, signup);
module.exports = router;
