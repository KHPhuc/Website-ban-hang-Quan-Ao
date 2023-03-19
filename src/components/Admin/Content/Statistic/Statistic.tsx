import { useEffect } from "react";

export default function Statistic({ setTitle }: any) {
  useEffect(() => {
    setTitle("Thống kê");
  }, []);
  return <></>;
}
