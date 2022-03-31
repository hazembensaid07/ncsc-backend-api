// the work that should be done when sending a request to this url
const express = require("express");
const router = express.Router();
const {
  signup,
  accountActivation,
  signin,
  forgotPassword,
  resetPassword,
  test,
  loadUser,
  loadAllUsers,
} = require("../controllers/user");
//import validators
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validators/user");
const { runValidation } = require("../validators");
const { admin, isAuth } = require("../middlewares/SignIn");
//validation will be made on the req.body json
router.post("/user/test", test);
router.post("/user/signup", userSignupValidator, runValidation, signup);
router.post("/user/account-activation", accountActivation);
router.post("/user/signin", userSigninValidator, runValidation, signin);
router.put(
  "/user/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  "/user/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);

//the current user is saved in req.user
router.post("/go", isAuth, test);
router.post("/goo", admin, test);
router.get("/user/loadprofile", isAuth, loadUser);
router.get("/users", admin, loadAllUsers);

module.exports = router;
