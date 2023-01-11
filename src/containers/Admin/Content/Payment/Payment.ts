import { connect } from "react-redux";

import Payment from "../../../../components/Admin/Content/Payment/Payment";

import { setTitle } from "../../../../app/Admin/Header/Header";
import { getPayment, updatePayment } from "../../../../app/API/Payment/Payment";

const mapStatesToProps = (state: any) => {
  return {
    payment: state.payment.payment,
  };
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
  getPayment: () => getPayment(),
  updatePayment: (paymentId: any, payment: any) =>
    updatePayment(paymentId, payment),
};

export default connect(mapStatesToProps, mapActionsToProps)(Payment);
