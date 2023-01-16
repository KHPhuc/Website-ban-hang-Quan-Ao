import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function Page404() {
  const nav = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Không tìm thấy."
      extra={
        <Button type="primary" onClick={() => nav("/")}>
          Về trang chủ
        </Button>
      }
    />
  );
}
