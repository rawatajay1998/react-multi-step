import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementStep } from "../store/stepSlice";

const ButtonWrapper = ({ onSubmitHandler }) => {
  const dispatch = useDispatch();

  const stepInital = useSelector((state) => state.stepCount.step);

  const onNextHandler = () => {
    onSubmitHandler();
  };

  const onPrevHandler = () => {
    if (stepInital === 1) {
      return;
    }
    dispatch(decrementStep());
  };

  return (
    <div className="btn-wrapper">
      <button
        className="btn back-btn"
        style={stepInital === 1 ? { opacity: 0 } : { opacity: 1 }}
        onClick={onPrevHandler}
        disabled={stepInital === 1}
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 16a.997.997 0 01-.707-.293l-5-5a.999.999 0 010-1.414l5-5a.999.999 0 111.414 1.414L8.414 10l4.293 4.293A.999.999 0 0112 16z"
            fill="#5C5F62"
          />
        </svg>
        <span> Back</span>
      </button>
      <button className="btn next-btn" onClick={onNextHandler} type="button">
        {stepInital === 6 ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default ButtonWrapper;
