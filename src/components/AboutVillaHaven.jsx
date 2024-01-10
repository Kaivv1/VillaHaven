import SliderCounterShowcase from "./SliderCounterShowcase";
import {
  partner0,
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
} from "../assetsExports";
const AboutVillaHaven = () => {
  const logos = [partner0, partner1, partner2, partner3, partner4, partner5];
  return (
    <div className="about-villa-haven-container">
      <div>
        <h1>About VillaHaven</h1>
        <p>
          At VillaHaven, we believe in transforming ordinary vacations into
          extraordinary experiences. Nestled at the intersection of luxury and
          leisure, VillaHaven invites you to embark on a journey where every
          moment is crafted for comfort and joy. Whether you're planning a
          family retreat, a dream wedding, an intimate event, or a rejuvenating
          tour, VillaHaven is your premier destination for creating cherished
          memories.VillaHaven isn't just a booking platform; it's a promise of
          unparalleled comfort, a celebration of life's special moments, and a
          gateway to a world where luxury meets leisure. Join the growing
          community of discerning travelers who have chosen VillaHaven for their
          vacations, weddings, events, and tours. Embrace the extraordinary -
          your adventure awaits! Begin your journey today and unlock a world of
          possibilities.
        </p>
      </div>

      <div className="partners-logos">
        <h1>Our Partners</h1>
        <div>
          {logos.map((logo, i) => (
            <span key={i}>
              <img src={logo} alt="" />
            </span>
          ))}
        </div>
      </div>
      <SliderCounterShowcase />
    </div>
  );
};

export default AboutVillaHaven;
