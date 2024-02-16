import { configureStore } from "@reduxjs/toolkit";
import stepSlice from "./stepSlice";
import storedDataSlice from "./storedData";

const store = configureStore({
  reducer: {
    stepCount: stepSlice,
    storedData: storedDataSlice,
  },
});

export default store;
