import DoneIcon from "@mui/icons-material/Done";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useRefs } from "../../contexts/RefContext";
import { useEffect } from "react";
import { useIsInViewPort } from "../../hooks/isInViewPort";

const Amenities = () => {
  const amenities = [
    {
      title: "Trusted",
      text: "Book with confidence, our handpicked villas are hosted by trusted partners with stellar reviews.",
    },
    {
      title: "Maintenance",
      text: "Enjoy worry-free stays – our villas undergo regular maintenance for your comfort.",
    },
    {
      title: "Easy Booking",
      text: "Simple booking, delightful stays – our user-friendly platform makes it a breeze.",
    },
    {
      title: "Help Services",
      text: "Assistance at your fingertips – our 24/7 support team is ready to help.",
    },
  ];
  const isMobile = useIsMobile(816);
  const { amenitiesRef } = useRefs();
  const isIntersecting = useIsInViewPort(amenitiesRef);

  useEffect(() => {
    if (isIntersecting) {
      amenitiesRef.current
        .querySelectorAll(".amenities-card")
        .forEach((card) => {
          card.classList.add("amenities-card--animation");
        });
    }
  }, [isIntersecting, amenitiesRef]);

  return (
    <div className="amenities-container">
      <div className="amenities-wrapper">
        <div className="amenities-header">
          <h1>Amenities</h1>
          <p>
            Experience peace of mind with our amenities, backed by trusted
            partners, regular maintenance, and 24/7 support, ensuring your stay
            is both comforting and effortlessly enjoyable.
          </p>
        </div>

        <div className="amenities-card-wrapper" ref={amenitiesRef}>
          {amenities.map((amenity, i) => (
            <div key={i} className="amenities-card">
              <div>
                <span>
                  <DoneIcon fontSize={isMobile ? "small" : "medium"} />
                </span>
                <h3>{amenity.title}</h3>
              </div>
              <p>{amenity.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amenities;
