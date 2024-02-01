/* eslint no-undef: */
const express = require("express");

const secretKeyRouter = express.Router();
const secretEmailRouter = express.Router();
const secretMapApiRouter = express.Router();
secretKeyRouter.get("/", (req, res) => {
  const secret_value = process.env.TEMP_SECRET;

  return res.status(201).json({ secret_value });
});
secretEmailRouter.get("/", (req, res) => {
  const app_email = process.env.app_email;

  return res.status(201).json({ app_email });
});

secretMapApiRouter.get("/", (req, res) => {
  const API = process.env.GOOGLE_MAPS_API_KEY;

  res.status(200).json({ API });
});
module.exports = { secretKeyRouter, secretEmailRouter, secretMapApiRouter };
