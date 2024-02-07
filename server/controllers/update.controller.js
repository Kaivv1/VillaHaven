/* eslint no-undef: */
const Register = require("../Models/Register");
const errorHandler = require("../utils/error");
const { deleteFile, generateImageName, uploadFile } = require("../s3Bucket");
const sharp = require("sharp");
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

module.exports = updateUser;
