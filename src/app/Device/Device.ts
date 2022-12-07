import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  device: "",
};

const device = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevice(state, action) {
      state.device = action.payload;
    },
  },
});

export const { setDevice } = device.actions;

export default device.reducer;
