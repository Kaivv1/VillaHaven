/* eslint no-undef: */
/*eslint no-unused-vars: */
const Register = require("../Models/Register");
const Villa = require("../Models/Villa");
const { generateImageName, uploadFile } = require("../s3Bucket");
const errorHandler = require("../utils/error");

const uploadVilla = async (req, res, next) => {
  try {
    const picturesUrls = await Promise.all(
      req.files.map(async (file) => {
        const imageName = generateImageName();
        await uploadFile(file.buffer, imageName, file.mimetype);

        return imageName;
      })
    ).catch((err) => {
      return next(errorHandler(404, "Files failed to upload"));
    });

    const newVilla = new Villa({
      pictures: picturesUrls,
      ...req.body,
    });

    console.log(newVilla);
    await newVilla.save();

    res.status(201).json("villa uploaded");
  } catch (error) {
    next(errorHandler(500, "Couldn't upload the villa"));
  }
};

const getVillas = async (req, res, next) => {
  try {
    const villas = await Villa.find();

    res.status(201).json(villas);
  } catch (error) {
    next(errorHandler(500, error));
  }
};

const setFavoriteVilla = async (req, res, next) => {
  try {
    const { id: villaId } = req.params;
    const { userId } = req.user;

    await Register.updateOne(
      { _id: userId },
      { $addToSet: { favorites: villaId } }
    );

    res.status(201).json("Villa set to favorite");
  } catch (error) {
    next(errorHandler(500, "Failed to set to favorite"));
  }
};

const getUserFavoriteVillas = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const existingUserFavorites = await Register.findById(userId).populate(
      "favorites"
    );

    if (!existingUserFavorites)
      return next(errorHandler(404, "No user favorites"));

    res.status(201).json(existingUserFavorites.favorites);
  } catch (error) {
    next(errorHandler(500, error));
  }
};

const removeFavoriteVilla = async (req, res, next) => {
  try {
    const { id: villaId } = req.params;
    const { userId } = req.user;
    await Register.updateOne(
      { _id: userId },
      { $pull: { favorites: villaId } }
    );

    res.status(201).json("Successfully removed from favorites");
  } catch (error) {
    next(errorHandler(500, error));
  }
};

module.exports = {
  uploadVilla,
  getVillas,
  setFavoriteVilla,
  getUserFavoriteVillas,
  removeFavoriteVilla,
};
