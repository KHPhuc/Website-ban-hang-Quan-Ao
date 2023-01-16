import { Space, Table, Tabs } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function Order({ setTitle, order, getAllOrder }: any) {
  useEffect(() => {
    setTitle("Quản lý đơn hàng");
    getAllOrder();
  }, []);

  useEffect(() => {
    console.log(order);
  }, [order]);

  const columns = [
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
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Hành động",
      render: (x: any) => (
        <Space>
          <a>Cập nhật trạng thái</a>
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: `Tất cả`,
      children: (
        <Table
          rowKey="orderId"
          columns={columns}
          dataSource={order}
          expandable={{
            expandedRowRender: (record: any) => <></>,
          }}
        />
      ),
    },
    {
      key: "2",
      label: `Chuẩn bị hàng`,
      children: <Table rowKey="orderId" columns={columns} />,
    },
    {
      key: "3",
      label: `Đang giao`,
      children: <Table rowKey="orderId" columns={columns} />,
    },
    {
      key: "4",
      label: `Đã giao`,
      children: <Table rowKey="orderId" columns={columns} />,
    },
    {
      key: "5",
      label: `Đã hủy`,
      children: <Table rowKey="orderId" columns={columns} />,
    },
  ];

  const handleOnChange = (e: any) => {
    console.log(e);
  };

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
