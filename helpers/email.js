const nodeMailer = require("nodemailer");

exports.sendEmailWithNodemailer = (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.email, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      pass: process.env.password, // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter
    .sendMail(emailData)
    .then((info) => {

      return res.status(200).json({
        message: `Email has been sent to your email. Follow the instruction `,
      });
    })
    .catch((err) => res.status(400).send("cannot send mail"));
};
