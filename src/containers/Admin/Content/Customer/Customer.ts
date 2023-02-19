import { connect } from "react-redux";

import Customer from "../../../../components/Admin/Content/Customer/Customer";

import { setTitle } from "../../../../app/Admin/Header/Header";
import {
  getCustomer,
  createCustomer,
  setAddStatus,
  banCustomer,
  unBanCustomer,
} from "../../../../app/API/Customer/Customer";

const mapStatesToProps = (state: any) => {
  return {
    account: state.auth.account,
    customer: state.customer.customer,
    addStatus: state.customer.addStatus,
  };
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
  getCustomer: (page: any) => getCustomer(page),
  createCustomer: (value: any) => createCustomer(value),
  setAddStatus: (value: any) => setAddStatus(value),
  banCustomer: (customerId: any) => banCustomer(customerId),
  unBanCustomer: (customerId: any) => unBanCustomer(customerId),
};

export default connect(mapStatesToProps, mapActionsToProps)(Customer);
