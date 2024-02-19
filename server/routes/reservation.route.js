/* eslint no-undef: */
const express = require("express");
const { auth, verifyAuth } = require("../controllers/auth.controller");
const {
  createReservation,
  getReservationById,
  checkAvailability,
  getAllUserReservations,
  deleteReservationById,
} = require("../controllers/reservation.controller");

const createReservationRouter = express.Router();
const getReservationByIdRouter = express.Router();
const checkAvailabilityRouter = express.Router();
const getAllUserReservationsRouter = express.Router();
const deleteReservationByIdRouter = express.Router();

createReservationRouter.post("/", auth, verifyAuth, createReservation);
getAllUserReservationsRouter.get("/", auth, verifyAuth, getAllUserReservations);
getReservationByIdRouter.get("/:id", getReservationById);
checkAvailabilityRouter.post("/", checkAvailability);
deleteReservationByIdRouter.delete("/:id", deleteReservationById);

module.exports = {
  createReservationRouter,
  getReservationByIdRouter,
  checkAvailabilityRouter,
  getAllUserReservationsRouter,
  deleteReservationByIdRouter,
};
