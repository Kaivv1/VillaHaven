import AboutVillaHaven from "../components/AboutVillaHaven";
import Amenities from "../components/Amenities/Amenities";
import OtherAmenities from "../components/Amenities/OtherAmenities";
import Facilities from "../components/Facilities";
import Testimonials from "../components/Testimonials";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";

const AboutUs = () => {
  useChangeDocumentTitle("About");
  return (
    <>
      <Amenities />
      <AboutVillaHaven />
      <Facilities />
      <OtherAmenities />
      <Testimonials />
    </>
  );
};

export default AboutUs;
