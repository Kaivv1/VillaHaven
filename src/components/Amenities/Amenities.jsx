import DoneIcon from "@mui/icons-material/Done";
import { useIsMobile } from "../../hooks/useIsMobile";

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

  return (
    <div className="amenities-container">
      <div className="amenities-wrapper">
        <div className="amenities-header">
          <h1>Amenities</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            obcaecati placeat, eveniet recusandae nam praesentium ea est culpa
            rem cumque!
          </p>
        </div>

        <div className="amenities-card-wrapper">
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
