const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "193d37fe7ccd0b41fa0bb7e50c72a4f5-1d8af1f4-08d63239",
    domain: "sandbox3623c2d0cc094602850534a16d6ff3e1.mailgun.org",
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
    .catch((err) => {return res.status(400).json({
      message: `Email has not  been sent to ncsc support `,
    });});
};

