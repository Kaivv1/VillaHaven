/* eslint no-undef: */
const Register = require("../Models/Register");
const Reservation = require("../Models/Reservation");
const Villa = require("../Models/Villa");
const { getFile } = require("../s3Bucket");
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
    return next(errorHandler(500, "Internal Server Error"));
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
    return next(errorHandler(500, "Internal Server Error"));
  }
};

const getAllUserReservations = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const reservations = await Reservation.find({ userId });

    const userReservations = await Promise.all(
      reservations.map(async (reservation) => {
        const {
          villaId,
          paymentMethod,
          numberGuests,
          totalPrice,
          reservedDates,
          _id,
          status,
        } = reservation;
        const { timezone } = await Register.findById(userId);
        const { pictures, villaName } = await Villa.findById(villaId);

        const picturesWithUrls = await Promise.all(
          pictures.map(async (picture) => {
            const pictureWithUrl = await getFile(picture);
            return pictureWithUrl;
          })
        );

        const mainPictureUrl = picturesWithUrls.filter((picture) => {
          return picture.includes("main-");
        });

        return {
          totalPrice,
          numberGuests,
          paymentMethod,
          villaPicture: mainPictureUrl[0],
          villaName,
          reservedDates: reservedDates[0],
          userTimezone: timezone,
          reservationId: _id,
          status,
        };
      })
    );

    return res.status(200).json(userReservations);
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

const deleteReservationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);

    if (!reservation)
      return next(errorHandler(404, "There is no villa with that id"));

    await Villa.updateOne(
      { _id: reservation.villaId },
      { $pull: { reservedDates: reservation.reservedDates[0] } }
    );

    await reservation.deleteOne({ _id: id });

    return res
      .status(200)
      .json({ msg: "Reservation deleted successfully", success: true });
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};

const checkAvailability = async (req, res) => {
  const { villaId, chosenDates } = req.body;

  const villa = await Villa.findById(villaId);

  const chosenStartDate = new Date(chosenDates.startDate);
  const chosenEndDate = new Date(chosenDates.endDate);

  const isAvailable = !villa.reservedDates.some((reservedDate) => {
    const reservedStartDate = new Date(reservedDate.startDate);
    const reservedEndDate = new Date(reservedDate.endDate);

    return (
      chosenStartDate <= reservedEndDate && chosenEndDate >= reservedStartDate
    );
  });

  return res.status(200).json({ isAvailable });
};

module.exports = {
  createReservation,
  getReservationById,
  checkAvailability,
  getAllUserReservations,
  deleteReservationById,
};
