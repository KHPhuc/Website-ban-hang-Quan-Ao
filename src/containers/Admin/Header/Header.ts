import { connect } from "react-redux";

import HeaderAdmin from "../../../components/Admin/Header/HeaderAdmin";

import { setSidebar } from "../../../app/Admin/Sidebar/Sidebar";
import { logout } from "../../../app/API/Auth/Auth";

const mapStatesToProps = (state: any) => {
  return {
    sidebar: state.sidebar.isOpen,
    title: state.header.title,
  };
};

const mapActionsToProps = {
  setSidebar: (value: any) => setSidebar(value),
  logout: () => logout(),
};

export default connect(mapStatesToProps, mapActionsToProps)(HeaderAdmin);
