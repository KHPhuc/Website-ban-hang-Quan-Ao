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
import { toast } from "react-toastify";

const initialState = {
  linkToPay: "",
  order: "",
  orderCustomer: "",
};

const customer = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
    },
    setLinkToPay(state, action) {
      state.linkToPay = action.payload;
    },
    setOrderCustomer(state, action) {
      state.orderCustomer = action.payload;
    },
  },
});

export const { setOrder, setLinkToPay, setOrderCustomer } = customer.actions;

export const getAllOrder = () => async (dispatch: any) => {
  var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .get("/order")
    .then((res) => {
      if (res.data.length) {
        dispatch(setOrder(res.data));
      } else {
        dispatch(setOrder(""));
      }
      updateToast(idToast, getDataSuccess.message, getDataSuccess.type);
    })
    .catch((err) => {
      updateToast(idToast, getDataFail.message, getDataFail.type);
    })
    .finally(() => {});
};

export const createOrder = (data: any) => async (dispatch: any) => {
  // var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .post("/order/create", JSON.stringify(data))
    .then((res) => {
      dispatch(setLinkToPay(res.data));
      // if (res.data.length) {
      //   dispatch(setOrder(res.data));
      // } else {
      //   dispatch(setOrder(""));
      // }
      // updateToast(idToast, getDataSuccess.message, getDataSuccess.type);
    })
    .catch((err) => {
      // updateToast(idToast, getDataFail.message, getDataFail.type);
      toast.error("Có lỗi. Vui lòng thử lại!", { containerId: "CT" });
    })
    .finally(() => {});
};

export const getOrderForCustomer = (data: any) => async (dispatch: any) => {
  // dispatch(setOrderCustomer(""));
  return new Promise((resolve, reject) => {
    api
      .post("/order/orders", JSON.stringify(data))
      .then((res) => {
        // dispatch(setOrderCustomer(res.data));
        resolve(res.data);
      })
      .catch((err) => {})
      .finally(() => {});
  });
};

export default customer.reducer;
