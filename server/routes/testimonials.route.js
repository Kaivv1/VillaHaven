const express = require("express");
const {
  uploadTestimonial,
  getTestimonials,
} = require("../controllers/testimonials.controller");
const uploadTestimonialRouter = express.Router();
const getTestimonialsRouter = express.Router();
uploadTestimonialRouter.post("/", uploadTestimonial);
getTestimonialsRouter.get("/", getTestimonials);

module.exports = { uploadTestimonialRouter, getTestimonialsRouter };
