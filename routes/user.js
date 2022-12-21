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
router.get("/user/test", test);
//schemas definition
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - CIN
 *         - socialLink
 *         - birthDate
 *         - address
 *         - studyField
 *         - email
 *         - password
 *         - university
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The customer name
 *           example: hazem
 *         lastName:
 *           type: string
 *           description: The customer family name
 *           example: xyz
 *         CIN:
 *           type: string
 *           description: the customer identity card number
 *           example: 13650877
 *         socialLink:
 *           type: string
 *           description: the user social link to be added to the private group of the event
 *           example: https://www.facebook.com/hazem.bensaid.712
 *         birthDate:
 *           type: string
 *           description: the customer birthdate
 *           example: 15-10-1999
 *         address:
 *           type: string
 *           description: the customer adress
 *           example: ariana
 *         studyField:
 *           type: string
 *           description: the customer study field
 *           example: rt5
 *         email:
 *           type: string
 *           description: the customer email
 *           example: hazem@gmail.com
 *         password:
 *           type: string
 *           description: the customer password
 *           example:  Hazem5683.
 *         university:
 *           type: string
 *           description: the customer university
 *           example:  insat
 *         phone:
 *           type: string
 *           description: the customer phone number
 *           example:  53307676
 *
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User-Sign-in:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *
 *         email:
 *           type: string
 *           description: The user's email
 *           example: hazem@gmail.com
 *         password:
 *           type: string
 *           description: A strong password for the user
 *           example: 4654654az654d65g4d65g4.
 *
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     accountActivation:
 *       type: object
 *       required:
 *         - token
 *
 *       properties:
 *
 *         token:
 *           type: string
 *           description: A token at the end of a link sent to the user's personal email to verify the account
 *           example: 654654654654a1654a654d6s54dv6ds54v6d54vd6v4d6v4d6
 *
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     ForgetPassword:
 *       type: object
 *       required:
 *         - email
 *
 *       properties:
 *
 *         email:
 *           type: string
 *           description: The user's email
 *           example: hazem@gmail.com
 *
 *
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     resetPassword:
 *       type: object
 *       required:
 *         - newPassword
 *         - resetPasswordLink
 *
 *       properties:
 *         newPassword:
 *           type: string
 *           description: the new password
 *           example: 58634543654av.
 *         resetPasswordLink:
 *           type: string
 *           description: hashed link that allow the user to change his old password
 *           example: 547dsssssssssssgdsgergregzasdfb56
 *
 *
 */
/**
 * @swagger
 * tags:
 *   name: user
 *   description: Authentification API
 */

//routes documentation
/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Sign up
 *     tags: [user]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/User-Sign-in'
 *     responses:
 *       200:
 *         description: Email has been sent to your email. Follow the instruction
 *       400:
 *         description: Email is taken
 *       500:
 *        description: server error
 */
router.post("/user/signup", userSignupValidator, runValidation, signup);
/**
 * @swagger
 * /api/user/account-activation:
 *   post:
 *     summary: Verify your account
 *     tags: [user]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/accountActivation'
 *     responses:
 *       200:
 *         description: Signup success. Please signin.
 *       400:
 *        description: Expired link. Signup again
 *       500:
 *         description: Something went wrong. Try again.
 */
router.post("/user/account-activation", accountActivation);
/**
 * @swagger
 * /api/user/signin:
 *   post:
 *     summary: Sign in
 *     tags: [user]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/User-Sign-in'
 *     responses:
 *       200:
 *         description: success and sending the user token
 *       400:
 *         description: User with that email does not exist. Please signup
 *       401:
 *         description: Email and password do not match
 *
 */
router.post("/user/signin", userSigninValidator, runValidation, signin);
/**
 * @swagger
 * /api/user/forgot-password:
 *   put:
 *     summary: send a request to change your password
 *     tags: [user]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/ForgetPassword'
 *     responses:
 *       200:
 *         description: Email has been sent to your email. Follow the instruction
 *       400:
 *         description: User with that email does not exist
 *       500:
 *        description: server error
 */
router.put(
  "/user/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
/**
 * @swagger
 * /api/user/reset-password:
 *   put:
 *     summary: Change your password
 *     tags: [user]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/resetPassword'
 *     responses:
 *       200:
 *         description: Great! Now you can login with your new password
 *       400:
 *         description: Expired link. Try again
 *       401:
 *         description: Something went wrong. Try later
 */
router.put(
  "/user/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);

//testing user middleware
router.post("/go", isAuth, test);
//testing admin middleware
router.post("/goo", admin, test);
/**
 * @swagger
 * /api/user/loadprofile:
 *   get:
 *     summary: get user profile
 *     tags: [user]
 *     parameters:
 *            - in: header
 *              name: Authorization
 *              description: user token
 *              required: true
 *              schema:
 *               type: string
 *     responses:
 *       200:
 *         description: load user  succ
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: server error
 */
router.get("/user/loadprofile", isAuth, loadUser);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: get all users
 *     tags: [user]
 *     parameters:
 *            - in: header
 *              name: Authorization
 *              description: admin  token (admin protected route)
 *              required: true
 *              schema:
 *               type: string
 *     responses:
 *       200:
 *         description: users found
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: server error
 *       401:
 *         description: can not get users
 *
 */
router.get("/users", admin, loadAllUsers);

module.exports = router;
