/* eslint no-unused-vars: */
/* eslint no-undef: */

const nodemailer = require("nodemailer");
const errorHandler = require("../utils/error");
const Mailgen = require("mailgen");

const config = {
  service: "gmail",
  auth: {
    user: process.env.app_email,
    pass: process.env.app_pass,
  },
};

const transporter = nodemailer.createTransport(config);

const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "VillaHavenSupport",
    link: "VillaHaven",
  },
});

const sendEmail = async (req, res, next) => {
  const { name, userEmail, text, subject } = req.body;

  const email = {
    body: {
      name: name,
      intro: text,
      outro:
        "Need help, or have question? Just reply to this email, we'd love to help.",
    },
  };

  const emailBody = MailGenerator.generate(email);

  const message = {
    from: process.env.app_email,
    to: userEmail,
    subject: subject,
    text: text,
    html: emailBody,
  };

  await transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(201)
        .json({ msg: "A verification code has been sent to your email" });
    })
    .catch((err) => {
      return next(errorHandler(500, "Something went wrong"));
    });
};

module.exports = sendEmail;
