import { Layout } from "antd";
import React from "react";
import { Routes, Route } from "react-router-dom";

const Product = React.lazy(
  () => import("../../../containers/Admin/Content/Product/Product")
);
const ProductType = React.lazy(
  () => import("../../../containers/Admin/Content/ProductType/ProductType")
);
const Promotion = React.lazy(
  () => import("../../../containers/Admin/Content/Promotion/Promotion")
);
const Payment = React.lazy(
  () => import("../../../containers/Admin/Content/Payment/Payment")
);
const Customer = React.lazy(
  () => import("../../../containers/Admin/Content/Customer/Customer")
);
const Cart = React.lazy(
  () => import("../../../containers/Admin/Content/Cart/Cart")
);
const Order = React.lazy(
  () => import("../../../containers/Admin/Content/Order/Order")
);
const Statistic = React.lazy(
  () => import("../../../containers/Admin/Content/Statistic/Statistic")
);

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
        <Route path="" element={<Statistic />} />
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
