import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  step: 1,
  isfilled: false,
};

export const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    incrementStep: (state) => {
      if (state.step < 7) state.step += 1;
    },
    decrementStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },
    slideStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const { incrementStep, decrementStep, slideStep } = stepSlice.actions;
export default stepSlice.reducer;
