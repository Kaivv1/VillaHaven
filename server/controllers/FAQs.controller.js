/* eslint no-undef: */
/* eslint no-unused-vars: */
const Question = require("../Models/Question");
const errorHandler = require("../utils/error");

const createFAQ = async (req, res, next) => {
  try {
    const newFAQ = new Question({ ...req.body });
    await newFAQ.save();

    return res
      .status(200)
      .json({ msg: "Frequently asked question created successfully" });
  } catch (error) {
    return next(errorHandler(404, "FAQ creation failed"));
  }
};

const getFAQs = async (req, res, next) => {
  try {
    const FAQs = await Question.find();
    if (!FAQs) {
      next(errorHandler(404, "Couldn't find FAQs"));
    }

    return res
      .status(200)
      .json({ msg: "FAQs retrieved successfully", data: FAQs });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

module.exports = { createFAQ, getFAQs };
