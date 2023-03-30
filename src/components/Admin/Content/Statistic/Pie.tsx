import { Pie } from "@ant-design/charts";
import { useEffect, useState } from "react";

export default function PieChart(props: any) {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const config = {
    appendPadding: 10,
    data,
    angleField: "soluong",
    colorField: "orderStatus",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return <Pie {...config} />;
}
