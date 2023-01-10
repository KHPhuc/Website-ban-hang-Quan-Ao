import { connect } from "react-redux";

import LoginRegister from "../../../components/User/Content/LoginRegister/LoginRegister";
import { login, register } from "../../../app/API/Auth/Auth";

const mapStatesToProps = (state: any) => {
  return {
    // device: state.device.device,
    auth: state.auth.auth,
    account: state.auth.account,
  };
};

const mapActionsToProps = {
  login: (username: any, password: any) => login(username, password),
  register: (name: any, phoneNumber: any, email: any, password: any) =>
    register(name, phoneNumber, email, password),
};

export default connect(mapStatesToProps, mapActionsToProps)(LoginRegister);
