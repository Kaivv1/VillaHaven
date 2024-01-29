/* eslint no-undef: */
const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Villa",
      },
    ],
  },
  { timestamps: true }
);

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
