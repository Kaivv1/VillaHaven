import SliderCounterShowcase from "./SliderCounterShowcase";
import {
  partner0,
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
} from "../assetsExports";
import Modal from "./Modal";
import { useModalData } from "../contexts/ModalDataContext";
import { Suspense, lazy } from "react";
import Loader from "../ui/Loader";
import { useChangeDocumentOverflow } from "../hooks/useChangeDocumentOverflow";
const LazyImage = lazy(() => import("./LazyImage"));

const AboutVillaHaven = () => {
  const logos = [partner0, partner1, partner2, partner3, partner4, partner5];
  const { showVideoModal, aboutVillaHavenData, setShowVideoModal } =
    useModalData();
  useChangeDocumentOverflow(showVideoModal);
  return (
    <div className="about-villa-haven-container">
      <div>
        <h1>About VillaHaven</h1>
        <p>
          At VillaHaven, we believe in transforming ordinary vacations into
          extraordinary experiences. Nestled at the intersection of luxury and
          leisure, VillaHaven invites you to embark on a journey where every
          moment is crafted for comfort and joy. Whether you&apos;re planning a
          family retreat, a dream wedding, an intimate event, or a rejuvenating
          tour, VillaHaven is your premier destination for creating cherished
          memories.VillaHaven isn&apos;t just a booking platform; it&apos;s a
          promise of unparalleled comfort, a celebration of life&apos;s special
          moments, and a gateway to a world where luxury meets leisure.
        </p>
      </div>
      <div className="partners-logos">
        <h1>Our Partners</h1>
        <div>
          {logos.map((logo, i) => (
            <span key={i}>
              <Suspense fallback={<Loader />}>
                <LazyImage src={logo} alt="" />
              </Suspense>
            </span>
          ))}
        </div>
      </div>
      <SliderCounterShowcase />
      {showVideoModal && (
        <Modal
          video={aboutVillaHavenData[0].video}
          onClose={() => setShowVideoModal((showVideoModal) => !showVideoModal)}
        />
      )}
    </div>
  );
};

export default AboutVillaHaven;
