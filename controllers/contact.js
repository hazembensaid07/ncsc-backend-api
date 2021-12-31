const { sendEmailWithNodemailer } = require("../helpers/contact");
exports.sendMessage = (req, res) => {
  const {  email, name, msg } = req.body;

  sendEmailWithNodemailer(req, res,email,name,msg);
};