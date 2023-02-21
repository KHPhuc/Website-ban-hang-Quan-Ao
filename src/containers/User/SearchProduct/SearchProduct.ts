import { connect } from "react-redux";

import SearchProduct from "../../../components/User/Content/SearchProduct/SearchProduct";

import { setSelectedProduct } from "../../../app/API/Product/Product";

const mapActionsToProps = {
  setSelectedProduct: (value: any) => setSelectedProduct(value),
};

export default connect(null, mapActionsToProps)(SearchProduct);
