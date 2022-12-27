import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const sidebar = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebar(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const { setSidebar } = sidebar.actions;

export default sidebar.reducer;
