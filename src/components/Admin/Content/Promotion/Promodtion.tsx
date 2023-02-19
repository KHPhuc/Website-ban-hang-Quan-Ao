import {
  Button,
  DatePicker,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const { TextArea } = Input;

export default function Promotion({
  setTitle,
  getPromotion,
  promotion,
  createPromotion,

  addStatus,
  setAddStatus,

  updateStatus,
  setUpdateStatus,

  updatePromotion,
  updateAndDeletePromotion,

  removePromotion,
}: any) {
  const [form]: any = Form.useForm();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  var [valueUpdate, setValueUpdate]: any = useState();

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(0);
    setHasMore(false);
    setTitle("Quản lý mã giảm giá");
    getPromotion(0);
  }, []);

  useEffect(() => {
    if (addStatus) {
      closeModal();
    }
    setAddStatus("");
  }, [addStatus]);

  useEffect(() => {
    if (updateStatus) {
      closeModal();
    }
    setUpdateStatus("");
  }, [updateStatus]);

  useEffect(() => {
    if (promotion) {
      if (promotion.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [promotion]);

  const getMore = (p: any) => {
    setPage(p);
    getMore(p);
  };

  const columns = [
    Table.EXPAND_COLUMN,
    {
      title: "Mã giảm giá",
      dataIndex: "promotionCode",
      key: "promotionCode",
    },

    {
      title: "Đơn hàng tối thiểu",
      render: (x: any) => (
        <NumericFormat
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          suffix={" ₫"}
          value={x.minimum}
        />
      ),
    },
    {
      title: "Giảm",
      render: (x: any) => (
        <NumericFormat
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          suffix={" ₫"}
          value={x.sale}
        />
      ),
    },
    {
      title: "Bắt đầu",
      render: (x: any) => (
        <>
          {x.startDate
            ? dayjs(x.startDate, "YYYY-MM-DD").format("DD-MM-YYYY")
            : null}
        </>
      ),
    },
    {
      title: "Kết thúc",
      render: (x: any) => (
        <>
          {x.endDate
            ? dayjs(x.endDate, "YYYY-MM-DD").format("DD-MM-YYYY")
            : null}
        </>
      ),
    },
    {
      title: "Hành động",
      render: (x: any) => (
        <Space size={"middle"}>
          <a
            onClick={() => {
              setValueUpdate(x);
              setIsAdd(false);
              setIsOpenModal(true);
            }}
          >
            Sửa
          </a>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => removePromotion(x.promotionId)}
          >
            <a>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (isOpenModal && !isAdd) {
      form.setFieldsValue({
        promotionCode: valueUpdate.promotionCode,
        description: valueUpdate.description,
        sale: valueUpdate.sale,
        minimum: valueUpdate.minimum,
        times: valueUpdate.times === -1 ? null : valueUpdate.times,
        startDate: dayjs(valueUpdate.startDate),
        endDate: dayjs(valueUpdate.endDate),
      });
    }
  }, [isOpenModal]);

  const closeModal = () => {
    form.resetFields();
    setIsOpenModal(false);
  };

  const handleFinish = (e: any) => {
    console.log(e);
    if (isAdd) {
      createPromotion({
        promotionCode: e.promotionCode,
        description: e.description || "",
        startDate: e.startDate ? dayjs(e.startDate).format("YYYY-MM-DD") : null,
        endDate: e.endDate ? dayjs(e.endDate).format("YYYY-MM-DD") : null,
        times: e.times || -1,
        minimum: e.minimum,
        sale: e.sale,
      });
    } else {
      if (e.sale !== valueUpdate.sale) {
        updateAndDeletePromotion(valueUpdate.promotionId, {
          promotionCode: e.promotionCode,
          description: e.description,
          startDate: e.startDate
            ? dayjs(e.startDate).format("YYYY-MM-DD")
            : null,
          endDate: e.endDate ? dayjs(e.endDate).format("YYYY-MM-DD") : null,
          times: e.times || -1,
          minimum: e.minimum,
          sale: e.sale,
        });
      } else {
        updatePromotion(valueUpdate.promotionId, {
          description: e.description,
          startDate: e.startDate
            ? dayjs(e.startDate).format("YYYY-MM-DD")
            : null,
          endDate: e.endDate ? dayjs(e.endDate).format("YYYY-MM-DD") : null,
          times: e.times || -1,
          minimum: e.minimum,
        });
      }
    }
  };

  return (
    <>
      <Table
        title={() => (
          <div className="flex justify-between">
            <div>Danh sách mã giảm giá</div>
            <Button
              type="primary"
              onClick={() => {
                setIsAdd(true);
                setIsOpenModal(true);
              }}
            >
              Thêm
            </Button>
          </div>
        )}
        pagination={false}
        rowKey={"promotionId"}
        columns={columns}
        dataSource={[...promotion]}
        scroll={{ x: "max-content" }}
        expandable={{
          expandedRowRender: (record: any) => (
            //   <>{record.description}</>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Giới hạn" span={1}>
                {record.times === -1 ? "Vô hạn" : record.times}
              </Descriptions.Item>
              <Descriptions.Item label="Số lần sử dụng" span={1}>
                {record.used || 0}
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả" span={2}>
                {record.description}
              </Descriptions.Item>
            </Descriptions>
          ),
        }}
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
        title={isAdd ? "Thêm mã giảm giá" : "Sửa mã giảm giá"}
        open={isOpenModal}
        maskClosable={false}
        onCancel={() => closeModal()}
        footer={null}
      >
        <Form
          form={form}
          labelCol={{
            // sm: { span: 8 },
            // md: { span: 7 },
            // lg: { span: 6 },
            // xl: { span: 7 },
            span: 7,
          }}
          onFinish={(v) => handleFinish(v)}
        >
          <Form.Item
            label="Mã giảm giá"
            name="promotionCode"
            rules={[{ required: true, message: "Không được bỏ trống!" }]}
          >
            <Input
              maxLength={30}
              showCount={true}
              onChange={(e: any) => {}}
              disabled={isAdd ? false : true}
            />
          </Form.Item>
          <Form.Item
            label="Mô tả sản phẩm"
            name="description"
            // rules={[{ required: true, message: "Nhập mô tả sản phẩm" }]}
          >
            <TextArea
              maxLength={200}
              showCount={true}
              rows={5}
              style={{ resize: "none" }}
              onChange={(e: any) => {}}
            />
          </Form.Item>
          <Form.Item
            label="Số tiền giảm"
            name="sale"
            rules={[{ required: true, message: "Không được bỏ trống!" }]}
          >
            <InputNumber
              className="w-full"
              min={0}
              onChange={(e: any) => {}}
              prefix="₫"
            />
          </Form.Item>
          <Form.Item
            label="Đơn hàng tối thiểu"
            name="minimum"
            rules={[{ required: true, message: "Không được bỏ trống!" }]}
          >
            <InputNumber
              className="w-full"
              min={0}
              onChange={(e: any) => {}}
              prefix="₫"
            />
          </Form.Item>
          <Form.Item
            label="Số lần sử dụng"
            name="times"
            // rules={[{ required: true, message: "Không được bỏ trống!" }]}
          >
            <InputNumber className="w-full" min={0} onChange={(e: any) => {}} />
          </Form.Item>
          {/* <Form.Item
            label="Ngày sử dụng"
            name="date"
            // rules={[{ required: true, message: "Không được bỏ trống!" }]}
          >
            <DatePicker.RangePicker
              format="DD-MM-YYYY"
              style={{ width: "100%" }}
              disabledDate={(current) => {
                return current && current < dayjs().startOf("day");
              }}
            />
          </Form.Item> */}
          <Form.Item label="Ngày sử dụng" style={{ marginBottom: 0 }}>
            <Form.Item
              //   validateStatus="error"
              //   help="Please select right date"
              name="startDate"
              style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            >
              <DatePicker
                placeholder="Ngày bắt đầu"
                format={"DD-MM-YYYY"}
                disabledDate={(current) => {
                  return current && current < dayjs().startOf("day");
                }}
              />
            </Form.Item>
            <span
              style={{
                display: "inline-block",
                width: "24px",
                lineHeight: "32px",
                textAlign: "center",
              }}
            >
              -
            </span>
            <Form.Item
              style={{ display: "inline-block", width: "calc(50% - 12px)" }}
              name="endDate"
            >
              <DatePicker
                placeholder="Ngày kết thúc"
                format={"DD-MM-YYYY"}
                disabledDate={(current) => {
                  return current && current < dayjs().startOf("day");
                }}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <div className="flex justify-center">
              <Button type="primary" className="mr-[10px]" htmlType="submit">
                {isAdd ? "Thêm" : "Cập nhật"}
              </Button>
              <Button onClick={() => closeModal()}>Hủy</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
