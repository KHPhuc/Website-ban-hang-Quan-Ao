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
  updateStatus: "",
  payment: "",
};

const payment = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setUpdateStatus(state, action) {
      state.updateStatus = action.payload;
    },
    setPayment(state, action) {
      state.payment = action.payload;
    },
  },
});

export const { setPayment, setUpdateStatus } = payment.actions;

export const getPaymentUser = () => async (dispatch: any) => {
  api
    .get("/payment/getForUser")
    .then((res) => {
      if (res.data.length) {
        dispatch(setPayment(res.data));
      } else {
        dispatch(setPayment(""));
      }
    })
    .catch((err) => {})
    .finally(() => {});
};

export const getPayment = () => async (dispatch: any) => {
  var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .get("/payment")
    .then((res) => {
      if (res.data.length) {
        dispatch(setPayment(res.data));
      } else {
        dispatch(setPayment(""));
      }
      updateToast(idToast, getDataSuccess.message, getDataSuccess.type);
    })
    .catch((err) => {
      updateToast(idToast, getDataFail.message, getDataFail.type);
    })
    .finally(() => {});
};

export const updatePayment =
  (paymentId: any, payment: any) => async (dispatch: any) => {
    var idToast = loadingToast("Đang cập nhật ...");
    api
      .put(`/payment/update/${paymentId}`, JSON.stringify(payment))
      .then((res) => {
        dispatch(setPayment(res.data));
        updateToast(idToast, updateSuccess.message, updateSuccess.type);
      })
      .catch((err) => {
        let toast = updateFail(err.data.message);
        updateToast(idToast, toast.message, toast.type);
      })
      .finally(() => {});
  };

export default payment.reducer;
