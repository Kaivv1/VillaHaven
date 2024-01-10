const express = require("express");
const Register = require("../Models/Register");
const registerRouter = express.Router();
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
registerRouter.get("/", (req, res) => {
  Register.find()
    .then((register) => res.json(register))
    .catch((err) => {
      console.log("ERROR", err);
      res.status(500).json({ error: "Server Error" });
    });
});

registerRouter.get("/:id", (req, res) => {
  Register.find()
    .then((register) => res.json(register))
    .catch((err) => console.log("ERROR", err));
});

registerRouter.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new Register({
    ...req.body,
    password: hashedPassword,
  });
  try {
    const existingUser = await Register.findOne({ email });
    if (existingUser) return next(errorHandler(400, "User already exists"));
    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = registerRouter;
