import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Space,
  Table,
  TreeSelect,
  Upload,
} from "antd";
import uniqid from "uniqid";
import { PlusOutlined } from "@ant-design/icons";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  uploadImage,
  deleteImage,
} from "../../../../../app/API/Product/Product";

const { TextArea } = Input;

export default function AddProduct(props: any) {
  const [form]: any = Form.useForm();
  const [detailProductList, setDetailProductList]: any = useState([]);
  const [dataConvert, setDataConvert]: any = useState({
    productName: "",
    detailPTId: "",
    description: "",
    detailProduct: [],
  });
  const [treeSelectData, setTreeSelectData]: any = useState();

  const [isFocusFakePrice, setIsFocusFakePrice]: any = useState(false);
  const [isFocusCurrentPrice, setIsFocusCurrentPrice]: any = useState(false);
  const [isFocusQuantity, setIsFocusQuantity]: any = useState(false);

  const [inputFakePrice, setInputFakePrice]: any = useState();
  const [inputCurrentPrice, setInputCurrentPrice]: any = useState();
  const [inputQuantity, setInputQuantity]: any = useState();

  useEffect(() => {
    let key = uniqid();

    let data = {
      key: key,
      subDetail: [],
    };
    dataConvert.detailProduct.push(data);

    let dt = Object.assign({}, dataSample);
    dt.key = key;
    let cache = [dt, buttonAdd];
    setDetailProductList(cache);
    handleAddSize(key, cache);
  }, []);

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
    if (props.addStatus === "success") {
      props.setAddStatus("");
      form.resetFields();
      setInputFakePrice("");
      setInputCurrentPrice("");
      setInputQuantity("");

      setDetailProductList([]);
      let key = uniqid();

      let data = {
        key: key,
        subDetail: [],
      };

      dataConvert.productName = "";
      dataConvert.detailPTId = "";
      dataConvert.description = "";
      dataConvert.detailProduct = [data];

      let dt = Object.assign({}, dataSample);
      dt.key = key;
      let cache = [dt, buttonAdd];
      setDetailProductList(cache);
      handleAddSize(key, cache);

      props.setIsOpenModalAdd(false);
    }
    props.setAddStatus("");
  }, [props.addStatus]);

  const columnsExpand = [
    {
      title: "Hình ảnh",
      render: (x: any) => <>{x.image(x.urlImage, x.key, detailProductList)}</>,
      onCell: (_: any, index: any) => ({
        colSpan: index === detailProductList.length - 1 ? 7 : 1,
      }),
      with: 110,
    },
    {
      title: "Màu sắc",
      render: (x: any) => <>{x.color(x.key)}</>,
      width: 245,
      onCell: (_: any, index: any) => ({
        colSpan: index === detailProductList.length - 1 ? 0 : 1,
      }),
    },
    {
      title: "Kích thước",
      render: (x: any) => <>{x.size(x.sizeLength, x.key, detailProductList)}</>,
      width: 245,
      onCell: (_: any, index: any) => ({
        colSpan: index === detailProductList.length - 1 ? 0 : 1,
      }),
    },
    {
      title: "Giá gốc",
      render: (x: any) => <>{x.originPrice(x.originLength)}</>,
      width: 245,
      onCell: (_: any, index: any) => ({
        colSpan: index === detailProductList.length - 1 ? 0 : 1,
      }),
      className: `${isFocusFakePrice ? "border border-indigo-600" : ""}`,
    },
    {
      title: "Giá sale",
      render: (x: any) => <>{x.currentPrice(x.currentLength)}</>,
      width: 245,
      onCell: (_: any, index: any) => ({
        colSpan: index === detailProductList.length - 1 ? 0 : 1,
      }),
      className: `${isFocusCurrentPrice ? "border border-indigo-600" : ""}`,
    },
    {
      title: "Số lượng",
      render: (x: any) => <>{x.quantity(x.quantityLength)}</>,
      width: 245,
      onCell: (_: any, index: any) => ({
        colSpan: index === detailProductList.length - 1 ? 0 : 1,
      }),
      className: `${isFocusQuantity ? "border border-indigo-600" : ""}`,
    },
    {
      title: "Xóa",
      render: (e: any, index: any) =>
        detailProductList.length - 1 > 1 &&
        index !== detailProductList.length - 1 ? (
          <Popconfirm
            title="Bạn có muốn xóa không?"
            onConfirm={() => {
              removeImage(e.key, detailProductList);
              deleteDetailProduct(e.key);
            }}
          >
            <a>Xóa</a>
          </Popconfirm>
        ) : (
          ""
        ),
      width: 70,
      onCell: (_: any, index: any) => ({
        colSpan: index === detailProductList.length - 1 ? 0 : 1,
      }),
    },
  ];

  const dataSample = {
    key: "",
    urlImage: "",
    sizeLength: [],
    originLength: [],
    currentLength: [],
    quantityLength: [],
    image: (url: any, key: any, ls: any) => (
      <>
        {url ? (
          <div className="relative">
            <img className="img-upload-preview" src={url} width={110} />
            <div className="absolute bottom-0 w-[110px] h-[25px] bg-[#0000004f] img-upload">
              <div className="flex items-center justify-center h-full text-white">
                <AiOutlineDelete
                  className=" cursor-pointer"
                  onClick={() => removeImage(key, ls)}
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
              handleImage(e, key, ls);
            }}
          >
            {url ? (
              <Image src={url} />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        )}
      </>
    ),
    color: (key: any) => (
      <Form.Item
        className="mb-[10px]"
        name={key}
        rules={[{ required: true, message: "Không được để trống ô" }]}
      >
        <Input
          className="w-full"
          placeholder="ví dụ: Trắng, Đỏ v.v"
          maxLength={30}
          onChange={(e: any) => {
            handleInputColor(e, key);
          }}
        />
      </Form.Item>
    ),
    size: (q: any, key: any, ls: any) => (
      <div className="flex justify-center flex-col">
        {q.map((e: any, i: any) => {
          return e.e;
        })}
        <Button
          icon={<AiOutlinePlus />}
          className="flex items-center justify-center"
          type="primary"
          onClick={() => handleAddSize(key, ls)}
        >
          Thêm kích thước
        </Button>
      </div>
    ),
    originPrice: (q: any) => (
      <div className="flex justify-center flex-col">
        {q.map((e: any, i: any) => {
          return e.e;
        })}
        <div className="h-[32px]"></div>
      </div>
    ),
    currentPrice: (q: any) => (
      <div className="flex justify-center flex-col">
        {q.map((e: any, i: any) => {
          return e.e;
        })}
        <div className="h-[32px]"></div>
      </div>
    ),
    quantity: (q: any) => (
      <div className="flex justify-center flex-col">
        {q.map((e: any, i: any) => {
          return e.e;
        })}
        <div className="h-[32px]"></div>
      </div>
    ),
  };
  const buttonAdd = {
    key: uniqid(),
    urlImage: "",
    sizeLength: [],
    originLength: [],
    currentLength: [],
    quantityLength: [],
    image: (url: any, k: any, ls: any) => (
      <Button
        type="primary"
        onClick={() => {
          let key = uniqid();

          let data = {
            key: key,
            subDetail: [],
          };
          dataConvert.detailProduct.push(data);

          let dt = {
            key: "",
            urlImage: "",
            sizeLength: [],
            originLength: [],
            currentLength: [],
            quantityLength: [],
            image: (url: any, key: any, ls: any) => (
              <>
                {url ? (
                  <div className="relative">
                    <img className="img-upload-preview" src={url} width={110} />
                    <div className="absolute bottom-0 w-[110px] h-[25px] bg-[#0000004f] img-upload">
                      <div className="flex items-center justify-center h-full text-white">
                        <AiOutlineDelete
                          className=" cursor-pointer"
                          onClick={() => removeImage(key, ls)}
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
                      handleImage(e, key, ls);
                    }}
                  >
                    {url ? (
                      <Image src={url} />
                    ) : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                )}
              </>
            ),
            color: (key: any) => (
              <Form.Item
                className="mb-[10px]"
                name={key}
                rules={[{ required: true, message: "Không được để trống ô" }]}
              >
                <Input
                  className="w-full"
                  placeholder="ví dụ: Trắng, Đỏ v.v"
                  maxLength={30}
                  onChange={(e: any) => {
                    handleInputColor(e, key);
                  }}
                />
              </Form.Item>
            ),
            size: (q: any, key: any, ls: any) => (
              <div className="flex justify-center flex-col">
                {q.map((e: any, i: any) => {
                  return e.e;
                })}
                <Button
                  icon={<AiOutlinePlus />}
                  className="flex items-center justify-center"
                  type="primary"
                  onClick={() => handleAddSize(key, ls)}
                >
                  Thêm kích thước
                </Button>
              </div>
            ),
            originPrice: (q: any) => (
              <div className="flex justify-center flex-col">
                {q.map((e: any, i: any) => {
                  return e.e;
                })}
                <div className="h-[32px]"></div>
              </div>
            ),
            currentPrice: (q: any) => (
              <div className="flex justify-center flex-col">
                {q.map((e: any, i: any) => {
                  return e.e;
                })}
                <div className="h-[32px]"></div>
              </div>
            ),
            quantity: (q: any) => (
              <div className="flex justify-center flex-col">
                {q.map((e: any, i: any) => {
                  return e.e;
                })}
                <div className="h-[32px]"></div>
              </div>
            ),
          };
          dt.key = key;

          let cache = ls;
          cache.splice(cache.length - 1, 0, dt);

          setDetailProductList(cache);
          handleAddSize(key, cache);
        }}
      >
        Thêm chi tiết sản phẩm
      </Button>
    ),
    color: (key: any) => <></>,
    size: (q: any, key: any, ls: any) => <></>,
    originPrice: (q: any) => <></>,
    currentPrice: (q: any) => <></>,
    quantity: (q: any) => <></>,
  };

  const handleImage = (e: any, key: any, ls: any) => {
    let file = e;
    let formData = new FormData();
    formData.append("myFile", file);

    uploadImage(formData).then((res: any) => {
      let index = ls.findIndex((x: any) => x.key === key);

      ls[index].urlImage = `http://localhost:5000/${res}`;
      setDetailProductList([...ls]);

      let indexD = findIndexData(key);
      dataConvert.detailProduct[indexD].image = res;
    });
  };

  const removeImage = (key: any, ls: any) => {
    let index = ls.findIndex((x: any) => x.key === key);

    ls[index].urlImage = "";
    setDetailProductList([...ls]);

    let image = "";

    let indexD = findIndexData(key);
    image = dataConvert.detailProduct[indexD].image;
    dataConvert.detailProduct[indexD].image = "";

    if (image) {
      deleteImage(image);
    }
  };

  const handleAddSize = (key: any, ls: any) => {
    let index = ls.findIndex((x: any) => x.key === key);
    let kInput = uniqid();
    let indexDt = findIndexData(key);

    let dt = {
      key: kInput,
      originalPrice: 0,
      currentPrice: 0,
      quantity: 0,
    };

    dataConvert.detailProduct[indexDt].subDetail.push(dt);

    ls[index].sizeLength.push({
      key: kInput,
      e: (
        <Form.Item
          key={uniqid()}
          className="mb-[10px]"
          name={uniqid()}
          rules={[{ required: true, message: "Không được để trống ô" }]}
        >
          {ls[index].sizeLength.length > 0 ? (
            <Space direction="horizontal">
              <Input
                className={`${
                  ls[index].sizeLength.length > 0 ? "" : "w-full"
                } `}
                placeholder="ví dụ: S, M, v.v"
                onChange={(e) => handleInputSize(e, key, kInput)}
                maxLength={3}
              />
              {ls[index].sizeLength.length > 0 ? (
                <Button
                  className="flex items-center justify-center"
                  icon={<AiOutlineMinus />}
                  onClick={() => handleMinusSize(key, ls, kInput)}
                />
              ) : (
                ""
              )}
            </Space>
          ) : (
            <Input
              className={`${ls[index].sizeLength.length > 0 ? "" : "w-full"} `}
              placeholder="ví dụ: S, M, v.v"
              onChange={(e) => handleInputSize(e, key, kInput)}
              maxLength={3}
            />
          )}
        </Form.Item>
      ),
    });
    ls[index].originLength.push({
      key: kInput,
      e: (
        <Form.Item
          key={uniqid()}
          className="mb-[10px]"
          name={"original-" + uniqid()}
          rules={[{ required: true, message: "Không được để trống ô" }]}
        >
          <InputNumber
            key={uniqid()}
            min={0}
            className="w-full"
            prefix="₫"
            placeholder="Nhập vào"
            onChange={(e) => {
              handleInputOriginPrice(e, key, kInput);
            }}
          />
        </Form.Item>
      ),
    });
    ls[index].currentLength.push({
      key: kInput,
      e: (
        <Form.Item
          key={uniqid()}
          className="mb-[10px]"
          name={"current-" + uniqid()}
          rules={[{ required: true, message: "Không được để trống ô" }]}
        >
          <InputNumber
            min={0}
            className="w-full"
            prefix="₫"
            placeholder="Nhập vào"
            onChange={(e) => handleInputCurrrentPrice(e, key, kInput)}
          />
        </Form.Item>
      ),
    });
    ls[index].quantityLength.push({
      key: kInput,
      e: (
        <Form.Item
          key={uniqid()}
          className="mb-[10px]"
          name={"quantity-" + uniqid()}
          rules={[{ required: true, message: "Không được để trống ô" }]}
        >
          <InputNumber
            min={0}
            className="w-full"
            placeholder="Nhập vào"
            onChange={(e) => handleInputQuantity(e, key, kInput)}
          />
        </Form.Item>
      ),
    });

    setDetailProductList([...ls]);
  };

  const handleMinusSize = (key: any, ls: any, kInput: any) => {
    let index = ls.findIndex((x: any) => x.key === key);
    let indexI = ls[index].sizeLength.findIndex((x: any) => x.key === kInput);
    ls[index].sizeLength.splice(indexI, 1);
    ls[index].originLength.splice(indexI, 1);
    ls[index].currentLength.splice(indexI, 1);
    ls[index].quantityLength.splice(indexI, 1);
    setDetailProductList([...ls]);

    let indexD = findIndexData(key);
    let indexS = findIndexSub(
      kInput,
      dataConvert.detailProduct[indexD].subDetail
    );
    dataConvert.detailProduct[indexD].subDetail.splice(indexS, 1);
  };

  const deleteDetailProduct = (key: any) => {
    let index = detailProductList.findIndex((e: any) => e.key === key);

    if (index > -1) {
      detailProductList.splice(index, 1);
      setDetailProductList([...detailProductList]);
    }

    let indexD = findIndexData(key);
    dataConvert.detailProduct.splice(indexD, 1);
  };

  const handleInputColor = (e: any, key: any) => {
    let index = findIndexData(key);
    dataConvert.detailProduct[index].color = e.target.value;
  };

  const handleInputSize = (e: any, key: any, kInput: any) => {
    let index = findIndexData(key);
    let indexS = findIndexSub(
      kInput,
      dataConvert.detailProduct[index].subDetail
    );
    dataConvert.detailProduct[index].subDetail[indexS].size = e.target.value;
  };

  const handleInputOriginPrice = (e: any, key: any, kInput: any) => {
    let index = findIndexData(key);
    let indexS = findIndexSub(
      kInput,
      dataConvert.detailProduct[index].subDetail
    );
    dataConvert.detailProduct[index].subDetail[indexS].originalPrice = e;
  };

  const handleInputCurrrentPrice = (e: any, key: any, kInput: any) => {
    let index = findIndexData(key);
    let indexS = findIndexSub(
      kInput,
      dataConvert.detailProduct[index].subDetail
    );
    dataConvert.detailProduct[index].subDetail[indexS].currentPrice = e;
  };

  const handleInputQuantity = (e: any, key: any, kInput: any) => {
    let index = findIndexData(key);
    let indexS = findIndexSub(
      kInput,
      dataConvert.detailProduct[index].subDetail
    );
    dataConvert.detailProduct[index].subDetail[indexS].quantity = e;
  };

  const applyForAll = () => {
    let fields = form.getFieldsValue();

    for (const [key, value] of Object.entries(fields)) {
      if (inputFakePrice) {
        if (key.split("-")[0] === "original") {
          form.setFieldValue(key, inputFakePrice);
        }
      }
      if (inputCurrentPrice) {
        if (key.split("-")[0] === "current") {
          form.setFieldValue(key, inputFakePrice);
        }
      }
      if (inputQuantity) {
        if (key.split("-")[0] === "quantity") {
          form.setFieldValue(key, inputFakePrice);
        }
      }
    }

    dataConvert.detailProduct.forEach((e: any) => {
      e.subDetail.forEach((e1: any) => {
        if (inputFakePrice) e1.originalPrice = inputFakePrice;
        if (inputCurrentPrice) e1.currentPrice = inputCurrentPrice;
        if (inputQuantity) e1.quantity = inputQuantity;
      });
    });
  };

  const handleAddDetailProduct = () => {
    props.addProduct(dataConvert);
  };

  const findIndexData = (key: any) => {
    let index = dataConvert.detailProduct.findIndex((x: any) => x.key === key);
    return index;
  };

  const findIndexSub = (key: any, ls: any) => {
    let index = ls.findIndex((x: any) => x.key === key);
    return index;
  };

  return (
    <Modal
      title="Thêm sản phẩm"
      open={props.isOpenModalAdd}
      maskClosable={false}
      onCancel={() => props.setIsOpenModalAdd(false)}
      width={"80%"}
      footer={null}
      style={{ top: 30 }}
    >
      <Form
        colon={false}
        labelCol={{
          sm: { span: 8 },
          md: { span: 7 },
          lg: { span: 5 },
          xl: { span: 4 },
        }}
        onFinish={(values) => handleAddDetailProduct()}
        form={form}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="productName"
          rules={[{ required: true, message: "Nhập tên sản phẩm!" }]}
        >
          <Input
            maxLength={100}
            showCount={true}
            onChange={(e: any) => {
              dataConvert.productName = e.target.value;
            }}
          />
        </Form.Item>
        <Form.Item
          label="Chọn loại sản phẩm"
          name="productType"
          rules={[{ required: true, message: "Chọn loại sản phẩm!" }]}
        >
          <TreeSelect
            treeLine
            treeData={treeSelectData}
            onChange={(e) => {
              dataConvert.detailPTId = e;
            }}
          />
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
            onChange={(e: any) => {
              dataConvert.description = e.target.value;
            }}
          />
        </Form.Item>
        <Form.Item
          label="Chi tiết sản phẩm"
          name="detailProduct"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Table
            title={() => (
              <div className=" w-full block md:flex">
                <div className="w-full md:w-[20%] mb-[10px] md:mb-0 md:mr-[10px]">
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
                <div className="w-[100%] md:w-[20%] mb-[10px] md:mb-0 md:mr-[10px]">
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
                <div className="w-[100%] md:w-[20%] mb-[10px] md:mb-0 md:mr-[10px]">
                  <InputNumber
                    placeholder="Số lượng"
                    className="w-full"
                    onFocus={() => setIsFocusQuantity(true)}
                    onBlur={() => setIsFocusQuantity(false)}
                    value={inputQuantity}
                    onChange={(e) => setInputQuantity(e)}
                  />
                </div>

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
            )}
            columns={columnsExpand}
            dataSource={[...detailProductList]}
            pagination={false}
            rowKey={"key"}
            scroll={{ x: "max-content" }}
          ></Table>
        </Form.Item>
        <Form.Item>
          <div className="flex justify-center">
            <Button type="primary" className="mr-[10px]" htmlType="submit">
              Thêm
            </Button>
            <Button onClick={() => props.setIsOpenModalAdd(false)}>Hủy</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
