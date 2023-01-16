import { message } from "antd";
import { toast } from "react-toastify";

const loadingToast = (message: any) => {
  const id = toast.loading(message, { containerId: "CT" });
  return id;
};

const updateToast = (id: any, message: any, type: any) => {
  setTimeout(() => {
    toast.update(id, {
      render: message,
      type: type,
      isLoading: false,
      autoClose: 2000,
      closeOnClick: true,
      draggable: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      theme: "light",
      containerId: "CT",
    });
  }, 100);
};

const updateToastNoStop = (id: any, message: any, type: any) => {
  setTimeout(() => {
    toast.update(id, {
      render: message,
      type: type,
      isLoading: true,
      autoClose: 2000,
      closeOnClick: true,
      draggable: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      theme: "light",
      containerId: "CT",
    });
  }, 100);
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

const getDataSuccess = {
  message: "Lấy dữ liệu thành công!",
  type: "success",
};

const getDataFail = {
  message: (
    <div className="text-red-500">
      <div>Lấy dữ liệu thất bại!</div>
    </div>
  ),
  type: "error",
};

const addSuccess = {
  message: "Thêm thành công!",
  type: "success",
};

const addFail = (message: any) => {
  return {
    message: (
      <div className="text-red-500">
        <div>Thêm thất bại!</div>
        <div className="font-semibold">{message}</div>
      </div>
    ),
    type: "error",
  };
};

const updateSuccess = {
  message: "Cập nhật thành công!",
  type: "success",
};

const updateFail = (message: any) => {
  return {
    message: (
      <div className="text-red-500">
        <div>Cập nhật thất bại!</div>
        <div className="font-semibold">{message}</div>
      </div>
    ),
    type: "error",
  };
};

const deleteSuccess = {
  message: "Xóa thành công!",
  type: "success",
};

const deleteFail = (message: any) => {
  return {
    message: (
      <div className="text-red-500">
        <div>Xóa thất bại!</div>
        <div className="font-semibold">{message}</div>
      </div>
    ),
    type: "error",
  };
};

export {
  loadingToast,
  updateToast,
  loginSuccess,
  loginFail,
  registerSuccess,
  registerFail,
  logoutToast,
  addSuccess,
  addFail,
  getDataSuccess,
  getDataFail,
  updateSuccess,
  updateFail,
  deleteSuccess,
  deleteFail,
  updateToastNoStop,
};
