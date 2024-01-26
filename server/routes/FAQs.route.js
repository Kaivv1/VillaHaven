/* eslint no-undef: */
const express = require("express");
const { createFAQ, getFAQs } = require("../controllers/FAQs.controller");

const createFAQRouter = express.Router();
const getFAQsRouter = express.Router();

createFAQRouter.post("/", createFAQ);
getFAQsRouter.get("/", getFAQs);

module.exports = { createFAQRouter, getFAQsRouter };
