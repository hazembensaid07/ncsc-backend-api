const jwt = require("jsonwebtoken");

const User = require("../models/user");
// always ass authorization : token in the protected routes
//to protect the user access

exports.isAuth = async (req, res, next) => {
  try {
    // test token
    const token = req.headers["authorization"];

    // if the token is undefined =>
    if (!token) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }
    // get the id from the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // search the user
    const user = await User.findById(decoded._id).select("-hashed_password");

    // send not authorisation IF NOT USER
    if (!user) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }

    // if user exist
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send({ errors: [{ msg: "server error" }] });
  }
};
//to protect the admin access
exports.admin = async (req, res, next) => {
  try {
    // test token
    const token = req.headers["authorization"];
    console.log(token);
    // if the token is undefined =>
    if (!token) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }
    // get the id from the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // search the user
    const user = await User.findById(decoded._id).select("-hashed_password");

    // send not authorisation IF NOT admin
    if (user.role !== "admin") {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }

    // if user exist
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send({ errors: [{ msg: "server error" }] });
  }
};
