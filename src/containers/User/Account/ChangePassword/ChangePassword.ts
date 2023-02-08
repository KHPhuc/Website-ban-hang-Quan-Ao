import { connect } from "react-redux";

import ChangePassword from "../../../../components/User/Content/Account/ChangePassword/ChangePassword";

import { changePassword } from "../../../../app/API/Customer/Customer";

const mapStatesToProps = (state: any) => {
  return {
    account: state.auth.account,
    auth: state.auth.auth,
  };
};

const mapActionsToProps = {
  changePassword: (newPassword: any, customerId: any, username: any) =>
    changePassword(newPassword, customerId, username),
};

export default connect(mapStatesToProps, mapActionsToProps)(ChangePassword);
