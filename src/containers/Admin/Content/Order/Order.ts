import { connect } from "react-redux";

import Order from "../../../../components/Admin/Content/Order/Order";

import { setTitle } from "../../../../app/Admin/Header/Header";

const mapStatesToProps = (state: any) => {
  return {};
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(Order);
