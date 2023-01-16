import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function PagePaySuccess() {
  const nav = useNavigate();
  return (
    <Result
      status="success"
      title="Thanh toán thành công!"
      subTitle="Đơn hàng đang được chuẩn bị!"
      extra={
        <Button type="primary" onClick={() => nav("/")}>
          Về trang chủ
        </Button>
        // <Button key="buy">Buy Again</Button>,
      }
    />
  );
}
