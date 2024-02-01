/*eslint no-unused-vars: */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Slider from "../../components/Slider";
import LocationSVG from "../../ui/svgs/LocationSVG";
import StarRating from "../../ui/stars/StarRating";
import Button from "../../components/Button";
import EastIcon from "@mui/icons-material/East";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const VillaDetailsPage = () => {
  const { villaID } = useParams();
  const [villa, setVilla] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [mapInitialized, setMapInitialize] = useState(false);
  console.log(coordinates);
  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const res = await fetch(`http://localhost:4000/villa/${villaID}`);

        const data = await res.json();
        if (data === false) return;
        data.pictures.reverse();
        setVilla(data);
        setCoordinates(data.coordinates);
      } catch (error) {
        console.error(error);
      }
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
                  For Rent
                </span>
              ) : (
                <span style={{ color: "#dc2626", fontWeight: "bold" }}>
                  Maintenance
                </span>
              )}
            </p>
            <p>Bathroomes: {villa.bathrooms}</p>
            <p>Bedrooms: {villa.bedrooms}</p>
            <p>Garages: {villa.garages}</p>
            <p>
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
              Backyard:{" "}
              {villa.backyard ? (
                <span style={{ color: "#26ad60", fontWeight: "bold" }}>
                  Yes
                </span>
              ) : (
                <span style={{ color: "#dc2626", fontWeight: "bold" }}>No</span>
              )}
            </p>
            <p>Year Built: {villa.yearBuilt}</p>
          </div>
          <h2>
            {villa.price},00$ <span className="slash"></span>
            <span>night</span>
          </h2>
          <Button icon={<EastIcon fontSize="small" />}>Book Now</Button>
        </div>
      </div>
      <div className="map-container">
        <div id="map"></div>
      </div>
    </div>
  );
};

export default VillaDetailsPage;
