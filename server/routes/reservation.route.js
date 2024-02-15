/* eslint no-undef: */
const express = require("express");
const { auth, verifyAuth } = require("../controllers/auth.controller");
const {
  createReservation,
  getReservationById,
} = require("../controllers/reservation.controller");

const createReservationRouter = express.Router();
const getReservationByIdRouter = express.Router();

createReservationRouter.post("/", auth, verifyAuth, createReservation);
getReservationByIdRouter.get("/:id", getReservationById);

module.exports = { createReservationRouter, getReservationByIdRouter };
