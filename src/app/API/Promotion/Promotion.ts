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
  addStatus: "",
  updateStatus: "",
  promotion: "",
};

const promotion = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    setAddStatus(status, action) {
      status.addStatus = action.payload;
    },
    setUpdateStatus(status, action) {
      status.updateStatus = action.payload;
    },
    setPromotion(state, action) {
      state.promotion = action.payload;
    },
  },
});

export const { setPromotion, setAddStatus, setUpdateStatus } =
  promotion.actions;

export const getPromotion = () => async (dispatch: any) => {
  var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .get("/promotion")
    .then((res) => {
      if (res.data.length) {
        dispatch(setPromotion(res.data));
      } else {
        dispatch(setPromotion(""));
      }
      updateToast(idToast, getDataSuccess.message, getDataSuccess.type);
    })
    .catch((err) => {
      updateToast(idToast, getDataFail.message, getDataFail.type);
    })
    .finally(() => {});
};

export const createPromotion = (promotion: any) => async (dispatch: any) => {
  var idToast = loadingToast("Đang thêm ...");
  api
    .post("/promotion/create", JSON.stringify(promotion))
    .then((res) => {
      console.log(res.data);
      dispatch(setPromotion(res.data));
      updateToast(idToast, addSuccess.message, addSuccess.type);
      dispatch(setAddStatus(true));
    })
    .catch((err) => {
      let toast = addFail(err.data.message);
      updateToast(idToast, toast.message, toast.type);
      dispatch(setAddStatus(false));
    })
    .finally(() => {});
};

export const updatePromotion =
  (promotionId: any, promotion: any) => async (dispatch: any) => {
    var idToast = loadingToast("Đang cập nhật ...");
    api
      .put(`/promotion/update/${promotionId}`, JSON.stringify(promotion))
      .then((res) => {
        dispatch(setPromotion(res.data));
        updateToast(idToast, updateSuccess.message, updateSuccess.type);
        dispatch(setAddStatus(true));
      })
      .catch((err) => {
        let toast = updateFail(err.data.message);
        updateToast(idToast, toast.message, toast.type);
        dispatch(setAddStatus(false));
      })
      .finally(() => {});
  };

export const updateAndDeletePromotion =
  (promotionId: any, promotion: any) => async (dispatch: any) => {
    var idToast = loadingToast("Đang cập nhật ...");
    api
      .post(
        `/promotion/updateAndDelete/${promotionId}`,
        JSON.stringify(promotion)
      )
      .then((res) => {
        dispatch(setPromotion(res.data));
        updateToast(idToast, updateSuccess.message, updateSuccess.type);
        dispatch(setAddStatus(true));
      })
      .catch((err) => {
        let toast = updateFail(err.data.message);
        updateToast(idToast, toast.message, toast.type);
        dispatch(setAddStatus(false));
      })
      .finally(() => {});
  };

export default promotion.reducer;
