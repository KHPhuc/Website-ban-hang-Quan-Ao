import { connect } from "react-redux";

import App from "../App";
import { setDevice } from "../app/Device/Device";

const mapStatesToProps = (state: any) => {
  return {};
};

const mapActionsToProps = {
  setDevice: (value: any) => setDevice(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(App);
