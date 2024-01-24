/* eslint no-undef: */
const { verifyUser } = require("../controllers/auth.controller");
const resetPassword = require("../controllers/resetPassword.controller");
const express = require("express");

const resetPassRouter = express.Router();

resetPassRouter.put("/", verifyUser, resetPassword);

module.exports = resetPassRouter;
