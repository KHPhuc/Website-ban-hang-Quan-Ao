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
  allProductType: "",
  productType: "",
  detailProductType: "",
};

const productType = createSlice({
  name: "productType",
  initialState,
  reducers: {
    setProductType(state, action) {
      state.productType = action.payload;
    },
    setDetailProductType(state, action) {
      state.detailProductType = action.payload;
    },
    setAllProductType(state, action) {
      state.allProductType = action.payload;
    }
  },
});

export const { setProductType, setDetailProductType, setAllProductType } = productType.actions;

export const getProductType = () => async (dispatch: any) => {
  // var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .get("/product_type")
    .then((res) => {
      if (res.data.length) {
        dispatch(setProductType(res.data));
      } else {
        dispatch(setProductType(""));
      }
      // updateToast(idToast, getDataSuccess.message, getDataSuccess.type);
    })
    .catch((err) => {
      // updateToast(idToast, getDataFail.message, getDataFail.type);
    })
    .finally(() => {});
};

export const getAllProductType = () => async (dispatch:any) => {
  // var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .get("/product_type/all")
    .then((res) => {
      if (res.data.length) {
        dispatch(setAllProductType(res.data));
      } else {
        dispatch(setAllProductType(""));
      }
      // updateToast(idToast, getDataSuccess.message, getDataSuccess.type);
    })
    .catch((err) => {
      // updateToast(idToast, getDataFail.message, getDataFail.type);
    })
    .finally(() => {});
}


export const getAllProductTypeNoNoti = () => async (dispatch:any) => {
  api
    .get("/product_type/all")
    .then((res) => {
      if (res.data.length) {
        dispatch(setAllProductType(res.data));
      } else {
        dispatch(setAllProductType(""));
      }
    })
    .catch((err) => {
    })
    .finally(() => {});
}

export const addProductType =
  (productTypeName: any) => async (dispatch: any) => {
    var idToast = loadingToast("Đang thêm ...");
    let data = JSON.stringify({
      productTypeName: productTypeName,
    });
    api
      .post(`/product_type/create`, data)
      .then((res) => {
        updateToast(idToast, addSuccess.message, addSuccess.type);
        dispatch(setProductType(res.data));
      })
      .catch((err) => {
        let toast = addFail(err.data.message);
        updateToast(idToast, toast.message, toast.type);
      })
      .finally(() => {});
  };

export const updateProductType =
  (productTypeId: any, productTypeName: any) => async (dispatch: any) => {
    var idToast = loadingToast("Đang cập nhật ...");
    let data = JSON.stringify({
      productTypeName: productTypeName,
    });
    api
      .put(`product_type/update/${productTypeId}`, data)
      .then((res) => {
        updateToast(idToast, updateSuccess.message, updateSuccess.type);
        dispatch(setProductType(res.data));
      })
      .catch((err) => {
        let toast = updateFail(err.data.message);
        updateToast(idToast, toast.message, toast.type);
      })
      .finally(() => {});
  };

export const deleteProductType =
  (productTypeId: any) => async (dispatch: any) => {
    var idToast = loadingToast("Đang xóa ...");
    api
      .delete(`/product_type/delete/${productTypeId}`)
      .then((res) => {
        updateToast(idToast, deleteSuccess.message, deleteSuccess.type);
        dispatch(setProductType(res.data));
      })
      .catch((err) => {
        let toast = deleteFail(err.data.message);
        updateToast(idToast, toast.message, toast.type);
      })
      .finally(() => {});
  };

export const getDetailProductType =
  (productTypeId: any) => async (dispatch: any) => {
    // var idToast = loadingToast("Đang tải dữ liệu ...");
    api
      .get(`/detail_product_type/${productTypeId}`)
      .then((res) => {
        if (res.data.length) {
          dispatch(setDetailProductType(res.data));
        } else {
          dispatch(setDetailProductType(""));
        }
        // updateToast(idToast, getDataSuccess.message, getDataSuccess.type);
      })
      .catch((err) => {
        // updateToast(idToast, getDataFail.message, getDataFail.type);
      })
      .finally(() => {});
  };

export const addDetailProductType =
  (detailPTName: any, productTypeId: any) => async (dispatch: any) => {
    var idToast = loadingToast("Đang thêm ...");
    let data = JSON.stringify({
      detailPTName: detailPTName,
      productTypeId: productTypeId,
    });
    api
      .post(`/detail_product_type/create`, data)
      .then((res) => {
        updateToast(idToast, addSuccess.message, addSuccess.type);
        dispatch(setDetailProductType(res.data));
      })
      .catch((err) => {
        let toast = addFail(err.data.message);
        updateToast(idToast, toast.message, toast.type);
      })
      .finally(() => {});
  };

export const updateDetailProductType =
  (detailPTId: any, detailPTName: any) => async (dispatch: any) => {
    var idToast = loadingToast("Đang cập nhật ...");
    let data = JSON.stringify({
      detailPTName: detailPTName,
    });
    api
      .put(`/detail_product_type/update/${detailPTId}`, data)
      .then((res) => {
        updateToast(idToast, updateSuccess.message, updateSuccess.type);
        dispatch(setDetailProductType(res.data));
      })
      .catch((err) => {
        let toast = updateFail(err.data.message);
        updateToast(idToast, toast.message, toast.type);
      })
      .finally(() => {});
  };

export const deleteDetailProductType =
  (detailPTId: any) => async (dispatch: any) => {
    var idToast = loadingToast("Đang xóa ...");
    api
      .delete(`/detail_product_type/delete/${detailPTId}`)
      .then((res) => {
        updateToast(idToast, deleteSuccess.message, deleteSuccess.type);
        dispatch(setDetailProductType(res.data));
      })
      .catch((err) => {
        let toast = deleteFail(err.data.message);
        updateToast(idToast, toast.message, toast.type);
      })
      .finally(() => {});
  };

export default productType.reducer;
