const { check } = require("express-validator");
exports.addRestaurentValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("rate").not().isEmpty().withMessage("rate is required"),
  check("description").not().isEmpty().withMessage("decription is required"),
  check("imgSrc").not().isEmpty().withMessage("image is required"),

  check("phone")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("phone is required"),
  check("adress").not().isEmpty().withMessage("adress is required"),
];
