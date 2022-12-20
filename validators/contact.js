const { check } = require("express-validator");
exports.contactValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
  check("msg").not().isEmpty().withMessage("Message  is required"),
  check("name").not().isEmpty().withMessage("name  is required"),
];
