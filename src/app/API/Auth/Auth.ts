import { createSlice } from "@reduxjs/toolkit";
import { setLoadingApp } from "../../Device/Device";
import {
  loadingToast,
  updateToast,
  loginSuccess,
  loginFail,
} from "../../../components/common/Toast/Toast";
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

export const register =
  (name: any, phoneNumber: any, email: any, password: any) =>
  async (dispatch: any) => {
    let data = JSON.stringify({
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    });

    api
      .post("/customer/register", data)
      .then((res) => {
        dispatch(setAuth(res.data));
        dispatch(
          setAccount({
            username: phoneNumber,
            password: password,
          })
        );
      })
      .catch((err) => {})
      .finally(() => {});
  };

export const login =
  (username: string, password: string) => async (dispatch: any) => {
    var idToast = loadingToast("Đang đăng nhập ...");
    let data = JSON.stringify({
      username: username,
      password: password,
    });
    api
      .post("/customer/login", data)
      .then((res) => {
        dispatch(setAuth(res.data));
        dispatch(setAccount(JSON.parse(data)));
        let toast = loginSuccess(res.data.name);
        updateToast(idToast, toast.message, toast.type);
      })
      .catch((err) => {
        // loginFail();
        updateToast(idToast, loginFail.message, loginFail.type);
      })
      .finally(() => {
        dispatch(setLoadingApp(false));
      });
  };

export const logout = () => async (dispatch: any) => {
  dispatch(setAuth(""));
};

export default auth.reducer;
