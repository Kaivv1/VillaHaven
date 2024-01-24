/* eslint no-undef: */
const express = require("express");
const signin = require("../controllers/signin.controller");

const loginRouter = express.Router();

loginRouter.post("/", signin);

module.exports = loginRouter;
