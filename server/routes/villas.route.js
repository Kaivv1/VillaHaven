const express = require("express");
const {
  getVillas,
  uploadVilla,
  setFavoriteVilla,
  getUserFavoriteVillas,
  removeFavoriteVilla,
} = require("../controllers/villas.controller");
const { auth, verifyAuth } = require("../controllers/auth.controller");

const getVillasRouter = express.Router();
const uploadVillasRouter = express.Router();
const setFavoriteVillaRouter = express.Router();
const getUserFavoriteVillasRouter = express.Router();
const deleteFavoriteVillaRouter = express.Router();

getVillasRouter.get("/", getVillas);
uploadVillasRouter.post("/", uploadVilla);
setFavoriteVillaRouter.put("/:id", auth, verifyAuth, setFavoriteVilla);
getUserFavoriteVillasRouter.get("/", auth, verifyAuth, getUserFavoriteVillas);
deleteFavoriteVillaRouter.put("/:id", auth, verifyAuth, removeFavoriteVilla);

module.exports = {
  getVillasRouter,
  uploadVillasRouter,
  setFavoriteVillaRouter,
  getUserFavoriteVillasRouter,
  deleteFavoriteVillaRouter,
};
