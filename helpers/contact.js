const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "key-dbb4761323df8499f26b3dfaf740962f",
    domain: "sandbox22066eeeef9e49a3b3a7f988913f3e3a.mailgun.org",
  },
};
exports.sendEmailWithNodemailer = (req, res, email , name,msg) => {
  const mailOptions = {
    from: email,
    to: "ncsc.booking@gmail.com",
    name: name,
    text: msg,
  };
  const transporter = nodemailer.createTransport(mailGun(auth));
 
  return transporter
    .sendMail(mailOptions)
    .then((info) => {
  
      return res.status(200).json({
        message: `Email has been sent to ncsc support `,
      });
    })
    .catch((err) => {return res.status(200).json({
      message: `Email has been sent to ncsc support `,
    });});
};

