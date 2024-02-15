/* eslint no-undef: */
const Reservation = require("../Models/Reservation");
const errorHandler = require("../utils/error");

const createReservation = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const reservation = new Reservation({
      userId,
      ...req.body,
    });
    await reservation.save();
    return res
      .status(200)
      .json({ msg: "Resrvation created", id: reservation._id });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

const getReservationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);

    if (reservation) {
      return res.status(200).json(reservation);
    } else {
      return next(errorHandler(404, "No reservation with that id"));
    }
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

module.exports = { createReservation, getReservationById };
