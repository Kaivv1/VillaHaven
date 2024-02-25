import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useIsMobile = (width) => {
  const [isMobile, setIsMobile] = useLocalStorage(
    window.innerWidth <= width,
    "isMobile"
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= width);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width, setIsMobile]);
  return isMobile;
};
