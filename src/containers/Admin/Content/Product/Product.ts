import { connect } from "react-redux";

import Product from "../../../../components/Admin/Content/Product/Product";

import { setTitle } from "../../../../app/Admin/Header/Header";
import { getAllProductType } from "../../../../app/API/ProductType/ProductType";

import {
  getProduct,
  deleteProduct,
  deleteDetailProduct,
} from "../../../../app/API/Product/Product";

const mapStatesToProps = (state: any) => {
  return {
    allProductType: state.productType.allProductType,
    detailProductType: state.productType.detailProductType,
    product: state.product.product,
  };
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
  getAllProductType: () => getAllProductType(),
  getProduct: (page:any) => getProduct(page),
  deleteProduct: (productId: any) => deleteProduct(productId),
  deleteDetailProduct: (detailProductId: any) =>
    deleteDetailProduct(detailProductId),
};

export default connect(mapStatesToProps, mapActionsToProps)(Product);
