import { useState } from "react";

const AmenitiesIcon = ({ icon }) => {
  const [isChangeIcon, setIsChangeIcon] = useState(false);
  const { name, empty, full } = icon;

  const handleIconsChange = () => {
    setIsChangeIcon((isChangeIcon) => !isChangeIcon);
  };
  return (
    <span
      onMouseEnter={() => handleIconsChange()}
      onMouseLeave={() => handleIconsChange()}
      className="amenities-icon"
    >
      <span className="icon-holder">
        <img src={isChangeIcon ? full : empty} alt="" />
      </span>

      <span>{name}</span>
    </span>
  );
};

export default AmenitiesIcon;
