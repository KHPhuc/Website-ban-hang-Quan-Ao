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
  customer: "",
  addStatus: "",
};

const customer = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer(state, action) {
      state.customer = action.payload;
    },
    setAddStatus(state, action) {
      state.addStatus = action.payload;
    },
  },
});

export const { setCustomer, setAddStatus } = customer.actions;

export const getCustomer = () => async (dispatch: any) => {
  var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .get("/customer")
    .then((res) => {
      if (res.data.length) {
        dispatch(setCustomer(res.data));
      } else {
        dispatch(setCustomer(""));
      }
      updateToast(idToast, getDataSuccess.message, getDataSuccess.type);
    })
    .catch((err) => {
      updateToast(idToast, getDataFail.message, getDataFail.type);
    })
    .finally(() => {});
};

export const createCustomer = (customer: any) => async (dispatch: any) => {
  var idToast = loadingToast("Đang thêm ...");
  api
    .post(`/customer/create`, JSON.stringify(customer))
    .then((res) => {
      dispatch(setAddStatus(true));
      dispatch(setCustomer(res.data));
      updateToast(idToast, addSuccess.message, addSuccess.type);
    })
    .catch((err) => {
      dispatch(setAddStatus(false));
      let toast = addFail(err.data.message);
      updateToast(idToast, toast.message, toast.type);
    })
    .finally(() => {});
};

export const banCustomer = (customerId: any) => async (dispatch: any) => {
  var idToast = loadingToast("Đang cấm ...");
  api
    .put(`/customer/ban/${customerId}`)
    .then((res) => {
      dispatch(setCustomer(res.data));
      updateToast(idToast, "Cấm thành công!", addSuccess.type);
    })
    .catch((err) => {
      updateToast(idToast, "Cấm thất bại!", "error");
    })
    .finally(() => {});
};

export const unBanCustomer = (customerId: any) => async (dispatch: any) => {
  var idToast = loadingToast("Đang cấm ...");
  api
    .put(`/customer/unBan/${customerId}`)
    .then((res) => {
      dispatch(setCustomer(res.data));
      updateToast(idToast, "Bỏ cấm thành công!", addSuccess.type);
    })
    .catch((err) => {
      updateToast(idToast, "Bỏ cấm thất bại!", "error");
    })
    .finally(() => {});
};

export default customer.reducer;
