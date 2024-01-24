/* eslint no-undef: */
const Testimonial = require("../Models/Testimonial");
const errorHandler = require("../utils/error");

const uploadTestimonial = async (req, res, next) => {
  try {
    const testimonial = new Testimonial({
      ...req.body,
    });

    await testimonial.save();

    res.status(201).json("Testimonial uploaded");
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find();

    if (!testimonials) next(errorHandler(404, "No testimonials found"));

    res.status(201).json(testimonials);
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

module.exports = { uploadTestimonial, getTestimonials };
