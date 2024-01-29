/* eslint no-undef: */
const mongoose = require("mongoose");
const villaModel = new mongoose.Schema({
  pictures: [{ type: String }],
  villaName: {
    type: String,
  },
  location: {
    type: String,
  },
  price: {
    type: String,
  },
  specialPrice: {
    type: String,
  },
  garages: {
    type: Number,
  },
  bedrooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  propertyType: {
    type: String,
  },
  propertyStatus: {
    type: String,
  },
  yearBuilt: {
    type: String,
  },
  pool: {
    type: Boolean,
  },
  backyard: {
    type: Boolean,
  },
  rating: {
    type: Number,
  },
});

const Villa = new mongoose.model("Villa", villaModel);

module.exports = Villa;
