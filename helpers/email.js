const nodeMailer = require("nodemailer");

exports.sendEmailWithNodemailer = (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "mail.gandi.net",
    port: 465,
    auth: {
      user: "no-reply@contracktime.com",
      pass: "N@reply2022",
    },
  });

  return transporter
    .sendMail(emailData)
    .then((info) => {
      return res.status(200).json({
        message: `Email has been sent to your email. Follow the instruction `,
      });
    })
    .catch((err) => res.status(500).send({ message: "server error" }));
};
