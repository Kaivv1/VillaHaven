/* eslint no-undef: */
const express = require("express");
const updateUserRouter = express.Router();
const updateUser = require("../controllers/update.controller");
const { auth, verifyAuth } = require("../controllers/auth.controller");
const { uploadMulterSetup } = require("../s3Bucket");

const upload = uploadMulterSetup();

updateUserRouter.put(
  "/",
  auth,
  verifyAuth,
  upload.single("avatar"),
  updateUser
);

module.exports = updateUserRouter;
