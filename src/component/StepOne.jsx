import React, { useCallback, useRef, useState } from "react";
import ButtonWrapper from "./ButtonWrapper";
import { useDispatch, useSelector } from "react-redux";
import { incrementStep } from "../store/stepSlice";
import { storeData } from "../store/storedData";
import SliderButton from "./SliderButton";

const StepOne = () => {
  const [data, setData] = useState(
    useSelector((state) => state.storedData.projectDetails)
  );

  const dispatch = useDispatch();

  // Adding client
  const onAddClientHandler = (e) => {
    e.preventDefault();
  };

  const [error, setError] = useState(false);

  const onUpdateHandler = useCallback((e) => {
    let dataValue = e.target.value;
    dataValue = dataValue.replace(/^\s+/, "");

    setData({
      ...data,
      [e.target.name]: {
        value: e.target.value,
        isFilled: e.target.value === "" ? false : true,
      },
    });
  });

  const onSubmitHandler = () => {
    const checkedArr = [
      data.projectName.isFilled,
      data.clientName.isFilled,
      data.dateFrom.isFilled,
      data.dateTo.isFilled,
    ];

    if (checkedArr.includes(false)) {
      return setError(true);
    }
    if (data.clientName.value === "default") {
      return setError(true);
    }

    dispatch(incrementStep());
    dispatch(storeData(data));
  };

  return (
    <>
      <div className="form-heading-wrapper">
        <h2>Create a Project</h2>
      </div>
      <form>
        <div className="form-field">
          <label>Project Name</label>
          <input
            placeholder="Enter project name here"
            className={
              data.projectName.isFilled === false && error ? "notFilled" : ""
            }
            name="projectName"
            value={data.projectName.value}
            type="text"
            min={10}
            onChange={onUpdateHandler}
          />
          <p className="errorMsg"> Please enter name and </p>
        </div>
        <div className="form-field">
          <label>Client</label>
          <div className="client-field-block">
            <div className="single-block">
              <select
                name="clientName"
                placeholder="Select a client"
                value={data.clientName.value}
                onChange={onUpdateHandler}
                className={
                  (data.clientName.isFilled === false && error) ||
                  data.clientName.value === "default"
                    ? "notFilled"
                    : ""
                }
              >
                <option value="default">Select a value</option>
                <option value="Client One">Client One</option>
                <option value="Client Two">Client Two</option>
              </select>
              <p className="errorMsg"> Please select a client name</p>
            </div>
            <div className="add-new-client">
              <span>Or</span>

              <button onClick={onAddClientHandler}>
                <img
                  height={12}
                  width={12}
                  src={window.location.origin + "/plus.png"}
                />{" "}
                <span>Add Client</span>
              </button>
            </div>
          </div>
        </div>
        <div className="form-field date-field">
          <label>Dates</label>
          <div className="date-grid">
            <div>
              <input
                className={
                  data.dateFrom.isFilled === false && error ? "notFilled" : ""
                }
                value={data.dateFrom.value}
                name="dateFrom"
                type="date"
                onChange={onUpdateHandler}
              />
              <p className="errorMsg"> Please select a date</p>
            </div>
            -
            <div>
              <input
                className={
                  data.dateTo.isFilled === false && error ? "notFilled" : ""
                }
                value={data.dateTo.value}
                name="dateTo"
                type="date"
                onChange={onUpdateHandler}
              />
              <p className="errorMsg"> Please select a date</p>
            </div>
            <p className="errorMsg"> Please select a date</p>
          </div>
        </div>
        <div className="form-field">
          <label>Notes</label>
          <textarea
            name="notes"
            className="w-100"
            value={data.notes.value}
            placeholder="Optional"
            rows={10}
            onChange={onUpdateHandler}
          />
        </div>
      </form>
      <ButtonWrapper onSubmitHandler={onSubmitHandler} />
      <SliderButton />
    </>
  );
};

export default StepOne;
