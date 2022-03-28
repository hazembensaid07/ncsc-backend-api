const { check } = require("express-validator");
//verify automatically the req.body
//validate the sign up form of the user
exports.sendRequestValidator = [
  
  
  check("emailReceiver").isEmail().withMessage(" emailReceiver Must be a valid email address"),
];
