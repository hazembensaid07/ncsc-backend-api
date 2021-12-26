const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "a2b6128f7d1b3cd710cc6566ba824e06-1831c31e-35b4f778",
    domain: "sandbox22066eeeef9e49a3b3a7f988913f3e3a.mailgun.org",
  },
};
exports.sendEmailWithNodemailer = (req, res, email , subject,msg) => {
  const mailOptions = {
    from: email,
    to: "ncsc.booking@gmail.com",
    subject: subject,
    text: msg,
  };
  const transporter = nodemailer.createTransport(mailGun(auth));
 
  return transporter
    .sendMail(mailOptions)
    .then((info) => {
  
      return res.json({
        message: `Email has been sent to ncsc support `,
      });
    })
    .catch((err) => console.log(`Problem sending email: ${err}`));
};

