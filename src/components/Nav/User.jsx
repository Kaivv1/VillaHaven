import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserDropDown from "./UserDropDown";

const User = () => {
  const [user, setUser] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("access_token");
  const { firstName } = user;
  const userIconRef = useRef(null);
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      const res = await fetch(`http://localhost:4000/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [token]);

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
      <span onClick={toggleDropDown}>
        <AccountCircleIcon fontSize="large" className="user-icon" />
      </span>
      {isClicked && <UserDropDown onClose={closeDropDown} />}
      <p>Hello, {firstName}</p>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default User;
