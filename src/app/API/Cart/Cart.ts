import { createSlice } from "@reduxjs/toolkit";
import api from "../API";
import {
  loadingToast,
  addSuccess,
  addFail,
  updateToast,
  getDataSuccess,
  getDataFail,
  updateSuccess,
  updateFail,
  deleteSuccess,
  deleteFail,
} from "../../../components/common/Toast/Toast";

const initialState = {
  cart: [],
  addStatus: "",
  detailCart: "",
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    setAddStatus(state, action) {
      state.addStatus = action.payload;
    },
    setDetailCart(state, action) {
      state.detailCart = action.payload;
    },
  },
});

export const { setCart, setAddStatus, setDetailCart } = cart.actions;

export const getCart = (customerId: any) => async (dispatch: any) => {
  api
    .get(`/cart/${customerId}`)
    .then((res) => {
      dispatch(setCart(res.data));
    })
    .catch((err) => {})
    .finally(() => {});
};

export const getDetailCart = (customerId: any) => async (dispatch: any) => {
  api
    .get(`/cart/get_detail_cart/${customerId}`)
    .then((res) => {
      dispatch(setDetailCart(res.data));
      dispatch(getCart(customerId));
    })
    .catch((err) => {})
    .finally(() => {});
};

// use: user
export const addCart = (data: any) => async (dispatch: any) => {
  api
    .post("/cart/create", JSON.stringify(data))
    .then((res) => {
      dispatch(setAddStatus(false));
      dispatch(setCart(res.data));
    })
    .catch((err) => {
      dispatch(setAddStatus(false));
    });
};

export const updateCart = (data: any) => async (dispatch: any) => {
  api
    .put("/cart/update", JSON.stringify(data))
    .then((res) => {
      dispatch(setDetailCart(res.data));
      dispatch(getCart(data.customerId));
    })
    .catch((err) => {});
};

export const deleteCart = (data: any) => async (dispatch: any) => {
  api
    .post(`/cart/delete`, JSON.stringify(data))
    .then((res) => {
      dispatch(setDetailCart(res.data));
      dispatch(getCart(data.customerId));
    })
    .catch((err) => {});
};

export default cart.reducer;
