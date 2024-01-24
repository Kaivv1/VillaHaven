/* eslint no-undef: */
const mongoose = require("mongoose");

const OTPModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", OTPModel);

module.exports = OTP;
