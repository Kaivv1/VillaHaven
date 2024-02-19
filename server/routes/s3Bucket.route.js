/*eslint no-undef: */

const express = require("express");
const { getImage, uploadImage } = require("../controllers/s3Bucket.controller");
const { uploadMulterSetup } = require("../s3Bucket");

const getImageRouter = express.Router();
const uploadImageRouter = express.Router();
const upload = uploadMulterSetup();

getImageRouter.get("/:imageName", getImage);
uploadImageRouter.post("/", upload.single("picture"), uploadImage);
module.exports = { getImageRouter, uploadImageRouter };
