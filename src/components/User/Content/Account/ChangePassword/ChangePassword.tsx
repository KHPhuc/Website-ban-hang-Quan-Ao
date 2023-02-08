import { Button, Form, Input } from "antd";
import { useEffect } from "react";

export default function ChangePassword({ account, auth, changePassword }: any) {
  const [form]: any = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [account]);

  const handleChangePassword = (value: any) => {
    changePassword(value.newPassword, auth.id, account.username);
  };

  return (
    <>
      <div className="md:pl-[15px]">
        <h1 className="text-[0.35rem] font-[600] leading-[0.6rem]">
          Đổi mật khẩu
        </h1>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className="mt-[0.3rem]"
          onFinish={(value) => handleChangePassword(value)}
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[
              { required: true, message: "Không được bỏ trống!" },
              {
                validator: (_, value) =>
                  value === account.password
                    ? Promise.resolve()
                    : Promise.reject(new Error("Mật khẩu sai!")),
                validateTrigger: "onSubmit",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu cũ" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Không được bỏ trống!" },
              {
                validator: (_, value) =>
                  form.getFieldValue("oldPassword") === account.password
                    ? value.length < 6
                      ? Promise.reject(new Error("Tối thiểu 6 ký tự!"))
                      : value === form.getFieldValue("oldPassword")
                      ? Promise.reject(new Error("Trùng mật khẩu cũ!"))
                      : Promise.resolve()
                    : Promise.resolve(),
                validateTrigger: "onSubmit",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu mới" />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu"
            name="reNewPassword"
            rules={[
              { required: true, message: "Không được bỏ trống!" },
              {
                validator: (_, value) =>
                  form.getFieldValue("newPassword").length >= 6 &&
                  form.getFieldValue("newPassword") !==
                    form.getFieldValue("oldPassword")
                    ? value.length < 6
                      ? Promise.reject(new Error("Tối thiểu 6 ký tự!"))
                      : value !== form.getFieldValue("newPassword")
                      ? Promise.reject(
                          new Error("Mật khẩu nhập lại không trùng!")
                        )
                      : Promise.resolve()
                    : Promise.resolve(),
                validateTrigger: "onSubmit",
              },
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className=" text-center">
              <Button htmlType="submit" type="primary">
                Cập nhật mật khẩu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
