/* eslint-disable react/prop-types*/

import StarRating from "../../ui/stars/StarRating";
import LocationSVG from "../../ui/svgs/LocationSVG";
import Button from "../Button";
import Icon from "./Icon";
import EastIcon from "@mui/icons-material/East";

import {
  chefFull,
  fitnessFull,
  laundryFull,
  parkingFull,
  securityFull,
  supportFull,
  waitressFull,
} from "../../assetsExports";

const SpecialOfferDetails = ({ data }) => {
  const { location, title, numReviews, rating, description, price } = data;
  const icons = [
    chefFull,
    fitnessFull,
    laundryFull,
    parkingFull,
    securityFull,
    supportFull,
    waitressFull,
  ];
  // const iconsFolder = require.context("../../../src/assets/icons/full", true);
  // const iconsFolderKeys = iconsFolder.keys();
  // const icons = iconsFolderKeys.map((icon) => iconsFolder(icon));

  return (
    <div className="special-offer--details">
      <div className="special-offer--location">
        <LocationSVG />
        <p>{location}</p>
      </div>
      <h1>{title}</h1>
      <div className="special-offer--rating-wrapper">
        <StarRating
          maxRating={5}
          size={16}
          currRating={rating}
          className="special-offer--stars-wrapper"
        />
        <span className="special-offer--rating">
          {rating} Average - {numReviews} Reviews
        </span>
      </div>
      <p className="special-offer--text">{description}</p>
      <div className="special-offer--price">
        <span>${price.toFixed(2)}</span>
        <Button className="bookNow-btn" icon={<EastIcon fontSize="small" />}>
          book now
        </Button>
      </div>
      <div className="special-offer--icons-wrapper">
        <p>Featured:</p>
        <div className="special-offer--icons">
          {icons.map((icon, i) => (
            <Icon icon={icon} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferDetails;
