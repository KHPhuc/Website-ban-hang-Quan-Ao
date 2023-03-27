import { Card } from "antd";
import { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import { NumericFormat } from "react-number-format";
import { abbreviateNumber } from "js-abbreviation-number";

export default function Statistic({ setTitle }: any) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setTitle("Thống kê");
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const config = {
    data,
    xField: "year",
    yField: "gdp",
    seriesField: "name",
    yAxis: {
      label: {
        formatter: (v: any) => `${(v / 10e8).toFixed(1)} B`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-[0.2rem] lg:grid-cols-4 md:grid-cols-2">
          <Card hoverable className="bg-[#8dcdff]">
            <div className="flex items-center justify-center flex-col">
              <div className="w-[50px]">
                <img src="/img/assets/sales.png" alt="" />
              </div>
              <div className="font-[600] text-[32px]">
                {abbreviateNumber(10010000, 2)}
              </div>
              <div className="font-[500] text-[16px] text-[#2b2b2b]">
                Doanh thu
              </div>
            </div>
          </Card>
          <Card hoverable className="bg-[#b984fd]">
            <div className="flex items-center justify-center flex-col">
              <div className="w-[50px]">
                <img src="/img/assets/received.png" alt="" />
              </div>
              <div className="font-[600] text-[32px]">
                {abbreviateNumber(10010000, 2)}
              </div>
              <div className="font-[500] text-[16px]">Đơn hàng</div>
            </div>
          </Card>
          <Card hoverable className="bg-[#f6ff64]">
            <div className="flex items-center justify-center flex-col">
              <div className="w-[50px]">
                <img src="/img/assets/shirts.png" alt="" />
              </div>
              <div className="font-[600] text-[32px]">
                {abbreviateNumber(10010000, 2)}
              </div>
              <div className="font-[500] text-[16px]">Đã bán</div>
            </div>
          </Card>
          <Card hoverable className="bg-[#4fff7d]">
            <div className="flex items-center justify-center flex-col">
              <div className="w-[50px]">
                <img src="/img/assets/people.png" alt="" />
              </div>
              <div className="font-[600] text-[32px]">
                {abbreviateNumber(10010000, 2)}
              </div>
              <div className="font-[500] text-[16px]">Khách hàng</div>
            </div>
          </Card>
        </div>
        <div></div>
      </div>
    </>
  );
}
