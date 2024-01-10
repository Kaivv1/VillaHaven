import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useIsMobile = (width) => {
  const [isMobile, setIsMobile] = useLocalStorage(
    window.matchMedia(`(max-width:${width})px`).matches,
    "isMobile"
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width:${width}px)`);

    const handleMediaQuery = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQuery);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQuery);
      localStorage.removeItem("isMobile");
    };
  }, [width, setIsMobile]);

  return isMobile;
};
