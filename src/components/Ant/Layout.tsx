import { ConfigProvider, Layout } from "antd";

export default function LayoutAnt(props: any) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#eb6440",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>{props.children}</Layout>
    </ConfigProvider>
  );
}
