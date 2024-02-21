import OtherAmenities from "../components/Amenities/OtherAmenities";
import Facilities from "../components/Facilities";
import OurVillas from "../components/OurVillas";
import Testimonials from "../components/Testimonials";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";
const HomePage = () => {
  useChangeDocumentTitle("Home");
  return (
    <>
      <OurVillas />
      <Facilities />
      <OtherAmenities />
      <Testimonials />
    </>
  );
};

export default HomePage;
