import { useEffect, useState } from "react";
import { fetchVillas } from "../helpers/villaHelperFunctions";
import Button from "./Button";
import Villa from "./Villa";
import EastIcon from "@mui/icons-material/East";

const OurVillas = () => {
  const [villas, setVillas] = useState([]);
  const randomVillas = villas.sort(() => Math.random() - 0.5).slice(0, 3);

  useEffect(() => {
    const handleFetchVillas = async () => {
      const data = await fetchVillas();
      const updatedData = data.map((el) => el._doc);
      setVillas(updatedData);
    };

    handleFetchVillas();
  }, []);

  return (
    <div className="our-villas-container">
      <div className="our-villas-head-wrapper">
        <div>
          <h2>Our Villas</h2>
          <p>
            Discover a haven of elegance and comfort in our meticulously curated
            villas, each designed to offer a sublime retreat and an
            unforgettable getaway experience.
          </p>
        </div>
        <Button
          className="villas-btn"
          icon={<EastIcon fontSize="small" />}
          to="/villas"
          type="link"
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
