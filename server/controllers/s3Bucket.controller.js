/*eslint no-undef: */

const Register = require("../Models/Register");
const { getFile, uploadFile, deleteFile } = require("../s3Bucket");
const errorHandler = require("../utils/error");

const getImage = async (req, res, next) => {
  try {
    const { imageName } = req.params;

    const imageWithUrl = await getFile(imageName);

    return res.status(200).json({ imageUrl: imageWithUrl });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

const uploadImage = async (req, res, next) => {
  try {
    const uploadedFile = req.file;

    const response = await uploadFile(
      uploadedFile.buffer,
      uploadedFile.originalname,
      uploadedFile.mimetype
    );

    return res.status(200).json({ msg: "Image uploaded", response });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

const deleteImage = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await Register.findById(userId);

    if (!user) return next(errorHandler(404, "No user with that id"));

    if (user.avatar) {
      await deleteFile(user.avatar);
      await user.updateOne({ $unset: { avatar: 1 } });
    }
    return res.status(200).json({ msg: "User avatar deleted successfully" });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

module.exports = { getImage, uploadImage, deleteImage };
