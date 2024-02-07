/* eslint no-unused-vars: */
/* eslint no-undef: */

const bcryptjs = require("bcryptjs");
const Register = require("../Models/Register");
const errorHandler = require("../utils/error");
const generateToken = require("../utils/generateToken");
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await Register.findOne({ email });
    if (!validUser) return next(errorHandler(401, "Invalid credentials"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

    const { password: pass, ...rest } = validUser._doc;
    const token = generateToken(validUser._id);

    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(200).json({ data: rest });
  } catch (err) {
    return next(errorHandler(505, "Internal Server Error"));
  }
};

module.exports = signin;
