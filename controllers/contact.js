const sendMail = require("../helpers/contact");

exports.sendMessage = (req, res) => {
  const { name, email, msg } = req.body;
  console.log("Data: ", req.body);
  
  sendMail(name, email, msg, function (err, data) {
    if (err) {
      res.status(400).json({ message: "Internal Error" });
    } else {
      res.status(200).json({ message: "Email sent!!!" });
    }
  });
};