import { connect } from "react-redux";

import Orders from "../../../../components/User/Content/Account/Orders/Orders";
import { getOrderForCustomer } from "../../../../app/API/Order/Order";

const mapStatesToProps = (state: any) => {
  return {
    auth: state.auth.auth,
    orders: state.order.orderCustomer,
  };
};

const mapActionsToProps = {
  getOrderForCustomer: (value: any) => getOrderForCustomer(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(Orders);
