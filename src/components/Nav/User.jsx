import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserDropDown from "./UserDropDown";
import Button from "../Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useFetchUser } from "../../hooks/useFetchUser";
const User = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const userIconRef = useRef(null);
  const { user } = useFetchUser();

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/login");
  };

  const toggleDropDown = () => {
    setIsClicked((prevIsClick) => !prevIsClick);
  };
  const closeDropDown = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userIconRef.current && !userIconRef.current.contains(e.target)) {
        closeDropDown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="user-container" ref={userIconRef}>
      {isClicked && <UserDropDown onClose={closeDropDown} />}
      <span onClick={toggleDropDown}>
        {user?.avatar ? (
          <img src={user?.avatar} alt="" className="user-avatar" />
        ) : (
          <AccountCircleIcon fontSize="large" className="user-icon" />
        )}
      </span>
      <p>Hello, {user?.firstName}</p>
      <Button
        onClick={() => handleLogout()}
        icon={<LogoutIcon sx={{ fontSize: "1rem" }} />}
      >
        Logout
      </Button>
    </div>
  );
};

export default User;
