import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  checkAvailability,
  getReservationById,
} from "../helpers/reservationHelpers";
import {
  addNewVillaReservedDates,
  fetchVillaById,
} from "../helpers/villaHelperFunctions";
import {
  getToken,
  getUserByToken,
  sendEmail,
} from "../helpers/userHelperFunctions";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";

const ReservationSuccess = () => {
  const [time, setTime] = useState(10000);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const { reservationID } = useParams();
  useChangeDocumentTitle("Reservation | Success");
  const token = getToken();
  const seconds = time / 1000;

  useEffect(() => {
    const handleSuccessfullReservation = async () => {
      if (!emailSent) {
        const { villaId, reservedDates } = await getReservationById(
          reservationID
        );
        const { villaName } = await fetchVillaById(villaId);
        const isAvailable = await checkAvailability(reservedDates[0], villaId);
        if (!isAvailable) return;

        const { firstName, email } = await getUserByToken(token);
        await addNewVillaReservedDates(villaId, { reservedDates });

        const message = {
          name: firstName,
          userEmail: email,
          text: "Thank you for choosing VillaHaven. Our support will contact you soon for further information.",
          subject: `Your Reservation for ${villaName}`,
        };
        await sendEmail(message);
        setEmailSent(true);
      }
    };
    handleSuccessfullReservation();
  }, [reservationID, token, emailSent]);

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
