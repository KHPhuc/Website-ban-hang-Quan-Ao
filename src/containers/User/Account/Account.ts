import { connect } from "react-redux";

import Account from "../../../components/User/Content/Account/Account";
import { logout } from "../../../app/API/Auth/Auth";

// const mapStatesToProps = (state: any) => {
//   return {
//     auth: state.auth.auth,
//     cart: state.cart.cart,
//     detailCart: state.cart.detailCart,

//     payment: state.payment.payment,
//     address: state.address.address,

//     linkToPay: state.order.linkToPay,
//   };
// };

const mapActionsToProps = {
  logout: () => logout(),
};

export default connect(null, mapActionsToProps)(Account);
