import React, { createContext, useContext, useRef } from "react";

const RefContext = createContext();

const RefProvider = ({ children }) => {
  const specialOfferRef = useRef(null);
  const customerReviewRef = useRef(null);
  const latestBlogsRef = useRef(null);
  const footerRef = useRef(null);
  const pageHeaderRef = useRef(null);
  const counterRef = useRef(null);
  const amenitiesRef = useRef(null);
  return (
    <RefContext.Provider
      value={{
        specialOfferRef,
        customerReviewRef,
        latestBlogsRef,
        footerRef,
        pageHeaderRef,
        counterRef,
        amenitiesRef,
      }}
    >
      {children}
    </RefContext.Provider>
  );
};

const useRefs = () => {
  const value = useContext(RefContext);

  if (value === undefined)
    throw new Error("RefContext was used outside of RefProvider");

  return value;
};

export { useRefs, RefProvider };
