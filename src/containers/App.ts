import { connect } from "react-redux";

import App from "../App";
import { setDevice } from "../app/Device/Device";
import { login } from "../app/API/Auth/Auth";

import { setCart } from "../app/API/Cart/Cart";

const mapStatesToProps = (state: any) => {
  return {
    auth: state.auth.auth,
    account: state.auth.account,
    cart: state.cart.cart,
  };
};

const mapActionsToProps = {
  setDevice: (value: any) => setDevice(value),
  login: (username: any, password: any) => login(username, password),
  setCart: (value: any) => setCart(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(App);
