import { Layout, Button, Dropdown, Badge, Input, Menu } from "antd";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { RiShoppingBasketLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import getItem from "../../Ant/ItemMenu/ItemMenu";

const { Header } = Layout;
const { Search } = Input;

export default function HeaderAnt({ device }: any) {
  const refSidebar: any = useRef();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

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

  const itemsNav = ["Áo nam", "Quần nam", "Phụ kiện"];

  const subitemsNav = [
    getItem("Áo nam", "sub1", null, [getItem("Áo 1", "a1", null)]),
    getItem("Áo nam", "sub2", null, [getItem("Áo 1", "a2", null)]),
  ];

  useEffect(() => {
    const handle = (event: any) => {
      if (refSidebar.current && !refSidebar.current.contains(event.target)) {
        setIsOpenSidebar(false);
      }
    };

    window.addEventListener("scroll", handle);
    window.addEventListener("mousedown", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("mousedown", handle);
    };
  }, []);

  return (
    <>
      <div
        className={`sideBar ${isOpenSidebar ? "sideBarOpen" : ""} md:hidden`}
      >
        <div ref={refSidebar} className="container">
          <div className="flex justify-center pt-1">
            <Search placeholder="input search text" style={{ width: "98%" }} />
          </div>

          <Menu style={{ width: "100%" }} mode="inline" items={subitemsNav} />
        </div>
      </div>
      <Header>
        <div className="container">
          <div className="col-left">
            <div className="wrap-btn">
              <Button
                type="link"
                icon={
                  isOpenSidebar ? (
                    <MdClose className="icon-btn" />
                  ) : (
                    <IoIosMenu className="icon-btn" />
                  )
                }
                onClick={() => {
                  setIsOpenSidebar(!isOpenSidebar);
                }}
              />
            </div>
          </div>
          <div className="logo">
            <img src="/logo/png/logo-no-background.png" alt="" loading="lazy" />
          </div>
          <div className="col-right">
            <Dropdown
              className="md:hidden"
              menu={{ items }}
              trigger={["click"]}
            >
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
        {device === "desktop" ? (
          <div className="nav">
            <ul>
              {itemsNav.map((e: any, i: any) => {
                return (
                  <li key={i}>
                    <Dropdown menu={{ items }}>
                      <div className="wrap-btn">
                        <Button type="link">{e}</Button>
                      </div>
                    </Dropdown>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </Header>
    </>
  );
}
