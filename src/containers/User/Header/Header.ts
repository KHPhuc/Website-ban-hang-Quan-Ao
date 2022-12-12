import { connect } from "react-redux";

import HeaderAnt from "../../../components/User/Header/Header";

const mapStatesToProps = (state: any) => {
  return {
    device: state.device.device,
  };
};

export default connect(mapStatesToProps, null)(HeaderAnt);
