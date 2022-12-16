import { useLocation, Link } from "react-router-dom";
import { Typography, Input, Button } from "antd";
import { useEffect, useState } from "react";
import FooterAntd from "../../../common/Footer/Footer";

const { Title } = Typography;

export default function LoginRegister() {
  const location = useLocation();
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <div
        className="home"
        style={{
          position: "absolute",
          width: "100%",
          //   backgroundColor: "#0f0",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
        }}
      >
        <div className="container flex justify-center">
          <div
            className="my-[1rem] flex flex-col items-center"
            style={{
              backgroundColor: "#f0f0f0",
              width: "8rem",
              padding: "0.5rem 0",
            }}
          >
            <Title
              level={3}
              style={{ marginBottom: "0.5rem", color: "#e4ac2b" }}
            >
              {path === "/login" ? "Đăng nhập" : "Đăng ký"}
            </Title>
            {path === "/login" ? (
              <>
                <Input
                  style={{ width: "70%", marginBottom: "20px" }}
                  placeholder="SĐT hoặc Email"
                />
                <Input.Password
                  style={{ width: "70%", marginBottom: "20px" }}
                  placeholder="Mật khẩu"
                />
              </>
            ) : (
              <>
                <Input
                  style={{ width: "70%", marginBottom: "20px" }}
                  placeholder="Họ và tên"
                />
                <Input
                  style={{ width: "70%", marginBottom: "20px" }}
                  placeholder="Số điện thoại"
                />
                <Input
                  style={{ width: "70%", marginBottom: "20px" }}
                  placeholder="Địa chỉ email"
                />
                <Input.Password
                  style={{ width: "70%", marginBottom: "20px" }}
                  placeholder="Mật khẩu"
                />
                <Input.Password
                  style={{ width: "70%", marginBottom: "20px" }}
                  placeholder="Nhập lại mật khẩu"
                />
              </>
            )}
            <Button type={"primary"} style={{ backgroundColor: "#eb6440" }}>
              {path === "/login" ? "Đăng nhập" : "Đăng ký"}
            </Button>
            <div
              className=" mt-[25px] w-[70%] text-center pt-[20px]"
              style={{ borderTop: "1px solid #DDE1E3" }}
            >
              {path === "/login" ? (
                <p>
                  Bạn chưa có tài khoản?{" "}
                  <Link to="../register" style={{ color: "#1677ff" }}>
                    Đăng ký ngay!
                  </Link>
                </p>
              ) : (
                <p>
                  Bạn đã có tài khoản?{" "}
                  <Link to="../login" style={{ color: "#1677ff" }}>
                    Đăng nhập ngay!
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          transform: "translate(-50%)",
          bottom: 0,
          left: "50%",
        }}
      >
        <FooterAntd />
      </div>
    </>
  );
}
