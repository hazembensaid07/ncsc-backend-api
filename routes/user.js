// the work that should be done when sending a request to this url
const express = require("express");
const router = express.Router();
const {
  signup,
  accountActivation,
  signin,
  forgotPassword,
  resetPassword,
  googleLogin,
  facebookLogin,
} = require("../controllers/user");
//import validators
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validators/user");
const { runValidation } = require("../validators");

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
router.post("/google-login", googleLogin);
router.post("/facebook-login", facebookLogin);
module.exports = router;
