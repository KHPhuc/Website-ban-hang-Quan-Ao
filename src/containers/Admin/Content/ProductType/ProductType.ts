import { connect } from "react-redux";

import ProductType from "../../../../components/Admin/Content/ProductType/ProductType";

import { setTitle } from "../../../../app/Admin/Header/Header";
import {
  getProductType,
  addProductType,
  updateProductType,
  deleteProductType,
  getDetailProductType,
  addDetailProductType,
  updateDetailProductType,
  deleteDetailProductType,
  setDetailProductType,
} from "../../../../app/API/ProductType/ProductType";

const mapStatesToProps = (state: any) => {
  return {
    productType: state.productType.productType,
    detailProductType: state.productType.detailProductType,
  };
};

const mapActionsToProps = {
  setTitle: (value: any) => setTitle(value),
  getProductType: () => getProductType(),
  addProductType: (productTypeName: any) => addProductType(productTypeName),
  updateProductType: (productTypeId: any, productTypeName: any) =>
    updateProductType(productTypeId, productTypeName),
  deleteProductType: (productTypeId: any) => deleteProductType(productTypeId),
  getDetailProductType: (productTypeId: any) =>
    getDetailProductType(productTypeId),
  addDetailProductType: (detailPTName: any, productTypeId: any) =>
    addDetailProductType(detailPTName, productTypeId),
  updateDetailProductType: (detailPTId: any, detailPTName: any) =>
    updateDetailProductType(detailPTId, detailPTName),
  deleteDetailProductType: (detailPTId: any) =>
    deleteDetailProductType(detailPTId),
  setDetailProductType: (value: any) => setDetailProductType(value),
};

export default connect(mapStatesToProps, mapActionsToProps)(ProductType);
