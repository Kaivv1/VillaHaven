import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../ui/Logo";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useRef, useState } from "react";
import DropDown from "./DropDown";
import User from "./User";
import HomeHeader from "./HomeHeader";
import PageHeader from "./PageHeader";
import { useIsMobile } from "../../hooks/useIsMobile";
import HamburgerMenu from "react-hamburger-menu";

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { pathname } = useLocation();
  const isLaptop = useIsMobile(1470);
  const isMobile = useIsMobile(425);
  const pagesRef = useRef(null);
  const hamburgerRef = useRef(null);
  const handleToggleDropDown = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };
  const handleCloseDropDown = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pagesRef.current && !pagesRef.current.contains(e.target)) {
        handleCloseDropDown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (hamburgerRef.current && !hamburgerRef.current.contains(e.target)) {
        handleCloseDropDown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar-container">
      <div className="navbar">
        {isLaptop ? (
          <>
            <Logo isMobile={isMobile} />
            <div className="hamburger" ref={hamburgerRef}>
              <HamburgerMenu
                isOpen={isClicked}
                menuClicked={handleToggleDropDown}
                width={30}
                height={22}
                color="#f5f5f5"
                strokeWidth={isMobile ? 2 : 3}
                animationDuration={0.3}
              />
              {isClicked && <DropDown isLaptop={isLaptop} />}
            </div>
          </>
        ) : (
          <>
            <Logo />
            <nav>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/villas">Our Villas</NavLink>
              <p ref={pagesRef} onClick={handleToggleDropDown}>
                <span>Pages </span>
                <KeyboardArrowDownIcon />
              </p>
              {isClicked && <DropDown />}
              <NavLink to="/contact">Contacts</NavLink>
            </nav>
            <User />
          </>
        )}
      </div>
      {pathname === "/" && <HomeHeader />}
      {pathname === "/about" && (
        <PageHeader smallTitle="about us" largeTitle="about us" />
      )}
      {pathname === "/villas" && (
        <PageHeader smallTitle="our villas" largeTitle="our villas" />
      )}
      {pathname === "/contact" && (
        <PageHeader smallTitle="contact us" largeTitle="contact us" />
      )}
      {pathname === "/pricing" && (
        <PageHeader smallTitle="prices" largeTitle="pricing packages" />
      )}
      {pathname === "/staff" && (
        <PageHeader smallTitle="staff" largeTitle="our staff" />
      )}
      {pathname === "/faq" && <PageHeader smallTitle="faq" largeTitle="faq" />}
      {pathname === "/favorites" && (
        <PageHeader smallTitle="favorites" largeTitle="favorite villas" />
      )}
    </div>
  );
};

export default Navbar;
