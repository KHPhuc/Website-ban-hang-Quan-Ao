import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import { findLevel1ByName, level1s } from "dvhcvn";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Info({ auth, info, getInfo, updateInfo }: any) {
  const [form] = Form.useForm();
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    getInfo(auth.id);
  }, []);

  useEffect(() => {
    setCity(info.city);
    setDistrict(info.district);
    form.setFieldsValue({
      name: info.name,
      email: info.email,
      phoneNumber: info.phoneNumber,
      sex: info.sex,
      birthday: dayjs(new Date(info.birthday)),

      address: info.address,
      city: info.city,
      district: info.district,
      ward: info.ward,
    });
  }, [info]);

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

  const submit = (e: any) => {
    if (
      e.name !== info.name ||
      (e.address && e.address !== info.address) ||
      (e.city && e.city !== info.city) ||
      (e.district && e.district !== info.district) ||
      (e.ward && e.ward !== info.ward)
    ) {
      updateInfo(
        {
          name: e.name,
          email: e.email,
          phoneNumber: e.phoneNumber,
          birthday: e.birthday
            ? dayjs(e.birthday, "DD-MM-YYYY").format("YYYY-MM-DD")
            : null,
          sex: e.sex,
          address: e.address,
          city: e.city,
          district: e.district,
          ward: e.ward,
        },
        auth.id
      );
    } else {
      updateInfo(
        {
          birthday: e.birthday
            ? dayjs(e.birthday, "DD-MM-YYYY").format("YYYY-MM-DD")
            : null,
          sex: e.sex,
        },
        auth.id
      );
    }
  };

  return (
    <>
      <div className="md:pl-[15px]">
        <h1 className="text-[0.35rem] font-[600] leading-[0.6rem]">
          Thông tin tài khoản
        </h1>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className="mt-[0.3rem]"
          onFinish={(e) => submit(e)}
        >
          <Form.Item
            label="Họ Tên"
            name="name"
            rules={[{ required: true, message: "Không được bỏ trống!" }]}
          >
            <Input placeholder="Họ tên của bạn" value={auth.name} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phoneNumber">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Địa chỉ (ví dụ: 103 Vạn Phúc, đường Vạn Phúc)" />
          </Form.Item>
          <Form.Item label="Tỉnh/Thành">
            <div className="col-span-2 grid grid-cols-3 gap-1">
              <Form.Item className="mb-0 col-span-3 md:col-span-1" name="city">
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
              <Form.Item className="mb-0 col-span-3 md:col-span-1" name="ward">
                <Select
                  placeholder="Chọn Phường/Xã"
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
          </Form.Item>
          <Form.Item name="sex" label="Giới tính">
            <Radio.Group>
              <Radio value="Nam">Nam</Radio>
              <Radio value="Nữ">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="birthday" label="Ngày sinh (ngày-tháng-năm)">
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
              <Button htmlType="submit" type="primary">
                Cập nhật tài khoản
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
