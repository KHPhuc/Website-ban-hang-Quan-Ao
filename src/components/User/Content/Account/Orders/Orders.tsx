import { Table, Tabs } from "antd";

export default function Orders() {
  const items = [
    {
      key: "1",
      label: `Tất cả`,
      //   children: (
      //     // <Table
      //     //   rowKey="orderId"
      //     //   columns={columns}
      //     //   dataSource={order}
      //     //   expandable={{
      //     //     expandedRowRender: (record: any) => <></>,
      //     //   }}
      //     // />
      //   ),
      children: <div className="text-center">Bạn chưa có đơn hàng nào</div>,
    },
    {
      key: "2",
      label: `Chuẩn bị hàng`,
      //   children: <Table rowKey="orderId" columns={columns} />,
    },
    {
      key: "3",
      label: `Đang giao`,
      //   children: <Table rowKey="orderId" columns={columns} />,
    },
    {
      key: "4",
      label: `Đã giao`,
      //   children: <Table rowKey="orderId" columns={columns} />,
    },
    {
      key: "5",
      label: `Đã hủy`,
      //   children: <Table rowKey="orderId" columns={columns} />,
    },
  ];

  const handleOnChange = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <div className="md:pl-[15px]">
        <h1 className="text-[0.35rem] font-[600] leading-[0.6rem]">
          Đơn hàng của bạn
        </h1>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
    </>
  );
}
