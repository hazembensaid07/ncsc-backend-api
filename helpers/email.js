const nodeMailer = require("nodemailer");

exports.sendEmailWithNodemailer = (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "hazembensaid195@gmail.com", // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      pass: "hazemmaths12345", // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`Message sent: ${info.response}`);
      return res.json({
        message: `Email has been sent to your email. Follow the instruction `,
      });
    })
    .catch((err) => console.log(`Problem sending email: ${err}`));
};
