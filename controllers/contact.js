const { sendEmailWithNodemailer } = require("../helpers/contact");
exports.sendMessage = (req, res) => {
  const {  email, subject, msg } = req.body;

  sendEmailWithNodemailer(req, res,email,subject,msg);
};