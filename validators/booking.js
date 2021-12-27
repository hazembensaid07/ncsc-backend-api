const { check } = require("express-validator");
//verify automatically the req.body

exports.bookingValidator = [

  check("emails.*").isEmail().withMessage("Must be a valid email address"),
  check("transport_emails.*").isEmail().withMessage("Must be a valid email address"),
  check("transport_phones.*")
    .not()
    .isEmpty()
    .isLength({ min: 8})
    .withMessage("phone is required"),
    check("room")
    .not()
    .isEmpty()
    .withMessage("room is required"),
  
];