import { connect } from "react-redux";

import Info from "../../../../components/User/Content/Account/Info/Info";

import { getInfo, updateInfo } from "../../../../app/API/Customer/Customer";

const mapStatesToProps = (state: any) => {
  return {
    auth: state.auth.auth,
    info: state.customer.info,
  };
};

const mapActionsToProps = {
  getInfo: (cId: any) => getInfo(cId),
  updateInfo: (info: any, cId: any) => updateInfo(info, cId),
};

export default connect(mapStatesToProps, mapActionsToProps)(Info);
