import { connect } from "react-redux";

import Admin from "../../components/Admin/Admin";

const mapStatesToProps = (state: any) => {
  return {
    sidebar: state.sidebar.isOpen,
  };
};


export default connect(mapStatesToProps, null)(Admin);
