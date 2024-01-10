import Navbar from "./components/Nav/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Modal from "./components/Modal";
import { useModalData } from "./contexts/ModalDataContext";
import { useEffect, useState } from "react";
import Main from "./ui/Main";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

const Layout = () => {
  const { showModal, aboutVillaHavenData, setShowModal } = useModalData();
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
      {showModal && (
        <Modal
          video={aboutVillaHavenData[0].video}
          onClose={() => setShowModal((showModal) => !showModal)}
        />
      )}
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
