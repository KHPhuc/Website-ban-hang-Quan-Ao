import { Card } from "antd";
import { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import { NumericFormat } from "react-number-format";
import { abbreviateNumber } from "js-abbreviation-number";
import LineChart from "./Line";
import PieChart from "./Pie";
import TreeChart from "./Tree";

export default function Statistic({
  setTitle,
  getCard,
  card,
  getLine,
  line,
  getPie,
  pie,
  getTree,
  tree,
}: any) {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  useEffect(() => {
    setTitle("Thống kê");
    getCard();
    getLine();
    getPie();
    getTree();
  }, []);

  useEffect(() => {
    setData1(line);
  }, [line]);

  useEffect(() => {
    setData2(pie);
  }, [pie]);

  useEffect(() => {
    setData3(tree);
  }, [tree]);

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
                {/* {abbreviateNumber(card.doanhThu, 2)} */}
                <NumericFormat
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  suffix={" ₫"}
                  value={card.doanhThu}
                />
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
                {/* {abbreviateNumber(card.donHang, 2)} */}
                <NumericFormat
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  suffix={""}
                  value={card.donHang}
                />
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
                {/* {abbreviateNumber(card.daBan, 2)} */}
                <NumericFormat
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  suffix={""}
                  value={card.daBan}
                />
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
                {/* {abbreviateNumber(card.khachHang, 2)} */}
                <NumericFormat
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  suffix={""}
                  value={card.khachHang}
                />
              </div>
              <div className="font-[500] text-[16px]">Khách hàng</div>
            </div>
          </Card>
        </div>
        <div className="w-full mt-[20px]">
          <Card>
            <LineChart data={data1} />
            <p className="font-[500] text-[16px] text-center">
              Biểu đồ đường số lượng tình trạng đơn hàng tháng
            </p>
          </Card>
        </div>
        <div className="w-full mt-[20px] flex gap-[20px]">
          <div className="w-[50%]">
            <Card>
              <PieChart data={data2} />
              <p className="font-[500] text-[16px] text-center">
                Tỷ lệ tình trạng đơn hàng
              </p>
            </Card>
          </div>
          <div className="w-[50%]">
            <Card>
              <TreeChart data={data3} />
              <p className="font-[500] text-[16px] text-center">
                Số lượng sản phẩm đã bán
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
