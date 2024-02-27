/* eslint no-unused-vars: */
/* eslint no-undef: */
const Register = require("../Models/Register");
const { getFile } = require("../s3Bucket");
const errorHandler = require("../utils/error");
const { deleteFile, generateImageName, uploadFile } = require("../s3Bucket");
const bcryptjs = require("bcryptjs");
const sharp = require("sharp");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res, next) => {
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
    return res
      .status(201)
      .json({ msg: "User created successfully", success: true });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

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

    return res.status(200).json({ data: rest, success: true });
  } catch (err) {
    return next(errorHandler(505, "Internal Server Error"));
  }
};

const getUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    if (!email) return next(errorHandler(501, "Invalid credentials"));

    const user = await Register.findOne({ email });

    if (!user) return next(errorHandler(500, "Couldn't find user data"));

    const { password, ...rest } = user._doc;

    return res.status(201).json({ data: rest });
  } catch (err) {
    return next(errorHandler(500, "Internal Server Error"));
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
      return res.status(201).json(userWithAvatar);
    }
    return res.status(201).json({ ...rest });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    if (userId) {
      const file = req.file;
      const imageName = generateImageName();
      if (file) {
        const user = await Register.findById(userId);
        if (user.avatar) {
          await deleteFile(user.avatar);
        }
        const buffer = await sharp(file.buffer)
          .resize({
            height: 100,
            width: 100,
            fit: "contain",
          })
          .toBuffer();
        await uploadFile(buffer, imageName, file.mimetype);

        await Register.updateOne(
          { _id: userId },
          { avatar: imageName, ...req.body }
        );
      } else {
        await Register.updateOne({ _id: userId }, req.body);
      }

      return res.status(201).json("User updated !");
    } else {
      return next(errorHandler(401, "Wrong user id !"));
    }
  } catch (err) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await Register.findById(userId);
    if (!user) return next(errorHandler(404, "No user with that id"));

    if (user.avatar) {
      await deleteFile(user.avatar);
    }
    await user.deleteOne({ _id: userId });

    return res
      .status(200)
      .json({ msg: "User deleted successfully", success: true });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    if (!req.app.locals.resetSession)
      return next(errorHandler(440, "Session expired"));

    const { email, password } = req.body;

    const user = await Register.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    if (user) {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      await Register.findOneAndUpdate(
        { email },
        {
          password: hashedPassword,
        }
      );
      req.app.locals.resetSession = false;
      return res
        .status(201)
        .json({ success: true, status: 201, message: "User updated" });
    }
  } catch (error) {
    return next(errorHandler(500, error));
  }
};

module.exports = {
  getUser,
  getUserByToken,
  updateUser,
  resetPassword,
  registerUser,
  signin,
  deleteUser,
};
