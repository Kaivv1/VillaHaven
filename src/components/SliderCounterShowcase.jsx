import React, { useEffect } from "react";
import Counter from "./Counter";
import { useModalData } from "../contexts/ModalDataContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useRefs } from "../contexts/RefContext";
import { useIsInViewPort } from "../hooks/isInViewPort";
import { useIsMobile } from "../hooks/useIsMobile";
import Slider from "./Slider";
import { useChangeDocumentOverflow } from "../hooks/useChangeDocumentOverflow";

const SliderCounterShowcase = () => {
  const {
    showVideoModal,
    setShowVideoModal,
    aboutVillaHavenData: sliderData,
  } = useModalData();
  const { counterRef } = useRefs();
  const isIntersecting = useIsInViewPort(counterRef, "-300px");
  const isMobile = useIsMobile(600);

  useChangeDocumentOverflow(showVideoModal);

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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat earum
          dicta veniam asperiores modi ea natus voluptate, voluptatem, illum
          harum
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
