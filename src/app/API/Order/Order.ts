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

// use: admin
export const getAllOrder = (value: any) => async (dispatch: any) => {
  var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .post("/order", JSON.stringify(value))
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

// use: admin
export const updateOrder = (value: any) => async (dispatch: any) => {
  var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .post("/order/updateOrder", JSON.stringify(value))
    .then((res) => {
      if (res.data.length) {
        dispatch(setOrder(res.data));
      } else {
        dispatch(setOrder(""));
      }
      updateToast(idToast, updateSuccess.message, updateSuccess.type);
    })
    .catch((err) => {
      updateToast(idToast, updateFail("").message, updateFail("").type);
    })
    .finally(() => {});
};

// use: user
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

// use: user
export const cancelOrder = (value: any) => {
  return new Promise((resolve, reject) => {
    api
      .post("/order/cancelOrder", JSON.stringify(value))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      })
      .finally(() => {});
  });
};

// use: user
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
