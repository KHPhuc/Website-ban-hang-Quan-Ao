import { Layout } from "antd";

const { Footer } = Layout;

export default function FooterAntd() {
  return (
    <Footer
      className="flex items-center justify-center"
      style={{
        textAlign: "center",
        height: "0.4rem",
      }}
    >
      Hoàng Minh Shop ©2023 Created by KP23
    </Footer>
  );
}
