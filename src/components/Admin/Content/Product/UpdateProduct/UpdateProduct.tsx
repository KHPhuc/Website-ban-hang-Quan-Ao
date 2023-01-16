import { Button, Form, Input, Modal, TreeSelect } from "antd";
import { useEffect, useState } from "react";
import { removeAccents } from "../../../../common/RemoveAccents/RemoveAccents";

const { TextArea } = Input;

export default function UpdateProduct(props: any) {
  const [form]: any = Form.useForm();
  const [treeSelectData, setTreeSelectData]: any = useState();

  useEffect(() => {
    if (props.allProductType) {
      let a = props.allProductType.map((e: any, i: any) => {
        return {
          value: e.productTypeId,
          title: e.productTypeName,
          selectable: false,
          children: e.detailProductType.map((e1: any, i1: any) => {
            return {
              value: e1.detailPTId,
              title: e1.detailPTName,
              selectable: true,
            };
          }),
        };
      });
      setTreeSelectData(a);
    }
  }, [props.allProductType]);

  useEffect(() => {
    if (props.data) {
      form.setFieldsValue({
        productName: props.data.productName,
        productType: props.data.detailPTId,
        description: props.data.description,
      });
    }
  }, [props.data]);

  useEffect(() => {
    if (props.updateStatus) {
      props.setUpdateStatus("");
      props.setIsOpenModalUpdateProduct(false);
    }
  }, [props.updateStatus]);

  const handleUpdate = (value: any) => {
    props.updateProduct(props.data.productId, {
      productName: value.productName,
      linkProduct: removeAccents(value.productName)
        .split("/")
        .join("-")
        .split(" ")
        .join("-"),
      detailPTId: value.productType,
      description: value.description,
    });
  };

  return (
    <Modal
      title="Sửa thông tin sản phẩm"
      open={props.isOpenModalUpdateProduct}
      maskClosable={false}
      onCancel={() => props.setIsOpenModalUpdateProduct(false)}
      width={"80%"}
      footer={null}
      // style={{ top: 30 }}
      // centered
    >
      <Form
        colon={false}
        labelCol={{
          sm: { span: 8 },
          md: { span: 7 },
          lg: { span: 5 },
          xl: { span: 4 },
        }}
        onFinish={(values) => handleUpdate(values)}
        form={form}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="productName"
          rules={[{ required: true, message: "Nhập tên sản phẩm!" }]}
        >
          <Input maxLength={100} showCount={true} onChange={(e: any) => {}} />
        </Form.Item>
        <Form.Item
          label="Chọn loại sản phẩm"
          name="productType"
          rules={[{ required: true, message: "Chọn loại sản phẩm!" }]}
        >
          <TreeSelect treeLine treeData={treeSelectData} onChange={(e) => {}} />
        </Form.Item>
        <Form.Item
          label="Mô tả sản phẩm"
          name="description"
          rules={[{ required: true, message: "Nhập mô tả sản phẩm" }]}
        >
          <TextArea
            maxLength={1000}
            showCount={true}
            rows={9}
            style={{ resize: "none" }}
            onChange={(e: any) => {}}
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-center">
            <Button type="primary" className="mr-[10px]" htmlType="submit">
              Cập nhật
            </Button>
            <Button onClick={() => props.setIsOpenModalAdd(false)}>Hủy</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
