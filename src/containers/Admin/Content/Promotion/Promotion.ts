import { connect } from "react-redux";

import Promotion from "../../../../components/Admin/Content/Promotion/Promodtion";

import { setTitle } from "../../../../app/Admin/Header/Header";
import {
  getPromotion,
  createPromotion,
  setAddStatus,
  setUpdateStatus,
  updatePromotion,
  updateAndDeletePromotion,
} from "../../../../app/API/Promotion/Promotion";

const mapStatesToProps = (state: any) => {
  return {
    addStatus: state.promotion.addStatus,
    updateStatus: state.promotion.updateStatus,
    promotion: state.promotion.promotion,
  };
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
  getPromotion: () => getPromotion(),
  createPromotion: (value: any) => createPromotion(value),
  setAddStatus: (value: any) => setAddStatus(value),
  setUpdateStatus: (value: any) => setUpdateStatus(value),
  updatePromotion: (value: any, promotion: any) =>
    updatePromotion(value, promotion),
  updateAndDeletePromotion: (value: any, promotion: any) =>
    updateAndDeletePromotion(value, promotion),
};

export default connect(mapStatesToProps, mapActionsToProps)(Promotion);
