import { Button, Descriptions, Select, Space, Table, Tabs } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { NumericFormat } from "react-number-format";
import { BACKEND } from "../../../common/Config/Config";

export default function Order({
  setTitle,
  order,
  getAllOrder,
  updateOrder,
}: any) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [status, setStatus] = useState(null);

  const [editRow, setEditRow]: any = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    setTitle("Quản lý đơn hàng");
    getAllOrder({
      page: 0,
      orderStatus: null,
    });
  }, []);

  useEffect(() => {
    console.log(order);
    if (order) {
      if (order.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [order]);

  const getMore = (p: any) => {
    setPage(p);
    getAllOrder({
      page: p,
      orderStatus: status,
    });
  };

  const fetchAgain = (s: any) => {
    setPage(0);
    setStatus(s);
    getAllOrder({
      page: 0,
      orderStatus: s,
    });
  };

  const handleOnChange = (e: any) => {
    switch (e) {
      case "1":
        fetchAgain("");
        break;
      case "2":
        fetchAgain("Chuẩn bị hàng");
        break;
      case "3":
        fetchAgain("Đang giao");
        break;
      case "4":
        fetchAgain("Đã giao");
        break;
      case "5":
        fetchAgain("Đã hủy");
        break;
    }
  };

  const pagination = (
    <div className="mt-[10px] text-center">
      <div className="flex items-center justify-center">
        <div
          className={`px-[5px] ${
            page === 0 ? "btn-arrow-disabled" : "btn-arrow"
          } `}
          onClick={() => {
            if (page !== 0) {
              getMore(page - 1);
            }
          }}
        >
          <AiOutlineLeft className="cursor-pointer" />
        </div>
        <Button className="mx-[15px]">{page + 1}</Button>
        <div
          className={`px-[5px] ${
            !hasMore ? "btn-arrow-disabled" : "btn-arrow"
          } `}
          onClick={() => {
            if (hasMore) {
              getMore(page + 1);
            }
          }}
        >
          <AiOutlineRight className="cursor-pointer" />
        </div>
      </div>
    </div>
  );

  const columns = (tab: any) => {
    var col = [
      Table.EXPAND_COLUMN,
      {
        title: "Mã đơn hàng",
        dataIndex: "orderId",
        key: "orderId",
      },
      {
        title: "Ngày đặt",
        render: (x: any) => (
          <>{dayjs(new Date(x.orderDate)).format("DD-MM-YYYY HH:mm")}</>
        ),
        sorter: (a: any, b: any) =>
          dayjs(a.orderDate, "YYYY-MM-DD HH:mm:ss").isBefore(
            dayjs(b.orderDate, "YYYY-MM-DD HH:mm:ss")
          )
            ? -1
            : 1,
      },
      {
        title: "Giá trị đơn hàng",
        dataIndex: "totalMoney",
        key: "totalMoney",
      },
      {
        title: "Trạng thái thanh toán",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
      },
      {
        title: "Trạng thái đơn hàng",
        // dataIndex: "orderStatus",
        // key: "orderStatus",
        render: (x: any) => {
          return tab !== 3 && tab !== 4 && x.orderId === editRow ? (
            <Select
              defaultValue={x.orderStatus}
              // style={{
              //   width: 120,
              // }}
              onChange={(e) => setSelected(e)}
              options={[
                {
                  value: "Chuẩn bị hàng",
                  label: "Chuẩn bị hàng",
                },
                {
                  value: "Đang giao",
                  label: "Đang giao",
                },
                {
                  value: "Đã giao",
                  label: "Đã giao",
                },
                {
                  value: "Đã hủy",
                  label: "Đã hủy",
                },
              ]}
            />
          ) : (
            <>{x.orderStatus}</>
          );
        },
      },
    ];
    if (tab !== 3 && tab !== 4) {
      col.push({
        title: "Hành động",
        render: (x: any) => {
          return x.orderStatus === "Đã giao" || x.orderStatus === "Đã hủy" ? (
            ""
          ) : (
            <Space>
              {x.orderId === editRow ? (
                <>
                  <a
                    onClick={() => {
                      if (selected && selected !== x.orderStatus) {
                        if (selected === "Đã giao") {
                          updateOrder({
                            orderId: x.orderId,
                            orderStatus: selected,
                            paymentMethodId: x.paymentMethodId,
                            paymentStatus: "Đã thanh toán",
                            paymentCode: x.paymentCode,
                            page: page,
                            orderStatus1: status,
                            totalMoney: x.totalMoney,
                          });
                        } else {
                          updateOrder({
                            orderId: x.orderId,
                            orderStatus: selected,
                            paymentMethodId: x.paymentMethodId,
                            paymentStatus: x.paymentStatus,
                            paymentCode: x.paymentCode,
                            page: page,
                            orderStatus1: status,
                            totalMoney: x.totalMoney,
                          });
                        }
                        setEditRow("");
                      } else {
                        setEditRow("");
                      }
                    }}
                  >
                    Lưu
                  </a>
                  <a onClick={() => setEditRow("")}>Hủy</a>
                </>
              ) : (
                <a onClick={() => setEditRow(x.orderId)}>Cập nhật trạng thái</a>
              )}
            </Space>
          );
        },
      });
    }
    return col;
  };

  const sampleTab = (tab: any) => {
    return (
      <Table
        rowKey="orderId"
        columns={columns(tab)}
        dataSource={order}
        scroll={{ x: "max-content" }}
        expandable={{
          expandedRowRender: (record: any) => (
            <>
              <div
                className="mt-[10px] pb-[15px]"
                style={{ borderBottom: "1px solid #00000017" }}
                onClick={() => console.log(record)}
              >
                <Descriptions title="" bordered>
                  <Descriptions.Item label="Địa chỉ nhận hàng" span={3}>
                    {record.name} - {record.phoneNumber}
                    <br />
                    {record.address}, {record.ward}, {record.district},{" "}
                    {record.city}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phương thức thanh toán" span={3}>
                    {record.description}
                  </Descriptions.Item>
                </Descriptions>
                <div className="pt-[10px]">
                  {record.detailOrder.map((e1: any, i1: any) => {
                    return (
                      <div
                        className={`flex justify-between pb-[15px] mt-[10px]`}
                        key={i1}
                        style={{ borderBottom: "1px solid #00000017" }}
                      >
                        <div className="flex">
                          <div className="w-[80px]">
                            <img src={`${BACKEND}/` + e1.image} alt="" />
                          </div>
                          <div className="ml-[15px]">
                            <p className="text-[16px]">
                              {e1.productId} - {e1.productName}
                            </p>
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
                  <div className="w-full">
                    <div
                      className="flex justify-end"
                      style={{ border: "1px dotted #00000017" }}
                    >
                      <div className="py-[13px] px-[10px]">Tổng tiền hàng</div>
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
                          value={record.detailOrder.reduce(
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
                          value={record.sale ? record.sale : 0}
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
                          value={record.totalMoney}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ),
        }}
        pagination={false}
      />
    );
  };

  const items = [
    {
      key: "1",
      label: `Tất cả`,
      children: (
        <>
          {sampleTab(0)}
          {pagination}
        </>
      ),
    },
    {
      key: "2",
      label: `Chuẩn bị hàng`,
      children: (
        <>
          {sampleTab(1)}
          {pagination}
        </>
      ),
    },
    {
      key: "3",
      label: `Đang giao`,
      children: (
        <>
          {sampleTab(2)}
          {pagination}
        </>
      ),
    },
    {
      key: "4",
      label: `Đã giao`,
      children: (
        <>
          {sampleTab(3)}
          {pagination}
        </>
      ),
    },
    {
      key: "5",
      label: `Đã hủy`,
      children: (
        <>
          {sampleTab(4)}
          {pagination}
        </>
      ),
    },
  ];

  return (
    <>
      {/* <Table rowKey="orderId" columns={columns} />
       */}
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(e) => handleOnChange(e)}
      />
    </>
  );
}
