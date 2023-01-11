import { connect } from "react-redux";

import UpdateDetailProduct from "../../../../../components/Admin/Content/Product/UpdateDetailProduct/UpdateDetailProduct";

import {
  updateDetailProduct,
  updateAndDeleteDetailProduct,
  setUpdateStatus,
} from "../../../../../app/API/Product/Product";

const mapStatesToProps = (state: any) => {
  return {
    updateStatus: state.product.updateStatus,
  };
};

const mapActionsToProps = {
  updateDetailProduct: (detailProduct: any) =>
    updateDetailProduct(detailProduct),
  updateAndDeleteDetailProduct: (detailProduct: any) =>
    updateAndDeleteDetailProduct(detailProduct),
  setUpdateStatus: (value: any) => setUpdateStatus(value),
};

export default connect(
  mapStatesToProps,
  mapActionsToProps
)(UpdateDetailProduct);
