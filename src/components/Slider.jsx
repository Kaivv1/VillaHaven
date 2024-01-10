import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Slider = ({ children: slides, autoSlide = false, interval = 4000 }) => {
  const [currSlide, setCurrSlide] = useState(0);

  const handleNext = () =>
    setCurrSlide((currSlide) =>
      currSlide === slides.length - 1 ? 0 : currSlide + 1
    );

  const handlePrevious = () =>
    setCurrSlide((currSlide) =>
      currSlide === 0 ? slides.length - 1 : currSlide - 1
    );

  useEffect(() => {
    if (!autoSlide) return;

    const sliderInterval = setInterval(handleNext, interval);

    return () => clearInterval(sliderInterval);
  }, [autoSlide, interval, handleNext]);
  return (
    <div className="slider-container">
      <div
        className="slides"
        style={{ transform: `translateX(-${currSlide * 100}%)` }}
      >
        {slides}
      </div>
      <div className="arrows">
        <button className="arrow-previous" onClick={() => handlePrevious()}>
          <ArrowBackIosNewIcon />
        </button>
        <button className="arrow-next" onClick={() => handleNext()}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      <div className="slide-count-wrapper">
        <div className="slide-count">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`${
                currSlide === i ? "count-active" : "count-inactive"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
