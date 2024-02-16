import React, { useState } from "react";
import ButtonWrapper from "./ButtonWrapper";
import { incrementStep } from "../store/stepSlice";
import { useDispatch, useSelector } from "react-redux";
import { storeView } from "../store/storedData";
import SliderButton from "./SliderButton";

const StepThree = () => {
  const [selectedView, setselectView] = useState(
    useSelector((state) => state.storedData.selectedView)
  );

  const dispatch = useDispatch();

  // Selecting who can manage projects from screen 4
  const onSetViewHandler = (event) => {
    setselectView(event.target.value);
  };
  const onSubmitHandler = () => {
    dispatch(incrementStep());
    dispatch(storeView(selectedView));
  };

  return (
    <>
      <div className="select-view">
        <div className="form-heading-wrapper">
          <h2>Select a View</h2>
          <p> You can also customize this version in settings</p>
        </div>
        <ul>
          <li className="select-view-list">
            <div className="block">
              <input
                value="board"
                type="radio"
                name="manageProjects"
                onChange={onSetViewHandler}
                checked={selectedView === "board"}
              />
              <span className="imgWrapper">
                <img src={window.location.origin + "/info.png"} />
              </span>
            </div>
            <span>Board</span>
          </li>
          <li className="select-view-list">
            <div className="block">
              <input
                value="list"
                type="radio"
                name="manageProjects"
                onChange={onSetViewHandler}
                checked={selectedView === "list"}
              />
              <span className="imgWrapper">
                <img src={window.location.origin + "/list.png"} />
              </span>
            </div>
            <span>List</span>
          </li>
        </ul>
      </div>
      <ButtonWrapper onSubmitHandler={onSubmitHandler} />
      <SliderButton />
    </>
  );
};

export default StepThree;
