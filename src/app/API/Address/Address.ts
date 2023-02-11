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
  address: "",
};

const address = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
  },
});

export const { setAddress } = address.actions;

export const getAddress = (customerId: any) => async (dispatch: any) => {
  //   var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .get(`/address/${customerId}`)
    .then((res) => {
      if (res.data.length) {
        dispatch(setAddress(res.data[0]));
      } else {
        dispatch(setAddress(""));
      }
      //   updateToast(idToast, getDataSuccess.message, getDataSuccess.type);
    })
    .catch((err) => {
      //   updateToast(idToast, getDataFail.message, getDataFail.type);
    })
    .finally(() => {});
};

export default address.reducer;
