/* eslint no-undef: */
const express = require("express");

const {
  getVillas,
  uploadVilla,
  setFavoriteVilla,
  getUserFavoriteVillas,
  removeFavoriteVilla,
  getVillaById,
  updateVillaById,
  addReservedDatesToVilla,
} = require("../controllers/villas.controller");
const { auth, verifyAuth } = require("../controllers/auth.controller");
const { uploadMulterSetup } = require("../s3Bucket");
const upload = uploadMulterSetup();
const getVillasRouter = express.Router();
const uploadVillasRouter = express.Router();
const setFavoriteVillaRouter = express.Router();
const getUserFavoriteVillasRouter = express.Router();
const deleteFavoriteVillaRouter = express.Router();
const getVillaByIdRouter = express.Router();
const updateVillaByIdRouter = express.Router();
const addReservedDatesToVillaRouter = express.Router();

getVillasRouter.get("/", getVillas);
uploadVillasRouter.post("/", upload.array("pictures"), uploadVilla);
setFavoriteVillaRouter.put("/:id", auth, verifyAuth, setFavoriteVilla);
getUserFavoriteVillasRouter.get("/", auth, verifyAuth, getUserFavoriteVillas);
deleteFavoriteVillaRouter.put("/:id", auth, verifyAuth, removeFavoriteVilla);
getVillaByIdRouter.get("/:id", getVillaById);
updateVillaByIdRouter.put("/:id", updateVillaById);
addReservedDatesToVillaRouter.put("/:id", addReservedDatesToVilla);

module.exports = {
  getVillasRouter,
  uploadVillasRouter,
  setFavoriteVillaRouter,
  getUserFavoriteVillasRouter,
  deleteFavoriteVillaRouter,
  getVillaByIdRouter,
  updateVillaByIdRouter,
  addReservedDatesToVillaRouter,
};
