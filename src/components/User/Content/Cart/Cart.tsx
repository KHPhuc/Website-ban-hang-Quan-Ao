import {
  Input,
  Select,
  Radio,
  Space,
  Checkbox,
  Form,
  Button,
  Skeleton,
} from "antd";
import { findLevel1ById, level1s, findLevel1ByName } from "dvhcvn";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { NumericFormat } from "react-number-format";
import FooterAntd from "../../../common/Footer/Footer";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { setDetailCart } from "../../../../app/API/Cart/Cart";
import { useNavigate } from "react-router-dom";
import { BACKEND } from "../../../common/Config/Config";

export default function Cart({
  auth,

  payment,
  getPaymentUser,

  detailCart,
  getDetailCart,
  getCart,

  address,
  getAddress,

  createOrder,

  linkToPay,
  setLinkToPay,

  updateCart,
  deleteCart,
}: any) {
  const [form]: any = Form.useForm();
  const nav = useNavigate();
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");

  const [paymentSelect, setPaymentSelect]: any = useState(0);
  const [totalCurrent, setTotalCurrent]: any = useState(0);
  const [totalSave, setTotalSave]: any = useState(0);

  const [loadingHandleCart, setLoadingHandleCart]: any = useState(false);

  useEffect(() => {
    getPaymentUser();
    getDetailCart(auth.id);
    getAddress(auth.id);

    form.setFieldsValue({
      name: auth.name,
      phoneNumber: auth.phoneNumber,
      email: auth.email,
    });
  }, []);

  useEffect(() => {
    if (payment) {
      setPaymentSelect(0);
    }
  }, [payment]);

  useEffect(() => {
    if (address) {
      form.setFieldsValue({
        address: address.address,
        city: address.city,
        district: address.district,
        ward: address.ward,
        name: address.name,
        phoneNumber: address.phoneNumber,
        email: address.email,
      });
    }
  }, [address]);

  useEffect(() => {
    if (detailCart) {
      let x = detailCart.reduce(
        (x1: any, x2: any) => x1 + x2.currentPrice * x2.quantity,
        0
      );
      setTotalCurrent(x);
      let y =
        detailCart.reduce(
          (y1: any, y2: any) => y1 + y2.originalPrice * y2.quantity,
          0
        ) - x;
      setTotalSave(y);
    }
  }, [detailCart]);

  useEffect(() => {
    if (linkToPay) {
      if (typeof linkToPay === "string") {
        setLinkToPay("");
        window.open(linkToPay, "_self");
      } else {
        setLinkToPay("");
        nav("../order-success");
      }
    }
  }, [linkToPay]);

  const onChangeCity = (e: any) => {
    if (e !== city) {
      setCity(e);
      setDistrict("");
      form.setFieldsValue({
        district: null,
        ward: null,
      });
    }
  };

  const onChangeDistrict = (e: any) => {
    if (e !== district) {
      setDistrict(e);
      form.setFieldsValue({
        ward: null,
      });
    }
  };

  const handleOrder = (e: any) => {
    if (detailCart.length) {
      let money = detailCart.reduce(
        (x1: any, x2: any) => x1 + x2.currentPrice,
        0
      );
      if (
        e.name !== address.name ||
        e.phoneNumber !== address.phoneNumber ||
        e.email !== address.email ||
        e.address !== address.address ||
        e.ward !== address.ward ||
        e.district !== address.district ||
        e.city !== address.city
      ) {
        var cache: any = {
          address: e.address,
          ward: e.ward,
          district: e.district,
          city: e.city,
          name: e.name,
          phoneNumber: e.phoneNumber,
          email: e.email,
          customerId: auth.id,
          totalMoney: money,
          orderDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          orderStatus: "Chuẩn bị hàng",
          paymentMethodId: payment[paymentSelect].paymentMethodId,
          paymentStatus:
            payment[paymentSelect].paymentMethodId === "PM-01"
              ? "Thanh toán khi nhận hàng"
              : payment[paymentSelect].paymentMethodId === "PM-02"
              ? "Chưa thanh toán"
              : "",
          note: e.note,
          listProduct: [],
        };
      } else {
        var cache: any = {
          addressId: address.addressId,
          customerId: auth.id,
          totalMoney: money,
          orderDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          orderStatus: "Chuẩn bị hàng",
          paymentMethodId: payment[paymentSelect].paymentMethodId,
          paymentStatus:
            payment[paymentSelect].paymentMethodId === "PM-01"
              ? "Thanh toán khi nhận hàng"
              : payment[paymentSelect].paymentMethodId === "PM-02"
              ? "Chưa thanh toán"
              : "",
          note: e.note,
          listProduct: [],
        };
      }
      detailCart.forEach((e1: any) => {
        cache.listProduct.push({
          detailProductId: e1.detailProductId,
          quantity: e1.quantity,
        });
      });
      // console.log(cache);
      createOrder(cache);
    } else {
    }
  };

  const changeQuantity = (n: any, e: any) => {
    if (n === 1) {
      if (e.quantity + 1 <= e.kho) {
        if (auth) {
          updateCart({
            customerId: auth.id,
            detailProductId: e.detailProductId,
            quantity: e.quantity + 1,
          });
        }
      } else {
        toast.warning("Vượt quá số lượng hàng còn!", { containerId: "CT" });
      }
    } else if (n === -1) {
      if (e.quantity > 1) {
        if (auth) {
          updateCart({
            customerId: auth.id,
            detailProductId: e.detailProductId,
            quantity: e.quantity - 1,
          });
        }
      } else {
        toast.warning("Tối thiểu 1 cái!", { containerId: "CT" });
      }
    }
  };

  const handleDeleteCart = (e: any) => {
    if (auth) {
      deleteCart({ customerId: auth.id, detailProductId: e.detailProductId });
    }
  };

  return (
    <>
      <div className="home  pb-[0.5rem]">
        <div
          className="container md:flex md:flex-row-reverse"
          style={{ marginTop: "0.3rem" }}
        >
          <div className="md:w-[45%] md:pl-1">
            <div>
              <h1
                style={{
                  fontSize: "0.3rem",
                  lineHeight: "0.45rem",
                  fontWeight: 700,
                }}
              >
                Giỏ hàng
              </h1>
              <div style={{ marginTop: "0.35rem" }}>
                <Space className="w-full" direction="vertical" size={"middle"}>
                  {loadingHandleCart ? (
                    <div className="flex" style={{ width: "100%" }}>
                      <div style={{ width: "125px" }}>
                        <Skeleton.Image
                          className="w-[125px] h-[150px]"
                          active={loadingHandleCart}
                        />
                      </div>
                      <div
                        className="flex flex-col justify-between w-full"
                        style={{
                          width: "calc(100%-125px)",
                          marginLeft: "0.3rem",
                        }}
                      >
                        <div className="flex justify-between">
                          <Skeleton.Input
                            className="w-full"
                            active={loadingHandleCart}
                            size={"small"}
                          />
                          <IoIosClose
                            size={30}
                            style={{ cursor: "pointer" }}
                            // onClick={() => handleDeleteCart(e)}
                          />
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <Skeleton.Input
                              active={loadingHandleCart}
                              size={"small"}
                            />
                          </div>
                          <div className="items-end flex">
                            <Skeleton.Input
                              active={loadingHandleCart}
                              size={"small"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {detailCart
                        ? detailCart.map((e: any, i: any) => {
                            return (
                              <div
                                key={i}
                                className="flex"
                                style={{ width: "100%" }}
                              >
                                <div style={{ width: "125px" }}>
                                  <img
                                    src={`${BACKEND}/${e.image}`}
                                    alt=""
                                    style={{
                                      width: "125px",
                                      borderRadius: "10px",
                                    }}
                                    loading="lazy"
                                  />
                                </div>
                                <div
                                  className="flex flex-col justify-between w-full"
                                  style={{
                                    width: "calc(100%-125px)",
                                    marginLeft: "0.3rem",
                                  }}
                                >
                                  <div className="flex justify-between">
                                    <h1
                                      style={{
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        paddingRight: "15px",
                                      }}
                                    >
                                      {e.productName}
                                    </h1>
                                    <IoIosClose
                                      size={30}
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handleDeleteCart(e)}
                                    />
                                  </div>
                                  <div className="flex justify-between">
                                    <div>
                                      <div
                                        className="flex"
                                        style={{ marginBottom: "10px" }}
                                      >
                                        <div className="box-infor-cart">
                                          {e.color}
                                        </div>
                                        <div className="box-infor-cart">
                                          {e.size}
                                        </div>
                                      </div>
                                      <div className="w-[20px]">
                                        <div className="button-number-cart flex items-center justify-center">
                                          <button
                                            className="add"
                                            onClick={() =>
                                              changeQuantity(-1, e)
                                            }
                                          >
                                            -
                                          </button>
                                          <div>{e.quantity}</div>
                                          <button
                                            className="minus"
                                            onClick={() => changeQuantity(1, e)}
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="items-end flex">
                                      <div className="flex flex-col">
                                        <NumericFormat
                                          displayType={"text"}
                                          thousandSeparator={"."}
                                          decimalSeparator={","}
                                          suffix={" ₫"}
                                          value={e.currentPrice * e.quantity}
                                        />
                                        <NumericFormat
                                          className=" line-through text-[#d9d9d9]"
                                          displayType={"text"}
                                          thousandSeparator={"."}
                                          decimalSeparator={","}
                                          suffix={" ₫"}
                                          value={e.originalPrice * e.quantity}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : ""}
                    </>
                  )}
                </Space>
              </div>
              <div
                style={{
                  borderTop: "1px solid #d9d9d9",
                  marginTop: "0.3rem",
                  fontWeight: 500,
                }}
              >
                <div className="flex justify-between mt-1">
                  <p>Tạm tính</p>
                  <div style={{ textAlign: "end" }}>
                    {loadingHandleCart ? (
                      <Skeleton.Input
                        active={loadingHandleCart}
                        size={"small"}
                      />
                    ) : (
                      <>
                        <NumericFormat
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          suffix={" ₫"}
                          value={totalCurrent}
                        />
                        <p>
                          (tiết kiệm{" "}
                          <i className="text-[#2f5acf]">
                            <NumericFormat
                              displayType={"text"}
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              suffix={" ₫"}
                              value={totalSave}
                            />
                          </i>
                          )
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <p>Phí giao hàng</p>
                  {loadingHandleCart ? (
                    <Skeleton.Input active={loadingHandleCart} size={"small"} />
                  ) : (
                    <p>Miễn phí</p>
                  )}
                </div>
              </div>
              <div
                style={{
                  borderTop: "1px solid #d9d9d9",
                  marginTop: "0.3rem",
                  fontWeight: 500,
                }}
              >
                <div className="flex justify-between mt-1">
                  <p>Tổng</p>
                  {loadingHandleCart ? (
                    <Skeleton.Input active={loadingHandleCart} size={"small"} />
                  ) : (
                    <p style={{ fontSize: "0.3rem" }}>
                      <NumericFormat
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        suffix={" ₫"}
                        value={totalCurrent}
                      />
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[55%] borderRight md:pr-1 mt-[0.3rem] md:mt-0">
            <Form form={form} onFinish={(e) => handleOrder(e)}>
              <div>
                <h1
                  style={{
                    fontSize: "0.3rem",
                    lineHeight: "0.45rem",
                    fontWeight: 700,
                  }}
                >
                  Thông tin vận chuyển
                </h1>
              </div>
              <div
                className="grid grid-cols-2 gap-1"
                style={{ marginTop: "0.35rem" }}
              >
                <Form.Item
                  className="mb-0"
                  name="name"
                  rules={[{ required: true, message: "Không được bỏ trống!" }]}
                >
                  <Input placeholder="Họ tên" />
                </Form.Item>

                <Form.Item
                  className="mb-0"
                  name="phoneNumber"
                  rules={[{ required: true, message: "Không được bỏ trống!" }]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item
                  className="mb-0 col-span-2"
                  name="email"
                  rules={[{ required: true, message: "Không được bỏ trống!" }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="mb-0 col-span-2"
                  name="address"
                  rules={[{ required: true, message: "Không được bỏ trống!" }]}
                >
                  <Input
                    placeholder="Địa chỉ (ví dụ: 103 Vạn Phúc, phường Vạn Phúc)"
                    className=" col-span-2"
                  />
                </Form.Item>
                <div className="col-span-2 grid grid-cols-3 gap-1">
                  <Form.Item
                    className="mb-0 col-span-3 md:col-span-1"
                    name="city"
                    rules={[
                      { required: true, message: "Không được bỏ trống!" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn Tỉnh/Thành"
                      onChange={(e) => onChangeCity(e)}
                      options={level1s.map((e: any, i: any) => {
                        return {
                          value: e.name,
                          label: e.name,
                        };
                      })}
                    />
                  </Form.Item>
                  <Form.Item
                    className="mb-0 col-span-3 md:col-span-1"
                    name="district"
                    rules={[
                      { required: true, message: "Không được bỏ trống!" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn Quận/Huyện"
                      onChange={(e) => onChangeDistrict(e)}
                      options={findLevel1ByName(city)?.children?.map(
                        (e: any, i: any) => {
                          return {
                            value: e.name,
                            label: e.name,
                          };
                        }
                      )}
                    />
                  </Form.Item>
                  <Form.Item
                    className="mb-0 col-span-3 md:col-span-1"
                    name="ward"
                    rules={[
                      { required: true, message: "Không được bỏ trống!" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn Phường/Xã"
                      onChange={(e) => setVillage(e)}
                      options={findLevel1ByName(city)
                        ?.findLevel2ByName(district)
                        ?.children?.map((e: any, i: any) => {
                          return {
                            value: e.name,
                            label: e.name,
                          };
                        })}
                    />
                  </Form.Item>
                </div>
                <Form.Item className="mb-0 col-span-2" name="note">
                  <Input placeholder="Ghi chú thêm" />
                </Form.Item>
              </div>
              <div style={{ marginTop: "0.45rem" }}>
                <h1
                  style={{
                    fontSize: "0.3rem",
                    lineHeight: "0.45rem",
                    fontWeight: 700,
                  }}
                >
                  Hình thức thanh toán
                </h1>
              </div>
              <Radio.Group
                className="w-full"
                style={{ marginTop: "0.3rem" }}
                value={paymentSelect}
                onChange={(e) => setPaymentSelect(e.target.value)}
              >
                <Space direction="vertical" className="w-full">
                  {payment
                    ? payment.map((e: any, i: any) => {
                        return (
                          <div
                            key={i}
                            style={{
                              border: `1px solid ${
                                paymentSelect === i ? "#eb6440" : "#D9D9D9"
                              }`,
                              width: "100%",
                              borderRadius: "15px",
                              padding: "0.2rem 0.25rem",
                            }}
                          >
                            <Radio value={i} className="flex items-center">
                              <div
                                style={{
                                  width: "100%",
                                }}
                                className="flex items-center"
                              >
                                <div
                                  style={{ width: "55px", marginRight: "10px" }}
                                  className="flex justify-center"
                                >
                                  <img
                                    src={`${BACKEND}/${e.icon}`}
                                    alt=""
                                    style={{
                                      height: "35px",
                                      width: "35px",
                                    }}
                                    loading="lazy"
                                  />
                                </div>
                                <div>
                                  <div>{e.paymentMethodName}</div>
                                  <div>{e.description}</div>
                                </div>
                              </div>
                            </Radio>
                          </div>
                        );
                      })
                    : ""}
                </Space>
              </Radio.Group>
              <div style={{ marginTop: "0.3rem", width: "100%" }}>
                <Button
                  className={` ${
                    detailCart.length ? "button-pay" : "button-pay-disabled"
                  }`}
                  style={{ width: "100%", height: "0.8rem" }}
                  htmlType="submit"
                >
                  Thanh toán (
                  {payment ? payment[paymentSelect].paymentMethodName : ""})
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
