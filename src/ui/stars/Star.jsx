import EmptyStarSVG from "../svgs/EmptyStarSVG";
import FullStarSVG from "../svgs/FullStarSVG";

const Star = ({ size, full, color, className }) => {
  return (
    <span
      role="button"
      style={
        className
          ? {}
          : {
              width: `${size}px`,
              height: `${size}px`,
              display: "block",
            }
      }
    >
      {full ? <FullStarSVG color={color} /> : <EmptyStarSVG color={color} />}
    </span>
  );
};

export default Star;
