import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import FooterAntd from "../../../common/Footer/Footer";
import ChangePassword from "./ChangePassword/ChangePassword";
import Info from "./Info/Info";
import Orders from "./Orders/Orders";
import Reviews from "./Reviews/Reviews";

export default function Account({ logout }: any) {
  const location = useLocation().pathname.split("/");
  const navigate = useNavigate();

  return (
    <>
      <div className="home mb-[1rem]">
        <div className="container md:flex mt-[0.3rem]">
          <div
            className=" hidden md:flex md:w-[35%] md:flex-col pr-[15px]"
            style={{ borderRight: "1px solid #d9d9d9" }}
          >
            <h1 className="text-[0.35rem] font-[600] leading-[0.6rem]">
              Kiều Hoàng Phúc
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
              className={`btn-account ${
                location[1] === "account" && location[2] === "reviews"
                  ? "btn-account-active"
                  : ""
              }`}
              onClick={() => navigate("reviews")}
            >
              Đánh giá
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
              <Route path="reviews" element={<Reviews />} />
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
