import { connect } from "react-redux";

import SiderAnt from "../../../components/Admin/Sider/Sider";

const mapStatesToProps = (state: any) => {
  return {
    sidebar: state.sidebar.isOpen,
  };
};

export default connect(mapStatesToProps, null)(SiderAnt);
