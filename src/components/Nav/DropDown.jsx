/*eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
const DropDown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/login");
  };

  return (
    <ul className="dropdown-mobile">
      <li>
        <Link to="/">
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
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/villas">Our Villas</Link>
      </li>
      <li>
        <Link to="/contact">Contacts</Link>
      </li>
      <li>
        <Link onClick={handleLogout}>
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
