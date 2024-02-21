import { useEffect, useState } from "react";
import { fetchVillas } from "../../helpers/villaHelperFunctions";
import Button from "../Button";
import EastIcon from "@mui/icons-material/East";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const HomeHeader = () => {
  const [villas, setVillas] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredVillas, setFilteredVillas] = useState([]);
  const [form, setForm] = useState({
    location: null,
    villaId: null,
  });
  const navigate = useNavigate();
  const isSmallLaptop = useIsMobile(1024);

  useEffect(() => {
    const getVillas = async () => {
      const data = await fetchVillas();
      const updatedData = data.map((el) => el._doc);
      setVillas(updatedData);
    };
    getVillas();
  }, []);

  useEffect(() => {
    const removeDuplicates = (arr) => {
      return [...new Set(arr)];
    };
    const locationsArr = villas?.map((villa) => villa.location);
    const updatedLocationsArr = removeDuplicates(locationsArr);
    setLocations(updatedLocationsArr);
    setForm((prev) => ({ ...prev, location: updatedLocationsArr[0] }));
  }, [villas]);

  useEffect(() => {
    const filteredVillas = villas?.filter(
      (villa) => villa.location === form.location
    );
    setFilteredVillas(filteredVillas);
  }, [form.location, villas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.villaId === null) return toast.error("Please choose a villa");
    navigate(`/reservation/${form.villaId}`);
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
          <div className="selector">
            <label htmlFor="locations">Location</label>
            <select
              required
              name="locations"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, location: e.target.value }))
              }
            >
              {locations.map((location, i) => (
                <option key={i} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="selector">
            <label htmlFor="villas">Villa</label>
            <select
              required
              defaultValue="select villa"
              name="villas"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, villaId: e.target.value }))
              }
            >
              <option disabled value="select villa">
                Select a villa
              </option>
              {filteredVillas.map((villa) => (
                <option key={villa._id} value={villa._id}>
                  {villa.villaName}
                </option>
              ))}
            </select>
          </div>
          <Button
            className="right-side-header-btn"
            icon={<EastIcon fontSize="small" />}
            type="submit"
          >
            Book now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HomeHeader;
