import { Layout } from "antd";
import Sidebar from "../../containers/Admin/Sidebar/Sidebar";
import ContentAdmin from "./Content/ContentAdmin";
import HeaderAdmin from "../../containers/Admin/Header/Header";

export default function Admin({sidebar}:any) {
  return (
    <>
      <Sidebar />
      <Layout className={`site-layout ${!sidebar ? "ml-[256px]" : "ml-0 md:ml-[80px]"} duration-[250ms]`}>
        <HeaderAdmin />
        <ContentAdmin />
      </Layout>
    </>
  );
}
