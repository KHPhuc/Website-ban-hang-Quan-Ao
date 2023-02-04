import { Button, Form, Input } from "antd";

export default function ChangePassword() {
  return (
    <>
      <div className="md:pl-[15px]">
        <h1 className="text-[0.35rem] font-[600] leading-[0.6rem]">
          Đổi mật khẩu
        </h1>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className="mt-[0.3rem]">
          <Form.Item label="Mật khẩu cũ" name="oldPassword">
            <Input placeholder="Mật khẩu cũ" />
          </Form.Item>
          <Form.Item label="Mật khẩu mới" name="newPassword">
            <Input placeholder="Mật khẩu mới" />
          </Form.Item>
          <Form.Item label="Nhập lại mật khẩu" name="rêNwPassword">
            <Input placeholder="Nhập lại mật khẩu" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className=" text-center">
              <Button type="primary">Cập nhật mật khẩu</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
