import { connect } from "react-redux";

import Cart from "../../../../components/Admin/Content/Cart/Cart";

import { setTitle } from "../../../../app/Admin/Header/Header";

const mapStatesToProps = (state: any) => {
  return {};
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(Cart);
