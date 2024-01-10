const Register = require("../Models/Register");
const errorHandler = require("../utils/error");

const getUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    console.log(email);
    if (!email) return next(errorHandler(501, "Invalid credentials"));

    const user = await Register.findOne({ email });

    if (!user) return next(errorHandler(500, "Couldn't find user data"));

    const { password, ...rest } = user._doc;

    res.status(201).json({ data: rest });
  } catch (err) {
    next(err);
  }
};

const getUserByToken = async (req, res, next) => {
  const { userId } = req.user;

  const user = await Register.findById(userId);

  res.status(201).json(user);
};

module.exports = { getUser, getUserByToken };
