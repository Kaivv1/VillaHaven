/* eslint no-undef: */
/*eslint no-unused-vars: */
const Register = require("../Models/Register");
const Villa = require("../Models/Villa");
const { generateImageName, uploadFile, getFile } = require("../s3Bucket");
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

    await newVilla.save();

    return res.status(201).json("villa uploaded");
  } catch (error) {
    return next(errorHandler(500, "Couldn't upload the villa"));
  }
};

const getVillas = async (req, res, next) => {
  try {
    const villas = await Villa.find();
    if (!villas) return next(errorHandler(404, "Couldn't get villas"));

    const updatedVillas = await Promise.all(
      villas.map(async (villa) => {
        const updatedPictures = await Promise.all(
          villa.pictures.map(async (picture) => {
            const url = await getFile(picture);

            return url;
          })
        );

        villa.pictures = updatedPictures;
        return {
          ...villa,
        };
      })
    );
    return res.status(201).json(updatedVillas);
  } catch (error) {
    return next(errorHandler(500, error));
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

    return res.status(201).json("Villa set to favorite");
  } catch (error) {
    return next(errorHandler(500, "Failed to set to favorite"));
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

    const favoriteVillas = existingUserFavorites.favorites;
    const updatedFavoriteVillas = await Promise.all(
      favoriteVillas.map(async (villa) => {
        const updatedPictures = await Promise.all(
          villa.pictures.map(async (picture) => {
            const url = await getFile(picture);

            return url;
          })
        );

        villa.pictures = updatedPictures;
        return villa;
      })
    );
    return res.status(201).json(updatedFavoriteVillas);
  } catch (error) {
    return next(errorHandler(500, error));
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
    Register.delete;
    return res.status(201).json("Successfully removed from favorites");
  } catch (error) {
    return next(errorHandler(500, error));
  }
};

const getVillaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const villa = await Villa.findById(id);

    if (!villa) return next(errorHandler(404, "Villa not found"));

    const picturesWithUrl = await Promise.all(
      villa.pictures.map(async (picture) => {
        const url = await getFile(picture);

        return url;
      })
    );
    villa.pictures = picturesWithUrl;

    return res.status(200).json(villa);
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

const updateVillaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    console.log(body);
    const villa = await Villa.updateOne({ _id: id }, body);

    return res.status(200).json({ msg: "Villa Updated Successfully", villa });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

const addReservedDatesToVilla = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reservedDates } = req.body;

    const updatedVilla = await Villa.updateOne(
      { _id: id },
      { $addToSet: { reservedDates: reservedDates } }
    );

    return res
      .status(200)
      .json({ msg: "Reservation dates added", updatedVilla });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

module.exports = {
  uploadVilla,
  getVillas,
  setFavoriteVilla,
  getUserFavoriteVillas,
  removeFavoriteVilla,
  getVillaById,
  updateVillaById,
  addReservedDatesToVilla,
};
