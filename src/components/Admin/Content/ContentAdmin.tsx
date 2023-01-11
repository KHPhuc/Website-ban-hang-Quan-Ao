import { Layout } from "antd";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "../../../containers/Admin/Content/Product/Product";
import ProductType from "../../../containers/Admin/Content/ProductType/ProductType";
import Promotion from "../../../containers/Admin/Content/Promotion/Promotion";
import Payment from "../../../containers/Admin/Content/Payment/Payment";
import Customer from "../../../containers/Admin/Content/Customer/Customer";
import Cart from "../../../containers/Admin/Content/Cart/Cart";
import Order from "../../../containers/Admin/Content/Order/Order";

// const Payment = React.lazy(
//   () => import("../../../containers/Admin/Content/Payment/Payment")
// );

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
        <Route path="promotion" element={<Promotion />} />
        <Route path="payment" element={<Payment />} />
        <Route path="customer" element={<Customer />} />
        <Route path="cart" element={<Cart />} />
        <Route path="order" element={<Order />} />
      </Routes>
    </Content>
  );
}
