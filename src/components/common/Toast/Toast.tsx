import { message } from "antd";
import { toast } from "react-toastify";

const loadingToast = (message: any) => {
  const id = toast.loading(message);
  return id;
};

const updateToast = (id: any, message: any, type: any) => {
  toast.update(id, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: 5000,
    closeOnClick: true,
    draggable: true,
  });
};

const loginSuccess = (name: any) => {
  return {
    message: (
      <div className="text-slate-500">
        Xin chào <p className="font-semibold inline">{name ? name : ""}</p>!
      </div>
    ),

    type: "success",
  };
};

const loginFail = {
  message: (
    <div className="text-red-500">
      <div>Đăng nhập thất bại!</div>
      <div>
        Sai <p className="font-semibold inline">tài khoản</p> hoặc{" "}
        <p className="font-semibold inline">mật khẩu</p>!
      </div>
    </div>
  ),
  type: "error",
};

const registerSuccess = (name: any) => {
  return {
    message: (
      <div className="text-slate-500">
        <div>Đăng ký thành công!</div>
        <div>
          Xin chào <p className="font-semibold inline">{name ? name : ""}</p>!
        </div>
      </div>
    ),
    type: "success",
  };
};

const registerFail = (message: any) => {
  return {
    message: (
      <div className="text-red-500">
        <div>Đăng ký thất bại!</div>
        <div className="font-semibold">{message}</div>
        {/* <div>
          Sai <p className="font-semibold inline">tài khoản</p> hoặc{" "}
          <p className="font-semibold inline">mật khẩu</p>!
        </div> */}
      </div>
    ),
    type: "error",
  };
};

const logoutToast = {
  message: <div className="text-orange-600">👋 Hẹn gặp lại!</div>,
  type: "default",
};

export {
  loadingToast,
  updateToast,
  loginSuccess,
  loginFail,
  registerSuccess,
  registerFail,
  logoutToast,
};
