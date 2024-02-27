import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
const UserDropDown = () => {
  return (
    <ul className="user-dropdown">
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
            <FavoriteIcon fontSize="small" />
          </span>
          Favorites
        </Link>
      </li>
    </ul>
  );
};

export default UserDropDown;
