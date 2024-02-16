import React, { useState } from "react";
import ButtonWrapper from "./ButtonWrapper";
import { useDispatch, useSelector } from "react-redux";
import { incrementStep } from "../store/stepSlice";
import SliderButton from "./SliderButton";
import { storeTasks } from "../store/storedData";

const StepFive = () => {
  const [task, setTask] = useState("");
  const [tasksList, setTasksList] = useState(
    useSelector((state) => state.storedData.tasks)
  );
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  // Checking and store list input value
  const onListHandler = (e) => {
    setTask(e.target.value);
  };

  // Creating todo list on adding list
  const onAddTaskHandler = (e) => {
    e.preventDefault();
    if (task == "") return;
    setTasksList([...tasksList, task]);
    setTask("");
    setErrorMessage("");
  };

  // Deleting task from tasklist
  const onDeleteTaskHandler = (e) => {
    const deleteItem = e.target.value;
    tasksList.splice(deleteItem, 1);
    setTasksList([...tasksList]);
  };
  const onSubmitHandler = () => {
    if (tasksList.length) {
      dispatch(incrementStep());
      dispatch(storeTasks(tasksList));
    }
    setErrorMessage("Please add atleaset one task.");
  };

  const onDeleteAllHandler = () => {
    setTasksList((prev) => []);
  };

  return (
    <>
      <div className="screen task-screen">
        <div className="form-heading-wrapper">
          <h2>Tasks</h2>
          <p>Add a task</p>
        </div>
        <form className="task-form" onSubmit={onAddTaskHandler}>
          <input type="text" value={task} required onChange={onListHandler} />
          <button type="submit">Add</button>
        </form>
        <div className="tasklist-wrapper">
          <div
            className={
              1 <= tasksList.length
                ? "select-all-tasks"
                : "select-all-tasks d-none"
            }
          >
            <span className="taskValue">Delete All</span>
            <span onClick={onDeleteAllHandler} className="deleteList">
              <img src={window.location.origin + "/close-white.png"} />
            </span>
          </div>
          {tasksList &&
            tasksList.map((task, index) => {
              return (
                <li key={index} className="taskBlock">
                  <input type="checkbox" />
                  <span className="taskValue">{task}</span>
                  <span
                    value={index}
                    onClick={onDeleteTaskHandler}
                    className="deleteList"
                  >
                    <img src={window.location.origin + "/delete-icon.png"} />
                  </span>
                </li>
              );
            })}
        </div>
        {tasksList.length === 0 && (
          <p className="tasklist-empty">Please add some tasks.....</p>
        )}
        {/* <p className="task-empty-error">{errorMessage}</p> */}
      </div>
      <ButtonWrapper onSubmitHandler={onSubmitHandler} />
      <SliderButton />
    </>
  );
};

export default StepFive;
