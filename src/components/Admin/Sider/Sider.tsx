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
import { TableOutlined } from "@ant-design/icons";

const { Sider } = Layout;

export default function SiderAnt({ sidebar }: any) {
  const itemMenu = [
    getItem("Thống kê", "1", <TableOutlined />),
    getItem("Quản lý sản phẩm", "menu2", <GiClothes />, [
      getItem("Loại", "productTypeName", <GiRolledCloth />),
      getItem("Sản phẩm", "product", <GiLoincloth />),
    ]),
    getItem("Quản lý khách hàng", "customer", <HiUserGroup />, [
      getItem("Khách hàng", "cus", <HiUser />),
      getItem("Giỏ hàng", "cart", <RiShoppingBasketLine />),
      getItem("Đơn hàng", "order", <RiBillFill />),
    ]),
    getItem("Mã giảm giá", "promotion", <RiCoupon2Fill />),
    getItem("Phương thức thanh toán", "paygate", <MdPayment />),
    getItem("Phương thức giao hàng", "shipping", <MdLocalShipping />),
  ];
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={sidebar}
      // className={"w-[256px]"}
      width={256}
    >
      <div className="h-[80px] flex justify-center">
        <img
          className="h-[80px] py-[5px]"
          src="/logo/png/logo-no-background.png"
          alt=""
          loading="lazy"
        />
      </div>
      <div>
        <Menu theme="dark" mode="inline" items={itemMenu} />
      </div>
    </Sider>
  );
}
