import { useEffect } from "react";

export const useChangeDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `VillaHaven | ${title}`;
  }, [title]);
};
