import { useLocation, Link } from "react-router-dom";
import { Typography, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { detectPhoneNumber } from "../../../common/CheckPhoneNumber/CheckPhoneNumber";
// import validator from "email-validator";
import FooterAntd from "../../../common/Footer/Footer";
import { validate } from "email-validator";
// var validator = require("email-validator");
const { Title } = Typography;

export default function LoginRegister({ login, register }: any) {
  const location = useLocation();
  const [path, setPath] = useState("");
  const [inputUsername, setInputUsername] = useState();
  const [inputPassword, setInputPassword]: any = useState();

  const [inputName, setInputName] = useState();
  const [inputPhoneNumber, setInputPhoneNumber]: any = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputRePassword, setInputRePassword] = useState();

  const [error, setError] = useState({
    username: "",
    password: "",
    name: "",
    phoneNumber: "",
    email: "",
    rePassword: "",
  });

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const handleLogin = () => {
    if (!inputUsername) {
      error.username = "Vui lòng nhập Email/SĐT của bạn";
    }
    if (!inputPassword) {
      error.password = "Vui lòng nhập mật khẩu của bạn";
    }
    setError({ ...error });
    if (!error.username && !error.password) {
      login(inputUsername, inputPassword);
    }
  };

  const handleRegister = () => {
    if (!inputName) {
      error.name = "Vui lòng nhập tên của bạn";
    }
    if (!inputPhoneNumber || !detectPhoneNumber(inputPhoneNumber)) {
      error.phoneNumber = "SĐT không hợp lệ";
    } else if (inputPhoneNumber.length !== 10) {
      error.phoneNumber = "SĐT phải là 10 số";
    }
    if (!inputEmail || !validate(inputEmail)) {
      error.email = "Email không hợp lệ!";
    }
    if (!inputPassword) {
      error.password = "Vui lòng nhập mật khẩu của bạn";
    }
    if (!inputRePassword) {
      error.rePassword = "Vui lòng nhập lại mật khẩu";
    } else if (inputRePassword !== inputPassword) {
      error.rePassword = "Mật khẩu không khớp!";
    }
    setError({ ...error });
    if (
      !error.name &&
      !error.phoneNumber &&
      !error.email &&
      !error.password &&
      !error.rePassword
    ) {
      register(inputName, inputPhoneNumber, inputEmail, inputPassword);
    }
  };

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
                <div style={{ width: "70%", marginBottom: "20px" }}>
                  <Input
                    placeholder="Email/SĐT của bạn"
                    value={inputUsername}
                    onChange={(e: any) => {
                      setInputUsername(e.target.value);
                      if (e.target.value) {
                        error.username = "";
                        setError(error);
                      }
                    }}
                  />
                  <div className="text-red-500 px-[11px]">
                    {error.username ? <p>{error.username}</p> : ""}
                  </div>
                </div>

                <div style={{ width: "70%", marginBottom: "20px" }}>
                  <Input.Password
                    placeholder="Mật khẩu"
                    value={inputPassword}
                    onChange={(e: any) => {
                      setInputPassword(e.target.value);
                      if (e.target.value) {
                        error.password = "";
                        setError(error);
                      }
                    }}
                  />
                  <div className="text-red-500 px-[11px]">
                    {error.password ? <p>{error.password}</p> : ""}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "70%", marginBottom: "20px" }}>
                  <Input
                    placeholder="Tên của bạn"
                    maxLength={30}
                    value={inputName}
                    onChange={(e: any) => setInputName(e.target.value)}
                  />
                  <div className="text-red-500 px-[11px]">
                    {error.password ? <p>{error.name}</p> : ""}
                  </div>
                </div>

                <div style={{ width: "70%", marginBottom: "20px" }}>
                  <Input
                    placeholder="SĐT của bạn"
                    maxLength={10}
                    value={inputPhoneNumber}
                    onChange={(e: any) => setInputPhoneNumber(e.target.value)}
                  />
                  <div className="text-red-500 px-[11px]">
                    {error.password ? <p>{error.name}</p> : ""}
                  </div>
                </div>

                <div style={{ width: "70%", marginBottom: "20px" }}>
                  <Input
                    placeholder="Email của bạn"
                    value={inputEmail}
                    onChange={(e: any) => setInputEmail(e.target.value)}
                  />
                  <div className="text-red-500 px-[11px]">
                    {error.password ? <p>{error.name}</p> : ""}
                  </div>
                </div>

                <div style={{ width: "70%", marginBottom: "20px" }}>
                  <Input.Password
                    placeholder="Mật khẩu"
                    maxLength={30}
                    value={inputPassword}
                    onChange={(e: any) => setInputPassword(e.target.value)}
                  />
                  <div className="text-red-500 px-[11px]">
                    {error.password ? <p>{error.name}</p> : ""}
                  </div>
                </div>

                <div style={{ width: "70%", marginBottom: "20px" }}>
                  <Input.Password
                    placeholder="Nhập lại mật khẩu"
                    value={inputRePassword}
                    onChange={(e: any) => setInputRePassword(e.target.value)}
                  />
                  <div className="text-red-500 px-[11px]">
                    {error.password ? <p>{error.name}</p> : ""}
                  </div>
                </div>
              </>
            )}
            <Button
              type={"primary"}
              style={{ backgroundColor: "#eb6440" }}
              onClick={() => {
                path === "/login" ? handleLogin() : handleRegister();
              }}
            >
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
