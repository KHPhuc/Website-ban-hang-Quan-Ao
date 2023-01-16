import { Button, Result } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PageOrderSuccess({ auth, getCart }: any) {
  const nav = useNavigate();

  useEffect(() => {
    getCart(auth.id);
  }, []);

  return (
    <Result
      status="success"
      title="Đặt hàng thành công!"
      subTitle="Đơn hàng đang được chuẩn bị!"
      extra={
        <Button type="primary" onClick={() => nav("/")}>
          Go Console
        </Button>
        // <Button key="buy">Buy Again</Button>,
      }
    />
  );
}
