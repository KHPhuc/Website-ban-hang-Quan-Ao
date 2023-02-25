import { Button, Card, Descriptions, Modal, Tabs } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { BACKEND } from "../../../../common/Config/Config";
import { NumericFormat } from "react-number-format";
import InfiniteScroll from "react-infinite-scroll-component";
import { cancelOrder } from "../../../../../app/API/Order/Order";
import { toast } from "react-toastify";

export default function Orders({ auth, orders, getOrderForCustomer }: any) {
  var [data, setData]: any = useState([]);
  const [all, setAll] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState("");

  const [expandItem, setExpandItem]: any = useState();

  useEffect(() => {
    setData([]);
    setHasMore(true);
    setPage(0);
    setTab("");
    getOrderForCustomer({
      customerId: auth.id,
      page: 0,
      orderStatus: "",
    }).then((res: any) => {
      setData(res);
      if (res.length < 5) {
        setHasMore(false);
      } else {
        setPage(page + 1);
      }
      if (res.length) {
        setAll(true);
      }
    });
  }, []);

  const fetchData = () => {
    getOrderForCustomer({
      customerId: auth.id,
      page: page,
      orderStatus: tab,
    }).then((res: any) => {
      var cache = [...data, ...res];
      setData(cache);
      if (res.length < 5) {
        setHasMore(false);
      } else {
        setPage(page + 1);
      }
    });
  };

  const detailOrder = (e: any) => {
    if (expandItem === e.orderId) {
      setExpandItem("");
    } else {
      setExpandItem(e.orderId);
    }
  };

  const cancelO = (value: any, index: any) => {
    cancelOrder(value)
      .then((res: any) => {
        console.log(res);
        var cache = data;
        cache[index].paymentStatus = res.paymentStatus;
        cache[index].orderStatus = "Đã hủy";
        if (tab === "Chuẩn bị hàng" || tab === "Đang giao") {
          cache.splice(index, 1);
        }
        setData([...cache]);
        toast.success("Hủy thành công", { containerId: "RT" });
      })
      .catch((err) => {
        toast.error("Hủy không thành công", { containerId: "RT" });
      });
  };

  const sampleCode = (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<div className="text-center mt-[20px]">Đang tải...</div>}
      endMessage={<div className="text-center mt-[20px]">Đã tải hết!</div>}
    >
      <div className="grid gap-[15px]">
        {data.length &&
          data.map((e: any, i: any) => {
            return (
              <Card key={i} className="w-full" hoverable>
                <div onClick={() => detailOrder(e)}>
                  <div
                    className="flex justify-between pb-[10px]"
                    style={{ borderBottom: "1px solid #00000017" }}
                  >
                    <div>
                      Ngày đặt:{" "}
                      {dayjs(new Date(e.orderDate)).format(
                        "DD-MM-YYYY HH:mm:ss"
                      )}
                    </div>
                    <div className="text-[#a04444] flex">
                      {e.orderId === expandItem ? (
                        <div
                          className="pr-[5px]"
                          style={{ borderRight: "1px solid #0000001f" }}
                        >
                          MÃ ĐƠN HÀNG: {e.orderId.toUpperCase()}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="ml-[5px]">
                        {e.orderStatus.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  {e.orderId === expandItem ? (
                    <div
                      className="mt-[10px] pb-[15px]"
                      style={{ borderBottom: "1px solid #00000017" }}
                    >
                      <Descriptions title="" bordered>
                        <Descriptions.Item label="Địa chỉ nhận hàng" span={3}>
                          {e.name} - {e.phoneNumber}
                          <br />
                          {e.address}, {e.ward}, {e.district}, {e.city}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="Phương thức thanh toán"
                          span={3}
                        >
                          {e.description}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="Trạng thái thanh toán"
                          span={3}
                        >
                          {e.paymentStatus} - {e.paymentCode}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="pt-[10px]">
                    {e.detailOrder.map((e1: any, i1: any) => {
                      return (
                        <div
                          className={`flex justify-between pb-[15px] ${
                            i !== 0 ? "mt-[10px]" : ""
                          }`}
                          key={i1}
                          style={{ borderBottom: "1px solid #00000017" }}
                        >
                          <div className="flex">
                            <div className="w-[80px]">
                              <img src={`${BACKEND}/` + e1.image} alt="" />
                            </div>
                            <div className="ml-[15px]">
                              <p className="text-[16px]">{e1.productName}</p>
                              <p className="text-[#0000008a]">
                                Phân loại sản phẩm: {e1.color}/{e1.size}
                              </p>
                              <p>x{Math.abs(e1.quantity)}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <del className="text-[#c4c4c4] mr-[10px]">
                              <NumericFormat
                                displayType={"text"}
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                suffix={" ₫"}
                                value={e1.originalPrice}
                              />
                            </del>
                            <NumericFormat
                              className="text-[#a04444]"
                              displayType={"text"}
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              suffix={" ₫"}
                              value={e1.currentPrice}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-[10px] flex justify-end">
                    {e.orderId === expandItem ? (
                      <div className="w-full">
                        <div
                          className="flex justify-end"
                          style={{ border: "1px dotted #00000017" }}
                        >
                          <div className="py-[13px] px-[10px]">
                            Tổng tiền hàng
                          </div>
                          <div
                            className="w-[180px] flex justify-end py-[13px] pl-[10px]"
                            style={{ borderLeft: "1px dotted #00000017" }}
                          >
                            <NumericFormat
                              // className="text-[24px] text-[#a04444]"
                              displayType={"text"}
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              suffix={" ₫"}
                              value={e.detailOrder.reduce(
                                (x1: any, x2: any) =>
                                  x1 + x2.currentPrice * x2.quantity,
                                0
                              )}
                            />
                          </div>
                        </div>
                        <div
                          className="flex justify-end"
                          style={{ border: "1px dotted #00000017" }}
                        >
                          <div className="py-[13px] px-[10px]">Mã giảm giá</div>
                          <div
                            className="w-[180px] flex justify-end py-[13px] pl-[10px]"
                            style={{ borderLeft: "1px dotted #00000017" }}
                          >
                            <NumericFormat
                              // className="text-[24px] text-[#a04444]"
                              displayType={"text"}
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              suffix={" ₫"}
                              value={e.sale ? e.sale : 0}
                            />
                          </div>
                        </div>
                        <div
                          className="flex justify-end"
                          style={{ border: "1px dotted #00000017" }}
                        >
                          <div className="py-[13px] px-[10px]">Thành tiền</div>
                          <div
                            className="w-[180px] flex justify-end py-[13px] pl-[10px]"
                            style={{ borderLeft: "1px dotted #00000017" }}
                          >
                            <NumericFormat
                              className="text-[24px] text-[#a04444]"
                              displayType={"text"}
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              suffix={" ₫"}
                              value={e.totalMoney}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p className="mr-[5px]">Thành tiền:</p>
                        <NumericFormat
                          className="text-[24px] text-[#a04444]"
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          suffix={" ₫"}
                          value={e.totalMoney}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end items-center mt-[20px]">
                  {e.orderStatus === "Chuẩn bị hàng" ? (
                    <Button
                      onClick={() =>
                        cancelO(
                          {
                            orderId: e.orderId,
                            orderStatus: e.orderStatus,
                            paymentMethodId: e.paymentMethodId,
                            paymentStatus: e.paymentStatus,
                            paymentCode: e.paymentCode,
                            totalMoney: e.totalMoney,
                          },
                          i
                        )
                      }
                    >
                      Hủy đơn hàng
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </Card>
            );
          })}
      </div>
    </InfiniteScroll>
  );

  const items = [
    {
      key: "1",
      label: `Tất cả`,
      children: data.length ? (
        sampleCode
      ) : (
        <div className="text-center">Bạn chưa có đơn hàng nào</div>
      ),
    },
    {
      key: "2",
      label: `Chuẩn bị hàng`,
      children: data.length ? (
        sampleCode
      ) : (
        <div className="text-center">Bạn chưa có đơn hàng nào</div>
      ),
    },
    {
      key: "3",
      label: `Đang giao`,
      children: data.length ? (
        sampleCode
      ) : (
        <div className="text-center">Bạn chưa có đơn hàng nào</div>
      ),
    },
    {
      key: "4",
      label: `Đã giao`,
      children: data.length ? (
        sampleCode
      ) : (
        <div className="text-center">Bạn chưa có đơn hàng nào</div>
      ),
    },
    {
      key: "5",
      label: `Đã hủy`,
      children: data.length ? (
        sampleCode
      ) : (
        <div className="text-center">Bạn chưa có đơn hàng nào</div>
      ),
    },
  ];

  const fetchFirst = (tab: any) => {
    setHasMore(true);
    setPage(0);
    setTab(tab);
    getOrderForCustomer({
      customerId: auth.id,
      page: 0,
      orderStatus: tab,
    }).then((res: any) => {
      setData(res);
      if (res.length < 5) {
        setHasMore(false);
      } else {
        setPage(page + 1);
      }
    });
  };
  const handleOnChange = (e: any) => {
    switch (e) {
      case "1":
        fetchFirst("");
        break;
      case "2":
        fetchFirst("Chuẩn bị hàng");
        break;
      case "3":
        fetchFirst("Đang giao");
        break;
      case "4":
        fetchFirst("Đã giao");
        break;
      case "5":
        fetchFirst("Đã hủy");
        break;
    }
  };

  return (
    <>
      <div className="md:pl-[15px]">
        <h1 className="text-[0.35rem] font-[600] leading-[0.6rem]">
          Đơn hàng của bạn
        </h1>
        {all ? (
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={(e) => handleOnChange(e)}
          />
        ) : (
          <div className="text-center">Bạn chưa có đơn hàng nào</div>
        )}
      </div>
    </>
  );
}
