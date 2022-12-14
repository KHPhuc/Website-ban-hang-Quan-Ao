import { connect } from "react-redux";

import Home from "../../../components/User/Content/Home/Home";

const mapStatesToProps = (state: any) => {
  return {
    // device: state.device.device,
  };
};

export default connect(mapStatesToProps, null)(Home);
