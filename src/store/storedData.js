import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  projectDetails: {
    projectName: {
      value: "",
      isFilled: false,
    },
    clientName: {
      value: "",
      isFilled: false,
    },
    dateFrom: {
      value: "",
      isFilled: false,
    },
    dateTo: {
      value: "",
      isFilled: false,
    },
    notes: {
      value: "",
      isFilled: false,
    },
  },
  tabDetails: {
    projectRate: {
      value: null,
      isFilled: false,
    },
    projectrateAmount: {
      value: null,
      isFilled: false,
    },
    budgetRate: {
      value: null,
      isFilled: false,
    },
  },
  selectedView: "",
  manageProjects: "",
  tasks: [],
  team: [],
};

export const storedDataSlice = createSlice({
  name: "storedData",
  initialState,
  reducers: {
    storeData: (state, action) => {
      state.projectDetails = action.payload;
      localStorage.setItem("projectDetails", JSON.stringify(action.payload));
    },
    storeView: (state, action) => {
      state.selectedView = action.payload;
      localStorage.setItem("selectedView", JSON.stringify(action.payload));
    },
    storeManagePermissions: (state, action) => {
      state.manageProjects = action.payload;
      localStorage.setItem("Manage Projects", JSON.stringify(action.payload));
    },
    storeTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem("Tasks List", JSON.stringify(action.payload));
    },
    storeTabDetails: (state, action) => {
      state.tabDetails = action.payload;
      localStorage.setItem("Project Type Details", [
        JSON.stringify(action.payload),
      ]);
    },
    storeTeamDetails: (state, action) => {
      state.team = action.payload;
      localStorage.setItem("Team", JSON.stringify(action.payload));
    },
  },
});

export const {
  storeData,
  storeView,
  storeManagePermissions,
  storeTasks,
  storeTabDetails,
  storeTeamDetails,
} = storedDataSlice.actions;
export default storedDataSlice.reducer;
