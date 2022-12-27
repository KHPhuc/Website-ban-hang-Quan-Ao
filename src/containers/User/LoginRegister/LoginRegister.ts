import { connect } from "react-redux";

import LoginRegister from "../../../components/User/Content/LoginRegister/LoginRegister";
import { login } from "../../../app/API/Auth/Auth";

const mapStatesToProps = (state: any) => {
  return {
    // device: state.device.device,
  };
};

const mapActionsToProps = {
  login: (username: any, password: any) => login(username, password),
};

export default connect(mapStatesToProps, mapActionsToProps)(LoginRegister);
