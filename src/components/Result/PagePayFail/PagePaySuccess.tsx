import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function PagePayFail() {
  const nav = useNavigate();
  return (
    <Result
      status="error"
      title="Thanh toán không thành công!"
      subTitle="Đơn hàng đã được hủy!"
      extra={
        <Button type="primary" onClick={() => nav("/")}>
          Go Console
        </Button>
        // <Button key="buy">Buy Again</Button>,
      }
    />
  );
}
