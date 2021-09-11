const express = require("express");
const router = express.Router();
const { admin, isAuth } = require("../middlewares/SignIn");
const {
  addRestaurent,
  loadAllRestaurents,
  updateRestaurent,
  deleteRestaurent,
  loadRestaurent,
} = require("../controllers/restaurent");
const { addRestaurentValidator } = require("../validators/restaurent");
const { runValidation } = require("../validators");
router.post(
  "/restaurent/add",
  admin,
  addRestaurentValidator,
  runValidation,
  addRestaurent
);
router.get("/restaurent/all", isAuth, loadAllRestaurents);
router.get("/restaurent/:id", isAuth, loadRestaurent);
router.put(
  "/restaurent/:id",
  admin,
  addRestaurentValidator,
  runValidation,
  updateRestaurent
);
router.delete("/restaurent/:id", admin, deleteRestaurent);
module.exports = router;
