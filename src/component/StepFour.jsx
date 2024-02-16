import React, { useState } from "react";
import ButtonWrapper from "./ButtonWrapper";
import { incrementStep } from "../store/stepSlice";
import { useDispatch, useSelector } from "react-redux";
import { storeManagePermissions } from "../store/storedData";
import SliderButton from "./SliderButton";

const StepFour = () => {
  const [manageProject, setManageProject] = useState(
    useSelector((state) => state.storedData.manageProjects)
  );

  const dispatch = useDispatch();

  // Selecting who can manage projects from screen 4
  const onManageProjectshandler = (event) => {
    setManageProject(event.target.value);
  };

  const onSubmitHandler = () => {
    dispatch(incrementStep());
    dispatch(storeManagePermissions(manageProject));
  };

  return (
    <>
      <div className="screen manage-projects">
        <div className="form-heading-wrapper">
          <h2>Who can manage projects</h2>
          <p>
            Don't panic - You can also customize this permissions in settings
          </p>
        </div>
        <div className="blocks_wrappers">
          <div className="block">
            <input
              value="everyone"
              type="radio"
              name="manageProjects"
              onChange={onManageProjectshandler}
              checked={manageProject === "everyone"}
            />
            <img src={window.location.origin + "/everyone.png"} />
            <div className="block-content">
              <h4>Everyone</h4>
              <p>
                All users can now to see it, but guests cannot access the
                projects
              </p>
            </div>
          </div>
          <div className="block">
            <input
              value="admin"
              type="radio"
              name="manageProjects"
              onChange={onManageProjectshandler}
              checked={manageProject === "admin"}
            />
            <img src={window.location.origin + "/profile.png"} />
            <div className="block-content">
              <h4>Only Admin's</h4>
              <p>
                All users can now to see it, but guests cannot access the
                projects
              </p>
            </div>
          </div>
          <div className="block">
            <input
              value="specific"
              name="manageProjects"
              type="radio"
              onChange={onManageProjectshandler}
              checked={manageProject === "specific"}
            />
            <img src={window.location.origin + "/everyone.png"} />
            <div className="block-content">
              <h4>Only to Specific people</h4>
              <p>
                All users can now to see it, but guests cannot access the
                projects
              </p>
            </div>
          </div>
        </div>
      </div>
      <ButtonWrapper onSubmitHandler={onSubmitHandler} />
      <SliderButton />
    </>
  );
};

export default StepFour;
