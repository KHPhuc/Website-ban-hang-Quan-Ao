import { useEffect } from "react";
import { Badge, Switch, Table } from "antd";

export default function Payment({
  setTitle,
  getPayment,
  payment,
  updatePayment,
}: any) {
  useEffect(() => {
    setTitle("Quản lý phương thức thanh toán");
    getPayment();
  }, []);

  const columns = [
    {
      title: "Phương thức",
      dataIndex: "paymentMethodName",
      key: "paymentMethodName",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      render: (x: any) => (
        <Badge
          status={`${x.status === "true" ? "processing" : "default"}`}
          text={`${x.status === "true" ? "Đang hoạt động" : "Đã dừng"}`}
        />
      ),
    },
    {
      title: "Hành động",
      render: (e: any) => (
        <Switch
          checked={e.status === "true" ? true : false}
          onChange={() =>
            updatePayment(e.paymentMethodId, {
              status: `${e.status === "true" ? "false" : "true"}`,
            })
          }
        />
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={payment}
        rowKey={"paymentMethodId"}
        pagination={false}
      />
    </>
  );
}
