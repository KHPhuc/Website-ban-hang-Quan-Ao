import { connect } from "react-redux";

import Statistic from "../../../../components/Admin/Content/Statistic/Statistic";

import { setTitle } from "../../../../app/Admin/Header/Header";

const mapStatesToProps = (state: any) => {
  return {};
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(Statistic);
