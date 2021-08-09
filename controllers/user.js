const User = require("../models/user");

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
