import { connect } from "react-redux";

import Cart from "../../../components/User/Content/Cart/Cart";

import { getPaymentUser } from "../../../app/API/Payment/Payment";
import { getDetailCart, getCart } from "../../../app/API/Cart/Cart";
import { getAddress } from "../../../app/API/Address/Address";
import { createOrder } from "../../../app/API/Order/Order";
import { setLinkToPay } from "../../../app/API/Order/Order";
import { updateCart, deleteCart } from "../../../app/API/Cart/Cart";

const mapStatesToProps = (state: any) => {
  return {
    auth: state.auth.auth,
    cart: state.cart.cart,
    detailCart: state.cart.detailCart,

    payment: state.payment.payment,
    address: state.address.address,

    linkToPay: state.order.linkToPay,
  };
};

const mapActionsToProps = {
  getPaymentUser: () => getPaymentUser(),
  getDetailCart: (customerId: any) => getDetailCart(customerId),
  getAddress: (custormerId: any) => getAddress(custormerId),
  createOrder: (data: any) => createOrder(data),
  setLinkToPay: (value: any) => setLinkToPay(value),
  updateCart: (data: any) => updateCart(data),
  deleteCart: (data: any) => deleteCart(data),
  getCart: (customerId: any) => getCart(customerId),
};

export default connect(mapStatesToProps, mapActionsToProps)(Cart);
