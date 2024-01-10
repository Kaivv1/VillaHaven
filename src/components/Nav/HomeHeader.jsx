import { useEffect, useState } from "react";
import { fetchVillas } from "../../helpers/villaHelperFunctions";
import Button from "../Button";
import EastIcon from "@mui/icons-material/East";
import { useIsMobile } from "../../hooks/useIsMobile";
const HomeHeader = () => {
  const [villas, setVillas] = useState([]);
  const isSmallLaptop = useIsMobile(1024);
  useEffect(() => {
    const getVillas = async () => {
      const data = await fetchVillas();
      setVillas(data);
    };

    getVillas();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="home-header">
      <div className="left-side-header">
        <p>Enjoy the finest stays</p>
        <h1>Find Your Best Villa House And Appartment</h1>
        <p>
          Gravida vulputate aliquet tempor siteque sed pretium non urna sed etid
          aenean haretra quam placerat adipiscing
        </p>
      </div>

      <div className="right-side-header">
        <h3>Quick Booking</h3>
        {!isSmallLaptop && (
          <p>
            Diam et habitasse tortor cras donec urna eget dolor in turpis
            venenatis eget.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" placeholder="Enter your email" />
          </div>

          <div className="selector">
            <label htmlFor="villas">Choose villa</label>
            <select name="villas">
              {villas?.map((villa) => (
                <option key={villa._id}>{villa.villaName}</option>
              ))}
            </select>
          </div>

          <div className="dates">
            <div>
              <label htmlFor="check-in">Check in</label>
              <input name="check-in" type="date" />
            </div>
            <div>
              <label htmlFor="check-out">Check out</label>
              <input name="check-out" type="date" />
            </div>
          </div>
          <div>
            <label htmlFor="guests">Number of guests</label>
            <input
              type="number"
              name="guests"
              placeholder="Enter number of guests"
            />
          </div>
          <Button
            className="right-side-header-btn"
            icon={<EastIcon fontSize="small" />}
          >
            Book now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HomeHeader;
