/*eslint-disable react/prop-types */

import { createContext, useContext, useRef } from "react";

const RefContext = createContext();

const RefProvider = ({ children }) => {
  const customerReviewRef = useRef(null);
  const latestBlogsRef = useRef(null);
  const footerRef = useRef(null);
  const pageHeaderRef = useRef(null);
  const counterRef = useRef(null);
  const otherAmenitiesRef = useRef(null);
  const amenitiesRef = useRef(null);
  return (
    <RefContext.Provider
      value={{
        customerReviewRef,
        latestBlogsRef,
        footerRef,
        pageHeaderRef,
        counterRef,
        otherAmenitiesRef,
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
