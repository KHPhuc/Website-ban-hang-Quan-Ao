import { connect } from "react-redux";

import Home from "../../../components/User/Content/Home/Home";

import {
  setSelectedProduct,
} from "../../../app/API/Product/Product";


const mapActionsToProps = {
  setSelectedProduct: (value: any) => setSelectedProduct(value),
};

export default connect(null, mapActionsToProps)(Home);
