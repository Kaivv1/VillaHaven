/* eslint no-undef: */
const express = require("express");

const secretKeyRouter = express.Router();
const secretEmailRouter = express.Router();
secretKeyRouter.get("/", (req, res) => {
  const secret_value = process.env.TEMP_SECRET;

  return res.status(201).json({ secret_value });
});
secretEmailRouter.get("/", (req, res) => {
  const app_email = process.env.app_email;

  return res.status(201).json({ app_email });
});

module.exports = { secretKeyRouter, secretEmailRouter };
