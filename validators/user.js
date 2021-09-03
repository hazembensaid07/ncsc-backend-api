const { check } = require("express-validator");
//validate the form of the user
exports.userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
  check("birthDate")
    .not()
    .isEmpty()
    .isDate({ format: "DD-MM-YYYY" })
    .withMessage("Must be a valid date"),
  check("phone")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("phone is required"),
  check("adress").not().isEmpty().withMessage("adress is required"),
];
