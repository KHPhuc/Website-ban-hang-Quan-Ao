import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
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
import { BACKEND } from "../../../../common/Config/Config";

export default function UpdateDetailProduct(props: any) {
  const [form]: any = Form.useForm();

  const [urlImage, setUrlImage]: any = useState();
  var [listInput, setListInput]: any = useState([]);
  var [cacheData, setCacheData]: any = useState([]);

  const [isFocusFakePrice, setIsFocusFakePrice]: any = useState(false);
  const [isFocusCurrentPrice, setIsFocusCurrentPrice]: any = useState(false);
  const [isFocusQuantity, setIsFocusQuantity]: any = useState(false);

  const [inputFakePrice, setInputFakePrice]: any = useState();
  const [inputCurrentPrice, setInputCurrentPrice]: any = useState();
  const [inputQuantity, setInputQuantity]: any = useState();

  const columns = [
    {
      title: "Kích thước",
      render: (x: any) => <>{x.size(cacheData)}</>,
      width: 245,
    },
    {
      title: "Giá gốc",
      render: (x: any) => <>{x.originPrice(cacheData)}</>,
      width: 245,
      className: `${isFocusFakePrice ? "border border-indigo-600" : ""}`,
    },
    {
      title: "Giá sale",
      render: (x: any) => <>{x.currentPrice(cacheData)}</>,
      width: 245,
      className: `${isFocusCurrentPrice ? "border border-indigo-600" : ""}`,
    },
    {
      title: "Số lượng",
      render: (x: any) => <>{x.quantity(cacheData)}</>,
      width: 245,
      className: `${isFocusQuantity ? "border border-indigo-600" : ""}`,
    },
  ];

  const dataSample = (key: any) => {
    return {
      key: key,
      size: (ls: any) => (
        <>
          {props.detailPT.includes("Mũ") ? (
            <Form.Item className="mb-[10px]" name={"size-" + key}>
              <Input
                className="w-full"
                placeholder="ví dụ: S, M, v.v"
                maxLength={3}
                disabled
                onChange={(e) => handleInputSize(e, key, ls)}
              />
            </Form.Item>
          ) : (
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
                disabled
                onChange={(e) => handleInputSize(e, key, ls)}
              />
            </Form.Item>
          )}
        </>
      ),
      originPrice: (ls: any) => (
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
            onChange={(e) => handleInputOriginPrice(e, key, ls)}
          />
        </Form.Item>
      ),
      currentPrice: (ls: any) => (
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
            onChange={(e) => handleInputCurrrentPrice(e, key, ls)}
          />
        </Form.Item>
      ),
      quantity: (ls: any) => (
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
            onChange={(e) => handleInputQuantity(e, key, ls)}
          />
        </Form.Item>
      ),
    };
  };

  const handleImage = (e: any) => {
    let file = e;
    let formData = new FormData();
    formData.append("myFile", file);

    uploadImage(formData).then((res: any) => {
      console.log(res);
      setUrlImage(res);
    });
  };

  const removeImage = () => {
    if (urlImage !== props.data[0].image) {
      deleteImage(urlImage);
      setUrlImage("");
    } else {
      setUrlImage("");
    }
  };

  const handleInputSize = (e: any, key: any, ls: any) => {
    let index = findIndexData(key, ls);

    let c = { ...ls[index], size: e.target.value };
    ls[index] = c;
    setCacheData(ls);
  };

  const handleInputOriginPrice = (e: any, key: any, ls: any) => {
    let index = findIndexData(key, ls);

    let c = { ...ls[index], originalPrice: e };
    ls[index] = c;
    setCacheData(ls);
  };

  const handleInputCurrrentPrice = (e: any, key: any, ls: any) => {
    let index = findIndexData(key, ls);

    let c = { ...ls[index], currentPrice: e };
    ls[index] = c;
    setCacheData(ls);
  };

  const handleInputQuantity = (e: any, key: any, ls: any) => {
    let index = findIndexData(key, ls);

    let c = { ...ls[index], quantity: e };
    ls[index] = c;
    setCacheData(ls);
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

  const findIndexData = (key: any, ls: any) => {
    let index = ls.findIndex((x: any) => x.detailProductId === key);
    return index;
  };

  useEffect(() => {
    if (props.data) {
      console.log(props.data);
      setCacheData(Object.assign([], props.data));
      var cache: any = [];
      form.setFieldValue("color", props.data[0].color);
      setUrlImage(props.data[0].image);
      props.data.forEach((e: any, i: any) => {
        cache.push(dataSample(e.detailProductId));
        setListInput(cache);
      });
    }
  }, [props.data]);

  useEffect(() => {
    if (props.data) {
      if (listInput.length === props.data.length) {
        const fields = form.getFieldsValue();
        for (const [key, value] of Object.entries(fields)) {
          let cut = key.split("-");
          if (cut[1] && cut[2]) {
            let k = cut[1] + "-" + cut[2];
            let index = props.data.findIndex(
              (x: any) => x.detailProductId === k
            );
            if (cut[0] === "size") {
              form.setFieldValue(key, props.data[index].size);
            }
            if (cut[0] === "original") {
              form.setFieldValue(key, props.data[index].originalPrice);
            }
            if (cut[0] === "current") {
              form.setFieldValue(key, props.data[index].currentPrice);
            }
            if (cut[0] === "quantity") {
              form.setFieldValue(key, props.data[index].quantity);
            }
          }
        }
      }
    }
  }, [listInput]);

  useEffect(() => {
    if (props.updateStatus) {
      props.setUpdateStatus("");
      closeModal();
    }
  }, [props.updateStatus]);

  const closeModal = () => {
    setListInput([]);
    setInputFakePrice("");
    setIsFocusCurrentPrice("");
    setInputQuantity("");
    form.resetFields();
    props.setIsOpenModalUpdateDetailProduct(false);
  };

  const updateDP = (values: any) => {
    if (urlImage && urlImage !== props.data[0].image) {
      let pre: any = [];
      let pre2: any = [];
      let pre3: any = [];
      let hasUp1 = false;
      let hasUp2 = false;
      cacheData.forEach((e: any, i: any) => {
        if (
          e.originalPrice !== props.data[i].originalPrice ||
          e.currentPrice !== props.data[i].currentPrice
        ) {
          hasUp1 = true;
          let dtP = { ...e, image: urlImage, page: props.page };
          pre.push(dtP);
        } else if (e.quantity !== props.data[i].quantity) {
          hasUp2 = true;
          let dtP = { ...e, image: urlImage, page: props.page };
          pre2.push(dtP);
        } else {
          let dtP = { ...e, image: urlImage, page: props.page };
          pre3.push(dtP);
        }
      });
      if (hasUp1) {
        props.updateAndDeleteDetailProduct(pre);
      }
      if (hasUp2) {
        props.updateDetailProduct(pre2);
      }
      if (!hasUp1 && !hasUp2) {
        props.updateDetailProduct(pre3);
      }
    } else {
      let hasUp1 = false;
      let hasUp2 = false;
      let pre: any = [];
      let pre2: any = [];
      cacheData.forEach((e: any, i: any) => {
        if (
          e.originalPrice !== props.data[i].originalPrice ||
          e.currentPrice !== props.data[i].currentPrice
        ) {
          hasUp1 = true;
          let dtP = { ...e, page: props.page };
          pre.push(dtP);
        } else {
          if (e.quantity !== props.data[i].quantity) {
            hasUp2 = true;
            let dtP = { ...e, page: props.page };
            pre2.push(dtP);
          }
        }
      });
      if (hasUp1) {
        props.updateAndDeleteDetailProduct(pre);
      }
      if (hasUp2) {
        props.updateDetailProduct(pre2);
      }
    }
  };

  return (
    <Modal
      title="Sửa chi tiết sản phẩm"
      open={props.isOpenModalUpdateDetailProduct}
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
                    src={`${BACKEND}/${urlImage}`}
                    width={110}
                    loading="lazy"
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
              labelCol={{ span: 7 }}
              rules={[
                { required: true, message: "Không được để trống ô" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    let find = false;
                    for (let i = 0; i < props.color.length; i++) {
                      if (props.color[i] === value) {
                        find = true;
                      }
                    }
                    if (find) {
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
                disabled
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
