import { useEffect } from "react";
import {
  chefEmpty,
  waitressEmpty,
  parkingEmpty,
  fitnessEmpty,
  laundryEmpty,
  securityEmpty,
  supportEmpty,
  chefFull,
  waitressFull,
  parkingFull,
  fitnessFull,
  laundryFull,
  securityFull,
  supportFull,
} from "../../assetsExports";
import { useRefs } from "../../contexts/RefContext";
import OtherAmenitiesIcon from "./OtherAmenitiesIcon";
import { useIsInViewPort } from "../../hooks/isInViewPort";

const OtherAmenities = () => {
  const icons = [
    { name: "chef", empty: chefEmpty, full: chefFull },
    { name: "waitress", empty: waitressEmpty, full: waitressFull },
    { name: "parking", empty: parkingEmpty, full: parkingFull },
    { name: "fitness", empty: fitnessEmpty, full: fitnessFull },
    { name: "laundry", empty: laundryEmpty, full: laundryFull },
    { name: "security", empty: securityEmpty, full: securityFull },
    { name: "support", empty: supportEmpty, full: supportFull },
  ];
  const { otherAmenitiesRef } = useRefs();
  const isIntersecting = useIsInViewPort(otherAmenitiesRef);
  useEffect(() => {
    if (isIntersecting) {
      otherAmenitiesRef.current
        .querySelectorAll(".other-amenities-icon")
        .forEach((icon) => icon.classList.add("other-amenities-animation"));
    }
  }, [otherAmenitiesRef, isIntersecting]);

  return (
    <div className="other-amenities-container" ref={otherAmenitiesRef}>
      <div>
        <h1>Other amenities</h1>
        <p>
          Embrace a lifestyle of opulence with our premium amenities, where
          every detail is tailored to elevate your experience. From
          state-of-the-art fitness centers to rejuvenating spa retreats,
          VillaHaven ensures your stay is infused with unmatched comfort and
          luxury.
        </p>
      </div>

      <div className="other-amenities-wrapper">
        {icons.map((icon, i) => (
          <OtherAmenitiesIcon icon={icon} key={i} />
        ))}
      </div>
    </div>
  );
};

export default OtherAmenities;
