import React, { useEffect, useState } from "react";
import Villa from "../../components/Villa";

const VillasPage = () => {
  const [villas, setVillas] = useState([]);

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const res = await fetch("http://localhost:4000/getvillas", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        setVillas(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVillas();
  }, []);

  return (
    <div className="villas-page-container">
      <div className="villas-content-wrapper">
        <div className="villas-header">
          <h2>Our Villas</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore,
            debitis nisi doloribus beatae consequuntur odit voluptatum nam? Id
            atque cumque fugiat dolorem cum possimus porro, saepe laborum non
            nostrum necessitatibus.
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
