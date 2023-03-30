import { Treemap } from "@ant-design/plots";
import { useEffect, useState } from "react";

export default function TreeChart(props: any) {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
    console.log(props.data);
  }, [props.data]);

  const config = {
    data,
    colorField: "name",
  };
  return <Treemap {...config} />;
}
