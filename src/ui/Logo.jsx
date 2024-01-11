/*eslint-disable react/prop-types */

import BiggerLogoPic from "../../src/assets/logos/logo2.png";
import SmallerLogoPic from "../../src/assets/logos/logo1.png";
import { useNavigate } from "react-router";

const Logo = ({ isMobile }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <img src={isMobile ? SmallerLogoPic : BiggerLogoPic} alt="" />
    </div>
  );
};

export default Logo;
