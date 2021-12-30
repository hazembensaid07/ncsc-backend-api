const { check } = require("express-validator");
//verify automatically the req.body

exports.bookingValidator = [

 
    check("room")
    .not()
    .isEmpty()
    .withMessage("room is required"),
    
  
];