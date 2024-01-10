import { Link } from "react-router-dom";

const UserDropDown = () => {
  return (
    <ul className="user-dropdown">
      <li>
        <Link to="/favorites">Favorites</Link>
      </li>
    </ul>
  );
};

export default UserDropDown;
