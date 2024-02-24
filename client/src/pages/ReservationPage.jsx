import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  fetchVillaById,
  getMainPicture,
} from "../helpers/villaHelperFunctions";
import Button from "../components/Button";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import {
  calculateTotalPrice,
  checkAvailability,
  createReservation,
} from "../helpers/reservationHelpers";
import { useFetchUser } from "../hooks/useFetchUser";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "../helpers/stripeHelperFunctions";
import CustomDatePicker from "../components/CustomDatePicker";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";
import { Tooltip } from "react-tooltip";

const ReservationPage = () => {
  const { villaID } = useParams();
  const [villa, setVilla] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberGuests, setNumberGuests] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useFetchUser();
  useChangeDocumentTitle(`Reservation | ${villa?.villaName}`);
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

  const filterReservedDates = (date) => {
    return !villa?.reservedDates?.some((reservedDate) => {
      const startDate = new Date(reservedDate?.startDate);
      const endDate = new Date(reservedDate?.endDate);

      return date >= startDate && endDate >= date;
    });
  };

  const colorReservedDates = (date) => {
    const isDisabled = !filterReservedDates(date);
    return isDisabled ? "disabled-date" : "";
  };

  const reservedDates = {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  };

  const reservation = {
    villaId: villa._id,
    paymentMethod,
    reservedDates,
    numberGuests,
    totalPrice,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (numberGuests <= 0)
      return toast.error("Please add how much guests shold we expect!");

    setIsLoading(true);
    if (paymentMethod === "cash") {
      const isAvailable = await checkAvailability(reservedDates, villa._id);
      console.log(isAvailable);
      if (!isAvailable) {
        toast.error("Dates not available");
        setIsLoading(false);
        return;
      }
      const { id } = await createReservation(
        { ...reservation, status: "success" },
        token
      );
      setIsLoading(false);
      navigate(`/reservation/${id}/success`);
    }

    if (paymentMethod === "card") {
      const isAvailable = await checkAvailability(reservedDates, villa._id);
      if (!isAvailable) {
        toast.error("Dates not available");
        setIsLoading(false);
        return;
      }
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
              <CustomDatePicker
                label="Check in"
                selected={startDate}
                minDate={new Date()}
                maxDate={endDate || null}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setStartDate(date)}
                filterDate={filterReservedDates}
                dayClassName={colorReservedDates}
              />
              <CustomDatePicker
                label="Check out"
                selected={endDate}
                minDate={startDate || new Date()}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setEndDate(date)}
                filterDate={filterReservedDates}
                dayClassName={colorReservedDates}
              />
              <div className="input-wrapper">
                <div>
                  <label htmlFor="guests">Number of guests</label>
                  <span id="maxGuests"> *</span>
                  <Tooltip
                    anchorSelect="#maxGuests"
                    content={`Max guests are ${villa?.maxGuests}`}
                  />
                </div>
                <input
                  type="number"
                  value={numberGuests}
                  onChange={(e) => setNumberGuests(e.target.value)}
                  min={0}
                  max={villa?.maxGuests}
                  required
                />
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
