import { connect } from "react-redux";

import HeaderAnt from "../../components/Header/Header";

const mapStatesToProps = (state: any) => {
  return {
    device: state.device.device,
  };
};

export default connect(mapStatesToProps, null)(HeaderAnt);
