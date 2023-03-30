import { Line } from "@ant-design/charts";
import { useEffect, useState } from "react";

export default function LineChart(props: any) {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const config = {
    data,
    xField: "date",
    yField: "don",
    seriesField: "orderStatus",
    // point: {
    //   size: 2,
    //   style: {
    //     lineWidth: 1,
    //     fillOpacity: 1,
    //   },
    //   shape: (item: any) => {
    //     if (item.category === "Cement production") {
    //       return "circle";
    //     }

    //     return "diamond";
    //   },
    // },
  };
  return <Line {...config} />;
}
