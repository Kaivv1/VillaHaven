import React, { useEffect } from "react";
import Counter from "./Counter";
import { useModalData } from "../contexts/ModalDataContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useRefs } from "../contexts/RefContext";
import { useIsInViewPort } from "../hooks/isInViewPort";
import { useIsMobile } from "../hooks/useIsMobile";
import Slider from "./Slider";

const SliderCounterShowcase = () => {
  const { setShowVideoModal, aboutVillaHavenData: sliderData } = useModalData();
  const { counterRef } = useRefs();
  const isIntersecting = useIsInViewPort(counterRef, "-300px");
  const isMobile = useIsMobile(600);

  useEffect(() => {
    if (isIntersecting) {
      if (isMobile) return;
      counterRef.current
        .querySelector(".counter-container")
        .classList.add("counter-animation");
    }
  }, [counterRef, isIntersecting, isMobile]);

  return (
    <>
      <div className="counter-wrapper" ref={counterRef}>
        <h1>access only the finest homes in the most desirable destinations</h1>
        <p>
          Experience transcendent luxury with VillaHaven, where opulence and
          exclusivity unfold. Gain exclusive access to lavish homes in coveted
          destinations, marking the genesis of an unparalleled lifestyle. Every
          moment is an indulgence, every home a masterpiece of elegance. Join us
          in a celebration of refined living, where sophistication meets
          seamless comfort.
        </p>
        <Counter isIntersecting={isIntersecting} isMobile={isMobile} />
      </div>

      <div className="slider-wrapper">
        <Slider>
          {sliderData.map((slide, i) => (
            <React.Fragment key={i}>
              <img src={slide.picture} alt="" />
              {i === 0 && (
                <span
                  className="video-button"
                  onClick={() =>
                    setShowVideoModal((showVideoModal) => !showVideoModal)
                  }
                >
                  <PlayArrowIcon
                    sx={{ fontSize: `${isMobile ? "3rem" : "4rem"}` }}
                  />
                </span>
              )}
            </React.Fragment>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default SliderCounterShowcase;
