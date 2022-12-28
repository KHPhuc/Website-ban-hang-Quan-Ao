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
    message: `Xin chào ${name ? name : ""}!`,
    type: "success",
  };
};

const loginFail = {
  message: (
    <div className="text-red-500">
      <div>Đăng nhập thất bại!</div>
      <div className=" inline">
        Sai <p className="font-semibold inline">tài khoản</p> hoặc{" "}
        <p className="font-semibold inline">mật khẩu</p>!
      </div>
    </div>
  ),
  type: "error",
  //   toast.error(
  //     <div className="text-red-500">
  //       <div>Đăng nhập thất bại!</div>
  //       <div className=" inline">
  //         Sai <p className="font-semibold inline">tài khoản</p> hoặc{" "}
  //         <p className="font-semibold inline">mật khẩu</p>!
  //       </div>
  //     </div>
  //   );
};

export { loadingToast, updateToast, loginSuccess, loginFail };
