import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import Product from "../../../containers/Admin/Content/Product/Product";
import ProductType from "../../../containers/Admin/Content/ProductType/ProductType";

const { Content } = Layout;

export default function ContentAdmin() {
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: "#fff",
      }}
    >
      <Routes>
        <Route path="productType" element={<ProductType />} />
        <Route path="product" element={<Product />} />
      </Routes>
    </Content>
  );
}
