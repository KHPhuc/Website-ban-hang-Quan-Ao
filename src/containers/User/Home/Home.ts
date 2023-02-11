import { connect } from "react-redux";

import Home from "../../../components/User/Content/Home/Home";

import {
  getProductToShow,
  setSelectedProduct,
  setDetailProduct,
} from "../../../app/API/Product/Product";


const mapActionsToProps = {
  getProductToShow: (page: any) => getProductToShow(page),
  setSelectedProduct: (value: any) => setSelectedProduct(value),
  setDetailProduct: (value: any) => setDetailProduct(value),
};

export default connect(null, mapActionsToProps)(Home);
