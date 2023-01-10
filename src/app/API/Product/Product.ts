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
  updateToastNoStop,
} from "../../../components/common/Toast/Toast";
import FileDownload from "js-file-download";

const initialState = {
  addStatus: "",
  updateStatus: "",
  product: "",
};

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAddStatus(state, action) {
      state.addStatus = action.payload;
    },
    setUpdateStatus(state, action) {
      state.updateStatus = action.payload;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
  },
});

export const { setProduct, setAddStatus, setUpdateStatus } = product.actions;

export const uploadImage = (file: any) => {
  return new Promise((res, rej) => {
    api
      .post("/detail_product/uploadImage", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((dt) => {
        res(dt.data);
      })
      .catch((err) => {
        rej(err);
      })
      .finally(() => {});
  });
};

export const deleteImage = (name: any) => {
  let data = JSON.stringify({
    nameFile: name,
  });
  api
    .post("/detail_product/deleteImage", data)
    .then((dt) => {})
    .catch((err) => {})
    .finally(() => {});
};

// export const getExcelPT = () => {
//   api
//     .get("/product_type/getExcel", { responseType: "blob" })
//     .then((res) => {
//       FileDownload(res.data, "Product Type.xlsx");
//     })
//     .catch((err) => {})
//     .finally(() => {});
// };

export const getProduct = () => async (dispatch: any) => {
  var idToast = loadingToast("Đang tải dữ liệu ...");
  api
    .get("/product")
    .then((res) => {
      if (res.data.length) {
        dispatch(setProduct(res.data));
      } else {
        dispatch(setProduct(res.data));
      }
      updateToast(idToast, getDataSuccess.message, getDataSuccess.type);
    })
    .catch((err) => {
      updateToast(idToast, getDataFail.message, getDataFail.type);
    })
    .finally(() => {});
};

export const addProduct = (product: any) => async (dispatch: any) => {
  var idToast = loadingToast("Đang thêm ...");
  api
    .post(`/product/create`, JSON.stringify(product))
    .then((res) => {
      updateToast(idToast, addSuccess.message, addSuccess.type);
      dispatch(setProduct(res.data));
      dispatch(setAddStatus("success"));
    })
    .catch((err) => {
      let toast = addFail(err.data.message);
      updateToast(idToast, toast.message, toast.type);
      dispatch(setAddStatus("fail"));
    })
    .finally(() => {});
};

export const addProductByExcel = (product: any) => {
  var idToast = loadingToast("Đang thêm ...");
  var promises = product.map((e: any, i: any) => {
    return new Promise((resolve, rej) => {
      api
        .post(`/product/create`, JSON.stringify(e))
        .then((res) => {
          // updateToast(idToast, addSuccess.message, addSuccess.type);
          updateToastNoStop(idToast, (i + 1) / product.length, "success");
          // dispatch(setAddStatus("success"));
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          rej(err);
          // let toast = addFail(err.data.message);
          // updateToast(idToast, toast.message, toast.type);
          // dispatch(setAddStatus("fail"));
        })
        .finally(() => {});
    });
  });

  Promise.all(promises)
    .then((res) => {
      updateToast(idToast, addSuccess.message, addSuccess.type);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateProduct =
  (productId: any, product: any) => async (dispatch: any) => {
    var idToast = loadingToast("Đang cập nhật ...");
    api
      .put(`product/update/${productId}`, JSON.stringify(product))
      .then((res) => {
        updateToast(idToast, updateSuccess.message, updateSuccess.type);
        dispatch(setUpdateStatus(true));
        dispatch(setProduct(res.data));
      })
      .catch((err) => {
        let toast = updateFail(err.data.message);
        dispatch(setUpdateStatus(false));
        updateToast(idToast, toast.message, toast.type);
      })
      .finally(() => {});
  };

export const deleteProduct =
  (productId: any) => async (dispatch: any) => {
    var idToast = loadingToast("Đang xóa ...");
    api
      .delete(`/product/delete/${productId}`)
      .then((res) => {
        updateToast(idToast, deleteSuccess.message, deleteSuccess.type);
        dispatch(setProduct(res.data));
      })
      .catch((err) => {
        let toast = deleteFail(err.data.message);
        updateToast(idToast, toast.message, toast.type);
      })
      .finally(() => {});
  };

export const deleteDetailProduct =
  (detailProductId: any) => async (dispatch: any) => {
    var idToast = loadingToast("Đang xóa ...");
    api
      .delete(`/detail_product/delete/${detailProductId}`)
      .then((res) => {
        updateToast(idToast, deleteSuccess.message, deleteSuccess.type);
        dispatch(setProduct(res.data));
      })
      .catch((err) => {
        let toast = deleteFail(err.data.message);
        updateToast(idToast, toast.message, toast.type);
      })
      .finally(() => {});
  };



export default product.reducer;