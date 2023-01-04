import { connect } from "react-redux";

import Product from "../../../../components/Admin/Content/Product/Product";

import { setTitle } from "../../../../app/Admin/Header/Header";

const mapStatesToProps = (state: any) => {
  return {
    productType: state.productType.productType,
    detailProductType: state.productType.detailProductType,
  };
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
  
};

export default connect(mapStatesToProps, mapActionsToProps)(Product);
