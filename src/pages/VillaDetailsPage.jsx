/*eslint no-unused-vars: */
import { lazy, useEffect, useState } from "react";
import { useParams } from "react-router";
import Slider from "../components/Slider";
import LocationSVG from "../ui/svgs/LocationSVG";
import StarRating from "../ui/stars/StarRating";
import Button from "../components/Button";
import EastIcon from "@mui/icons-material/East";
import "leaflet/dist/leaflet.css";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import GarageIcon from "@mui/icons-material/Garage";
import PoolIcon from "@mui/icons-material/Pool";
import FenceIcon from "@mui/icons-material/Fence";
import ConstructionIcon from "@mui/icons-material/Construction";
import PeopleIcon from "@mui/icons-material/People";
import L from "leaflet";
import { fetchVillaById } from "../helpers/villaHelperFunctions";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";
const LazyImage = lazy(() => import("../components/LazyImage"));

const VillaDetailsPage = () => {
  const { villaID } = useParams();
  const [villa, setVilla] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [mapInitialized, setMapInitialize] = useState(false);
  useChangeDocumentTitle(`Our Villas | ${villa?.villaName}`);

  useEffect(() => {
    const fetchVilla = async () => {
      const data = await fetchVillaById(villaID);
      data.pictures.reverse();
      setVilla(data);
      setCoordinates(data.coordinates);
    };
    fetchVilla();
  }, [villaID]);

  useEffect(() => {
    if (!coordinates || isNaN(coordinates.lat) || isNaN(coordinates.lng)) {
      return;
    }
    if (!mapInitialized) {
      const lat = parseFloat(coordinates.lat);
      const lng = parseFloat(coordinates.lng);
      const map = L.map("map").setView([lat, lng], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.marker([lat, lng]).addTo(map);

      setMapInitialize(true);
    }
  }, [coordinates, mapInitialized]);

  return (
    <div className="villa-details-container">
      <div className="villa-details-wrapper">
        <Slider>
          {villa.pictures?.map((picture, i) => (
            <LazyImage src={picture} alt="" key={i} />
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
                  For Rent
                </span>
              ) : (
                <span style={{ color: "#dc2626", fontWeight: "bold" }}>
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
      <div className="map-container">
        <div id="map"></div>
      </div>
    </div>
  );
};

export default VillaDetailsPage;
