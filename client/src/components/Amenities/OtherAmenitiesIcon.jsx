/*eslint-disable react/prop-types */

import { useState } from "react";

const OtherAmenitiesIcon = ({ icon }) => {
  const [isChangeIcon, setIsChangeIcon] = useState(false);
  const { name, empty, full } = icon;

  const handleIconsChange = () => {
    setIsChangeIcon((isChangeIcon) => !isChangeIcon);
  };
  return (
    <span
      onMouseEnter={() => handleIconsChange()}
      onMouseLeave={() => handleIconsChange()}
      className="other-amenities-icon"
    >
      <span className="icon-holder">
        <img src={isChangeIcon ? full : empty} alt="" />
      </span>

      <span>{name}</span>
    </span>
  );
};

export default OtherAmenitiesIcon;
