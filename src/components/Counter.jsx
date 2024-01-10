import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const Counter = ({ isIntersecting, isMobile }) => {
  const [animatedData, setAnimatedData] = useState([]);
  const [animationStarted, setAnimationStarted] = useState(false);
  const intervalRef = useRef(null);
  const data = useRef([
    {
      quantity: 4000,
      title: "GUESTS SERVED",
    },
    {
      quantity: 7,
      title: "VILLAS & RESORTS",
    },
    {
      quantity: 5,
      title: "LOCATIONS",
    },
  ]);

  useEffect(() => {
    if (
      (isIntersecting && !animationStarted) ||
      (isMobile && !animationStarted)
    ) {
      setAnimationStarted(true);

      const animationDuration = 3;

      const handleAnimation = () => {
        const startTime = Date.now();
        intervalRef.current = setInterval(() => {
          const currentTime = Date.now();
          const elapsedTime = currentTime - startTime;

          if (elapsedTime < animationDuration) {
            const newData = data.current.map(({ quantity }) => ({
              quantity: (quantity * (elapsedTime / animationDuration)).toFixed(
                0
              ),
            }));
            setAnimatedData(newData);
          } else {
            setAnimatedData(data.current);
            clearInterval(intervalRef.current);
            setAnimationStarted(false);
          }
        }, 16);
      };
      handleAnimation();
    }
  }, [animationStarted, isIntersecting, isMobile]);
  return (
    <div className="counter-container">
      {animatedData.map(({ quantity, title }, i) => (
        <React.Fragment key={i}>
          <div>
            <span>
              <CountUp end={quantity} duration={3} />
              {quantity > 3999 && <span className="plus">+</span>}
            </span>
            <span>{title}</span>
          </div>
          {i < animatedData.length - 1 && <div className="vertical-line"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Counter;
