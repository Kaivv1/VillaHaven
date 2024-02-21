import { useEffect, useState } from "react";
import Villa from "../components/Villa";
import { fetchVillas } from "../helpers/villaHelperFunctions";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";

const VillasPage = () => {
  const [villas, setVillas] = useState([]);
  useChangeDocumentTitle("Our VIllas");

  useEffect(() => {
    const handleFetchVillas = async () => {
      const data = await fetchVillas();
      const updatedData = data.map((el) => el._doc);
      setVillas(updatedData);
    };

    handleFetchVillas();
  }, []);

  return (
    <div className="villas-page-container">
      <div className="villas-content-wrapper">
        <div className="villas-header">
          <h2>Indulge in Luxury Living: Explore Our Exquisite Villas</h2>
          <p>
            Immerse yourself in the epitome of comfort and elegance with our
            curated selection of villas. Each villa is a harmonious blend of
            modern luxury and scenic beauty, providing an unforgettable retreat.
            Discover the perfect escape that marries opulence with tranquility,
            promising a vacation like no other.
          </p>
        </div>
        <div className="villas-container">
          {villas?.map((villa) => (
            <Villa villa={villa} key={villa._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VillasPage;
