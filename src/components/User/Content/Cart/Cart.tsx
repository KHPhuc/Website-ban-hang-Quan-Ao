import { Input, Select, Radio, Space, Checkbox } from "antd";
import { findLevel1ById, level1s } from "dvhcvn";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import FooterAntd from "../../../common/Footer/Footer";

export default function Cart() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");

  return (
    <>
      <div className="home">
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
                <Checkbox.Group className="w-full">
                  <Space className="w-full" direction="vertical">
                    <div
                      className="w-full flex"
                      style={{ marginBottom: "10px" }}
                    >
                      <Checkbox
                        value={1}
                        className="flex items-center"
                        style={{ marginRight: "0.2rem" }}
                      />
                      <div className="flex" style={{ width: "100%" }}>
                        <div style={{ width: "125px" }}>
                          <img
                            src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg"
                            alt=""
                            style={{ width: "125px", borderRadius: "10px" }}
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
                              Áo polề reg rẻg regre regegfre rgerg egreg ẻ ge rg
                              ege o
                            </h1>
                            <IoIosClose
                              size={30}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <div style={{ marginBottom: "10px" }}>
                                <Select
                                  defaultValue={1}
                                  style={{ marginRight: "10px" }}
                                  options={[
                                    { value: 1, label: "Xanh" },
                                    { value: 2, label: "Trắng" },
                                    { value: 3, label: "Đỏ" },
                                  ]}
                                />
                                <Select
                                  defaultValue={"1"}
                                  options={[
                                    { value: "1", label: "L" },
                                    { value: "2", label: "M" },
                                    { value: "3", label: "XL" },
                                  ]}
                                />
                              </div>
                              <div>
                                <button className="button-number-cart">
                                  <span className="add">-</span>
                                  {3}
                                  <span className="minus">+</span>
                                </button>
                              </div>
                            </div>
                            <div className="items-end flex">
                              <div>
                                <div>359.000đ</div>
                                <div
                                  style={{
                                    textDecoration: "line-through",
                                    color: "#d9d9d9",
                                  }}
                                >
                                  400.000đ
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Space>
                </Checkbox.Group>
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
                    <p>0đ</p>
                    <p>(tiết kiệm 300k)</p>
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <p>Phí giao hàng</p>
                  <p>+25.000đ</p>
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
                  <p style={{ fontSize: "0.3rem" }}>300.000đ</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[55%] borderRight md:pr-1 mt-[0.3rem] md:mt-0">
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
              <Input placeholder="Họ tên" />
              <Input placeholder="Số điện thoại" />
              <Input placeholder="Email" className=" col-span-2" />
              <Input
                placeholder="Địa chỉ (ví dụ: 103 Vạn Phúc, phường Vạn Phúc)"
                className=" col-span-2"
              />
              <div className="col-span-2 grid grid-cols-3 gap-1">
                <Select
                  placeholder="Chọn Tỉnh/Thành"
                  className="col-span-3 md:col-span-1"
                  onChange={(e) => setCity(e)}
                  options={level1s.map((e: any, i: any) => {
                    return {
                      value: e.id,
                      label: e.name,
                    };
                  })}
                />
                <Select
                  placeholder="Chọn Quận/Huyện"
                  className="col-span-3 md:col-span-1"
                  onChange={(e) => setDistrict(e)}
                  options={findLevel1ById(city)?.children?.map(
                    (e: any, i: any) => {
                      return {
                        value: e.id,
                        label: e.name,
                      };
                    }
                  )}
                />
                <Select
                  placeholder="Chọn Phường/Xã"
                  className="col-span-3 md:col-span-1"
                  onChange={(e) => setVillage(e)}
                  options={findLevel1ById(city)
                    ?.findLevel2ById(district)
                    ?.children?.map((e: any, i: any) => {
                      return {
                        value: e.id,
                        label: e.name,
                      };
                    })}
                />
              </div>
              <Input placeholder="Ghi chú thêm" className=" col-span-2" />
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
            <Radio.Group className="w-full" style={{ marginTop: "0.3rem" }}>
              <Space direction="vertical" className="w-full">
                <div
                  style={{
                    border: `1px solid ${false ? "#D9D9D9" : "#eb6440"}`,
                    width: "100%",
                    borderRadius: "15px",
                    padding: "0.2rem 0.25rem",
                  }}
                >
                  <Radio value={1} className="flex items-center">
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
                          src="/img/pay/momo-icon.png"
                          alt=""
                          style={{
                            height: "35px",
                            width: "35px",
                          }}
                        />
                      </div>
                      <div>Thanh Toán Momo</div>
                    </div>
                  </Radio>
                </div>

                <Radio value={2}>12</Radio>
                <Radio value={3}>12</Radio>
                <Radio value={4}>12</Radio>
              </Space>
            </Radio.Group>
            <div style={{ marginTop: "0.3rem", width: "100%" }}>
              <button
                className="button-pay"
                style={{ width: "100%", height: "0.8rem" }}
              >
                Thanh toán (Momo)
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{marginTop:"0.4rem"}}>
        <FooterAntd />
      </div>
    </>
  );
}
