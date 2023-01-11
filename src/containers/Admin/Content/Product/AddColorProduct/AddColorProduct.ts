import { connect } from "react-redux";

import AddColorProduct from "../../../../../components/Admin/Content/Product/AddColorProduct/AddColorProduct";

import {
  addMultiDetailProduct,
  setAddStatus,
} from "../../../../../app/API/Product/Product";

const mapStatesToProps = (state: any) => {
  return {
    addStatus: state.product.addStatus,
  };
};

const mapActionsToProps = {
  addMultiDetailProduct: (value: any) => addMultiDetailProduct(value),
  setAddStatus: (value: any) => setAddStatus(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(AddColorProduct);
