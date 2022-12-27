import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineLogout } from "react-icons/ai";

const { Header } = Layout;

export default function HeaderAdmin({ sidebar, setSidebar, logout }: any) {
  return (
    <Header
      style={{ backgroundColor: "#fff", height: "80px" }}
      className="flex flex-row justify-center"
    >
      <div className="w-full px-[16px] flex items-center justify-between">
        <div
          onClick={() => setSidebar(!sidebar)}
          className="flex items-center cursor-pointer"
        >
          {sidebar ? (
            <MenuUnfoldOutlined style={{ fontSize: "18px" }} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: "18px" }} />
          )}
        </div>
        <div
          className=" text-center"
          style={{ fontSize: "25px", fontWeight: 500 }}
        >
          ABC
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => logout()}
        >
          <AiOutlineLogout style={{ fontSize: "18px" }} />
          <p className="ml-[5px]">Đăng xuất</p>
        </div>
      </div>
    </Header>
  );
}
