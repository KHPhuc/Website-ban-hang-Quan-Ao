import { connect } from "react-redux";

import Home from "../../../components/User/Content/Home/Home";

import {
  getProductToShow,
  setSelectedProduct,
  setDetailProduct
} from "../../../app/API/Product/Product";

const mapStatesToProps = (state: any) => {
  return {
    product: state.product.product,
  };
};

const mapActionsToProps = {
  getProductToShow: () => getProductToShow(),
  setSelectedProduct: (value: any) => setSelectedProduct(value),
  setDetailProduct: (value: any) => setDetailProduct(value)
};

export default connect(mapStatesToProps, mapActionsToProps)(Home);
