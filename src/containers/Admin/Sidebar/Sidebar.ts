import { connect } from "react-redux";

import SiderAnt from "../../../components/Admin/Sider/Sider";

import { setSidebar } from "../../../app/Admin/Sidebar/Sidebar";

const mapStatesToProps = (state: any) => {
  return {
    sidebar: state.sidebar.isOpen,
  };
};

const mapActionsToProps = {
  setSidebar: (value: any) => setSidebar(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(SiderAnt);
