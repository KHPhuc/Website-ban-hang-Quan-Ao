import { connect } from "react-redux";

import Order from "../../../../components/Admin/Content/Order/Order";

import { setTitle } from "../../../../app/Admin/Header/Header";

import { getAllOrder, updateOrder } from "../../../../app/API/Order/Order";

const mapStatesToProps = (state: any) => {
  return {
    order: state.order.order,
  };
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
  getAllOrder: (value: any) => getAllOrder(value),
  updateOrder: (value: any) => updateOrder(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(Order);
