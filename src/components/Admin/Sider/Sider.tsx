import { Layout, Menu } from "antd";
import getItem from "../../Ant/ItemMenu/ItemMenu";
import { GiClothes, GiLoincloth, GiRolledCloth } from "react-icons/gi";
import { HiUserGroup, HiUser } from "react-icons/hi";
import {
  RiShoppingBasketLine,
  RiCoupon2Fill,
  RiBillFill,
} from "react-icons/ri";
import { MdPayment, MdLocalShipping } from "react-icons/md";
import { AiFillHome, AiOutlineDashboard } from "react-icons/ai";
import { TableOutlined } from "@ant-design/icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;

export default function SiderAnt({ sidebar, setSidebar }: any) {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [collapsedWidth, setCollapsedWidth] = useState(80);

  const itemMenu = [
    getItem(
      <Link to={"/admin"}>Thống kê</Link>,
      "dashboard",
      <AiOutlineDashboard />
    ),
    getItem("Quản lý sản phẩm", "productManagement", <GiClothes />, [
      getItem(
        <Link to={"/admin/productType"}>Loại</Link>,
        "productType",
        <GiRolledCloth />
      ),
      getItem(
        <Link to={"/admin/product"}>Sản phẩm</Link>,
        "product",
        <GiLoincloth />
      ),
    ]),
    getItem("Quản lý khách hàng", "customer", <HiUserGroup />, [
      getItem(
        <Link to={"/admin/customer"}>Khách hàng</Link>,
        "cus",
        <HiUser />
      ),
      // getItem(
      //   <Link to={"/admin/cart"}>Giỏ hàng</Link>,
      //   "cart",
      //   <RiShoppingBasketLine />
      // ),
      getItem(
        <Link to={"/admin/order"}>Đơn hàng</Link>,
        "order",
        <RiBillFill />
      ),
    ]),
    getItem(
      <Link to={"/admin/promotion"}>Mã giảm giá</Link>,
      "promotion",
      <RiCoupon2Fill />
    ),
    getItem(
      <Link to={"/admin/payment"}>Phương thức thanh toán</Link>,
      "paygate",
      <MdPayment />
    ),
    getItem(<Link to={"/"}>Trang chủ</Link>, "home", <AiFillHome />),
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={sidebar}
      width={256}
      breakpoint="md"
      collapsedWidth={collapsedWidth}
      // theme="light"
      onBreakpoint={(broken) => {
        if (broken) {
          setCollapsedWidth(0);
        } else {
          setCollapsedWidth(80);
        }
      }}
      onCollapse={(collapsed, type) => {
        setSidebar(collapsed);
      }}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="h-[80px] flex justify-center">
        <img
          className="h-[80px] py-[5px] cursor-pointer"
          src="/logo/png/logo-no-background.png"
          alt=""
          loading="lazy"
          onClick={() => navigate("/admin")}
        />
      </div>
      <div>
        <Menu
          theme="dark"
          // theme="light"
          mode="inline"
          items={itemMenu}
          defaultSelectedKeys={
            location.split("/")[2] ? [location.split("/")[2]] : ["dashboard"]
          }
          defaultOpenKeys={[
            itemMenu.find(
              (e: any) =>
                e.children &&
                e.children.find((c: any) => c.key === location.split("/")[2])
            )?.key! as string,
          ]}
        />
      </div>
    </Sider>
  );
}
