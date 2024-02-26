/*eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import VillaIcon from "@mui/icons-material/Villa";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
const DropDown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/login");
  };

  return (
    <ul className="dropdown-mobile">
      <li>
        <Link to="/user/profile">
          <span>
            <PersonIcon fontSize="small" />
          </span>
          Profile
        </Link>
      </li>
      <li>
        <Link to="/favorites">
          <span>
            <BookmarkIcon fontSize="small" />
          </span>
          Favorites
        </Link>
      </li>
      <li>
        <Link to="/user/reservations">
          <span>
            <AirplaneTicketIcon fontSize="small" />
          </span>
          Reservations
        </Link>
      </li>
      <li>
        <Link to="/">
          <span>
            <HomeIcon fontSize="small" />
          </span>
          Home
        </Link>
      </li>
      <li>
        <Link to="/about">
          <span>
            <InfoIcon fontSize="small" />
          </span>
          About
        </Link>
      </li>
      <li>
        <Link to="/villas">
          <span>
            <VillaIcon fontSize="small" />
          </span>
          Our Villas
        </Link>
      </li>
      <li>
        <Link to="/contact">
          <span>
            <WhatsAppIcon fontSize="small" />
          </span>
          Contacts
        </Link>
      </li>
      <li>
        <Link onClick={() => handleLogout()}>
          <span>
            <LogoutIcon fontSize="small" />
          </span>
          Logout
        </Link>
      </li>
    </ul>
  );
};

export default DropDown;
