import { connect } from "react-redux";

import AddProduct from "../../../../../components/Admin/Content/Product/AddProduct/AddProduct";

import {
  addProduct,
  setAddStatus,
} from "../../../../../app/API/Product/Product";
import { getAllProductType } from "../../../../../app/API/ProductType/ProductType";

const mapStatesToProps = (state: any) => {
  return {
    allProductType: state.productType.allProductType,
    addStatus: state.product.addStatus,
  };
};

const mapActionsToProps = {
  addProduct: (value: any) => addProduct(value),
  setAddStatus: (value: any) => setAddStatus(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(AddProduct);
