const express = require("express");
const {
  generateOTP,
  verifyOTP,
  localVariables,
  resendOTP,
  deleteOTP,
} = require("../controllers/OTP.controller");
const { verifyUser } = require("../controllers/auth.controller");

const generateOTPRouter = express.Router();
const verifyOTPRouter = express.Router();
const resendOTPRouter = express.Router();
const deleteOTPRouter = express.Router();

generateOTPRouter.get("/", verifyUser, localVariables, generateOTP);
verifyOTPRouter.get("/", verifyUser, verifyOTP);
resendOTPRouter.get("/", verifyUser, resendOTP);
deleteOTPRouter.get("/", verifyUser, deleteOTP);

module.exports = {
  generateOTPRouter,
  verifyOTPRouter,
  resendOTPRouter,
  deleteOTPRouter,
};
