import React, { useState } from "react";
import TabItem from "./TabItem";
import ButtonWrapper from "./ButtonWrapper";
import { useDispatch, useSelector } from "react-redux";
import { incrementStep } from "../store/stepSlice";
import { storeTabDetails } from "../store/storedData";
import SliderButton from "./SliderButton";

const StepTwo = () => {
  const [tabActive, setTabActive] = useState(0);
  const dispatch = useDispatch();
  const [projectTypeDetails, setProjectTypeDetails] = useState(
    useSelector((state) => state.storedData.tabDetails)
  );

  const [budgetReset, setBudgetReset] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [emailPercentage, setEmailPercentage] = useState("");
  const [error, setError] = useState(false);

  const onUpdateHandler = (e) => {
    if (e.target.value.length) {
      setProjectTypeDetails({
        ...projectTypeDetails,
        [e.target.name]: {
          value: e.target.value,
          isFilled: e.target.value === "" ? false : true,
        },
      });
    }
  };

  const onBudgetResetHandler = () => {
    setBudgetReset(!budgetReset);
  };

  const onEmailAlertHandler = () => {
    setEmailAlerts(!emailAlerts);
  };

  const onSendEmailPercentHandler = (e) => {
    if (emailAlerts) {
      setEmailPercentage(e.target.value);
    }
  };

  // selecting tabs and displaying content
  const tabs = [
    {
      name: "Time & materials",
      value: "tab_one",
    },
    {
      name: "Fixed Rate",
      value: "tab_two",
    },
    {
      name: "Non-Billable",
      value: "tab_three",
    },
  ];

  const onSubmitHandler = () => {
    const checkedArr = [
      projectTypeDetails.projectRate.isFilled,
      projectTypeDetails.projectrateAmount.isFilled,
      projectTypeDetails.budgetRate.isFilled,
    ];

    if (checkedArr.includes(false)) {
      return setError(true);
    }

    dispatch(incrementStep());
    dispatch(storeTabDetails(projectTypeDetails));
  };

  console.log(useSelector((state) => state.storedData.tabDetails));

  return (
    <>
      <div className="form-heading-wrapper">
        <h2>Project type</h2>
        <p> Don't panic - You can also custoize this types in settings</p>
      </div>

      <div className="tabs_container">
        <ul className="tabList">
          {tabs.map((tab, index) => {
            return (
              <TabItem
                setTabActive={setTabActive}
                tabActive={tabActive}
                key={tab.value}
                index={index}
                tab={tab}
              />
            );
          })}
        </ul>
        <div className="tabContentWrapper">
          <div
            className={tabActive === 0 ? "tab-content active" : "tab-content"}
          >
            <form className="form_tab">
              <div className="form-block">
                <h4>Hourly</h4>
                <p>
                  We need hourly rates to track your project's billable amount
                </p>
                <div className="form-field">
                  <div className="budget-rate-block">
                    <div className="budgetType">
                      <select
                        onClick={onUpdateHandler}
                        name="projectRate"
                        value={projectTypeDetails.projectRate.value}
                        onChange={onUpdateHandler}
                        className={
                          (projectTypeDetails.projectRate.isFilled === false &&
                            error) ||
                          projectTypeDetails.projectRate.value === "default"
                            ? "notFilled"
                            : ""
                        }
                      >
                        <option value="default">Select a value</option>
                        <option value="Project Hourly Rate">
                          Project Hourly Rate
                        </option>
                        <option value="Project Monthly Rate">
                          Project Monthly Rate
                        </option>
                        <option value="Project Yearly Rate">
                          Project Yearly Rate
                        </option>
                      </select>
                      <p className="errorMsg">Please select rate</p>
                    </div>
                    <div className="budgetrate">
                      <input
                        type="number"
                        name="projectrateAmount"
                        value={projectTypeDetails.projectrateAmount.value}
                        onChange={onUpdateHandler}
                        className={
                          projectTypeDetails.projectrateAmount.isFilled ===
                            false && error
                            ? "notFilled project-rate"
                            : "project-rate"
                        }
                      />
                      <p className="errorMsg">Enter Amount</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" form-block">
                <h4>Budget</h4>
                <p>
                  We need hourly rates to track your project's billable amount
                </p>
                <div className="form-field budget-per-person">
                  <select
                    onClick={onUpdateHandler}
                    name="budgetRate"
                    value={projectTypeDetails.budgetRate.value}
                    onChange={onUpdateHandler}
                    className={
                      (projectTypeDetails.budgetRate.isFilled === false &&
                        error) ||
                      projectTypeDetails.budgetRate.value === "default"
                        ? "notFilled"
                        : ""
                    }
                  >
                    <option value="default">Please Select a value</option>
                    <option value="Hours Per Person">Hours Per Person</option>
                    <option value="Days Per Person">Days Per Person</option>
                    <option value="Months Per Person">Months Per Person</option>
                  </select>
                  <p className="errorMsg">Please select Hourly Rate</p>
                </div>
              </div>
              <div className="form-block budget-reset">
                <input type="checkbox" onClick={onBudgetResetHandler} />
                <p>Budget resets every month</p>
              </div>
              <div className="form-block emial-alert">
                <input type="checkbox" onClick={onEmailAlertHandler} />
                <p>
                  Send email alerts if project exceeds{" "}
                  <input
                    value={emailPercentage}
                    onChange={onSendEmailPercentHandler}
                    type="number"
                  />
                  % of month
                </p>
              </div>
            </form>
          </div>
          <div
            className={tabActive === 1 ? "tab-content active" : "tab-content"}
          >
            Tab 2
          </div>
          <div
            className={tabActive === 2 ? "tab-content active" : "tab-content"}
          >
            Tab 3
          </div>
        </div>
      </div>
      <ButtonWrapper onSubmitHandler={onSubmitHandler} />
      <SliderButton />
    </>
  );
};

export default StepTwo;
