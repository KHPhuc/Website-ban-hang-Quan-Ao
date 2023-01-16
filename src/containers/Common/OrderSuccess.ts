import { connect } from "react-redux";

import PageOrderSuccess from "../../components/Result/PageOrderSuccess/PagePaySuccess";
import { getCart } from "../../app/API/Cart/Cart";

const mapStatesToProps = (state: any) => {
  return {
    auth: state.auth.auth,
  };
};

const mapActionsToProps = {
  getCart: (customerId: any) => getCart(customerId),
};

export default connect(mapStatesToProps, mapActionsToProps)(PageOrderSuccess);
