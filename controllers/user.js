const User = require("../models/user");
const jwt = require("jsonwebtoken");

const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const { sendEmailWithNodemailer } = require("../helpers/email");

exports.test = (req, res) => {
  res.send({ message: "work" });
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
      to: req.body.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: "ACCOUNT ACTIVATION LINK",
      html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${token}</p>
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
        const { name, email, password, adress, phone, birthDate } =
          jwt.decode(token);
        //creating a new user object (the password will be hashed in this phase using the functions declared int he user Schema)
        const user = new User({
          name,
          email,
          password,
          adress,
          phone,
          birthDate,
        });
        // saving the user to the DB
        user.save((err, user) => {
          return res.json({
            message: "Signup success. Please signin.",
            token: token,
          });
        });
      }
    );
  } else {
    return res.json({
      message: "Something went wrong. Try again.",
    });
  }
};
exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  User.findOne({ email }).exec((err, user) => {
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
                <p>${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p></p>
            `,
    };
    sendEmailWithNodemailer(req, res, emailData);
    return user.updateOne({ resetPasswordLink: token }, (err, success) => {});
  });
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
        });
      }
    );
  }
};
//creating a google auth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.googleLogin = (req, res) => {
  //get the token
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then((response) => {
      // console.log('GOOGLE LOGIN RESPONSE',response)
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role },
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
                return res.status(400).json({
                  error: "User signup failed with google",
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
              );
              const { _id, email, name, role } = data;
              return res.json({
                token,
                user: { _id, email, name, role },
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: "Google login failed. Try again",
        });
      }
    });
};
//facebook login controller
exports.facebookLogin = (req, res) => {
  console.log("FACEBOOK LOGIN REQ BODY", req.body);
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return (
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      // .then(response => console.log(response))
      .then((response) => {
        const { email, name } = response;
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role },
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log("ERROR FACEBOOK LOGIN ON USER SAVE", err);
                return res.status(400).json({
                  error: "User signup failed with facebook",
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
              );
              const { _id, email, name, role } = data;
              return res.json({
                token,
                user: { _id, email, name, role },
              });
            });
          }
        });
      })
      .catch((error) => {
        res.json({
          error: "Facebook login failed. Try later",
        });
      })
  );
};
//get current user
exports.loadUser = (req, res) => {
  const { name, email, password, adress, phone, birthDate } = req.user;
  const currentUser = { name, email, password, adress, phone, birthDate };
  res.status(200).send({ msg: "load user  succ", user: currentUser });
};
exports.updateUser = async (req, res) => {
  try {
    const userupdate = req.body;
    console.log(userupdate);
    const result = await User.updateOne(
      { _id: req.user._id },
      { $set: { ...userupdate } }
    );
    res.status(200).send({ message: "update success" });
  } catch (error) {
    res.status(400).send("No user  exist with that ID");
  }
};
