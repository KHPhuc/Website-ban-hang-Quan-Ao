import { connect } from "react-redux";

import AddDetailProduct from "../../../../../components/Admin/Content/Product/AddDetailProduct/AddDetailProduct";

import {
  addDetailProduct,
  setAddStatus,
} from "../../../../../app/API/Product/Product";

const mapStatesToProps = (state: any) => {
  return {
    addStatus: state.product.addStatus,
  };
};

const mapActionsToProps = {
  addDetailProduct: (value: any) => addDetailProduct(value),
  setAddStatus: (value: any) => setAddStatus(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(AddDetailProduct);
