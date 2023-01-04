import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
};

const header = createSlice({
  name: "header",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = header.actions;

export default header.reducer;
