import Button from "./Button";
import EastIcon from "@mui/icons-material/East";
import { facility1, facility2, facility3, facility4 } from "../assetsExports";
import FacilitiesCard from "./FacilitiesCard";

const Facilities = () => {
  const data = [
    { pic: facility1, title: "Family Expirience" },
    { pic: facility2, title: "Private Spa" },
    { pic: facility3, title: "Mini Golf" },
    { pic: facility4, title: "Outdoor Lounging Area" },
  ];

  return (
    <div className="facilities-container">
      <div className="facilities-head-wrapper">
        <div>
          <h1>Our facilities</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ad
            aliquam ducimus omnis recusandae enim nam ea ipsum. Dicta aspernatur
            assumenda
          </p>
        </div>

        <Button className="facilities-btn" icon={<EastIcon fontSize="small" />}>
          Book now
        </Button>
      </div>
      <div className="facilities-cards-wrapper">
        {data.map((el, i) => (
          <FacilitiesCard data={el} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Facilities;
