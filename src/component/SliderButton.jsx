import React, { useRef } from "react";
import { useSelector } from "react-redux";

const SliderButton = () => {
  const step = useSelector((state) => state.stepCount.step);

  const sliderDots = [1, 2, 3, 4, 5, 6];
  const ref = useRef(sliderDots);
  return (
    <>
      <div className="dots-list">
        {sliderDots.map((dots) => {
          return (
            <button
              ref={ref}
              className={dots === step ? "dots active" : "dots"}
              value={dots}
              key={dots}
              type="button"
            ></button>
          );
        })}
      </div>
    </>
  );
};

export default SliderButton;
