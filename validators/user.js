const { check } = require("express-validator");
//validate the sign up form of the user
exports.userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
  //not negate the result of the nextvalidator
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
//validate the signin form of the user
exports.userSigninValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
];
//validate the email int forgot password form
exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];
exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
];
