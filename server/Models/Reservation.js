/* eslint no-undef: */
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    reservedDates: [{ startDate: { type: Date }, endDate: { type: Date } }],
    userId: {
      type: String,
    },
    villaId: {
      type: String,
    },
    stripeSessionId: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    numberGuests: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Reservation = new mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
