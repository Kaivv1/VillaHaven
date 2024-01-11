import AboutVillaHaven from "../components/AboutVillaHaven";
import OtherAmenities from "../components/Amenities/OtherAmenities";
import Facilities from "../components/Facilities";
import OurVillas from "../components/OurVillas";
import SpecialOffer from "../components/SpecialOffer/SpecialOffer";
import Testimonials from "../components/Testimonials";
const HomePage = () => {
  return (
    <>
      <OurVillas />
      <AboutVillaHaven />
      <Facilities />
      <OtherAmenities />
      <SpecialOffer />
      <Testimonials />
    </>
  );
};

export default HomePage;
