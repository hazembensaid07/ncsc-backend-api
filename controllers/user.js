const User = require("../models/user");
const jwt = require("jsonwebtoken");

const _ = require("lodash");

const fetch = require("node-fetch");
const { sendEmailWithNodemailer } = require("../helpers/email");

exports.test = (req, res) => {
  res.send({ message: "work" });
};
//signup controller
exports.signup = (req, res) => {
  //destructuring the req.body object
  const { firstName, lastName, CIN,socialLink,address,studyField,birthDate,email, password, university, phone} = req.body;
  // checking if the user eixsts or not
  User.findOne({ email }).select('+hashed_password').exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
   
    // creating the user token
    const token = jwt.sign(
      { firstName, lastName, CIN,socialLink,address,birthDate,studyField ,email, password, university, phone},
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "7d" }
    );
    // activation email that will be sent to the user
    const emailData = {
      from: "ncsc.booking@gmail.com", // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: req.body.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: "ACCOUNT ACTIVATION LINK",
      html: `
                <h1>Please use the following link to activate your account</h1>
                <p>linkFront/verify-email/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>http://localhost:3000</p>
            `,
    };

    sendEmailWithNodemailer(req, res, emailData);
  });
};
//acoount activation controller

exports.accountActivation = (req, res) => {
  //destructuring of the token from req.body
  const { token } = req.body;
  if (token) {
    //verifying the token using jwt
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
          return res.status(401).json({
            error: "Expired link. Signup again",
          });
        }
        //decoding the token to get the user parameters
        const  { firstName, lastName, CIN,birthDate,socialLink,address,studyField,email, password, university, phone}=
          jwt.decode(token);
        //creating a new user object (the password will be hashed in this phase using the functions declared int he user Schema)
        const user = new User( { firstName, lastName, birthDate,CIN,socialLink,address,studyField,email, password, university, phone});
        // saving the user to the DB
        user.save((err, user) => {
          return res.json({
            message: "Signup success. Please signin.",
            token: token,
          });
        });
        console.log("ddd")
      }
    );
  } else {
    return res.status(400).json({
      message: "Something went wrong. Try again.",
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  User.findOne({ email }).select('+hashed_password').exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
  
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      token,
    });
  });
};
//forgot password controller
exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  //verify that the user exists or not
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist",
      });
    }
  
    //signing the token
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: "10m",
      }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset link`,
      html: `
                <h1>Please use the following link to reset your password</h1>
                <p>linkFront/change-password/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p></p>
            `,
    };
    sendEmailWithNodemailer(req, res, emailData);
    return user.updateOne({ resetPasswordLink: token }, (err, success) => {});
  }).select('+hashed_password');
};
//reset password controller
exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    //verifiying the reset password Link
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, decoded) {
        if (err) {
          return res.status(400).json({
            error: "Expired link. Try again",
          });
        }
        //finding the user
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: "Something went wrong. Try later",
            });
          }

          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };

          user = _.extend(user, updatedFields);
          //saving the user
          user.save((err, result) => {
            res.json({
              message: `Great! Now you can login with your new password`,
            });
          });
        }).select('+hashed_password');
      }
    );
  }
};

//get current user
exports.loadUser = async(req, res) => {
  const { firstName, lastName, CIN,socialLink,address,studyField,birthDate,email,university, phone} = req.user;
  const user=await User.findById(req.user._id).populate('roomMates')
 
  res.status(200).send({ msg: "load user  succ", user:user});
};

exports.loadAllUsers = async (req, res) => {
  try {
    const result = await User.find().select("-hashed_password  -salt -__v");
    
    res.send({ response: result, message: "users found" });
  } catch (error) {
    res.status(400).send({ message: "can not get users" });
  }
};

