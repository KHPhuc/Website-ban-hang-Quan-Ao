import { connect } from "react-redux";

import DetailProduct from "../../../components/User/Content/DetailProduct/DetailProduct";

import {
  //   getProductByUrl,
  setDetailProduct,
  setLoadingGetDetailProduct,
} from "../../../app/API/Product/Product";

import { setCart, addCart } from "../../../app/API/Cart/Cart";

const mapStatesToProps = (state: any) => {
  return {
    auth: state.auth.auth,
    detailProduct: state.product.detailProduct,
    loadingGetDetailProduct: state.product.loadingGetDetailProduct,
    selectedProduct: state.product.selectedProduct,

    cart: state.cart.cart,
  };
};

const mapActionsToProps = {
  //   getProductByUrl: (linkProduct: any) => getProductByUrl(linkProduct),
  setDetailProduct: (value: any) => setDetailProduct(value),
  setLoadingGetDetailProduct: (value: any) => setLoadingGetDetailProduct(value),
  setCart: (value: any) => setCart(value),
  addCart: (value: any) => addCart(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(DetailProduct);
