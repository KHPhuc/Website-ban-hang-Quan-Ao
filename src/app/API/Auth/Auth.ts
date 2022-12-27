import { createSlice } from "@reduxjs/toolkit";
import { setLoadingApp } from "../../Device/Device";
import api from "../API";

const initialState = {
  auth: "",
  account: "",
};

const auth = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
    setAccount(state, action) {
      state.account = action.payload;
    },
  },
});

export const { setAuth, setAccount } = auth.actions;

export const login =
  (username: string, password: string) => async (dispatch: any) => {
    let data = JSON.stringify({
      username: username,
      password: password,
    });
    api
      .post("/customer/login", data)
      .then((res) => {
        dispatch(setAuth(res.data));
        dispatch(setAccount(JSON.parse(data)));
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(setLoadingApp(false));
      });
  };

export const logout = () => async (dispatch: any) => {
  dispatch(setAuth(""));
};

export default auth.reducer;
