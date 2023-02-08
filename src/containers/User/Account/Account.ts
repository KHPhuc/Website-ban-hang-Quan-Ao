import { connect } from "react-redux";

import Account from "../../../components/User/Content/Account/Account";
import { logout } from "../../../app/API/Auth/Auth";

const mapStatesToProps = (state: any) => {
  return {
    auth: state.auth.auth,
  };
};

const mapActionsToProps = {
  logout: () => logout(),
};

export default connect(mapStatesToProps, mapActionsToProps)(Account);
