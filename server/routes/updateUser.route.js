const express = require("express");
const updateUserRouter = express.Router();
const updateUser = require("../controllers/update.controller");
const { auth, verifyUser } = require("../controllers/auth.controller");
updateUserRouter.put("/:id", auth, verifyUser, updateUser);

module.exports = updateUserRouter;
