import React, { useRef, useState } from "react";
import reactLogo from "../../pictures/section.jpg";
import icon0 from "../../pictures/Partner-0.ico";
import icon1 from "../../pictures/Partner-1.ico";
import icon2 from "../../pictures/Partner-2.ico";
import icon3 from "../../pictures/Partner-3.ico";
import icon4 from "../../pictures/Partner-4.ico";
import icon5 from "../../pictures/Partner-5.ico";
import Counter from "../../components/Counter";
import UseScrollAnimation from "../../hooks/UseScrollAnimation";
import Slider from "../../components/Slider";
import Button from "../../components/Button";

const AboutVillague = () => {
  const elementRef = useRef();
  const shouldAnimate = UseScrollAnimation(elementRef);
  const elementClass = shouldAnimate ? "animate" : "";
  const logo = [icon0, icon1, icon2, icon3, icon4, icon5];
  const [changeNumbs, setChangeNumbs] = useState(false);
  return (
    <div>
      <div className="div-box">
        <div>
          <img className="villagueImage" src={reactLogo} alt="react logo" />
          <div ref={elementRef} className={`villague-counter ${elementClass}`}>
            <Counter animate={shouldAnimate} />
          </div>
        </div>
        <div className="infoVIllague">
          <br />
          <h1>About Villague</h1>
          <p className="paragraphVillague">
            Gravida vulputate aliquet tempor sit. Neque sed pretium non urna sed
            etid aenean haretra quam plac adipiscing penatibus aliquam
            adipiscing gravida elementum aliquet eget senectus felis enim diam
            molestie. Aenean haretra quam placerat adipiscing penatibus aliquam
          </p>
          <br />
          <h3>Our Partners</h3>
          <br />
          <div className="iconVillague">
            {logo.map((item, i) => {
              return <img id="icon" src={item} alt="" key={i} />;
            })}
          </div>
          <p>
            Gravida vulputate aliquet tempor sit. Neque sed pretium non urna sed
            etid aenean haretra quam plac adipiscing penatibus aliquam
            adipiscing gravida elementum aliquet eget senectus felis enim diam
            molestie. Aenean haretra quam placerat adipiscing penatibus aliquam
          </p>
          <div className="villague-button">
            <Button
              buttonTitle="read more"
              backgroundColor="rgb(251, 198, 63)"
              size="small"
              iconClass="gg-arrow-right"
            />
          </div>
          <div className="about-villague-slider">
            <Slider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutVillague;
