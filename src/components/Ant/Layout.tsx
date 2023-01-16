import { ConfigProvider, FloatButton, Layout } from "antd";
import FooterAntd from "../common/Footer/Footer";

export default function LayoutAnt(props: any) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: "#eb6440",
          colorPrimary: "#1677FF",
        },
      }}
    >
      <Layout
        className="relative"
        style={{ minHeight: "100vh", backgroundColor: "#fff" }}
      >
        {props.children}

        <FloatButton.BackTop />
      </Layout>
    </ConfigProvider>
  );
}
