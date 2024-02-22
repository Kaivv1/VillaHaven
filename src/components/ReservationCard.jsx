/*eslint-disable react/prop-types */
import moment from "moment-timezone";

import { getCorrectDate, getToken } from "../helpers/userHelperFunctions";
import Button from "./Button";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteReservationById } from "../helpers/reservationHelpers";
import { useModalData } from "../contexts/ModalDataContext";
import ConfirmModal from "./ConfirmModal";

const ReservationCard = ({ reservation, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    villaName,
    reservedDates: { startDate, endDate },
    villaPicture,
    userTimezone,
    totalPrice,
    paymentMethod,
    numberGuests,
    reservationId,
  } = reservation;
  const token = getToken();
  const { showConfirmModal, setShowConfirmModal } = useModalData();
  const arrivalFullDate = getCorrectDate(new Date(startDate), userTimezone);
  const departureFullDate = getCorrectDate(new Date(endDate), userTimezone);
  const arrivalFormated = moment(arrivalFullDate).format("MM-D-Y");
  const departureFormated = moment(departureFullDate).format("MM-D-Y");

  const handleCancelReservation = async (id) => {
    setIsLoading(true);
    await deleteReservationById(token, id).then((data) => {
      setShowConfirmModal(false);
      if (data.success) {
        onCancel(id);
        setIsLoading(false);
        return toast.success("Reservation canceled");
      }
      if (!data.success) {
        setIsLoading(false);
        return toast.error("There was a problem canceling your reservation");
      }
    });
  };

  const handleCancelShowModal = () => {
    setShowConfirmModal(false);
  };
  return (
    <div className="reservation-card-container">
      <h2>{villaName}</h2>
      <div className="reservation-card-information">
        <img src={villaPicture} alt="" />
        <div className="reservation-card-information-wrapper">
          <p>Arrival: {arrivalFormated}</p>
          <p>Departure: {departureFormated}</p>
          <p>Expecting {numberGuests} guests</p>
          <p>
            Payment:{" "}
            {paymentMethod === "cash" ? "On arrival" : "Payed with card"}
          </p>
          <p>Total price: {totalPrice}$</p>
        </div>
      </div>
      <div className="button-wrapper">
        <Button
          isLoading={isLoading}
          isLoadingMsg="Canceling..."
          onClick={() => setShowConfirmModal(true)}
        >
          Cancel reservation
        </Button>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          onCancel={handleCancelShowModal}
          onConfirm={async () => await handleCancelReservation(reservationId)}
        />
      )}
    </div>
  );
};

export default ReservationCard;
