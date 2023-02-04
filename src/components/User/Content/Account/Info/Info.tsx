import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import { findLevel1ByName, level1s } from "dvhcvn";

import dayjs from "dayjs";

export default function Info() {
  return (
    <>
      <div className="md:pl-[15px]">
        <h1 className="text-[0.35rem] font-[600] leading-[0.6rem]">
          Thông tin tài khoản
        </h1>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className="mt-[0.3rem]">
          <Form.Item label="Họ Tên" name="username">
            <Input placeholder="Họ tên của bạn" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Địa chỉ (ví dụ: 103 Vạn Phúc, đường Vạn Phúc)" />
          </Form.Item>
          <Form.Item label="Tỉnh/Thành">
            <div className="col-span-2 grid grid-cols-3 gap-1">
              <Form.Item
                className="mb-0 col-span-3 md:col-span-1"
                name="city"
                rules={[{ required: true, message: "Không được bỏ trống!" }]}
              >
                <Select
                  placeholder="Chọn Tỉnh/Thành"
                  // onChange={(e) => onChangeCity(e)}
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
                rules={[{ required: true, message: "Không được bỏ trống!" }]}
              >
                <Select
                  placeholder="Chọn Quận/Huyện"
                  // onChange={(e) => onChangeDistrict(e)}
                  // options={findLevel1ByName(city)?.children?.map(
                  //   (e: any, i: any) => {
                  //     return {
                  //       value: e.name,
                  //       label: e.name,
                  //     };
                  //   }
                  // )}
                />
              </Form.Item>
              <Form.Item
                className="mb-0 col-span-3 md:col-span-1"
                name="ward"
                rules={[{ required: true, message: "Không được bỏ trống!" }]}
              >
                <Select
                  placeholder="Chọn Phường/Xã"
                  // onChange={(e) => setVillage(e)}
                  // options={findLevel1ByName(city)
                  //   ?.findLevel2ByName(district)
                  //   ?.children?.map((e: any, i: any) => {
                  //     return {
                  //       value: e.name,
                  //       label: e.name,
                  //     };
                  //   })}
                />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item name="radio-group" label="Giới tính">
            <Radio.Group>
              <Radio value="Nam">Nam</Radio>
              <Radio value="Nữ">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Ngày sinh (ngày-tháng-năm)">
            <DatePicker
              className="w-full"
              placeholder="Nhập ngày sinh của bạn"
              format={"DD-MM-YYYY"}
              disabledDate={(current) => {
                return (
                  current && current > dayjs().startOf("day").add(1, "day")
                );
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className=" text-center">
              <Button type="primary">Cập nhật tài khoản</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
