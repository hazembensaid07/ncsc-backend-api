const { check } = require("express-validator");
//verify automatically the req.body
//validate the sign up form of the user
exports.userSignupValidator = [
  check("firstName").not().isEmpty().withMessage("firstName is required"),
  check("lastName").not().isEmpty().withMessage("lastName is required"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
  //not negate the result of the nextvalidator
  check("CIN")
  .not()
  .isEmpty()
  .isLength({ min: 8, max:8 })
  .withMessage("cin  is required and must be valid"),
  
    check("socialLink").not().isEmpty().withMessage("socialLink is required"),
    check("address").not().isEmpty().withMessage("address is required"),
    check("studyField").not().isEmpty().withMessage("studyField is required"),
    check("birthDate")
    .not()
    .isEmpty()
    .isDate({ format: "DD-MM-YYYY" })
    .withMessage("Must be a valid date"),

  check("university").not().isEmpty().withMessage("university is required"),
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


