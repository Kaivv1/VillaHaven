/* eslint no-undef: */
const {
  getUser,
  getUserByToken,
} = require("../controllers/getUser.controller");
const { auth, verifyAuth } = require("../controllers/auth.controller");
const express = require("express");
const userRouter = express.Router();
const userByTokenRouter = express.Router();
userRouter.get("/:email", getUser);
userByTokenRouter.get("/", auth, verifyAuth, getUserByToken);
module.exports = { userRouter, userByTokenRouter };
