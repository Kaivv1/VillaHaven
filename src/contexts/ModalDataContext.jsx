import { createContext, useContext, useState } from "react";
import {
  carouselPic1,
  carouselPic2,
  carouselPic3,
  carouselVideo,
} from "../assetsExports";

const ModalDataContext = createContext();

const ModalDataProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const aboutVillaHavenData = [
    {
      picture: carouselVideo,
      video:
        "https://www.youtube.com/embed/wbn-BoEqUBA?si=juwR6pmspHfDiaUl&amp;controls=1&autoplay=1&mute=1",
    },
    {
      picture: carouselPic1,
    },
    {
      picture: carouselPic2,
    },
    {
      picture: carouselPic3,
    },
  ];

  return (
    <ModalDataContext.Provider
      value={{
        setShowModal,
        showModal,
        aboutVillaHavenData,
      }}
    >
      {children}
    </ModalDataContext.Provider>
  );
};

const useModalData = () => {
  const context = useContext(ModalDataContext);

  if (context === undefined)
    throw new Error(
      "ComponentsDataContext was used outside ModalDataContext Provider "
    );

  return context;
};

export { useModalData, ModalDataProvider };
