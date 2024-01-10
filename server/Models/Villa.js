const mongoose = require("mongoose");

const villaModel = new mongoose.Schema({
  picture: {
    type: String,
    required: true,
  },
  villaName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Villa = new mongoose.model("Villa", villaModel);

module.exports = Villa;
