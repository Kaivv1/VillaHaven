/* eslint no-undef: */
const express = require("express");
const Register = require("../Models/Register");
const registerRouter = express.Router();
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");

registerRouter.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new Register({
      ...req.body,
      password: hashedPassword,
    });
    const existingUser = await Register.findOne({ email });
    if (existingUser) return next(errorHandler(400, "User already exists"));
    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = registerRouter;
