/* eslint no-undef: */
const {
  getUser,
  getUserByToken,
  registerUser,
  resetPassword,
  updateUser,
  signin,
  deleteUser,
} = require("../controllers/user.controller");
const {
  auth,
  verifyAuth,
  verifyUser,
} = require("../controllers/auth.controller");
const express = require("express");
const { uploadMulterSetup } = require("../s3Bucket");
const upload = uploadMulterSetup();

const registerRouter = express.Router();
const loginRouter = express.Router();
const userRouter = express.Router();
const userByTokenRouter = express.Router();
const resetPassRouter = express.Router();
const updateUserRouter = express.Router();
const deleteUserRouter = express.Router();

registerRouter.post("/", registerUser);
loginRouter.post("/", signin);
updateUserRouter.put(
  "/",
  auth,
  verifyAuth,
  upload.single("avatar"),
  updateUser
);
resetPassRouter.put("/", verifyUser, resetPassword);
userRouter.get("/:email", getUser);
userByTokenRouter.get("/", auth, verifyAuth, getUserByToken);
deleteUserRouter.delete("/", auth, verifyAuth, deleteUser);

module.exports = {
  userRouter,
  userByTokenRouter,
  registerRouter,
  loginRouter,
  resetPassRouter,
  updateUserRouter,
  deleteUserRouter,
};
