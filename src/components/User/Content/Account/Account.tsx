import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

const FooterAntd = React.lazy(() => import("../../../common/Footer/Footer"));

const ChangePassword = React.lazy(
  () =>
    import("../../../../containers/User/Account/ChangePassword/ChangePassword")
);
const Info = React.lazy(
  () => import("../../../../containers/User/Account/Info/Info")
);
const Orders = React.lazy(
  () => import("../../../../containers/User/Account/Orders/Orders")
);

export default function Account({ auth, logout }: any) {
  const location = useLocation().pathname.split("/");
  const navigate = useNavigate();

  return (
    <>
      <div className="home pb-[353px] md:pb-[180px]">
        <div className="container md:flex mt-[0.3rem]">
          <div
            className=" hidden md:flex md:w-[35%] md:flex-col pr-[15px]"
            style={{ borderRight: "1px solid #d9d9d9" }}
          >
            <h1 className="text-[0.35rem] font-[600] leading-[0.6rem]">
              {auth.name}
            </h1>
            <button
              className={`btn-account ${
                location[1] === "account" && location[2] === "info"
                  ? "btn-account-active"
                  : ""
              }`}
              onClick={() => navigate("info")}
            >
              Thông tin cá nhân
            </button>
            <button
              className={`btn-account ${
                location[1] === "account" && location[2] === "change-password"
                  ? "btn-account-active"
                  : ""
              }`}
              onClick={() => navigate("change-password")}
            >
              Đổi mật khẩu
            </button>
            <button
              className={`btn-account ${
                location[1] === "account" && location[2] === "orders"
                  ? "btn-account-active"
                  : ""
              }`}
              onClick={() => navigate("orders")}
            >
              Danh sách đơn hàng
            </button>
            <button
              className="btn-account"
              onClick={() => {
                navigate("/");
                logout();
              }}
            >
              Đăng xuất
            </button>
          </div>
          <div className="w-[100%] md:w-[65%]">
            <Routes>
              <Route path="info" element={<Info />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <FooterAntd />
      </div>
    </>
  );
}
