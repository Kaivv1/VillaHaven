/* eslint no-undef: */
const express = require("express");

const secretKeyRouter = express.Router();

secretKeyRouter.get("/", (req, res) => {
  const secret_value = process.env.TEMP_SECRET;

  return res.status(201).json({ secret_value });
});

module.exports = secretKeyRouter;
