import { connect } from "react-redux";

import HeaderAnt from "../../../components/User/Header/Header";

import { logout } from "../../../app/API/Auth/Auth";

const mapStatesToProps = (state: any) => {
  return {
    device: state.device.device,
    auth: state.auth.auth,
  };
};

const mapActionsToProps = {
  logout: () => logout(),
};

export default connect(mapStatesToProps, mapActionsToProps)(HeaderAnt);
