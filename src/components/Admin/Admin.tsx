import React from "react";
import { Layout } from "antd";

const Sidebar = React.lazy(
  () => import("../../containers/Admin/Sidebar/Sidebar")
);
const ContentAdmin = React.lazy(() => import("./Content/ContentAdmin"));
const HeaderAdmin = React.lazy(
  () => import("../../containers/Admin/Header/Header")
);

export default function Admin({ sidebar }: any) {
  return (
    <>
      <Sidebar />
      <Layout
        className={`site-layout ${
          !sidebar ? "ml-[256px]" : "ml-0 md:ml-[80px]"
        } duration-[250ms]`}
      >
        <HeaderAdmin />
        <ContentAdmin />
      </Layout>
    </>
  );
}
