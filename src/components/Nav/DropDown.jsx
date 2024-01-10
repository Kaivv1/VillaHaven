import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const DropDown = ({ isLaptop }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/login");
  };

  return (
    <>
      {isLaptop ? (
        <ul className="dropdown-mobile">
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
            <Link to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/contact">Contacts</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/staff">Our Staff</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      ) : (
        <ul className="dropdown">
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/staff">Our Staff</Link>
          </li>

          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default DropDown;
