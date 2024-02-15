import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getReservationById } from "../helpers/reservationHelpers";
import {
  addNewVillaReservedDates,
  fetchVillaById,
} from "../helpers/villaHelperFunctions";
import {
  getToken,
  getUserByToken,
  sendEmail,
} from "../helpers/userHelperFunctions";

const ReservationSuccess = () => {
  const [time, setTime] = useState(10000);
  const navigate = useNavigate();
  const { reservationID } = useParams();
  const token = getToken();
  const seconds = time / 1000;

  useEffect(() => {
    const handleSuccessfullReservation = async () => {
      const { villaId, reservedDates } = await getReservationById(
        reservationID
      );
      const { villaName } = await fetchVillaById(villaId);
      const { firstName, email } = await getUserByToken(token);
      await addNewVillaReservedDates(villaId, { reservedDates });

      const message = {
        name: firstName,
        userEmail: email,
        text: "Thank you for choosing VillaHaven. Out support will contact you soon for further information.",
        subject: `Your Reservation for ${villaName}`,
      };
      await sendEmail(message);
    };

    handleSuccessfullReservation();
  }, [reservationID, token]);

  useEffect(() => {
    let timer;

    timer = setTimeout(() => {
      setTime((prev) => prev - 1000);
      if (time === 0) {
        navigate("/");
        return;
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, navigate]);

  return (
    <div className="reservation-success-container">
      <div className="message">
        <h1>Your reservation was successfull!</h1>
        <span>
          <DoneIcon fontSize="large" />
        </span>
        <p>
          Thank you for choosing Villahaven, we have recieved your reservation
          and our support will soon contact you for further information.
        </p>
        <div>
          <p>Redirecting to Home after {seconds} seconds...</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccess;
