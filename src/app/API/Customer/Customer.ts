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
  changePasswordSuccess,
  changePasswordFail,
  updateInfoSuccess,
  updateInfoFail,
} from "../../../components/common/Toast/Toast";
import { setAccount, setAuth } from "../Auth/Auth";

const initialState = {
  customer: "",
  addStatus: "",
  info: "",
  address: "",
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
    setInfo(state, action) {
      state.info = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
  },
});

export const { setCustomer, setAddStatus, setInfo, setAddress } =
  customer.actions;

export const getCustomer = (page:any) => async (dispatch: any) => {
  // var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .get(`/customer/${page}`)
    .then((res) => {
      if (res.data.length) {
        dispatch(setCustomer(res.data));
      } else {
        dispatch(setCustomer(""));
      }
      // updateToast(idToast, getDataSuccess.message, getDataSuccess.type);
    })
    .catch((err) => {
      // updateToast(idToast, getDataFail.message, getDataFail.type);
    })
    .finally(() => {});
};

export const getInfo = (customerId: any) => async (dispatch: any) => {
  api
    .get(`/customer/info/${customerId}`)
    .then((res) => {
      dispatch(setInfo(res.data));
    })
    .catch((err) => {})
    .finally(() => {});
};

export const updateInfo = (info: any, cId: any) => async (dispatch: any) => {
  // var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .post(`/customer/updateInfo/${cId}`, JSON.stringify(info))
    .then((res) => {
      dispatch(setAuth(res.data));
      // updateToast(idToast, updateInfoSuccess.message, updateInfoSuccess.type);
    })
    .catch((err) => {
      // updateToast(idToast, updateInfoFail.message, updateInfoFail.type);
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

export const changePassword =
  (newPassword: any, customerId: any, username: any) =>
  async (dispatch: any) => {
    var idToast = loadingToast("Đang thêm ...");
    var data = {
      newPassword: newPassword,
      customerId: customerId,
    };
    api
      .post(`/customer/changePassword`, JSON.stringify(data))
      .then((res) => {
        dispatch(
          setAccount({
            username: username,
            password: newPassword,
          })
        );
        updateToast(
          idToast,
          changePasswordSuccess.message,
          changePasswordSuccess.type
        );
      })
      .catch((err) => {
        updateToast(
          idToast,
          changePasswordFail.message,
          changePasswordFail.type
        );
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

export const getAddress = (customerId: any) => async (dispatch: any) => {
  api
    .get(`/customer/address/${customerId}`)
    .then((res) => {
      dispatch(setAddress(res.data));
    })
    .catch((err) => {})
    .finally(() => {});
};

export default customer.reducer;
