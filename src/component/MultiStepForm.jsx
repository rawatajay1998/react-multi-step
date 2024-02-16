import React, { useState } from "react";
import StepOne from "./StepOne";
import { useDispatch, useSelector } from "react-redux";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSixth from "./StepSixth";
import { slideStep } from "../store/stepSlice";
import ThankYou from "./ThankYou";

const MultiStepForm = () => {
  const step = useSelector((state) => state.stepCount.step);
  const [openForm, setOpenForm] = useState(false);

  const dispatch = useDispatch();

  const OnFormToggler = () => {
    setOpenForm(!openForm);
    dispatch(slideStep(1));
  };
  console.log(step);
  return (
    <div className="App multistep-form">
      <div className="form-modal-toggler">
        <button onClick={OnFormToggler}>Open Form</button>
      </div>
      {openForm && (
        <>
          <div className="formWrapper">
            <button onClick={OnFormToggler} className="close-icon-form">
              <img src={window.location.origin + "/delete-icon.png"} />
            </button>
            {step === 1 && <StepOne />}
            {step === 2 && <StepTwo />}
            {step === 3 && <StepThree />}
            {step === 4 && <StepFour />}
            {step === 5 && <StepFive />}
            {step === 6 && <StepSixth />}
            {step === 7 && <ThankYou />}
          </div>
        </>
      )}
    </div>
  );
};

export default MultiStepForm;
