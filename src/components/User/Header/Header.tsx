import { Layout, Button, Dropdown, Badge, Input, Menu, MenuProps } from "antd";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { RiShoppingBasketLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import getItem from "../../Ant/ItemMenu/ItemMenu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { removeAccents } from "../../common/RemoveAccents/RemoveAccents";

const { Header } = Layout;
const { Search } = Input;

export default function HeaderAnt({
  device,
  auth,
  logout,
  allProductType,
  getAllProductType,

  setSelectedProductType,

  cart,
  setCart,
  setDetailCart,
}: any) {
  const location = useLocation();
  const nav = useNavigate();
  const refSidebar: any = useRef();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [itemsNav, setItemNav] = useState([]);

  const [selectedKey, setSelectedKey]: any = useState();

  const [quantityCart, setQuantityCart] = useState(0);

  const items = auth
    ? auth.isAdmin
      ? [
          {
            label: <Link to="/admin/order">Bảng điều khiển</Link>,
            key: "dashboard",
          },
          {
            label: (
              <div className="cursor-pointer" onClick={() => onLogout()}>
                Đăng xuất
              </div>
            ),
            key: "logout",
          },
        ]
      : [
          {
            label: <Link to="/account/info">Thông tin cá nhân</Link>,
            key: "infor",
          },
          {
            label: <Link to="/account/change-password">Đổi mật khẩu</Link>,
            key: "change-password",
          },
          {
            label: <Link to="/account/orders">Danh sách đơn hàng</Link>,
            key: "orders",
          },
          {
            label: (
              <div className="cursor-pointer" onClick={() => onLogout()}>
                Đăng xuất
              </div>
            ),
            key: "logout",
          },
        ]
    : [
        {
          label: <Link to="/login">Đăng nhập</Link>,
          key: "login",
        },
        {
          label: <Link to="/register">Đăng ký</Link>,
          key: "register",
        },
      ];

  useEffect(() => {
    getAllProductType();

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

  useEffect(() => {
    let cutUrl = location.pathname.split("/");
    if (cutUrl[1] === "product") {
      if (allProductType) {
        allProductType.forEach((e: any) => {
          e.detailProductType.forEach((e1: any) => {
            if (
              cutUrl[2] === removeAccents(e1.detailPTName).split(" ").join("-")
            ) {
              setSelectedKey(e1.detailPTId);
              setSelectedProductType([e1.detailPTId, e1.detailPTName]);
            }
          });
        });
      }
    } else {
      setSelectedKey(null);
      setSelectedProductType("");
    }
  }, [location.pathname, allProductType]);

  useEffect(() => {
    if (allProductType) {
      let cache: any = [];
      allProductType.forEach((e: any) => {
        var subItems: any = [];
        e.detailProductType.forEach((e1: any) => {
          subItems.push({
            label: (
              <Link
                to={`/product/${removeAccents(e1.detailPTName)
                  .split(" ")
                  .join("-")}`}
              >
                {e1.detailPTName}
              </Link>
            ),
            key: e1.detailPTId,
          });
        });
        cache.push({
          // label: (
          //   <Link to={`/product/${e.productTypeName}`}>
          //     {e.productTypeName}
          //   </Link>
          // ),
          label: e.productTypeName,
          key: e.productTypeId,
          children: subItems,
        });
      });
      setItemNav(cache);
    }
  }, [allProductType]);

  useEffect(() => {
    if (!auth) {
      // console.log(cart);
      var total = cart.reduce((x1: any, x2: any) => x1 + x2.quantity, 0);
      setQuantityCart(total);
    } else {
      if (cart.length) {
        var total = cart.reduce((x1: any, x2: any) => x1 + x2.quantity, 0);
        setQuantityCart(total);
      } else {
        setQuantityCart(0);
      }
    }
  }, [cart]);

  const onLogout = () => {
    setCart([]);
    setDetailCart("");
    logout();
  };

  const search = (text: any) => {
    if (text) {
      nav(`search/text=${text}`);
      setIsOpenSidebar(false);
    }
  };

  return (
    <>
      <div
        className={`sideBar ${isOpenSidebar ? "sideBarOpen" : ""} md:hidden`}
      >
        <div ref={refSidebar} className="container">
          <div className="flex justify-center pt-1">
            <Search
              placeholder="Tên sản phẩm cần tìm ..."
              style={{ width: "98%" }}
              onSearch={search}
            />
          </div>

          <Menu style={{ width: "100%" }} mode="inline" items={itemsNav} />
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
            <Link to="/">
              <img
                src="/logo/png/logo-no-background.png"
                alt=""
                loading="lazy"
              />
            </Link>
          </div>
          <div className="col-right">
            {device === "desktop" ? (
              <>
                <Search
                  placeholder="Tên sản phẩm cần tìm ..."
                  style={{ width: "3rem" }}
                  onSearch={search}
                />
                {auth ? (
                  ""
                ) : (
                  <>
                    <div className="wrap-btn">
                      <Button className="btn-text" type="link">
                        <Link to="/login">Đăng nhập</Link>
                      </Button>
                    </div>
                    <div className="wrap-btn">
                      <Button className="btn-text" type="link">
                        <Link to="/register">Đăng ký</Link>
                      </Button>
                    </div>
                  </>
                )}
              </>
            ) : (
              ""
            )}

            {auth ? (
              <Dropdown menu={{ items }} trigger={["click"]}>
                <div className="wrap-btn md:ml-[0.15rem] md:mr-[0.05rem]">
                  <Button
                    type="link"
                    icon={<AiOutlineUser className="icon-btn" />}
                  />
                </div>
              </Dropdown>
            ) : (
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
            )}

            {!auth || auth.isAdmin ? (
              ""
            ) : (
              <Badge count={quantityCart} showZero size="small" color="#faad14">
                <div className="wrap-btn">
                  <Button
                    type="link"
                    icon={<RiShoppingBasketLine className="icon-btn" />}
                    onClick={() => nav("/cart")}
                  />
                </div>
              </Badge>
            )}
          </div>
        </div>
        {device === "desktop" ? (
          <div className="nav">
            <Menu
              items={itemsNav}
              mode="horizontal"
              selectedKeys={[selectedKey]}
              // style={{ border: "1px solid black" }}
              className="text-[16px] font-[600]"
            />
            {/* <ul>
              {itemsNav.map((e: MenuProps, i: any) => {
                return (
                  <li key={i}>
                    <Dropdown menu={{e.children}}>
                      <div className="wrap-btn">
                        <Button type="link">{e.label}</Button>
                      </div>
                    </Dropdown>
                  </li>
                );
              })}
            </ul> */}
          </div>
        ) : (
          ""
        )}
      </Header>
    </>
  );
}
