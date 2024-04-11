/*eslint no-unused-vars: */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Slider from "../components/Slider";
import LocationSVG from "../ui/svgs/LocationSVG";
import StarRating from "../ui/stars/StarRating";
import Button from "../components/Button";
import EastIcon from "@mui/icons-material/East";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import GarageIcon from "@mui/icons-material/Garage";
import PoolIcon from "@mui/icons-material/Pool";
import FenceIcon from "@mui/icons-material/Fence";
import ConstructionIcon from "@mui/icons-material/Construction";
import PeopleIcon from "@mui/icons-material/People";
import { fetchVillaById } from "../helpers/villaHelperFunctions";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";

const VillaDetailsPage = () => {
  const { villaID } = useParams();
  const [villa, setVilla] = useState({});
  useChangeDocumentTitle(`Our Villas | ${villa?.villaName}`);

  useEffect(() => {
    const fetchVilla = async () => {
      const data = await fetchVillaById(villaID);
      setVilla(data);
    };
    fetchVilla();
  }, [villaID]);

  return (
    <div className="villa-details-container">
      <div className="villa-details-wrapper">
        <Slider>
          {villa.pictures?.map((picture, i) => (
            <img src={picture} alt="" key={i} />
          ))}
        </Slider>
        <div className="villa-details">
          <p className="location">
            <LocationSVG size="14" />
            {villa.location}
          </p>
          <h1>{villa.villaName}</h1>
          <StarRating maxRating={5} currRating={villa.rating} />
          <p className="description"> {villa.description}</p>
          <div className="villa-information">
            <p>
              Status:{" "}
              {villa.propertyStatus ? (
                <span style={{ color: "#26ad60", fontWeight: "bold" }}>
                  {" "}
                  For Rent
                </span>
              ) : (
                <span style={{ color: "#dc2626", fontWeight: "bold" }}>
                  {" "}
                  Maintenance
                </span>
              )}
            </p>
            <p>
              <BathtubIcon fontSize="medium" /> Bathrooms: {villa.bathrooms}
            </p>
            <p>
              <BedIcon fontSize="medium" /> Bedrooms: {villa.bedrooms}
            </p>
            <p>
              <GarageIcon fontSize="medium" /> Garages: {villa.garages}
            </p>
            <p>
              <PoolIcon fontSize="medium" />
              Pool:{" "}
              {villa.pool ? (
                <span style={{ color: "#26ad60", fontWeight: "bold" }}>
                  Yes
                </span>
              ) : (
                <span style={{ color: "#dc2626", fontWeight: "bold" }}>No</span>
              )}
            </p>
            <p>
              <FenceIcon fontSize="medium" />
              Backyard:{" "}
              {villa.backyard ? (
                <span style={{ color: "#26ad60", fontWeight: "bold" }}>
                  Yes
                </span>
              ) : (
                <span style={{ color: "#dc2626", fontWeight: "bold" }}>No</span>
              )}
            </p>
            <p>
              <ConstructionIcon fontSize="medium" /> Year Built:{" "}
              {villa.yearBuilt}
            </p>
            <p>
              <PeopleIcon fontSize="medium" /> Max Guests: {villa.maxGuests}
            </p>
          </div>
          <h2>
            {villa.price},00$ <span className="slash"></span>
            <span>night</span>
          </h2>
          {!villa.propertyStatus ? (
            <Button
              icon={<EastIcon fontSize="small" />}
              disabled={!villa.propertyStatus}
            >
              Book Now
            </Button>
          ) : (
            <Button
              icon={<EastIcon fontSize="small" />}
              disabled={!villa.propertyStatus}
              to={`/reservation/${villaID}`}
              type="link"
            >
              Book Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VillaDetailsPage;
