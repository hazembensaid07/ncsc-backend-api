const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: process.env.api_key,
    domain: process.env.domain,
  },
};
const transporter = nodemailer.createTransport(mailGun(auth));
  const sendMail = (name, email, msg, cb) => {
    const mailOptions = {
      sender: name,
      from: email,
      to: "ncsc.booking@gmail.com",
     
      text: msg,
    };
  
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, data);
      }
    });
  };

  module.exports = sendMail;