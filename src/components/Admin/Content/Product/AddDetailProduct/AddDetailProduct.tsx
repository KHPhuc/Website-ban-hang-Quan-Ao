import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { BACKEND } from "../../../../common/Config/Config";

export default function AddDetailProduct(props: any) {
  const [form]: any = Form.useForm();

  const [urlImage, setUrlImage]: any = useState();

  useEffect(() => {
    if (props.data) {
      console.log(props.data);
      setUrlImage(props.data.image);
      form.setFieldsValue({
        color: props.data.color,
      });
    }
  }, [props.data]);

  useEffect(() => {
    if (props.addStatus) {
      props.setAddStatus("");
      closeModal();
    }
  }, [props.addStatus]);

  const closeModal = () => {
    form.resetFields();
    props.setIsOpenModalAddDetailProduct(false);
  };

  const addDP = (values: any) => {
    props.addDetailProduct({
      productId: props.data.productId,
      image: urlImage,
      color: values.color,
      size: values.size,
      originalPrice: values.original,
      currentPrice: values.current,
      quantity: values.quantity,
    });
  };

  return (
    <Modal
      title="Thêm loại sản phẩm"
      open={props.isOpenModalAddDetailProduct}
      maskClosable={false}
      onCancel={() => closeModal()}
      footer={null}
    >
      <Form
        colon={false}
        labelCol={{
          span: 5,
        }}
        onFinish={(values) => addDP(values)}
        form={form}
      >
        <div className="flex justify-center mb-[10px]">
          <Space size="large">
            <Image width={100} src={`${BACKEND}/${urlImage}`} />
            <Form.Item
              label="Màu sắc"
              className=""
              name="color"
              rules={[{ required: true, message: "Không được để trống ô" }]}
              labelCol={{ span: 7 }}
            >
              <Input
                className="w-full"
                placeholder="ví dụ: Trắng, Đỏ v.v"
                maxLength={30}
                disabled
              />
            </Form.Item>
          </Space>
        </div>
        <Form.Item
          label="Kích thước"
          className="mb-[10px]"
          name={"size"}
          rules={[
            { required: true, message: "Không được để trống ô" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (props.data.size.includes(value)) {
                  return Promise.reject("Đã có kích thước");
                } else {
                  return Promise.resolve();
                }
              },
            }),
          ]}
        >
          <Input
            className="w-full"
            placeholder="ví dụ: S, M, v.v"
            maxLength={3}
          />
        </Form.Item>
        <Form.Item
          label="Giá gốc"
          className="mb-[10px]"
          name={"original"}
          rules={[{ required: true, message: "Không được để trống ô" }]}
        >
          <InputNumber
            min={0}
            className="w-full"
            prefix="₫"
            placeholder="Nhập vào"
          />
        </Form.Item>

        <Form.Item
          label="Giá sale"
          className="mb-[10px]"
          name={"current"}
          rules={[{ required: true, message: "Không được để trống ô" }]}
        >
          <InputNumber
            min={0}
            className="w-full"
            prefix="₫"
            placeholder="Nhập vào"
          />
        </Form.Item>
        <Form.Item
          label="Số lượng"
          className="mb-[10px]"
          name={"quantity"}
          rules={[{ required: true, message: "Không được để trống ô" }]}
        >
          <InputNumber min={0} className="w-full" placeholder="Nhập vào" />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-center">
            <Button type="primary" className="mr-[10px]" htmlType="submit">
              Thêm
            </Button>
            <Button onClick={() => closeModal()}>Hủy</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
