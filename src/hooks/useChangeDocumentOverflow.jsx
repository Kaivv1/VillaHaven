import { useEffect } from "react";

export const useChangeDocumentOverflow = (hideOverflow) => {
  useEffect(() => {
    if (hideOverflow) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [hideOverflow]);
};
