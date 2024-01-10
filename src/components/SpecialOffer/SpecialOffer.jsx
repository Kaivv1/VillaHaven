import { useEffect } from "react";
import { useRefs } from "../../contexts/RefContext";
import { useIsInViewPort } from "../../hooks/isInViewPort";
import Button from "../Button";
import SpecialOfferDetails from "./SpecialOfferDetails";
import EastIcon from "@mui/icons-material/East";

import specialOffer1 from "../../assets/special-offer/sp-off1-1024x438.jpg";
import specialOffer2 from "../../assets/special-offer/sp-off2.jpg";
import specialOffer3 from "../../assets/special-offer/sp-off3.jpg";
const SpecialOffer = () => {
  const { specialOfferRef } = useRefs();
  const isIntersecting = useIsInViewPort(specialOfferRef);
  const data = {
    heading:
      "Diam et habitasse tortor cras donec urna eget dolor in turpis venenatis eget pulvinar ipsum quisque non arcu nulla",
    location: "Bali, Indonesia",
    title: "Majapahit Beach Villas",
    numReviews: 40,
    rating: 5,
    description:
      "Gravida vulputate aliquet tempor siteque sed quam pretium non urna sed etid aene haretra adipiscing penatibus a adipiscing gravida vulputate elemen aliquet eget senectus siteque sed quam pretium.",
    price: 200,
  };
  useEffect(() => {
    if (isIntersecting) {
      specialOfferRef.current.classList.add("special-offer--animation");
    }
  }, [isIntersecting, specialOfferRef]);

  return (
    <section className="special-offer">
      <div className="special-offer--heading">
        <div>
          <h1>Special Offer</h1>
          <p>{data.heading}</p>
        </div>
        <Button className="viewAll-btn" icon={<EastIcon fontSize="small" />}>
          view all
        </Button>
      </div>
      <main ref={specialOfferRef}>
        <img src={specialOffer1} alt="" className="image1" />
        <img src={specialOffer2} alt="" className="image2" />
        <img src={specialOffer3} alt="" className="image3" />
        <SpecialOfferDetails data={data} />
      </main>
    </section>
  );
};

export default SpecialOffer;
