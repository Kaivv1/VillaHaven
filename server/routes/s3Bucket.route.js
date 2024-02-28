/*eslint no-undef: */

const express = require("express");
const {
  getImage,
  uploadImage,
  deleteImage,
} = require("../controllers/s3Bucket.controller");
const { uploadMulterSetup } = require("../s3Bucket");
const { auth, verifyAuth } = require("../controllers/auth.controller");

const upload = uploadMulterSetup();
const getImageRouter = express.Router();
const uploadImageRouter = express.Router();
const deleteImageRouter = express.Router();

getImageRouter.get("/:imageName", getImage);
uploadImageRouter.post("/", upload.single("picture"), uploadImage);
deleteImageRouter.delete("/", auth, verifyAuth, deleteImage);

module.exports = { getImageRouter, uploadImageRouter, deleteImageRouter };
