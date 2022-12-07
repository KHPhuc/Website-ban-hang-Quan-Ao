import { Layout, Button, Dropdown, Badge, Input } from "antd";
import { IoIosMenu } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { RiShoppingBasketLine } from "react-icons/ri";

const { Header } = Layout;
const { Search } = Input;

export default function HeaderAnt({ device }: any) {
  const items = [
    {
      label: "Đăng nhập",
      key: "login",
    },
    {
      label: "Đăng ký",
      key: "register",
    },
  ];

  return (
    <Header>
      <div className="container">
        <div className="col-left">
          <div className="wrap-btn">
            <Button type="link" icon={<IoIosMenu className="icon-btn" />} />
          </div>
        </div>
        <div className="logo">
          <img src="/logo/png/logo-no-background.png" alt="" />
        </div>
        <div className="col-right">
          <Dropdown className="md:hidden" menu={{ items }} trigger={["click"]}>
            <div className="wrap-btn">
              <Button
                type="link"
                icon={<AiOutlineUser className="icon-btn" />}
              />
            </div>
          </Dropdown>
          {device === "desktop" ? (
            <>
              <Search
                placeholder="input search text"
                style={{ width: "3rem" }}
              />
              <div className="wrap-btn">
                <Button className="btn-text" type="link">
                  Đăng nhập
                </Button>
              </div>
              <div className="wrap-btn">
                <Button className="btn-text" type="link">
                  Đăng nhập
                </Button>
              </div>
            </>
          ) : (
            ""
          )}

          <Badge count={0} showZero size="small" color="#faad14">
            <div className="wrap-btn">
              <Button
                type="link"
                icon={<RiShoppingBasketLine className="icon-btn" />}
              />
            </div>
          </Badge>
        </div>
      </div>
    </Header>
  );
}
