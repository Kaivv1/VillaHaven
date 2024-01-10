import AboutVillaHaven from "../components/AboutVillaHaven";
import Amenities from "../components/Amenities/Amenities";
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
      <Amenities />
      <SpecialOffer />
      <Testimonials />
    </>
  );
};

export default HomePage;
