import { connect } from "react-redux";

import HeaderAnt from "../../../components/User/Header/Header";

import { logout } from "../../../app/API/Auth/Auth";
import { getAllProductTypeNoNoti } from "../../../app/API/ProductType/ProductType";
import { setSelectedProductType } from "../../../app/API/Product/Product";
import { setCart, setDetailCart } from "../../../app/API/Cart/Cart";

const mapStatesToProps = (state: any) => {
  return {
    device: state.device.device,
    auth: state.auth.auth,
    allProductType: state.productType.allProductType,
    cart: state.cart.cart,
  };
};

const mapActionsToProps = {
  logout: () => logout(),
  getAllProductType: () => getAllProductTypeNoNoti(),
  setSelectedProductType: (value: any) => setSelectedProductType(value),
  setCart: (value: any) => setCart(value),
  setDetailCart: (value: any) => setDetailCart(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(HeaderAnt);
