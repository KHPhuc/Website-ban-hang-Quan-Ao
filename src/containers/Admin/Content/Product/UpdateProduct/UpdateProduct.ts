import { connect } from "react-redux";

import UpdateProduct from "../../../../../components/Admin/Content/Product/UpdateProduct/UpdateProduct";

import {
  updateProduct,
  setUpdateStatus,
} from "../../../../../app/API/Product/Product";

const mapStatesToProps = (state: any) => {
  return {
    updateStatus: state.product.updateStatus,
  };
};

const mapActionsToProps = {
  updateProduct: (productId: any, product: any) =>
    updateProduct(productId, product),
  setUpdateStatus: (value: any) => setUpdateStatus(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(UpdateProduct);
