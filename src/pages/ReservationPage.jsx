import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  fetchVillaById,
  getMainPicture,
} from "../helpers/villaHelperFunctions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Button";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import {
  calculateTotalPrice,
  createReservation,
} from "../helpers/reservationHelpers";
import { useFetchUser } from "../hooks/useFetchUser";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "../helpers/stripeHelperFunctions";

const ReservationPage = () => {
  const { villaID } = useParams();
  const [villa, setVilla] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [numberGuests, setNumberGuests] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useFetchUser();
  const mainPicture = getMainPicture(villa.pictures);
  const { totalPrice, days } =
    villa.price !== undefined &&
    endDate !== null &&
    calculateTotalPrice(villa.price, startDate, endDate);

  useEffect(() => {
    const fetchVilla = async () => {
      const data = await fetchVillaById(villaID);

      setVilla(data);
    };
    fetchVilla();
  }, [villaID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const reservedDates = {
      startDate,
      endDate,
    };
    const reservation = {
      villaId: villa._id,
      paymentMethod,
      reservedDates,
      numberGuests,
      totalPrice,
    };
    if (paymentMethod === "cash") {
      const { id } = await createReservation(
        { ...reservation, status: "success" },
        token
      );
      setIsLoading(false);
      navigate(`/reservation/${id}/success`);
    }
    if (paymentMethod === "card") {
      const stripe = await loadStripe(
        "pk_test_51Oj0aLIq1IkY2m6yzNooQKyIELtxlrW1iWbReJvS30qR54c6rg6iHlotIpbJrNfzyZM0wDLYItYxUgQ155xb719G00c6tqMy7P"
      );
      const villaStripe = {
        villaName: villa.villaName,
        picture: mainPicture,
        price: villa.price,
        days,
      };
      const session = await createPaymentIntent(
        villaStripe,
        reservation,
        token
      );

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        toast.error("There was a problem making card payment!");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="reservation-page-container">
      <form onSubmit={handleSubmit}>
        <div className="reservation-wrapper">
          <div className="reservation-left-side">
            <div>
              <h2>{villa.villaName}</h2>
              <img src={mainPicture} alt="" />
            </div>
          </div>
          <div className="reservation-right-side">
            <div className="dates-guests">
              <div className="input-wrapper">
                <label>Check in</label>
                <div className="date-wrapper">
                  <DatePicker
                    selected={startDate}
                    minDate={new Date()}
                    maxDate={endDate || null}
                    dateFormat="yyyy-MM-dd"
                    onChange={(date) => setStartDate(date)}
                    required
                  />
                  <CalendarMonthIcon className="calendar-icon" />
                </div>
              </div>
              <div className="input-wrapper">
                <label>Check out</label>
                <div className="date-wrapper">
                  <DatePicker
                    selected={endDate}
                    minDate={startDate || new Date()}
                    dateFormat="yyyy-MM-dd"
                    onChange={(date) => setEndDate(date)}
                    required
                  />
                  <CalendarMonthIcon className="calendar-icon" />
                </div>
              </div>
              <div className="input-wrapper">
                <label htmlFor="guests">Number of guests</label>
                <input
                  type="number"
                  value={numberGuests}
                  onChange={(e) => setNumberGuests(e.target.value)}
                  min={0}
                  max={villa.maxGuests}
                  required
                />
              </div>
            </div>
            <div className="payment-method-container">
              <p>Payment methods:</p>
              <div className="payment-method-wrapper">
                <div className="radio-input-wrapper">
                  <div>
                    <LocalAtmIcon fontSize="large" />
                    <label htmlFor="cash">Cash (Arrival)</label>
                  </div>
                  <input
                    type="radio"
                    value="cash"
                    id="cash"
                    name="payment-method"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    checked={paymentMethod === "cash"}
                  />
                </div>
                <div className="radio-input-wrapper">
                  <div>
                    <CreditCardIcon fontSize="large" />
                    <label htmlFor="card">Card (Advance)</label>
                  </div>
                  <input
                    type="radio"
                    value="card"
                    id="card"
                    name="payment-method"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    checked={paymentMethod === "card"}
                  />
                </div>
              </div>
            </div>
            <div className="reservation-calc">
              <div className="per-night calc-bar">
                <p>Price per night</p>
                <p>{villa?.price}$</p>
              </div>
              <div className="number-stays calc-bar">
                <p>Number of stays</p>
                <p>x {days ? days : 0}</p>
              </div>
              <div className="total-price calc-bar">
                <p>Total price</p>
                <p>{totalPrice ? totalPrice : 0}$</p>
              </div>
            </div>
          </div>
        </div>
        <div className="form-btns">
          <Button to="-1">
            <span>
              <WestIcon fontSize="small" />
            </span>
            Go back
          </Button>
          <Button
            type="submit"
            icon={<EastIcon fontSize="small" />}
            isLoading={isLoading}
            isLoadingMsg="Proceeding..."
          >
            Proceed
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReservationPage;
