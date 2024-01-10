import BiggerLogoPic from "../../src/assets/logos/logo2.png";
import SmallerLogoPic from "../../src/assets/logos/logo1.png";

const Logo = ({ isMobile }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={isMobile ? SmallerLogoPic : BiggerLogoPic} alt="" />
    </div>
  );
};

export default Logo;
