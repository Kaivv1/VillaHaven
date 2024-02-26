import { useEffect, useState } from "react";
import { getToken } from "../helpers/userHelperFunctions";
import { getAllUserReservations } from "../helpers/reservationHelpers";
import ReservationCard from "../components/ReservationCard";
import Loader from "../ui/Loader";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useChangeDocumentTitle("User | Reservations");
  const token = getToken();

  useEffect(() => {
    const fetchUserReservations = async () => {
      setIsLoading(true);
      const userReservations = await getAllUserReservations(token);
      setReservations(
        userReservations.filter(
          (reservation) => reservation.status !== "pending"
        )
      );
      setIsLoading(false);
    };
    fetchUserReservations();
  }, [token]);

  const handleDeleteReservation = (id) => {
    setReservations((reservations) =>
      reservations.filter(({ reservationId }) => reservationId !== id)
    );
  };

  return (
    <div className="user-reservations-container">
      <h1>Your Reservations</h1>
      {reservations.length !== 0 && !isLoading && (
        <div className="user-reservations-wrapper">
          {reservations?.map((reservation) => (
            <ReservationCard
              reservation={reservation}
              onCancel={() =>
                handleDeleteReservation(reservation.reservationId)
              }
              key={reservation.reservationId}
            />
          ))}
        </div>
      )}
      {reservations.length === 0 && !isLoading && (
        <p className="no-reservations-message">
          You haven&apos;t made any reservations yet.
        </p>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default UserReservations;
