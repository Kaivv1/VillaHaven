/* eslint no-undef: */
const Reservation = require("../Models/Reservation");

const handleSuccessfullPayment = async (sessionId) => {
  const reservation = await Reservation.findOne({ stripeSessionId: sessionId });
  if (reservation) {
    await Reservation.updateOne(
      { _id: reservation._id },
      { $set: { status: "success" } }
    );
  } else {
    console.error("Failed to find sessionId and update the reservation");
  }
};
const handleFailedPayment = async (sessionId) => {
  const reservation = await Reservation.findOne({ stripeSessionId: sessionId });

  if (reservation) {
    await Reservation.deleteOne({ _id: reservation._id, status: "pending" });
  } else {
    console.error("Failed to find sessionId and delete the reservation");
  }
};

module.exports = { handleFailedPayment, handleSuccessfullPayment };
