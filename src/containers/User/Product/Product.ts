import { connect } from "react-redux";

import Product from "../../../components/User/Content/Product/Product";

import {
  getProductTypeToShow,
  setSelectedProduct,
  setDetailProduct,
} from "../../../app/API/Product/Product";

const mapStatesToProps = (state: any) => {
  return {
    product: state.product.product,
    selectedProductType: state.product.selectedProductType,
  };
};

const mapActionsToProps = {
  getProductTypeToShow: (detailPTId: any) => getProductTypeToShow(detailPTId),
  setSelectedProduct: (value: any) => setSelectedProduct(value),
  setDetailProduct: (value: any) => setDetailProduct(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(Product);
