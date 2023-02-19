import { connect } from "react-redux";

import DetailProduct from "../../../components/User/Content/DetailProduct/DetailProduct";

import { setCart, addCart } from "../../../app/API/Cart/Cart";

const mapStatesToProps = (state: any) => {
  return {
    auth: state.auth.auth,
    selectedProduct: state.product.selectedProduct,
    cart: state.cart.cart,
  };
};

const mapActionsToProps = {
  setCart: (value: any) => setCart(value),
  addCart: (value: any) => addCart(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(DetailProduct);
