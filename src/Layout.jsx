import Navbar from "./components/Nav/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Main from "./ui/Main";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

const Layout = () => {
  const [isAuthPages, setIsAuthPages] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handlePages = () => {
      if (
        pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/password/send-email" ||
        pathname === "/password/verify-email" ||
        pathname === "/password/reset-password"
      ) {
        setIsAuthPages(true);
      } else {
        setIsAuthPages(false);
      }
    };

    handlePages();
  }, [pathname]);

  return (
    <div className="layout">
      <Header>{!isAuthPages && <Navbar />}</Header>

      {isAuthPages ? (
        <Outlet />
      ) : (
        <Main>
          <Outlet />
        </Main>
      )}

      {!isAuthPages && <Footer />}
    </div>
  );
};

export default Layout;
