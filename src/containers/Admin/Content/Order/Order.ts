import { connect } from "react-redux";

import Order from "../../../../components/Admin/Content/Order/Order";

import { setTitle } from "../../../../app/Admin/Header/Header";

import { getAllOrder } from "../../../../app/API/Order/Order";

const mapStatesToProps = (state: any) => {
  return {
    order: state.order.order,
  };
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
  getAllOrder: () => getAllOrder(),
};

export default connect(mapStatesToProps, mapActionsToProps)(Order);
