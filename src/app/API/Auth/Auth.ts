import { createSlice } from "@reduxjs/toolkit";
import { setLoadingApp } from "../../Device/Device";
import {
  loadingToast,
  updateToast,
  loginSuccess,
  loginFail,
  registerSuccess,
  registerFail,
  logoutToast,
} from "../../../components/common/Toast/Toast";
import api from "../API";
import { getCart } from "../Cart/Cart";

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
    var idToast = loadingToast("Đang đăng ký ...");
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
        let toast = registerSuccess(res.data.name);
        updateToast(idToast, toast.message, toast.type);
        localStorage.removeItem("cart");
      })
      .catch((err) => {
        let toast = registerFail(err.data.message);
        updateToast(idToast, toast.message, toast.type);
      })
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
        localStorage.removeItem("cart");
        dispatch(getCart(res.data.id));
      })
      .catch((err) => {
        updateToast(idToast, loginFail.message, loginFail.type);
      })
      .finally(() => {});
  };

export const logout = () => async (dispatch: any) => {
  dispatch(setAuth(""));
  var idToast = loadingToast("Đăng xuất ...");
  updateToast(idToast, logoutToast.message, logoutToast.type);
};

export default auth.reducer;
