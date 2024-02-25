import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";
const ReservationFailed = () => {
  const [time, setTime] = useState(10000);
  const navigate = useNavigate();
  useChangeDocumentTitle("Reservation | Failed");
  const seconds = time / 1000;

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
    <div className="reservation-failed-container">
      <div className="message">
        <h1>Payment was canceled. Your reservation was unsuccessful!</h1>
        <span>
          <CloseIcon fontSize="large" />
        </span>
        <p>No funds were taken from your account.</p>
        <div>
          <p>Redirecting to Home after {seconds} seconds...</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationFailed;
