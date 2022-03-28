const { check } = require("express-validator");
exports.hotelValidator = [
    check("rooms").not().isEmpty().withMessage("rooms are required"),
    check("transport").not().isEmpty().withMessage("transport  is required"),
  ];