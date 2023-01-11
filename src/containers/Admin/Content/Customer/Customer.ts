import { connect } from "react-redux";

import Customer from "../../../../components/Admin/Content/Customer/Customer";

import { setTitle } from "../../../../app/Admin/Header/Header";


const mapStatesToProps = (state: any) => {
  return {
    
  };
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(Customer);
