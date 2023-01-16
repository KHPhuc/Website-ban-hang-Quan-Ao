import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function PageOrderFail() {
  const nav = useNavigate();
  return (
    <Result
      status="success"
      title="Đặt hàng không thành công!"
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
