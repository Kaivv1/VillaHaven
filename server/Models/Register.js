const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let registerSchema = new Schema(
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
        type: Schema.Types.ObjectId,
        ref: "Villa",
      },
    ],
  },
  { timestamps: true }
);

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
