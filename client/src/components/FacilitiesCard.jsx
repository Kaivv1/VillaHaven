/*eslint-disable react/prop-types */
import { Suspense, lazy } from "react";
import Loader from "../ui/Loader";
const LazyImage = lazy(() => import("./LazyImage"));

const FacilitiesCard = ({ data }) => {
  const { title, pic } = data;
  return (
    <div className="facilities-card">
      <Suspense fallback={<Loader />}>
        <LazyImage src={pic} alt="" />
      </Suspense>
      <div>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default FacilitiesCard;
