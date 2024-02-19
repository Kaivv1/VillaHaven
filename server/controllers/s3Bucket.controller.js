/*eslint no-undef: */

const { getFile, uploadFile } = require("../s3Bucket");
const errorHandler = require("../utils/error");

const getImage = async (req, res, next) => {
  try {
    const { imageName } = req.params;

    const imageWithUrl = await getFile(imageName);

    res.status(200).json({ imageUrl: imageWithUrl });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
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

    res.status(200).json({ msg: "Image uploaded", response });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

module.exports = { getImage, uploadImage };
