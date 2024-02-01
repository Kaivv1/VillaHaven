/*eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Star from "./Star";

const starContainerStyle = {
  display: "flex",
};
const StarRating = ({
  size = 20,
  className = "",
  currRating = 0,
  color = "#f6cf66",
  maxRating = 0,
}) => {
  const [rating, setRating] = useState(currRating);
  useEffect(() => {
    if (currRating) setRating(currRating);
  }, [currRating]);

  return (
    <div className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            color={color}
            size={size}
            full={rating >= i + 1}
            className={className}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRating;
