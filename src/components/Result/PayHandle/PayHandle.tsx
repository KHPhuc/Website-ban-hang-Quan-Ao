import { Button, Result } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function PayHandle() {
  const nav = useNavigate();
  const location = useLocation();
  const param = useParams();

  useEffect(() => {
    console.log(location.search);
    let search = location.search;
    let index = search.indexOf("resultCode");
    let check = search.substring(index + 11, index + 15);
    if (search[index + 11] === "0") {
      nav("../pay-success");
    } else if (check === "1006") {
      nav("../pay-fail");
    }
  }, []);
  return <></>;
}
