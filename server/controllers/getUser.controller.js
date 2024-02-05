/* eslint no-unused-vars: */
/* eslint no-undef: */
const Register = require("../Models/Register");
const { getFile } = require("../s3Bucket");
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
    next(errorHandler(500, "Internal Server Error"));
  }
};

const getUserByToken = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await Register.findById(userId);
    if (!user) return next(errorHandler(404, "User not found"));

    const { password, ...rest } = user._doc;

    if (user.avatar) {
      const avatarWithUrl = await getFile(user.avatar);
      const userWithAvatar = { ...rest, avatar: avatarWithUrl };
      res.status(201).json(userWithAvatar);
    }
    res.status(201).json({ ...rest });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

module.exports = { getUser, getUserByToken };
