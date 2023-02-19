import { connect } from "react-redux";

import Product from "../../../components/User/Content/Product/Product";

import {
  setSelectedProduct,
} from "../../../app/API/Product/Product";

const mapStatesToProps = (state: any) => {
  return {
    selectedProductType: state.product.selectedProductType,
  };
};

const mapActionsToProps = {
  setSelectedProduct: (value: any) => setSelectedProduct(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(Product);
