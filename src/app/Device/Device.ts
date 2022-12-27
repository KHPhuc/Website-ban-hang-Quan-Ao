import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  device: "",
  loadingApp: false,
};

const device = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevice(state, action) {
      state.device = action.payload;
    },
    setLoadingApp(state, action) {
      state.loadingApp = action.payload;
    },
  },
});

export const { setDevice, setLoadingApp } = device.actions;

export default device.reducer;
