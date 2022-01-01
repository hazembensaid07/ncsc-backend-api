const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "193d37fe7ccd0b41fa0bb7e50c72a4f5-1d8af1f4-08d63239",
    domain: "sandbox3623c2d0cc094602850534a16d6ff3e1.mailgun.org",
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