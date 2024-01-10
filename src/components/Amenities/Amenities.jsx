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
import AmenitiesIcon from "./AmenitiesIcon";
import { useIsInViewPort } from "../../hooks/isInViewPort";

const Amenities = () => {
  const icons = [
    { name: "chef", empty: chefEmpty, full: chefFull },
    { name: "waitress", empty: waitressEmpty, full: waitressFull },
    { name: "parking", empty: parkingEmpty, full: parkingFull },
    { name: "fitness", empty: fitnessEmpty, full: fitnessFull },
    { name: "laundry", empty: laundryEmpty, full: laundryFull },
    { name: "security", empty: securityEmpty, full: securityFull },
    { name: "support", empty: supportEmpty, full: supportFull },
  ];
  const { amenitiesRef } = useRefs();
  const isIntersecting = useIsInViewPort(amenitiesRef);
  useEffect(() => {
    if (isIntersecting) {
      amenitiesRef.current
        .querySelectorAll(".amenities-icon")
        .forEach((icon) => icon.classList.add("amenities-animation"));
    }
  }, [amenitiesRef, isIntersecting]);

  return (
    <div className="amenities-container" ref={amenitiesRef}>
      <div>
        <h1>Other amenities</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
          consequuntur commodi ipsum, obcaecati id reprehenderit neque labore,
          iste
        </p>
      </div>

      <div className="amenities-wrapper">
        {icons.map((icon, i) => (
          <AmenitiesIcon icon={icon} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Amenities;
