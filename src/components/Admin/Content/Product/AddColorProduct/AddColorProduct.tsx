import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Table,
  Upload,
} from "antd";
import uniqid from "uniqid";
import { PlusOutlined } from "@ant-design/icons";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  uploadImage,
  deleteImage,
} from "../../../../../app/API/Product/Product";

export default function AddColorProduct(props: any) {
  const [form]: any = Form.useForm();

  const [urlImage, setUrlImage]: any = useState();
  var [listInput, setListInput]: any = useState([]);
  const [listSize, setListSize]: any = useState([]);

  const [isFocusFakePrice, setIsFocusFakePrice]: any = useState(false);
  const [isFocusCurrentPrice, setIsFocusCurrentPrice]: any = useState(false);
  const [isFocusQuantity, setIsFocusQuantity]: any = useState(false);

  const [inputFakePrice, setInputFakePrice]: any = useState();
  const [inputCurrentPrice, setInputCurrentPrice]: any = useState();
  const [inputQuantity, setInputQuantity]: any = useState();

  const columns = [
    {
      title: "Kích thước",
      render: (x: any) => <>{x.size(x.key, listInput)}</>,
      width: 245,
      onCell: (_: any, index: any) => ({
        colSpan: index === listInput.length - 1 ? 5 : 1,
      }),
    },
    {
      title: "Giá gốc",
      render: (x: any) => <>{x.originPrice(x.key, listInput)}</>,
      width: 245,
      className: `${isFocusFakePrice ? "border border-indigo-600" : ""}`,
      onCell: (_: any, index: any) => ({
        colSpan: index === listInput.length - 1 ? 0 : 1,
      }),
    },
    {
      title: "Giá sale",
      render: (x: any) => <>{x.currentPrice(x.key, listInput)}</>,
      width: 245,
      className: `${isFocusCurrentPrice ? "border border-indigo-600" : ""}`,
      onCell: (_: any, index: any) => ({
        colSpan: index === listInput.length - 1 ? 0 : 1,
      }),
    },
    {
      title: "Số lượng",
      render: (x: any) => <>{x.quantity(x.key, listInput)}</>,
      width: 245,
      className: `${isFocusQuantity ? "border border-indigo-600" : ""}`,
      onCell: (_: any, index: any) => ({
        colSpan: index === listInput.length - 1 ? 0 : 1,
      }),
    },
    {
      title: "Xóa",
      render: (x: any) => (
        <>
          {listInput.length > 2 ? (
            <Popconfirm
              title="Bạn có muốn xóa không?"
              onConfirm={() => deleteDetailProduct(x.key, listInput)}
            >
              <a>Xóa</a>
            </Popconfirm>
          ) : (
            ""
          )}
        </>
      ),
      onCell: (_: any, index: any) => ({
        colSpan: index === listInput.length - 1 ? 0 : 1,
      }),
    },
  ];

  const dataSample = {
    key: uniqid(),
    size: (key: any, ls: any) => (
      <Form.Item
        className="mb-[10px]"
        name={"size-" + key}
        rules={[
          { required: true, message: "Không được để trống ô" },
          ({ getFieldValue }) => ({
            validator(o: any, value) {
              let values = form.getFieldsValue();
              for (const [key, v] of Object.entries(values)) {
                if (key !== o.field) {
                  if (key.split("-")[0] === "size" && value === v) {
                    return Promise.reject("Đã có kích thước");
                  }
                }
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input
          className="w-full"
          placeholder="ví dụ: S, M, v.v"
          maxLength={3}
          // onChange={(e) => handleInputSize(e, key, ls)}
        />
      </Form.Item>
    ),
    originPrice: (key: any, ls: any) => (
      <Form.Item
        key={uniqid()}
        className="mb-[10px]"
        name={"original-" + key}
        rules={[{ required: true, message: "Không được để trống ô" }]}
      >
        <InputNumber
          min={0}
          className="w-full"
          prefix="₫"
          placeholder="Nhập vào"
          // onChange={(e) => handleInputOriginPrice(e, key, ls)}
        />
      </Form.Item>
    ),
    currentPrice: (key: any, ls: any) => (
      <Form.Item
        key={uniqid()}
        className="mb-[10px]"
        name={"current-" + key}
        rules={[{ required: true, message: "Không được để trống ô" }]}
      >
        <InputNumber
          min={0}
          className="w-full"
          prefix="₫"
          placeholder="Nhập vào"
          // onChange={(e) => handleInputCurrrentPrice(e, key, ls)}
        />
      </Form.Item>
    ),
    quantity: (key: any, ls: any) => (
      <Form.Item
        key={uniqid()}
        className="mb-[10px]"
        name={"quantity-" + key}
        rules={[{ required: true, message: "Không được để trống ô" }]}
      >
        <InputNumber
          min={0}
          className="w-full"
          placeholder="Nhập vào"
          // onChange={(e) => handleInputQuantity(e, key, ls)}
        />
      </Form.Item>
    ),
  };

  const buttonAdd = {
    key: uniqid(),
    size: (k: any, ls: any) => (
      <Button
        type="primary"
        onClick={() => {
          let dt = {
            key: uniqid(),
            size: (key: any, ls: any) => (
              <Form.Item
                className="mb-[10px]"
                name={"size-" + key}
                rules={[
                  { required: true, message: "Không được để trống ô" },
                  ({ getFieldValue }) => ({
                    validator(o: any, value) {
                      let values = form.getFieldsValue();
                      for (const [key, v] of Object.entries(values)) {
                        if (key !== o.field) {
                          if (key.split("-")[0] === "size" && value === v) {
                            return Promise.reject("Đã có kích thước");
                          }
                        }
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  className="w-full"
                  placeholder="ví dụ: S, M, v.v"
                  maxLength={3}
                  // onChange={(e) => handleInputSize(e, key, ls)}
                />
              </Form.Item>
            ),
            originPrice: (key: any, ls: any) => (
              <Form.Item
                key={uniqid()}
                className="mb-[10px]"
                name={"original-" + key}
                rules={[{ required: true, message: "Không được để trống ô" }]}
              >
                <InputNumber
                  min={0}
                  className="w-full"
                  prefix="₫"
                  placeholder="Nhập vào"
                  // onChange={(e) => handleInputOriginPrice(e, key, ls)}
                />
              </Form.Item>
            ),
            currentPrice: (key: any, ls: any) => (
              <Form.Item
                key={uniqid()}
                className="mb-[10px]"
                name={"current-" + key}
                rules={[{ required: true, message: "Không được để trống ô" }]}
              >
                <InputNumber
                  min={0}
                  className="w-full"
                  prefix="₫"
                  placeholder="Nhập vào"
                  // onChange={(e) => handleInputCurrrentPrice(e, key, ls)}
                />
              </Form.Item>
            ),
            quantity: (key: any, ls: any) => (
              <Form.Item
                key={uniqid()}
                className="mb-[10px]"
                name={"quantity-" + key}
                rules={[{ required: true, message: "Không được để trống ô" }]}
              >
                <InputNumber
                  min={0}
                  className="w-full"
                  placeholder="Nhập vào"
                  // onChange={(e) => handleInputQuantity(e, key, ls)}
                />
              </Form.Item>
            ),
          };

          let cache = ls;
          cache.splice(cache.length - 1, 0, dt);

          setListInput([...cache]);
        }}
      >
        Thêm chi tiết sản phẩm
      </Button>
    ),
    originPrice: (key: any, ls: any) => <></>,
    currentPrice: (key: any, ls: any) => <></>,
    quantity: (key: any, ls: any) => <></>,
  };

  const deleteDetailProduct = (key: any, ls: any) => {
    let index = findIndexLI(key, ls);

    let cache = ls;
    cache.splice(index, 1);
    setListInput([...cache]);
  };

  const handleImage = (e: any) => {
    let file = e;
    let formData = new FormData();
    formData.append("myFile", file);

    uploadImage(formData).then((res: any) => {
      setUrlImage(res);
    });
  };

  const removeImage = () => {
    deleteImage(urlImage);
    setUrlImage("");
  };

  const applyForAll = () => {
    let fields = form.getFieldsValue();

    for (const [key, value] of Object.entries(fields)) {
      let cut = key.split("-");
      if (inputFakePrice) {
        if (cut[0] === "original") {
          form.setFieldValue(key, inputFakePrice);
        }
      }
      if (inputCurrentPrice) {
        if (cut[0] === "current") {
          form.setFieldValue(key, inputCurrentPrice);
        }
      }
      if (inputQuantity) {
        if (cut[0] === "quantity") {
          form.setFieldValue(key, inputQuantity);
        }
      }
    }
  };

  const findIndexLI = (key: any, ls: any) => {
    let index = ls.findIndex((x: any) => x.key === key);
    return index;
  };

  useEffect(() => {
    if (props.data) {
      var cache: any = [];
      cache.push(Object.assign({}, dataSample));
      cache.push(buttonAdd);
      setListInput(cache);
    }
  }, [props.data]);

  useEffect(() => {
    if (props.addStatus) {
      props.setAddStatus("");
      closeModal();
    }
  }, [props.addStatus]);

  const closeModal = () => {
    setListInput([]);
    setInputFakePrice("");
    setIsFocusCurrentPrice("");
    setInputQuantity("");
    form.resetFields();
    props.setIsOpenModalAddColorProduct(false);
  };

  const updateDP = (values: any) => {
    let data = [];

    for (const [key, value] of Object.entries(values)) {
      let index = findIndexLI(key.split("-")[1], data);
      if (key.split("-")[0] === "size") {
        if (index === -1) {
          data.push({
            key: key.split("-")[1],
            productId: props.data.productId,
            image: urlImage,
            color: values.color,
            size: value,
          });
        } else {
          data[index].size = value;
        }
      }
      if (key.split("-")[0] === "original") {
        if (index === -1) {
          data.push({
            key: key.split("-")[1],
            productId: props.data.productId,
            image: urlImage,
            color: values.color,
            originalPrice: value,
          });
        } else {
          data[index].originalPrice = value;
        }
      }
      if (key.split("-")[0] === "current") {
        if (index === -1) {
          data.push({
            key: key.split("-")[1],
            productId: props.data.productId,
            image: urlImage,
            color: values.color,
            currentPrice: value,
          });
        } else {
          data[index].currentPrice = value;
        }
      }
      if (key.split("-")[0] === "quantity") {
        if (index === -1) {
          data.push({
            key: key.split("-")[1],
            productId: props.data.productId,
            image: urlImage,
            color: values.color,
            quantity: value,
          });
        } else {
          data[index].quantity = value;
        }
      }
    }
    props.addMultiDetailProduct(data);
  };

  return (
    <Modal
      title={`Thêm màu ${props.data?.productName}`}
      open={props.isOpenModalAddColorProduct}
      maskClosable={false}
      onCancel={() => closeModal()}
      // width={"60%"}
      footer={null}
      className={"w-[80%] md:w-[60%]"}
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
        onFinish={(values) => updateDP(values)}
        form={form}
      >
        <div className="flex justify-center">
          <Space size="large">
            <div>
              {urlImage ? (
                <div className="relative">
                  <img
                    className="img-upload-preview"
                    src={`http://localhost:5000/${urlImage}`}
                    width={110}
                  />
                  <div className="absolute bottom-0 w-[110px] h-[25px] bg-[#0000004f] img-upload">
                    <div className="flex items-center justify-center h-full text-white">
                      <AiOutlineDelete
                        className=" cursor-pointer"
                        onClick={() => removeImage()}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <Upload
                  accept="image/png, image/jpeg"
                  showUploadList={false}
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={(e) => {
                    handleImage(e);
                  }}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              )}
            </div>
            <Form.Item
              label="Màu sắc"
              className=""
              name="color"
              rules={[
                { required: true, message: "Không được để trống ô" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (props.data.color.includes(value)) {
                      return Promise.reject("Đã có màu");
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                className="w-full"
                placeholder="ví dụ: Trắng, Đỏ v.v"
                maxLength={30}
                onChange={(e: any) => {
                  // handleInputColor(e, key);
                }}
              />
            </Form.Item>
          </Space>
        </div>
        <Form.Item
          name="detailProduct"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Table
            title={() => (
              <div className=" w-full block md:flex">
                <div className="w-full md:w-[25%] mb-[10px] md:mb-0 md:mr-[10px]">
                  <InputNumber
                    min={0}
                    prefix="₫"
                    placeholder="Giá gốc"
                    className="w-full"
                    onFocus={() => setIsFocusFakePrice(true)}
                    onBlur={() => setIsFocusFakePrice(false)}
                    value={inputFakePrice}
                    onChange={(e) => setInputFakePrice(e)}
                  />
                </div>
                <div className="w-[100%] md:w-[25%] mb-[10px] md:mb-0 md:mr-[10px]">
                  <InputNumber
                    min={0}
                    prefix="₫"
                    placeholder="Giá sale"
                    className="w-full"
                    onFocus={() => setIsFocusCurrentPrice(true)}
                    onBlur={() => setIsFocusCurrentPrice(false)}
                    value={inputCurrentPrice}
                    onChange={(e) => setInputCurrentPrice(e)}
                  />
                </div>
                <div className="w-[100%] md:w-[25%] mb-[10px] md:mb-0 md:mr-[10px]">
                  <InputNumber
                    placeholder="Số lượng"
                    className="w-full"
                    onFocus={() => setIsFocusQuantity(true)}
                    onBlur={() => setIsFocusQuantity(false)}
                    value={inputQuantity}
                    onChange={(e) => setInputQuantity(e)}
                  />
                </div>
                <div className="w-[100%] md:w-[25%] mb-[10px] md:mb-0 md:mr-[10px]">
                  <Button
                    type="primary"
                    disabled={
                      inputFakePrice || inputCurrentPrice || inputQuantity
                        ? false
                        : true
                    }
                    onClick={() => applyForAll()}
                  >
                    Áp dụng cho tất cả
                  </Button>
                </div>
              </div>
            )}
            columns={columns}
            dataSource={listInput}
            pagination={false}
            rowKey={"key"}
            scroll={{ x: "max-content" }}
          ></Table>
        </Form.Item>
        <Form.Item>
          <div className="flex justify-center">
            <Button type="primary" className="mr-[10px]" htmlType="submit">
              Cập nhật
            </Button>
            <Button onClick={() => closeModal()}>Hủy</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
