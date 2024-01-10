const express = require("express");
const sendEmail = require("../controllers/mailer.controller");

const sendEmailRouter = express.Router();

sendEmailRouter.post("/", sendEmail);

module.exports = sendEmailRouter;
