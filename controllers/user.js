const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const { sendEmail } = require("../helpers/email");
exports.Receive = async (req, res) => {
  try {
    //   req.body
    const { name } = req.body;

    const newUser = new User({ name });

    //then we save it in the database
    await newUser.save();
    res.status(200).send({ msg: "user saved succ" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not save the user" }] });
  }
};
//signup controller
exports.signup = (req, res) => {
  //destructuring the req.body object
  const { name, email, password, adress, phone, birthDate } = req.body;
  // checking if the user eixsts or not
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    // creating the user token
    const token = jwt.sign(
      { name, email, password, adress, phone, birthDate },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "7d" }
    );
    // activation email that will be sent to the user
    const emailData = {
      from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: "ACCOUNT ACTIVATION LINK",
      html: `
                <h1>Please use the following link to activate your account</h1>
                <p>http://localhost:3000/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>http://localhost:3000</p>
            `,
    };

    sendEmail(req.res, emailData);
  });
};
