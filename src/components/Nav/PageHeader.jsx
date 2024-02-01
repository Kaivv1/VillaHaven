/*eslint-disable react/prop-types */
import { useEffect } from "react";
import { useRefs } from "../../contexts/RefContext";
import BreadCrumbs from "../BreadCrumbs";
import { useIsInViewPort } from "../../hooks/isInViewPort";

const PageHeader = ({ smallTitle, largeTitle }) => {
  const { pageHeaderRef } = useRefs();
  const isIntersecting = useIsInViewPort(pageHeaderRef);

  useEffect(() => {
    if (isIntersecting) {
      pageHeaderRef.current
        .querySelector("p")
        .classList.add("page-header-animation");
      pageHeaderRef.current
        .querySelector("h1")
        .classList.add("page-header-animation");
    }
  }, [isIntersecting, pageHeaderRef]);

  return (
    <div className="page-header">
      <div ref={pageHeaderRef}>
        <p>{smallTitle}</p>
        <h1>{largeTitle}</h1>
      </div>
      <BreadCrumbs />
    </div>
  );
};

export default PageHeader;
