import { useEffect, useState } from "react";
import { fetchVillas } from "../helpers/villaHelperFunctions";
import Button from "./Button";
import Villa from "./Villa";
import EastIcon from "@mui/icons-material/East";

const OurVillas = () => {
  const [villas, setVillas] = useState([]);
  const randomVillas = villas.sort(() => Math.random() - 0.5).slice(0, 3);

  useEffect(() => {
    const handleVillas = async () => {
      const data = await fetchVillas();
      setVillas(data);
    };

    handleVillas();
  }, []);

  return (
    <div className="our-villas-container">
      <div className="our-villas-head-wrapper">
        <div>
          <h2>Our Villas</h2>
          <p>
            Diam et habitasse tortor cras donec urna eget dolor in turpis
            venenatis eget pulnivar ipsum quisque non arcu nulla
          </p>
        </div>
        <Button
          className="villas-btn"
          icon={<EastIcon fontSize="small" />}
          to="/villas"
        >
          view all
        </Button>
      </div>
      <div className="villa-wrapper">
        {randomVillas?.map((villa) => (
          <Villa villa={villa} key={villa._id} />
        ))}
      </div>
    </div>
  );
};

export default OurVillas;
