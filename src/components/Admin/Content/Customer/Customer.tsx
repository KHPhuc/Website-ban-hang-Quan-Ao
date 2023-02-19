import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { validate } from "email-validator";
import { detectPhoneNumber } from "../../../common/CheckPhoneNumber/CheckPhoneNumber";

import dayjs from "dayjs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Customer({
  setTitle,
  customer,
  getCustomer,
  account,

  createCustomer,
  addStatus,
  setAddStatus,

  banCustomer,
  unBanCustomer,
}: any) {
  const [form]: any = Form.useForm();
  const [isOpenModalAdd, setIsOpenMoadlAdd] = useState(false);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(0);
    setHasMore(false);
    setTitle("Quản lý khách hàng");
    getCustomer(0);
  }, []);

  useEffect(() => {
    if (addStatus) {
      form.resetFields();
      setAddStatus("");
      setIsOpenMoadlAdd(false);
    }
  }, [addStatus]);

  useEffect(() => {
    if (customer) {
      if (customer.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [customer]);

  const getMore = (p: any) => {
    setPage(p);
    getCustomer(p);
  };

  const columns = [
    // Table.EXPAND_COLUMN,
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày sinh",
      render: (x: any) => (
        <>
          {x.birthday ? dayjs(new Date(x.birthday)).format("DD-MM-YYYY") : ""}
        </>
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Là admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
    },
    {
      title: "Bị cấm",
      dataIndex: "ban",
      key: "ban",
    },
    {
      title: "Hành động",
      render: (x: any) => (
        <>
          {x.phoneNumber === account.username ||
          x.email === account.username ||
          x.isAdmin === "true" ? (
            ""
          ) : x.ban === "true" ? (
            <Popconfirm
              title="Bạn có chắc chắn bỏ chặn không?"
              onConfirm={() => unBanCustomer(x.customerId)}
            >
              <a>Bỏ chặn</a>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Bạn có chắc chắn chặn không?"
              onConfirm={() => banCustomer(x.customerId)}
            >
              <a>Chặn</a>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];

  const handleAdd = (e: any) => {
    createCustomer({
      name: e.name,
      phoneNumber: e.phoneNumber,
      email: e.email,
      birthday: e.birthday
        ? dayjs(e.birthday, "DD-MM-YYYY").format("YYYY-MM-DD")
        : null,
      sex: e.sex,
      password: e.password,
      isAdmin: e.isAdmin ? "true" : "false",
    });
  };

  return (
    <>
      <Table
        title={() => (
          <div className="flex justify-between">
            <div>Danh sách khách hàng</div>
            <Button
              type="primary"
              onClick={() => {
                setIsOpenMoadlAdd(true);
              }}
            >
              Thêm
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={customer}
        rowKey="customerId"
        scroll={{ x: "max-content" }}
        pagination={false}
        //   expandable={{
        //     expandedRowRender: (record: any) => <></>,
        //   }}
      />
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
      <Modal
        title="Thêm khách hàng"
        open={isOpenModalAdd}
        onCancel={() => setIsOpenMoadlAdd(false)}
        footer={null}
      >
        <Form form={form} labelCol={{ span: 6 }} onFinish={(e) => handleAdd(e)}>
          <Form.Item
            label="Tên khách hàng"
            name="name"
            rules={[{ required: true, message: "Không được bỏ trống!" }]}
          >
            <Input maxLength={30} />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Không được bỏ trống!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && !detectPhoneNumber(value)) {
                    return Promise.reject("SĐT không hợp lệ!");
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Không được bỏ trống!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && !validate(value)) {
                    return Promise.reject("Email không hợp lệ!");
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input type="email" maxLength={50} />
          </Form.Item>
          <Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Không được bỏ trống!" }]}
              style={{
                display: "inline-block",
                width: "calc(80% - 5px)",
                marginRight: "10px",
              }}
            >
              <Input.Password maxLength={30} />
            </Form.Item>
            <Form.Item label="Admin" name="isAdmin" className=" inline-block">
              <Checkbox />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birthday"
              style={{
                display: "inline-block",
                width: "calc(50% - 5px)",
                marginRight: "10px",
              }}
            >
              <DatePicker
                format={"DD-MM-YYYY"}
                disabledDate={(current) => {
                  return (
                    current &&
                    current > dayjs().subtract(14, "year").startOf("day")
                  );
                }}
              />
            </Form.Item>
            <Form.Item
              label="Giới tính"
              name="sex"
              style={{ display: "inline-block", width: "calc(50% - 5px)" }}
            >
              <Radio.Group>
                {/* <Space direction="vertical"> */}
                <Radio value="Nam">Nam</Radio>
                <Radio value="Nữ">Nữ</Radio>
                {/* </Space> */}
              </Radio.Group>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-center">
              <Button type="primary" className="mr-[10px]" htmlType="submit">
                Thêm
              </Button>
              <Button onClick={() => setIsOpenMoadlAdd(false)}>Hủy</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
