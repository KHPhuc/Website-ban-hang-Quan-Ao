import { useLocation } from "react-router-dom";
import { Typography, Input, Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import FooterAntd from "../../../common/Footer/Footer";

const { Title } = Typography;

export default function LoginRegister() {
  const location = useLocation();
  const [path, setPath] = useState("");

  const setP = useCallback(() => setPath(location.pathname), [path]);

  useEffect(() => {
    setP();
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
            <Title level={3} style={{ marginBottom: "0.5rem" }}>
              {path === "/login" ? "Đăng nhập" : "Đăng ký"}
            </Title>
            <Input
              style={{ width: "70%", marginBottom: "20px" }}
              placeholder="Nhập SĐT hoặc Email"
            />
            <Input.Password
              style={{ width: "70%", marginBottom: "20px" }}
              placeholder="Nhập mật khẩu"
            />
            <Button type={"primary"} style={{ backgroundColor: "#eb6440" }}>
              Default
            </Button>
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
